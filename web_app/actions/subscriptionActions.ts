"use server";

import { auth } from "@/lib/auth";
import {
  startTrial,
  upgradeToPaid,
  getUserPlanInfo,
} from "@/lib/accessControl";
import { db } from "@/lib/db";

export async function startUserTrial() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const result = await startTrial(session.user.id);

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
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const result = await upgradeToPaid(session.user.id, plan, subscriptionId);

  if (!result.success) {
    return { error: result.error };
  }

  return { success: true, message: `Successfully upgraded to ${plan} plan!` };
}

export async function getUserPlan() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const planInfo = await getUserPlanInfo(session.user.id);

  if (!planInfo) {
    return { error: "User not found" };
  }

  return { success: true, data: planInfo };
}

export async function getSubscriptionDetails() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
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
