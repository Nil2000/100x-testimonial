"use client";

import {
  WalletCards,
  Video,
  LetterText,
  HandHeart,
  MessageSquareWarningIcon,
  Archive,
} from "lucide-react";
import VerticalSidebarTabsLayout from "../tabs/vertical-sidebar-tabs-layout";
import type { TabItem } from "../tabs/tab-item.types";
import TestimonialsListManager from "./testimonials-list-manager";

const testimonialManagementTabs: TabItem[] = [
  {
    value: "all",
    label: "All Testimonials",
    description: "View all testimonials",
    icon: WalletCards,
    content: (
      <TestimonialsListManager
        key="all-testimonials"
        showQuotaWarning={true}
      />
    ),
  },
  {
    value: "video",
    label: "Video",
    description: "Video testimonials only",
    icon: Video,
    content: (
      <TestimonialsListManager
        key="video-testimonials"
        category="VIDEO"
        showQuotaWarning={true}
      />
    ),
  },
  {
    value: "text",
    label: "Text",
    description: "Text testimonials only",
    icon: LetterText,
    content: (
      <TestimonialsListManager
        key="text-testimonials"
        category="TEXT"
        showQuotaWarning={true}
      />
    ),
  },
  {
    value: "liked",
    label: "Liked",
    description: "Your favorite testimonials",
    icon: HandHeart,
    content: (
      <TestimonialsListManager
        key="liked-testimonials"
        wallOfLove={true}
      />
    ),
  },
  {
    value: "spam",
    label: "Spam",
    description: "Filtered spam testimonials",
    icon: MessageSquareWarningIcon,
    content: (
      <TestimonialsListManager
        key="spam-testimonials"
        category="SPAM"
      />
    ),
  },
  {
    value: "archived",
    label: "Archived",
    description: "Archived testimonials",
    icon: Archive,
    content: (
      <TestimonialsListManager
        key="archived-testimonials"
        archived={true}
      />
    ),
  },
];

export default function TestimonialsManagementView() {
  return <VerticalSidebarTabsLayout tabs={testimonialManagementTabs} />;
}
