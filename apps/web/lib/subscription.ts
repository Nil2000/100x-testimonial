import { SubscriptionStatus } from "@repo/db/enums";
import type { PlanType as DbPlanType } from "@repo/db/enums";

export enum PlanType {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export interface PlanLimits {
  spaces: number;
  videoFeedbacksPerSpace: number;
  textTestimonialsPerSpace: number;
  aiSpamDetection: boolean;
  aiSentimentAnalysis: boolean;
  customBranding: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  [PlanType.FREE]: {
    spaces: 1,
    videoFeedbacksPerSpace: 2,
    textTestimonialsPerSpace: 10,
    aiSpamDetection: false,
    aiSentimentAnalysis: false,
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
  },
  [PlanType.PRO]: {
    spaces: 1,
    videoFeedbacksPerSpace: 5,
    textTestimonialsPerSpace: 25,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: false,
    apiAccess: false,
    prioritySupport: true,
  },
  [PlanType.ENTERPRISE]: {
    spaces: 3,
    videoFeedbacksPerSpace: 10,
    textTestimonialsPerSpace: 50,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: true,
    apiAccess: false,
    prioritySupport: true,
  },
};

export const TRIAL_DURATION_DAYS = 7;

export type PlanFields = {
  plan: PlanType | DbPlanType;
  subscriptionStatus: SubscriptionStatus;
  trialEndDate: Date | null;
};

export function resolveEffectivePlan(user: PlanFields): PlanType {
  if (
    user.subscriptionStatus === SubscriptionStatus.CANCELLED ||
    user.subscriptionStatus === SubscriptionStatus.EXPIRED
  ) {
    return PlanType.FREE;
  }

  if (user.trialEndDate && user.trialEndDate < new Date()) {
    return PlanType.FREE;
  }

  return user.plan as PlanType;
}
