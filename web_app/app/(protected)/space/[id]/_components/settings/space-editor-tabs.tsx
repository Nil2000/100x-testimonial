"use client";
import React from "react";
import TabbedInterfaceWrapper from "../tabbed-interface-wrapper";
import TestimonialDetailView from "../testimonials/testimonial-detail-view";
import ThankYouView from "../thank-you-view";
import SpaceSettingsView from "./space-settings-view";
import AnalyticsDashboard from "../analytics/analytics-dashboard";
import {
  MessageSquareText,
  Heart,
  Settings2,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type TabConfig = {
  tabTitle: string;
  tabDescription: string;
  tabIcon: LucideIcon;
  tabContent: React.ReactNode;
};

const EditSpaceVerticalTabs: TabConfig[] = [
  {
    tabTitle: "Testimonial Form",
    tabDescription: "Customize your collection form",
    tabIcon: MessageSquareText,
    tabContent: <TestimonialDetailView />,
  },
  {
    tabTitle: "Thank You Page",
    tabDescription: "Post-submission experience",
    tabIcon: Heart,
    tabContent: <ThankYouView />,
  },
  {
    tabTitle: "Space Settings",
    tabDescription: "Publish & manage your space",
    tabIcon: Settings2,
    tabContent: <SpaceSettingsView />,
  },
  {
    tabTitle: "Analytics",
    tabDescription: "Track performance metrics",
    tabIcon: BarChart3,
    tabContent: <AnalyticsDashboard />,
  },
];

export default function SpaceEditorTabs() {
  return (
    <div className="h-full">
      <TabbedInterfaceWrapper tabs={EditSpaceVerticalTabs} />
    </div>
  );
}
