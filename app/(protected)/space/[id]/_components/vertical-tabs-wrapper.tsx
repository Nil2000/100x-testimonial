"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TestimonialView from "./testimonial-view";
import ThankYouView from "./thankyou-view";
import PublishView from "./publish-view";

export default function VerticalTabsWrapper() {
  return (
    <Tabs
      defaultValue="tab-1"
      orientation="vertical"
      className="flex w-full gap-2"
    >
      <TabsList className="flex-col justify-start">
        <TabsTrigger value="tab-1" className="w-full hover:bg-primary/5">
          Testimonial view
        </TabsTrigger>
        <TabsTrigger value="tab-2" className="w-full hover:bg-primary/5">
          Thank you view
        </TabsTrigger>
        <TabsTrigger value="tab-3" className="w-full hover:bg-primary/5">
          Publish view
        </TabsTrigger>
      </TabsList>
      <div className="grow rounded-lg border border-border text-start min-h-[calc(100vh-8rem)]">
        <TabsContent value="tab-1">
          <TestimonialView />
        </TabsContent>
        <TabsContent value="tab-2">
          <ThankYouView />
        </TabsContent>
        <TabsContent value="tab-3">
          <PublishView />
        </TabsContent>
      </div>
    </Tabs>
  );
}
