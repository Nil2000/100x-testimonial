/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnalysisStatus,
  FeedbackType,
  SentimentType,
  SourceType,
} from "@/generated/prisma/enums";
import { IconType } from "react-icons/lib";

export interface CreateSpaceQuestion {
  id: string;
  title: string;
  maxLength: number;
}
export interface manageTestimonialSidebarElementType {
  header: string;
  contents: {
    title: string;
    icon: IconType;
    tabContent: any;
  }[];
}

export interface Question {
  id: string;
  title: string;
}

export interface ThankYouSpace {
  title: string;
  message: string;
}

export interface SpaceResponse {
  id: string;
  name: string;
  logo: string | null;
  headerTitle: string;
  headerSubtitle: string;
  collectionType: string;
  collectStar: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  isPublished: boolean;
  questions: Question[];
  thankyouSpace: ThankYouSpace | null;
  theme: any;
}

export interface StyleSettings {
  alignment: "left" | "center" | "right";
  padding: number;
  borderRadius: "small" | "medium" | "large" | "none";
  showBorder: boolean;
  borderColor: string;
  borderThickness: number;
  shadowType: "none" | "drop" | "inner" | "standard";
  shadowSize: "small" | "medium" | "large";
  shadowColor: string;
  background: string;
  gradient: string;
  backgroundType: "solid" | "gradient" | "transparent";
  cardBackground: string;
  cardBackgroundType: "solid" | "gradient" | "transparent";
  headerColor: string;
  bodyColor: string;
  headerSize: number | null;
  bodySize: number | null;
  headerFont: string;
  bodyFont: string;
}

export interface TestimonialResponse {
  id: string;
  answer: string | null;
  name: string;
  email: string;
  rating: number;
  permission: boolean;
  spaceId: string;
  createdAt: Date;
  updatedAt: Date;
  feedbackType: FeedbackType;
  addToWallOfLove: boolean;
  videoUrl: string | null;
  imageUrl: string | null;
  profileImageUrl: string | null;
  isSpam: boolean;
  spamStatus: AnalysisStatus;
  isSocial: boolean;
  sentiment: SentimentType;
  sentimentStatus: AnalysisStatus;
  source: SourceType;
  sourceUrl: string | null;
  metadata: string | null;
  styleSettings: StyleSettings | null;
}

export type SingleTestimonialWithSpaceLogo = TestimonialResponse & {
  space: {
    logo: string | null;
  };
};

export interface UpdateTestimonialStatus {
  isSpam: boolean;
  sentiment: SentimentType;
  analysisStatus: AnalysisStatus;
}

// export type MetricsResponse = {
//   id: string;
//   date: string;
//   pageViews: number;
//   visitors: number;
//   completedActions?: number; // Only for request testimonial page
//   timeSpentOnWallOfLove?: number; // Only for wall of love page
// };

export type PAGE_TYPE = "req-test-page" | "wall-of-love-page";

// export type API_METRIC_TYPE =
//   | "page-views"
//   | "visitors"
//   | "completed-actions"
//   | "time-spent-on-wall-of-love";

export type POSTHOG_METRIC_TYPE = "page-view" | "completed-testimonial";

export type SOCIAL_PLATFORM = "X" | "INSTAGRAM";

export interface MetricResponse {
  metric: Metric[];
  totalPageViews: number;
  totalVisitors: number;
  countMetric: number;
}

export interface Metric {
  date: string;
  pageViews: number;
  visitors: number;
}
