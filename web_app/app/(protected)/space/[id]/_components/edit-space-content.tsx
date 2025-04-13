"use client";
import React from "react";
import VerticalTabsWrapper from "./vertical-tabs-wrapper";
import TestimonialView from "./testimonial-view";
import ThankYouView from "./thankyou-view";
import PublishView from "./publish-view";

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
    tabTitle: "Publish view",
    tabContent: <PublishView />,
  },
];

export default function EditSpaceContent() {
  return (
    <div className="h-full">
      <VerticalTabsWrapper tabs={EditSpaceVerticalTabs} />
    </div>
  );
}
