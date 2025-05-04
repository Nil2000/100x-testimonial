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
  const [metricsData, setMetricsData] = React.useState<MetricsResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Calculate totals for metric cards
  const totalPageViews = metricsData.reduce(
    (acc, item) => acc + item.pageViews,
    0
  );
  const totalVisitors = metricsData.reduce(
    (acc, item) => acc + item.visitors,
    0
  );
  const totalCompletedActions = metricsData.reduce(
    (acc, item) => acc + item.completedActions! || 0,
    0
  );
  const totalTimeSpent = metricsData.reduce(
    (acc, item) => acc + item.timeSpentOnWallOfLove! || 0,
    0
  );

  const fetchMetrics = async () => {
    changePending(true); // Set pending to true before loading
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(
        `/api/metrics?limit_days=${dateRange}&space_id=${spaceInfo.id}&page=${pageTitle}`
      );
      console.log("Metrics response:", response.data.metrics);
      setMetricsData(response.data.metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
      changePending(false); // Set pending to false after loading
    }
  };

  React.useEffect(() => {
    fetchMetrics();
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
          chartData={metricsData}
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
