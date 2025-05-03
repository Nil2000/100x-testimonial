import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { MetricsResponse } from "@/lib/types";
import React from "react";

type Props = {
  chartData: MetricsResponse[];
};

const chartConfig: ChartConfig = {
  pageViews: {
    label: "Total Page Views",
    color: "hsl(var(--chart-1))",
  },
  visitors: {
    label: "Total Visitors",
    color: "hsl(var(--chart-2))",
  },
  completedActions: {
    label: "Completed Actions",
    color: "hsl(var(--chart-3))",
  },
};

export default function MetricsChart({ chartData }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full pt-2 pr-4"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={6}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
          interval={"equidistantPreserveStart"}
        />
        <YAxis
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          tickFormatter={(value) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}k`;
            }
            return value;
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <defs>
          <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.pageViews.color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={chartConfig.pageViews.color}
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.visitors.color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={chartConfig.visitors.color}
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillActions" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.completedActions.color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={chartConfig.completedActions.color}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="pageViews"
          type="natural"
          fill="url(#fillPageViews)"
          fillOpacity={0.4}
          stroke={chartConfig.pageViews.color}
        />
        <Area
          dataKey="visitors"
          type="natural"
          fill="url(#fillVisitors)"
          fillOpacity={0.4}
          stroke={chartConfig.visitors.color}
        />
        <Area
          dataKey="completedActions"
          type="natural"
          fill="url(#fillActions)"
          fillOpacity={0.4}
          stroke={chartConfig.completedActions.color}
        />
      </AreaChart>
    </ChartContainer>
  );
}
