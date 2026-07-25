"use server";

import {
  startTrial,
  upgradeToPaid,
  getUserPlanInfo,
} from "@/lib/accessControl";
import { requireAuth } from "@/lib/authGuards";
import { db } from "@repo/db";

export async function startUserTrial() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const result = await startTrial(authResult.userId);

  if (!result.success) {
    return { error: result.error };
  }

  return {
    success: true,
    message:
      "Trial started successfully! You now have 7 days to explore all features.",
  };
}

export async function upgradeUserToPaid(
  plan: "PROFESSIONAL" | "ENTERPRISE",
  subscriptionId: string
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

  if (!planInfo) {
    return { error: "User not found" };
  }

  return { success: true, data: planInfo };
}

export async function getSubscriptionDetails() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const user = await db.user.findUnique({
    where: { id: authResult.userId },
    select: {
      plan: true,
      subscriptionStatus: true,
      trialStartDate: true,
      trialEndDate: true,
      subscriptionId: true,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  return {
    success: true,
    data: {
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
      trialStartDate: user.trialStartDate?.toISOString() ?? null,
      trialEndDate: user.trialEndDate?.toISOString() ?? null,
      subscriptionId: user.subscriptionId ?? null,
    },
  };
}
