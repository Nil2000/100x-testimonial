import { db } from "@repo/db";
import {
  PlanType,
  resolveEffectivePlan,
  TRIAL_DURATION_DAYS,
} from "./subscription";
import { SubscriptionStatus } from "@repo/db/enums";

export async function startUserTrial(
  userId: string,
  trialPlan: PlanType = PlanType.PRO,
) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { plan: true, trialEndDate: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.trialEndDate) {
      return { error: "Trial has already been used" };
    }

    if (user.plan !== PlanType.FREE) {
      return { error: "Trial is only available for free users" };
    }

    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + TRIAL_DURATION_DAYS);
    await db.user.update({
      where: { id: userId },
      data: {
        plan: trialPlan,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
        trialEndDate: trialEndDate,
      },
    });

    return { success: true, message: "Trial started successfully" };
  } catch (error) {
    console.error("START_USER_TRIAL", error);
    return { error: "Failed to start trial" };
  }
}

export async function getEffectivePlan(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
        subscriptionStatus: true,
        trialEndDate: true,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    return resolveEffectivePlan(user);
  } catch (error) {
    console.error("GET_EFFECTIVE_PLAN", error);
    return { error: "Failed to get effective plan" };
  }
}
