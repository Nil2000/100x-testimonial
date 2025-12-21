"use client";
import React from "react";
import TabbedInterfaceWrapper from "../tabbed-interface-wrapper";
import {
  WalletCards,
  Video,
  LetterText,
  HandHeart,
  MessageSquareWarningIcon,
  Send,
} from "lucide-react";
import TestimonialsListManager from "./testimonials-list-manager";
import SocialTestimonialsTab from "./social-testimonials-tab";

const testimonialManagementTabs = [
  {
    tabTitle: "All Testimonials",
    tabDescription: "View all testimonials",
    tabIcon: WalletCards,
    tabContent: (
      <TestimonialsListManager key="all-testimonials" isSocial={false} />
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
