"use client";

import { Settings, MessageSquareText, Palette } from "lucide-react";
import HorizontalTabsLayout from "./tabs/horizontal-tabs-layout";
import type { TabItem } from "./tabs/tab-item.types";
import SpaceEditorTabs from "./settings/space-editor-tabs";
import TestimonialsManagementView from "./testimonials/testimonials-management-view";
import PageSettingsTabs from "./settings/page-settings/page-settings-tabs";

const spacePageTabs: TabItem[] = [
  {
    value: "edit",
    label: "Edit Space",
    shortLabel: "Edit",
    icon: Settings,
    content: <SpaceEditorTabs />,
  },
  {
    value: "testimonials",
    label: "Manage Testimonials",
    shortLabel: "Testimonials",
    icon: MessageSquareText,
    content: <TestimonialsManagementView />,
  },
  {
    value: "design",
    label: "Pages Design",
    shortLabel: "Design",
    icon: Palette,
    content: <PageSettingsTabs />,
  },
];

export default function SpacePageHorizontalTabs() {
  return (
    <HorizontalTabsLayout
      tabs={spacePageTabs}
      defaultValue="edit"
      getContentClassName={(tab) =>
        tab.value === "design" ? "space-y-4" : undefined
      }
    />
  );
}
