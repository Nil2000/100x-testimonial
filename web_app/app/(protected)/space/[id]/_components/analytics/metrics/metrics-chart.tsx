import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Metric } from "@/lib/types";
import React from "react";
import { Card } from "@/components/ui/card";

type Props = {
  chartData: Metric[];
};

export default function MetricsChart({ chartData }: Props) {
  const areaChartConfig: ChartConfig = {
    pageViews: {
      label: "Total Page Views",
      color: "hsl(var(--chart-1))",
    },
    visitors: {
      label: "Total Visitors",
      color: "hsl(var(--chart-2))",
    },
  };
  return (
    <Card className="shadow-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-chart-1"></div>
          <h3 className="text-sm font-semibold">
            Page Views & Visitors Over Time
          </h3>
        </div>
        <ChartContainer config={areaChartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              bottom: 0,
            }}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              interval={"equidistantPreserveStart"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis tickLine={false} axisLine={true} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={areaChartConfig.pageViews.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={areaChartConfig.pageViews.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={areaChartConfig.visitors.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={areaChartConfig.visitors.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="pageViews"
              type="monotone"
              fill="url(#fillPageViews)"
              fillOpacity={0.4}
              stroke={areaChartConfig.pageViews.color}
            />
            <Area
              dataKey="visitors"
              type="monotone"
              fill="url(#fillVisitors)"
              fillOpacity={0.4}
              stroke={areaChartConfig.visitors.color}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
