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

const planFieldsSelect = {
  plan: true,
  subscriptionStatus: true,
  trialEndDate: true,
  subscriptionId: true,
  currentPeriodEnd: true,
} as const;

export async function checkUserAccess(
  userId: string,
  checkType: "space" | "aiSpam" | "aiSentiment" | "customBranding",
): Promise<AccessCheckResult> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      ...planFieldsSelect,
      spaces: {
        select: {
          id: true,
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
    select: planFieldsSelect,
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

// webhook-only; never expose via a server action
export async function upgradeToPaid(
  userId: string,
  plan: PlanType.PRO | PlanType.ENTERPRISE,
  subscriptionId: string,
  currentPeriodEnd: Date,
  customerId?: string,
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
      currentPeriodEnd,
      ...(customerId !== undefined ? { customerId } : {}),
    },
  });

  return { success: true };
}
