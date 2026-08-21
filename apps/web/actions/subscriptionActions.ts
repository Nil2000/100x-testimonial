"use server";

import { upgradeToPaid, getUserPlanInfo } from "@/lib/accessControl";
import { requireAuth } from "@/lib/authGuards";
import { PlanType } from "@/lib/subscription";
import { startUserTrial as grantUserTrial } from "@/lib/subscription.server";
import { SubscriptionStatus } from "@repo/db/enums";

export async function startUserTrial() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const result = await grantUserTrial(authResult.userId);

  if ("error" in result) {
    return { error: result.error };
  }

  return {
    success: true,
    message:
      "Trial started successfully! You now have 7 days to explore all features.",
  };
}

export async function upgradeUserToPaid(
  plan: PlanType.PRO | PlanType.ENTERPRISE,
  subscriptionId: string,
) {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const result = await upgradeToPaid(authResult.userId, plan, subscriptionId);

  if (!result.success) {
    return { error: result.error };
  }

  return { success: true, message: `Successfully upgraded to ${plan} plan!` };
}

export async function getUserPlan() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const planInfo = await getUserPlanInfo(authResult.userId);

  if ("error" in planInfo) {
    return { error: planInfo.error };
  }

  return { success: true, data: planInfo };
}

export async function getSubscriptionDetails() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const planInfo = await getUserPlanInfo(authResult.userId);

  if ("error" in planInfo) {
    return { error: planInfo.error };
  }

  return {
    success: true,
    data: {
      plan: planInfo.plan as PlanType,
      subscriptionStatus: planInfo.subscriptionStatus as SubscriptionStatus,
      trialEndDate: planInfo.trialEndDate?.toISOString() ?? null,
      subscriptionId: planInfo.subscriptionId,
    },
  };
}
