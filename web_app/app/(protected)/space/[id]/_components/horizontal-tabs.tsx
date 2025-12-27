"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, MessageSquareText, Palette } from "lucide-react";
import SpaceEditorTabs from "./settings/space-editor-tabs";
import TestimonialsManagementView from "./testimonials/testimonials-management-view";
import PageSettingsTabs from "./settings/page-settings/page-settings-tabs";
import { cn } from "@/lib/utils";

const tabs = [
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

export default function HorizontalTabs() {
  return (
    <Tabs defaultValue="edit" className="w-full">
      <div className="relative">
        <TabsList className="h-auto w-full justify-start gap-1 rounded-none border-b bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "relative rounded-none border-b-2 border-transparent bg-transparent px-4 py-3",
                "text-muted-foreground hover:text-foreground",
                "data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                "transition-all duration-200"
              )}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={cn(
            "mt-4 min-h-[calc(100vh-14rem)] animate-in fade-in-50 duration-300",
            tab.value === "design" && "space-y-4"
          )}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
