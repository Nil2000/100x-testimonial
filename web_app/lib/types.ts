import { LucideIcon } from "lucide-react";
import { AnalysisStatus, SentimentType } from "./db";

export interface CreateSpaceQuestion {
  id: string;
  title: string;
  maxLength: number;
}
export interface manageTestimonialSidebarElementType {
  header: string;
  contents: {
    title: string;
    icon: LucideIcon;
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
  feedbackType: string;
  addToWallOfLove: boolean;
  videoUrl: string | null;
  imageUrl: string | null;
  isSpam: boolean;
  sentiment: SentimentType;
  analysisStatus: AnalysisStatus;
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

export type MetricsResponse = {
  id: string;
  date: string;
  pageViews: number;
  visitors: number;
  completedActions?: number; // Only for request testimonial page
  timeSpentOnWallOfLove?: number; // Only for wall of love page
};

export type PAGE_TYPE = "req-test-page" | "wall-of-love-page";
