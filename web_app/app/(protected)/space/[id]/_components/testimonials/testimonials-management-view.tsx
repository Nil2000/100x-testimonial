"use client";
import React from "react";
import TabbedInterfaceWrapper from "../tabbed-interface-wrapper";
import {
  WalletCards,
  Video,
  LetterText,
  HandHeart,
  MessageSquareWarningIcon,
  Archive,
} from "lucide-react";
import TestimonialsListManager from "./testimonials-list-manager";

const testimonialManagementTabs = [
  {
    tabTitle: "All Testimonials",
    tabDescription: "View all testimonials",
    tabIcon: WalletCards,
    tabContent: (
      <TestimonialsListManager
        key="all-testimonials"
        isSocial={false}
        showQuotaWarning={true}
      />
    ),
  },
  {
    tabTitle: "Video",
    tabDescription: "Video testimonials only",
    tabIcon: Video,
    tabContent: (
      <TestimonialsListManager
        key="video-testimonials"
        category="VIDEO"
        isSocial={false}
        showQuotaWarning={true}
      />
    ),
  },
  {
    tabTitle: "Text",
    tabDescription: "Text testimonials only",
    tabIcon: LetterText,
    tabContent: (
      <TestimonialsListManager
        key="text-testimonials"
        category="TEXT"
        isSocial={false}
        showQuotaWarning={true}
      />
    ),
  },
  {
    tabTitle: "Liked",
    tabDescription: "Your favorite testimonials",
    tabIcon: HandHeart,
    tabContent: (
      <TestimonialsListManager
        key="liked-testimonials"
        wallOfLove={true}
        isSocial={false}
      />
    ),
  },
  {
    tabTitle: "Spam",
    tabDescription: "Filtered spam testimonials",
    tabIcon: MessageSquareWarningIcon,
    tabContent: (
      <TestimonialsListManager
        key="spam-testimonials"
        category="SPAM"
        isSocial={false}
      />
    ),
  },
  {
    tabTitle: "Archived",
    tabDescription: "Archived testimonials",
    tabIcon: Archive,
    tabContent: (
      <TestimonialsListManager
        key="archived-testimonials"
        archived={true}
        isSocial={false}
      />
    ),
  },
  // {
  //   tabTitle: "Social",
  //   tabDescription: "Imported social testimonials",
  //   tabIcon: Send,
  //   tabContent: <SocialTestimonialsTab />,
  // },
];

export default function TestimonialsManagementView() {
  return <TabbedInterfaceWrapper tabs={testimonialManagementTabs} />;
}
