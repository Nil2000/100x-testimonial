import { LucideIcon } from "lucide-react";

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
  logoObjectKey: string;
  headerTitle: string;
  headerSubtitle: string;
  collectionType: string;
  collectStar: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  isPublished: boolean;
  questions: Question[];
  thankyouSpace: ThankYouSpace;
}

export interface TestimonialResponse {
  id: string;
  answer: string;
  name: string;
  email: string;
  rating: number;
  permission: boolean;
  spaceId: string;
  createdAt: Date;
  updatedAt: Date;
  feedbackType: string;
  addToWallOfLove: boolean;
}
