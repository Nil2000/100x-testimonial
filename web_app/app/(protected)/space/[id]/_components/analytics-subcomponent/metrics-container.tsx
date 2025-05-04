import React from "react";
import MetricsCard from "./metrics-card";
import { BookOpenCheck, Clock, Eye, Users2 } from "lucide-react";
import axios from "axios";
import { useSpaceStore } from "@/store/spaceStore";
import Loading from "@/components/loader";
import { DROPDOWN_ANALYTICS_PAGE_OPTIONS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import MetricsChart from "./metrics-chart";
import { MetricsResponse } from "@/lib/types";
import { useMetrics } from "@/hooks/use-metrics";

type Props = {
  pageTitle: string;
  dateRange: string;
  changePending: (pending: boolean) => void;
};

export default function MetricsContainer({
  pageTitle,
  dateRange,
  changePending,
}: Props) {
  const { spaceInfo } = useSpaceStore();
  const {
    fetchMetrics,
    loading,
    totalCompletedActions,
    totalPageViews,
    totalTimeSpent,
    totalVisitors,
    metrics,
  } = useMetrics();

  const fetchMetricsData = async () => {
    changePending(true);
    fetchMetrics(pageTitle, dateRange, spaceInfo?.id || "")
      .catch((error) => {
        console.error("Error fetching metrics:", error);
        changePending(false);
      })
      .finally(() => {
        changePending(false);
      });
  };

  React.useEffect(() => {
    fetchMetricsData();
  }, [dateRange, pageTitle]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="grid sm:grid-rows-1 sm:grid-cols-3 grid-cols-1 gap-4">
        <MetricsCard
          icon={Eye}
          title="Total Page Views"
          value={totalPageViews.toLocaleString()}
        />
        <MetricsCard
          icon={Users2}
          title="Total Visitors"
          value={totalVisitors.toLocaleString()}
        />
        {pageTitle === DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value ? (
          <MetricsCard
            icon={BookOpenCheck}
            title="Completed Action"
            value={totalCompletedActions.toLocaleString()}
          />
        ) : (
          <MetricsCard
            icon={Clock}
            title="Total Time Spent"
            value={totalTimeSpent.toLocaleString()}
          />
        )}
      </div>
      <div className="w-full p-2">
        <MetricsChart
          chartData={metrics}
          pageType={
            pageTitle === DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
              ? "request"
              : "wall"
          }
        />
      </div>
    </>
  );
}
