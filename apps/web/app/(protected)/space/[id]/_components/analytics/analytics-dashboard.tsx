"use client";
import SelectWrapper from "@/components/dropdown-wrapper";
import {
  DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS,
  DROPDOWN_ANALYTICS_PAGE_OPTIONS,
} from "@/lib/constants";
import React from "react";
import MetricsContainer from "./metrics/metrics-container";
import { Calendar, FileText, TrendingUp } from "lucide-react";
import { usePlanStore } from "@/store/planStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AnalyticsTabView() {
  const { subscription } = usePlanStore();
  const isFreePlan = (subscription?.plan ?? "FREE") === "FREE";
  const router = useRouter();
  const [selectedPage, setSelectedPage] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
  );
  const [selectedDate, setSelectedDate] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[1].value
  );
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative max-w-7xl mx-auto">
        <div className={cn("space-y-6",isFreePlan ? "pointer-events-none blur-md" : "")}>
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-lg bg-card border shadow-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground">
                Analytics Overview
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <SelectWrapper
                  defaultValue={DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value}
                  listOfItems={DROPDOWN_ANALYTICS_PAGE_OPTIONS}
                  placeholder="Select page"
                  onChange={(value) => {
                    setSelectedPage(value);
                  }}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <SelectWrapper
                  defaultValue={DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[1].value}
                  listOfItems={DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS}
                  placeholder="Select period"
                  onChange={(value) => {
                    setSelectedDate(value);
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Metrics */}
          <MetricsContainer
            pageTitle={selectedPage}
            dateRange={selectedDate}
            changePending={(status) => {
              setIsLoading(status);
            }}
          />
        </div>

        {isFreePlan && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-xl border bg-background/80 p-6 text-center shadow-lg backdrop-blur">
              <h3 className="text-lg font-semibold">Analytics is a Premium feature</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upgrade your plan to unlock analytics and track page views, visitors, and
                conversion metrics.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button onClick={() => router.push("/buy-premium")}>
                  Upgrade to unlock
                </Button>
                <Button variant="outline" onClick={() => router.push("/buy-premium")}>
                  View plans
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
