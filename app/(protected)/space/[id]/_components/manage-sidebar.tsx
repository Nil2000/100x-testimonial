import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AccordionMenuList from "./accordion-menu-list";
import { manageTestimonialsSidebarElements } from "./constants";

export default function ManageSidebar() {
  return (
    <Tabs
      defaultValue="All"
      orientation="vertical"
      className="flex w-full gap-2 flex-col sm:flex-row"
    >
      <TabsList className="flex-col justify-start sm:w-44 mx-auto w-full">
        <AccordionMenuList items={manageTestimonialsSidebarElements} />
      </TabsList>
      <div className="grow rounded-lg border border-border text-start min-h-[calc(100vh-8rem)]">
        {/* <TabsContent value={`tab-1`}>Tab 1 content</TabsContent>
        <TabsContent value={`tab-2`}>Tab 2 content</TabsContent>
        <TabsContent value={`tab-3`}>Tab 3 content</TabsContent> */}

        {manageTestimonialsSidebarElements.map((element, index) => (
          <div key={`tab-${element.header}`}>
            {element.contents.map((content) => {
              return (
                <TabsContent
                  value={`${content.title}`}
                  key={`tabcontent-${content.title}`}
                >
                  {content.tabContent}
                </TabsContent>
              );
            })}
          </div>
        ))}
      </div>
    </Tabs>
  );
}
