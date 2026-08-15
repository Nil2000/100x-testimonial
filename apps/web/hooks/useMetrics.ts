import { Metric } from "@/lib/types";
import React from "react";

export function useMetrics() {
  const [metrics, setMetrics] = React.useState<Metric[]>([]);
  const [totalPageViewMetrics, setTotalPageViewMetrics] =
    React.useState<number>(0);
  const [totalUniqueVisitorMetrics, setTotalUniqueVisitorMetrics] =
    React.useState<number>(0);
  const [totalSpecialCount, setTotalSpecialCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);

  const fetchMetrics = async (
    pageType: string,
    dayUpperLimit: string,
    spaceId: string
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/metrics?spaceId=${spaceId}&days=${dayUpperLimit}&page=${pageType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      const data = await response.json();
      setMetrics(data.metrics);
      setTotalPageViewMetrics(data.totalPageViews);
      setTotalUniqueVisitorMetrics(data.totalVisitors);
      setTotalSpecialCount(data.countMetric);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    loading,
    fetchMetrics,
    totalPageViewMetrics,
    totalUniqueVisitorMetrics,
    totalSpecialCount,
  };
}
