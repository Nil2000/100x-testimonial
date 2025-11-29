import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

type AccordionMenuListProps = {
  header: string;
  contents: {
    title: string;
    icon: IconType;
    tabContent: React.ReactNode;
  }[];
}[];

export default function AccordionMenuList({
  items,
}: {
  items: AccordionMenuListProps;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-none w-full"
      defaultValue="Inbox"
    >
      {/* {<AccordionItem
        value={header}
        key={header}
        className="border-none px-2 w-full"
      >
        <AccordionTrigger className="text-sm px-3">{header}</AccordionTrigger>
        <AccordionContent className="flex items-center justify-center flex-col">
          {items.map((item) => (
            <TabsTrigger value={item.title} key={item.title} className="w-full">
              <div className="flex gap-2 w-full">
                <item.icon size={20} />
                <span>{item.title}</span>
              </div>
            </TabsTrigger>
          ))}
        </AccordionContent>
      </AccordionItem>} */}
      {items.map((item) => (
        <AccordionItem
          value={item.header}
          key={item.header}
          className="border-none px-2 w-full"
        >
          <AccordionTrigger className="text-sm px-3">
            {item.header}
          </AccordionTrigger>
          <AccordionContent className="flex items-center justify-center flex-col">
            {item.contents.map((content) => (
              <TabsTrigger
                value={content.title}
                key={content.title}
                className="w-full"
              >
                <div className="flex gap-2 w-full">
                  <content.icon size={20} />
                  <h3>{content.title}</h3>
                </div>
              </TabsTrigger>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
