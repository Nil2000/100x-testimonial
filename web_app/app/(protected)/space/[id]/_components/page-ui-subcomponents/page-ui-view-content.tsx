import React from "react";
import TestimonialPage from "./testimonial-page";
import WallOfLovePage from "./wall-of-love-page";
import VerticalTabsWrapper from "../vertical-tabs-wrapper";

const PageUIDesignVerticalTabs = [
  {
    tabTitle: "Testimonial page",
    tabContent: <TestimonialPage />,
  },
  {
    tabTitle: "Wall of love page",
    tabContent: <WallOfLovePage />,
  },
];

export default function PageUIDesignViewContent() {
  return <VerticalTabsWrapper tabs={PageUIDesignVerticalTabs} />;
}
