"use client";

import {
  MessageSquareText,
  Heart,
  Settings2,
  BarChart3,
} from "lucide-react";
import VerticalSidebarTabsLayout from "../tabs/vertical-sidebar-tabs-layout";
import type { TabItem } from "../tabs/tab-item.types";
import TestimonialDetailView from "../testimonials/testimonial-detail-view";
import ThankYouView from "../thank-you-view";
import SpaceSettingsView from "./space-settings-view";
import AnalyticsDashboard from "../analytics/analytics-dashboard";

const editSpaceTabs: TabItem[] = [
  {
    value: "testimonial-form",
    label: "Testimonial Form",
    description: "Customize your collection form",
    icon: MessageSquareText,
    content: <TestimonialDetailView />,
  },
  {
    value: "thank-you",
    label: "Thank You Page",
    description: "Post-submission experience",
    icon: Heart,
    content: <ThankYouView />,
  },
  {
    value: "space-settings",
    label: "Space Settings",
    description: "Publish & manage your space",
    icon: Settings2,
    content: <SpaceSettingsView />,
  },
  {
    value: "analytics",
    label: "Analytics",
    description: "Track performance metrics",
    icon: BarChart3,
    content: <AnalyticsDashboard />,
  },
];

export default function SpaceEditorTabs() {
  return (
    <div className="h-full">
      <VerticalSidebarTabsLayout tabs={editSpaceTabs} />
    </div>
  );
}
