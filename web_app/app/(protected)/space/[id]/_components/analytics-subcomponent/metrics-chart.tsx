import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { MetricsResponse } from "@/lib/types";
import React from "react";
import { Card } from "@/components/ui/card";

type Props = {
  chartData: MetricsResponse[];
  pageType: "request" | "wall";
};

const getAreaChartConfig = (): ChartConfig => {
  return {
    pageViews: {
      label: "Total Page Views",
      color: "hsl(var(--chart-1))",
    },
    visitors: {
      label: "Total Visitors",
      color: "hsl(var(--chart-2))",
    },
  };
};

const getBarChartConfig = (pageType: "request" | "wall"): ChartConfig => {
  if (pageType === "request") {
    return {
      completedActions: {
        label: "Completed Testimonials",
        color: "hsl(var(--chart-5))",
      },
    };
  } else {
    return {
      timeSpentOnWallOfLove: {
        label: "Time Spent (seconds)",
        color: "hsl(var(--chart-5))",
      },
    };
  }
};

export default function MetricsChart({ chartData, pageType }: Props) {
  const areaChartConfig = getAreaChartConfig();
  const barChartConfig = getBarChartConfig(pageType);

  // Get the key for the specific metric based on page type
  const specificMetricKey =
    pageType === "request" ? "completedActions" : "timeSpentOnWallOfLove";

  return (
    <div className="space-y-8">
      {/* First Chart: Area Chart for Page Views and Visitors */}
      <div>
        <h3 className="text-md font-medium mb-4">Page Views & Visitors</h3>
        <Card className="pr-4 pt-4">
          <ChartContainer config={areaChartConfig} className="h-[250px] w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                bottom: 12,
              }}
              height={250}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={"equidistantPreserveStart"}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
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
                type="natural"
                fill="url(#fillPageViews)"
                fillOpacity={0.4}
                stroke={areaChartConfig.pageViews.color}
              />
              <Area
                dataKey="visitors"
                type="natural"
                fill="url(#fillVisitors)"
                fillOpacity={0.4}
                stroke={areaChartConfig.visitors.color}
              />
            </AreaChart>
          </ChartContainer>
        </Card>
      </div>

      {/* Second Chart: Bar Chart for Page-Specific Metric */}
      <div>
        <h3 className="text-md font-medium mb-4">
          {pageType === "request"
            ? "Completed Testimonials"
            : "Time Spent on Wall (seconds)"}
        </h3>
        <Card className="pr-4 pt-4">
          <ChartContainer config={barChartConfig} className="h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                bottom: 12,
              }}
              height={100}
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
                interval={"equidistantPreserveStart"}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey={specificMetricKey}
                fill={Object.values(barChartConfig)[0].color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
}
