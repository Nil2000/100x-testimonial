import { POSTHOG_METRIC_EVENTS } from "@/lib/constants";
import { Metric, MetricResponse } from "@/lib/types";
import axios from "axios";
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
      const response = await axios.get(
        `/api/metrics?spaceId=${spaceId}&days=${dayUpperLimit}&page=${pageType}`
      );
      setMetrics(response.data.metrics);
      setTotalPageViewMetrics(response.data.totalPageViews);
      setTotalUniqueVisitorMetrics(response.data.totalVisitors);
      setTotalSpecialCount(response.data.countMetric);
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
