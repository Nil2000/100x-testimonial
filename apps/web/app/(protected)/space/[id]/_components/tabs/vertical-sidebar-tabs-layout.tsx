"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { TabItem } from "./tab-item.types";

type VerticalSidebarTabsLayoutProps = {
  tabs: TabItem[];
  defaultValue?: string;
  showContentHeader?: boolean;
};

export default function VerticalSidebarTabsLayout({
  tabs,
  defaultValue,
  showContentHeader = true,
}: VerticalSidebarTabsLayoutProps) {
  const initialTab = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs
      defaultValue={initialTab}
      orientation="vertical"
      className="flex w-full flex-col gap-6 lg:flex-row"
    >
      <div className="w-full flex-shrink-0 lg:w-64">
        <div className="overflow-x-auto pb-2 lg:overflow-x-visible lg:pb-0">
          <TabsList className="flex h-auto w-max gap-1 rounded-lg bg-muted/50 p-1.5 lg:w-full lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "justify-start gap-3 whitespace-nowrap rounded-md px-3 py-2.5",
                    "w-auto text-left text-muted-foreground lg:w-full",
                    "hover:bg-background hover:text-foreground",
                    "data-[state=active]:bg-background data-[state=active]:text-foreground",
                    "data-[state=active]:shadow-sm",
                    "transition-all duration-200",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                  <div className="flex min-w-0 flex-col items-start">
                    <span className="w-full truncate text-sm font-medium">
                      {tab.label}
                    </span>
                    {tab.description && (
                      <span className="mt-0.5 hidden w-full truncate text-xs text-muted-foreground/70 lg:block">
                        {tab.description}
                      </span>
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-0 animate-in fade-in-50 slide-in-from-right-2 duration-300 lg:mt-0"
          >
            {showContentHeader ? (
              <div className="rounded-lg border bg-card p-4 md:p-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-lg font-semibold">{tab.label}</h2>
                  {tab.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tab.description}
                    </p>
                  )}
                </div>
                {tab.content}
              </div>
            ) : (
              tab.content
            )}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
