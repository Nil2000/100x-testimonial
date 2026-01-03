"use server";

import { auth } from "@/lib/auth";
import {
  startTrial,
  upgradeToPaid,
  getUserPlanInfo,
} from "@/lib/accessControl";

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
