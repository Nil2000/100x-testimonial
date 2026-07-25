import { FileText, Heart } from "lucide-react";
import VerticalSidebarTabsLayout from "../../tabs/vertical-sidebar-tabs-layout";
import type { TabItem } from "../../tabs/tab-item.types";
import TestimonialPage from "./testimonial-settings";
import WallOfLovePage from "./wall-of-love-settings";

const pageDesignTabs: TabItem[] = [
  {
    value: "testimonial-page",
    label: "Testimonial Page",
    description:
      "Customize theme, fonts, and branding for your testimonial collection page",
    icon: FileText,
    content: <TestimonialPage />,
  },
  {
    value: "wall-of-love",
    label: "Wall of Love",
    description:
      "Configure layout and display options for your testimonial showcase",
    icon: Heart,
    content: <WallOfLovePage />,
  },
];

export default function PageSettingsTabs() {
  return <VerticalSidebarTabsLayout tabs={pageDesignTabs} />;
}
