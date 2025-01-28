"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TestimonialView from "./testimonial-view";
import ThankYouView from "./thankyou-view";

export default function VerticalTabsWrapper() {
  return (
    <Tabs
      defaultValue="tab-1"
      orientation="vertical"
      className="flex w-full gap-2"
    >
      <TabsList className="flex-col justify-start">
        <TabsTrigger value="tab-1" className="w-full">
          Testimonial view
        </TabsTrigger>
        <TabsTrigger value="tab-2" className="w-full">
          Thank you view
        </TabsTrigger>
      </TabsList>
      <div className="grow rounded-lg border border-border text-start min-h-[calc(100vh-8rem)]">
        <TabsContent value="tab-1">
          <TestimonialView />
        </TabsContent>
        <TabsContent value="tab-2">
          <ThankYouView />
        </TabsContent>
      </div>
    </Tabs>
  );
}
