import React from "react";
import TestimonialPage from "./testimonial-settings";
import WallOfLovePage from "./wall-of-love-settings";
import TabbedInterfaceWrapper from "../../tabbed-interface-wrapper";

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
  return <TabbedInterfaceWrapper tabs={PageUIDesignVerticalTabs} />;
}
