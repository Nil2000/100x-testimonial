import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  );
}
