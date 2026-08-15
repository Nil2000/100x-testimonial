import { Metric } from "@/lib/types";
import React from "react";
import { toast } from "sonner";

export function useMetrics() {
  const [metrics, setMetrics] = React.useState<Metric[]>([]);
  const [totalPageViewMetrics, setTotalPageViewMetrics] =
    React.useState<number>(0);
  const [totalUniqueVisitorMetrics, setTotalUniqueVisitorMetrics] =
    React.useState<number>(0);
  const [totalSpecialCount, setTotalSpecialCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);

  const fetchMetrics = React.useCallback(
    async (pageType: string, dayUpperLimit: string, spaceId: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/metrics?spaceId=${spaceId}&days=${dayUpperLimit}&page=${pageType}`,
        );
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Metrics are not available for your plan");
          } else {
            throw new Error("Failed to fetch metrics");
          }
        }
        const data = await response.json();
        setMetrics(data.metrics);
        setTotalPageViewMetrics(data.totalPageViews);
        setTotalUniqueVisitorMetrics(data.totalVisitors);
        setTotalSpecialCount(data.countMetric);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    metrics,
    loading,
    fetchMetrics,
    totalPageViewMetrics,
    totalUniqueVisitorMetrics,
    totalSpecialCount,
  };
}
