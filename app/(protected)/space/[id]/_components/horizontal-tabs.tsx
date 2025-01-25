"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, FileStack } from "lucide-react";
import EditSpaceContent from "./edit-space-content";

export default function HorizontalTabs({ spaceInfo }: { spaceInfo: any }) {
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
      </TabsList>
      <TabsContent value="tab-1" className="min-h-[calc(100vh-8rem)]">
        {/* <p className="p-4 text-center text-xs text-muted-foreground">
          Content for Tab 1
        </p> */}
        <EditSpaceContent spaceInfo={spaceInfo} />
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 text-center text-xs text-muted-foreground">
          Content for Tab 2
        </p>
      </TabsContent>
    </Tabs>
  );
}
