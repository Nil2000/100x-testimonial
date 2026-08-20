import { db } from "@repo/db";
import {
  PlanType,
  PLAN_LIMITS,
  resolveEffectivePlan,
} from "@/lib/subscription";

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number;
  isTrialExpired?: boolean;
}

export interface UserPlanInfo {
  plan: PlanType;
  subscriptionStatus: string;
  trialEndDate: Date | null;
  subscriptionId: string | null;
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
    | "aiSentiment"
    | "customBranding",
  spaceId?: string,
): Promise<AccessCheckResult> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      subscriptionStatus: true,
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

  const effectivePlan = resolveEffectivePlan(user);
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
        (f) =>
          f.feedbackType === "VIDEO" || f.feedbackType === "TEXT_AND_VIDEO",
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
        (f) => f.feedbackType === "TEXT" || f.feedbackType === "TEXT_AND_VIDEO",
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

    case "customBranding": {
      if (!planLimits.customBranding) {
        return {
          hasAccess: false,
          reason: `Custom branding (themes, fonts, and logo) is not available on the ${effectivePlan} plan. Please upgrade to Professional or Enterprise.`,
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
  userId: string,
): Promise<UserPlanInfo | { error: string }> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      subscriptionStatus: true,
      trialEndDate: true,
      subscriptionId: true,
    },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const now = new Date();
  const plan = resolveEffectivePlan(user);
  const isTrialActive =
    user.trialEndDate != null && user.trialEndDate >= now;
  const isTrialExpired =
    user.trialEndDate != null && user.trialEndDate < now;
  const daysLeftInTrial =
    isTrialActive && user.trialEndDate
      ? Math.ceil(
          (user.trialEndDate.getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  return {
    plan,
    subscriptionStatus: user.subscriptionStatus,
    trialEndDate: user.trialEndDate,
    subscriptionId: user.subscriptionId ?? null,
    isTrialActive,
    isTrialExpired,
    daysLeftInTrial,
  };
}

export async function upgradeToPaid(
  userId: string,
  plan: PlanType.PRO | PlanType.ENTERPRISE,
  subscriptionId: string,
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
      trialEndDate: null,
    },
  });

  return { success: true };
}
