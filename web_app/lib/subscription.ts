export enum PlanType {
  FREE = "FREE",
  TRIAL = "TRIAL",
  STARTER = "STARTER",
  PROFESSIONAL = "PROFESSIONAL",
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
  [PlanType.TRIAL]: {
    spaces: 1,
    videoFeedbacksPerSpace: 5,
    textTestimonialsPerSpace: 25,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: false,
    apiAccess: false,
    prioritySupport: true,
  },
  [PlanType.STARTER]: {
    spaces: 1,
    videoFeedbacksPerSpace: 5,
    textTestimonialsPerSpace: 25,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
  },
  [PlanType.PROFESSIONAL]: {
    spaces: 3,
    videoFeedbacksPerSpace: 10,
    textTestimonialsPerSpace: 50,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: true,
    apiAccess: false,
    prioritySupport: true,
  },
  [PlanType.ENTERPRISE]: {
    spaces: -1, // -1 means unlimited
    videoFeedbacksPerSpace: -1,
    textTestimonialsPerSpace: -1,
    aiSpamDetection: true,
    aiSentimentAnalysis: true,
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
  },
};

export const TRIAL_DURATION_DAYS = 7;
