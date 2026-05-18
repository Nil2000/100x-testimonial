"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { TabItem } from "./tab-item.types";

type HorizontalTabsLayoutProps = {
  tabs: TabItem[];
  defaultValue?: string;
  getContentClassName?: (tab: TabItem) => string | undefined;
};

export default function HorizontalTabsLayout({
  tabs,
  defaultValue,
  getContentClassName,
}: HorizontalTabsLayoutProps) {
  const initialTab = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs defaultValue={initialTab} className="w-full">
      <div className="relative">
        <TabsList className="h-auto w-full justify-start gap-1 rounded-none border-b bg-transparent p-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "relative rounded-none border-b-2 border-transparent bg-transparent px-4 py-3",
                  "text-muted-foreground hover:text-foreground",
                  "data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                  "transition-all duration-200",
                )}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={cn(
            "mt-4 min-h-[calc(100vh-14rem)] animate-in fade-in-50 duration-300",
            getContentClassName?.(tab),
          )}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
