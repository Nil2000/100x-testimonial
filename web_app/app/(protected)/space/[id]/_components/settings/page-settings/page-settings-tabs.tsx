import React from "react";
import TestimonialPage from "./testimonial-settings";
import WallOfLovePage from "./wall-of-love-settings";
import TabbedInterfaceWrapper from "../../tabbed-interface-wrapper";
import { FileText, Heart } from "lucide-react";

const PageUIDesignVerticalTabs = [
  {
    tabTitle: "Testimonial Page",
    tabDescription:
      "Customize theme, fonts, and branding for your testimonial collection page",
    tabIcon: FileText,
    tabContent: <TestimonialPage />,
  },
  {
    tabTitle: "Wall of Love",
    tabDescription:
      "Configure layout and display options for your testimonial showcase",
    tabIcon: Heart,
    tabContent: <WallOfLovePage />,
  },
];

export default function PageUIDesignViewContent() {
  return <TabbedInterfaceWrapper tabs={PageUIDesignVerticalTabs} />;
}
