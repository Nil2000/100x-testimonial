import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import React from "react";
import AccordionMenuList from "./accordion-menu-list";
import { manageTestimonialsSidebarElements } from "./constants";

export default function ManageSidebar() {
  const [feedbackInfo, setFeedbackInfo] = React.useState<any>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = React.useState(false);
  return (
    <Tabs
      defaultValue="All"
      orientation="vertical"
      className="flex w-full gap-2 flex-col sm:flex-row"
    >
      <TabsList className="flex-col justify-start sm:w-44 mx-auto w-full">
        <AccordionMenuList items={manageTestimonialsSidebarElements} />
      </TabsList>
      <div className="grow rounded-lg text-start min-h-[calc(100vh-8rem)]">
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
