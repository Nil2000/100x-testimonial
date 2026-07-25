import { db } from "@/lib/db";
import { PlanType, PLAN_LIMITS, TRIAL_DURATION_DAYS } from "@/lib/subscription";

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number;
  isTrialExpired?: boolean;
}

export interface UserPlanInfo {
  plan: string;
  subscriptionStatus: string;
  trialStartDate: Date | null;
  trialEndDate: Date | null;
  isTrialActive: boolean;
  isTrialExpired: boolean;
  daysLeftInTrial: number;
}

export async function checkUserAccess(
  userId: string,
  checkType:
    | "space"
    | "videoFeedback"
    | "textTestimonial"
    | "aiSpam"
    | "aiSentiment",
  spaceId?: string
): Promise<AccessCheckResult> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      subscriptionStatus: true,
      trialStartDate: true,
      trialEndDate: true,
      spaces: {
        select: {
          id: true,
          feedbacks: {
            select: {
              feedbackType: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      hasAccess: false,
      reason: "User not found",
    };
  }

  let effectivePlan = user.plan as PlanType;
  const now = new Date();

  if (user.plan === "TRIAL" && user.trialEndDate) {
    if (now > user.trialEndDate) {
      effectivePlan = PlanType.FREE;
      return {
        hasAccess: false,
        reason: "Trial period has expired. Please upgrade to continue.",
        isTrialExpired: true,
      };
    }
  }

  const planLimits = PLAN_LIMITS[effectivePlan];

  switch (checkType) {
    case "space": {
      const currentSpaces = user.spaces.length;
      const spaceLimit = planLimits.spaces;

      if (spaceLimit === -1) {
        return { hasAccess: true };
      }

      if (currentSpaces >= spaceLimit) {
        return {
          hasAccess: false,
          reason: `You have reached the maximum number of spaces (${spaceLimit}) for your ${effectivePlan} plan.`,
          currentUsage: currentSpaces,
          limit: spaceLimit,
        };
      }

      return { hasAccess: true };
    }

    case "videoFeedback": {
      if (!spaceId) {
        return {
          hasAccess: false,
          reason: "Space ID is required to check video feedback access",
        };
      }

      const space = user.spaces.find((s) => s.id === spaceId);
      if (!space) {
        return {
          hasAccess: false,
          reason: "Space not found",
        };
      }

      const videoCount = space.feedbacks.filter(
        (f) => f.feedbackType === "VIDEO" || f.feedbackType === "TEXT_AND_VIDEO"
      ).length;

      const videoLimit = planLimits.videoFeedbacksPerSpace;

      if (videoLimit === -1) {
        return { hasAccess: true };
      }

      if (videoCount >= videoLimit) {
        return {
          hasAccess: false,
          reason: `You have reached the maximum number of video feedbacks (${videoLimit}) for this space on your ${effectivePlan} plan.`,
          currentUsage: videoCount,
          limit: videoLimit,
        };
      }

      return { hasAccess: true };
    }

    case "textTestimonial": {
      if (!spaceId) {
        return {
          hasAccess: false,
          reason: "Space ID is required to check text testimonial access",
        };
      }

      const space = user.spaces.find((s) => s.id === spaceId);
      if (!space) {
        return {
          hasAccess: false,
          reason: "Space not found",
        };
      }

      const textCount = space.feedbacks.filter(
        (f) => f.feedbackType === "TEXT" || f.feedbackType === "TEXT_AND_VIDEO"
      ).length;

      const textLimit = planLimits.textTestimonialsPerSpace;

      if (textLimit === -1) {
        return { hasAccess: true };
      }

      if (textCount >= textLimit) {
        return {
          hasAccess: false,
          reason: `You have reached the maximum number of text testimonials (${textLimit}) for this space on your ${effectivePlan} plan.`,
          currentUsage: textCount,
          limit: textLimit,
        };
      }

      return { hasAccess: true };
    }

    case "aiSpam": {
      if (!planLimits.aiSpamDetection) {
        return {
          hasAccess: false,
          reason: `AI spam detection is not available on the ${effectivePlan} plan. Please upgrade to Professional or Enterprise.`,
        };
      }

      return { hasAccess: true };
    }

    case "aiSentiment": {
      if (!planLimits.aiSentimentAnalysis) {
        return {
          hasAccess: false,
          reason: `AI sentiment analysis is not available on the ${effectivePlan} plan. Please upgrade to Professional or Enterprise.`,
        };
      }

      return { hasAccess: true };
    }

    default:
      return {
        hasAccess: false,
        reason: "Invalid check type",
      };
  }
}

export async function getUserPlanInfo(
  userId: string
): Promise<UserPlanInfo | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      subscriptionStatus: true,
      trialStartDate: true,
      trialEndDate: true,
    },
  });

  if (!user) {
    return null;
  }

  const now = new Date();
  let isTrialActive = false;
  let isTrialExpired = false;
  let daysLeftInTrial = 0;

  if (user.plan === "TRIAL" && user.trialStartDate && user.trialEndDate) {
    isTrialActive = now >= user.trialStartDate && now <= user.trialEndDate;
    isTrialExpired = now > user.trialEndDate;

    if (isTrialActive) {
      const timeDiff = user.trialEndDate.getTime() - now.getTime();
      daysLeftInTrial = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }
  }

  return {
    plan: user.plan,
    subscriptionStatus: user.subscriptionStatus,
    trialStartDate: user.trialStartDate,
    trialEndDate: user.trialEndDate,
    isTrialActive,
    isTrialExpired,
    daysLeftInTrial,
  };
}

export async function startTrial(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      trialStartDate: true,
    },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.trialStartDate) {
    return { success: false, error: "Trial has already been used" };
  }

  if (user.plan !== "FREE") {
    return { success: false, error: "Trial is only available for free users" };
  }

  const now = new Date();
  const trialEndDate = new Date(now);
  trialEndDate.setDate(trialEndDate.getDate() + TRIAL_DURATION_DAYS);

  await db.user.update({
    where: { id: userId },
    data: {
      plan: "TRIAL",
      trialStartDate: now,
      trialEndDate: trialEndDate,
      subscriptionStatus: "ACTIVE",
    },
  });

  return { success: true };
}

export async function upgradeToPaid(
  userId: string,
  plan: "PROFESSIONAL" | "ENTERPRISE",
  subscriptionId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  await db.user.update({
    where: { id: userId },
    data: {
      plan: plan,
      subscriptionStatus: "ACTIVE",
      subscriptionId: subscriptionId,
    },
  });

  return { success: true };
}

export async function checkAndExpireTrials(): Promise<void> {
  const now = new Date();

  await db.user.updateMany({
    where: {
      plan: "TRIAL",
      trialEndDate: {
        lt: now,
      },
    },
    data: {
      plan: "FREE",
      subscriptionStatus: "EXPIRED",
    },
  });
}
