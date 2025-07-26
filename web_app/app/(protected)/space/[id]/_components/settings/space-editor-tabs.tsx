"use client";
import React from "react";
import TabbedInterfaceWrapper from "../tabbed-interface-wrapper";
import TestimonialDetailView from "../testimonials/testimonial-detail-view";
import ThankYouView from "../thank-you-view";
import SpaceSettingsView from "./space-settings-view";
import AnalyticsDashboard from "../analytics/analytics-dashboard";

const EditSpaceVerticalTabs = [
  {
    tabTitle: "Testimonial view",
    tabContent: <TestimonialDetailView />,
  },
  {
    tabTitle: "Thank you view",
    tabContent: <ThankYouView />,
  },
  {
    tabTitle: "Space control",
    tabContent: <SpaceSettingsView />,
  },
  {
    tabTitle: "Analytics",
    tabContent: <AnalyticsDashboard />,
  },
];

export default function EditSpaceContent() {
  return (
    <div className="h-full">
      <TabbedInterfaceWrapper tabs={EditSpaceVerticalTabs} />
    </div>
  );
}
