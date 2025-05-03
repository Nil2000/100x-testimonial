import SelectWrapper from "@/components/dropdown-wrapper";
import {
  DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS,
  DROPDOWN_ANALYTICS_PAGE_OPTIONS,
} from "@/lib/constants";
import React from "react";
import MetricsCard from "./analytics-subcomponent/metrics-card";
import { BookOpenCheck, Clock, Eye, Users2 } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useSpaceStore } from "@/store/spaceStore";
import axios from "axios";
import { MetricsResponse } from "@/lib/types";
import MetricsChart from "./analytics-subcomponent/metrics-chart";
import Loading from "@/components/loader";

export default function AnalyticsTabView() {
  const [selectedPage, setSelectedPage] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
  );
  const [selectedDate, setSelectedDate] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[0].value
  );
  const { spaceInfo } = useSpaceStore();
  const [metricsData, setMetricsData] = React.useState<MetricsResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  if (loading) {
    return <Loading />;
  }
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
    (acc, item) => acc + item.completedActions,
    0
  );

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          `/api/metrics?limit_days=30&space_id=${spaceInfo.id}`
        );
        setMetricsData(response.data.metrics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex sm:justify-end justify-center">
        <SelectWrapper
          defaultValue={DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value}
          listOfItems={DROPDOWN_ANALYTICS_PAGE_OPTIONS}
          placeholder="Select one"
          onChange={(value) => {
            setSelectedPage(value);
          }}
        />
      </div>
      <div className="grid sm:grid-rows-1 sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
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
        {selectedPage === DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value ? (
          <MetricsCard
            icon={BookOpenCheck}
            title="Completed Action"
            value={totalCompletedActions.toLocaleString()}
          />
        ) : (
          <MetricsCard
            icon={Clock}
            title="Total Time Spent"
            value={totalCompletedActions.toLocaleString()}
          />
        )}
      </div>
      <MetricsChart chartData={metricsData} />
    </div>
  );
}
