"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type VerticalTabsWrapperProps = {
  tabTitle: string;
  tabContent: React.ReactNode;
}[];

export default function VerticalTabsWrapper({
  tabs,
}: {
  tabs: VerticalTabsWrapperProps;
}) {
  return (
    <Tabs
      defaultValue="tab-1"
      orientation="vertical"
      className="flex w-full gap-2"
    >
      <TabsList className="flex-col justify-start">
        {tabs.map((tab, index) => (
          <TabsTrigger value={`tab-${index + 1}`} key={`tab-${index + 1}`}>
            {tab.tabTitle}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grow text-start min-h-[calc(100vh-8rem)]">
        {tabs.map((tab, index) => (
          <TabsContent value={`tab-${index + 1}`} key={`tab-${index + 1}`}>
            {tab.tabContent}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
