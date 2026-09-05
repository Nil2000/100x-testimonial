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
    spaces: 3,
    videoFeedbacksPerSpace: 5,
    textTestimonialsPerSpace: 25,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: true,
    apiAccess: false,
    prioritySupport: true,
  },
  [PlanType.ENTERPRISE]: {
    spaces: -1,
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

export const PLAN_DISPLAY_NAMES: Record<PlanType, string> = {
  [PlanType.FREE]: "Starter",
  [PlanType.PRO]: "Professional",
  [PlanType.ENTERPRISE]: "Enterprise",
};

function formatLimit(n: number, singular: string, plural: string) {
  if (n === -1) return `Unlimited ${plural}`;
  return `${n} ${n === 1 ? singular : plural}`;
}

export function getPlanFeatureList(plan: PlanType): string[] {
  const limits = PLAN_LIMITS[plan];
  const features = [
    formatLimit(limits.spaces, "space", "spaces"),
    formatLimit(
      limits.videoFeedbacksPerSpace,
      "video feedback per space",
      "video feedbacks per space",
    ),
    formatLimit(
      limits.textTestimonialsPerSpace,
      "text testimonial per space",
      "text testimonials per space",
    ),
  ];

  if (limits.aiSpamDetection) features.push("AI spam detection");
  if (limits.aiSentimentAnalysis) features.push("AI sentiment analysis");
  features.push(
    limits.customBranding ? "Custom branding" : "Basic customization",
  );
  features.push("Wall of love widget");
  if (limits.apiAccess) features.push("API access");
  features.push(limits.prioritySupport ? "Priority support" : "Email support");

  return features;
}

export type PlanFields = {
  plan: PlanType | DbPlanType;
  subscriptionStatus: SubscriptionStatus;
  trialEndDate: Date | null;
  subscriptionId: string | null;
  currentPeriodEnd: Date | null;
};

export function resolveEffectivePlan(
  user: PlanFields,
  now = new Date(),
): PlanType {
  if (user.plan === PlanType.FREE) return PlanType.FREE;

  // Trial-only user (never paid): trialEndDate is the only clock.
  if (!user.subscriptionId) {
    return user.trialEndDate && user.trialEndDate < now
      ? PlanType.FREE
      : (user.plan as PlanType);
  }

  // Paid user: trialEndDate is history only. ACTIVE keeps access;
  // ON_HOLD / CANCELLED keep access through the paid period; EXPIRED is FREE.
  if (user.subscriptionStatus === SubscriptionStatus.ACTIVE) {
    return user.plan as PlanType;
  }
  if (user.subscriptionStatus === SubscriptionStatus.EXPIRED) {
    return PlanType.FREE;
  }
  return user.currentPeriodEnd && user.currentPeriodEnd >= now
    ? (user.plan as PlanType)
    : PlanType.FREE;
}
