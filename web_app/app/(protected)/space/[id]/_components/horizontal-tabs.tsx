"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brush, Edit, FileStack } from "lucide-react";
import SpaceEditorTabs from "./settings/space-editor-tabs";
import TestimonialsManagementView from "./testimonials/testimonials-management-view";
import PageSettingsTabs from "./settings/page-settings/page-settings-tabs";

export default function HorizontalTabs() {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className="relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border justify-start">
        <TabsTrigger
          value="tab-1"
          className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          <Edit size={16} className="inline-block -mb-1 me-1" />
          Edit Space
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          <FileStack size={16} className="inline-block -mb-1 me-1" />
          Manage testimonials
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          <Brush size={16} className="inline-block -mb-1 me-1" />
          Pages Design
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="min-h-[calc(100vh-8rem)]">
        <SpaceEditorTabs />
      </TabsContent>
      <TabsContent value="tab-2">
        <TestimonialsManagementView />
      </TabsContent>
      <TabsContent value="tab-3" className="space-y-4">
        <PageSettingsTabs />
      </TabsContent>
    </Tabs>
  );
}
