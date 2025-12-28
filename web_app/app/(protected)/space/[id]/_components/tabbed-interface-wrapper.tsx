"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";

type TabConfig = {
  tabTitle: string;
  tabDescription?: string;
  tabIcon?: LucideIcon | IconType;
  tabContent: React.ReactNode;
};

export default function TabbedInterfaceWrapper({
  tabs,
}: {
  tabs: TabConfig[];
}) {
  return (
    <Tabs
      defaultValue="tab-0"
      orientation="vertical"
      className="flex w-full gap-6 flex-col lg:flex-row"
    >
      {/* Sidebar Navigation */}
      <div className="lg:w-64 flex-shrink-0 w-full">
        <div className="overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          <TabsList className="flex lg:flex-col h-auto w-max lg:w-full bg-muted/50 p-1.5 rounded-lg gap-1">
            {tabs.map((tab, index) => {
              const Icon = tab.tabIcon;
              return (
                <TabsTrigger
                  value={`tab-${index}`}
                  key={`tab-${index}`}
                  className={cn(
                    "justify-start gap-3 px-3 py-2.5 rounded-md whitespace-nowrap",
                    "lg:w-full w-auto",
                    "text-left text-muted-foreground",
                    "hover:bg-background hover:text-foreground",
                    "data-[state=active]:bg-background data-[state=active]:text-foreground",
                    "data-[state=active]:shadow-sm",
                    "transition-all duration-200"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                  <div className="flex flex-col items-start min-w-0">
                    <span className="font-medium text-sm truncate w-full">
                      {tab.tabTitle}
                    </span>
                    {tab.tabDescription && (
                      <span className="text-xs text-muted-foreground/70 truncate w-full hidden lg:block">
                        {tab.tabDescription}
                      </span>
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        {tabs.map((tab, index) => (
          <TabsContent
            value={`tab-${index}`}
            key={`tab-${index}`}
            className="mt-0 lg:mt-0 animate-in fade-in-50 slide-in-from-right-2 duration-300"
          >
            <div className="rounded-lg border bg-card p-4 md:p-6">
              {/* Content Header */}
              <div className="mb-6 pb-4 border-b">
                <h2 className="text-lg font-semibold">{tab.tabTitle}</h2>
                {tab.tabDescription && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {tab.tabDescription}
                  </p>
                )}
              </div>
              {/* Tab Content */}
              {tab.tabContent}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
