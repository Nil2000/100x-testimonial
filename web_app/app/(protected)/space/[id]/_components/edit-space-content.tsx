"use client";
import React from "react";
import VerticalTabsWrapper from "./vertical-tabs-wrapper";
import TestimonialView from "./testimonial-view";
import ThankYouView from "./thankyou-view";
import SpaceControlView from "./space-control-view";

const EditSpaceVerticalTabs = [
  {
    tabTitle: "Testimonial view",
    tabContent: <TestimonialView />,
  },
  {
    tabTitle: "Thank you view",
    tabContent: <ThankYouView />,
  },
  {
    tabTitle: "Space control",
    tabContent: <SpaceControlView />,
  },
];

export default function EditSpaceContent() {
  return (
    <div className="h-full">
      <VerticalTabsWrapper tabs={EditSpaceVerticalTabs} />
    </div>
  );
}
