import SelectWrapper from "@/components/dropdown-wrapper";
import { DROPDOWN_ANALYTICS_PAGE_OPTIONS } from "@/lib/constants";
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

export default function AnalyticsTabView() {
  const [selectedPage, setSelectedPage] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
  );
  const chartData = [
    {
      date: "2025-04-26",
      total_pageviews: 1000,
      total_visitors: 200,
      completed_actions: 50,
    },

    {
      date: "2025-04-28",
      total_pageviews: 967,
      total_visitors: 192,
      completed_actions: 46,
    },
    {
      date: "2025-04-29",
      total_pageviews: 1054,
      total_visitors: 213,
      completed_actions: 51,
    },
    {
      date: "2025-04-30",
      total_pageviews: 1132,
      total_visitors: 225,
      completed_actions: 58,
    },
    {
      date: "2025-05-01",
      total_pageviews: 873,
      total_visitors: 176,
      completed_actions: 42,
    },
    {
      date: "2025-05-02",
      total_pageviews: 912,
      total_visitors: 185,
      completed_actions: 44,
    },
    {
      date: "2025-05-03",
      total_pageviews: 798,
      total_visitors: 165,
      completed_actions: 39,
    },
    {
      date: "2025-05-04",
      total_pageviews: 845,
      total_visitors: 172,
      completed_actions: 41,
    },
    {
      date: "2025-05-05",
      total_pageviews: 1089,
      total_visitors: 219,
      completed_actions: 55,
    },
    {
      date: "2025-05-06",
      total_pageviews: 1156,
      total_visitors: 231,
      completed_actions: 60,
    },
    {
      date: "2025-05-07",
      total_pageviews: 1032,
      total_visitors: 207,
      completed_actions: 49,
    },
  ];
  const chartConfig: ChartConfig = {
    total_pageviews: {
      label: "Total Page Views",
      color: "hsl(var(--chart-1))",
    },
    total_visitors: {
      label: "Total Visitors",
      color: "hsl(var(--chart-2))",
    },
    completed_actions: {
      label: "Completed Actions",
      color: "hsl(var(--chart-3))",
    },
  };

  // Calculate totals for metric cards
  const totalPageViews = chartData.reduce(
    (acc, item) => acc + item.total_pageviews,
    0
  );
  const totalVisitors = chartData.reduce(
    (acc, item) => acc + item.total_visitors,
    0
  );
  const totalCompletedActions = chartData.reduce(
    (acc, item) => acc + item.completed_actions,
    0
  );

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
      <div>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.total_pageviews.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.total_pageviews.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.total_visitors.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.total_visitors.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillActions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.completed_actions.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.completed_actions.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="total_pageviews"
              type="natural"
              fill="url(#fillPageViews)"
              fillOpacity={0.4}
              stroke={chartConfig.total_pageviews.color}
            />
            <Area
              dataKey="total_visitors"
              type="natural"
              fill="url(#fillVisitors)"
              fillOpacity={0.4}
              stroke={chartConfig.total_visitors.color}
            />
            <Area
              dataKey="completed_actions"
              type="natural"
              fill="url(#fillActions)"
              fillOpacity={0.4}
              stroke={chartConfig.completed_actions.color}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
