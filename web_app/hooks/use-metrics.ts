import { MetricsResponse } from "@/lib/types";
import axios from "axios";
import React from "react";

export function useMetrics() {
  const [metrics, setMetrics] = React.useState<MetricsResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchMetrics = async (
    pageTitle: string,
    dayUpperLimit: string,
    spaceId: string
  ) => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(
        `/api/metrics?limit_days=${dayUpperLimit}&space_id=${spaceId}&page=${pageTitle}`
      );
      setMetrics(response.data.metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const trackPageView = async (spaceId: string, page: string) => {
    try {
      await axios.post(`/api/track/page-view`, { space_id: spaceId, page });
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  };

  const trackUniqueVisitor = async (spaceId: string, page: string) => {
    try {
      await axios.post(`/api/track/unique-visitor`, {
        space_id: spaceId,
        page,
      });
    } catch (error) {
      console.error("Error tracking unique visitor:", error);
    }
  };

  const trackAction = async (spaceId: string, page: string) => {
    try {
      await axios.post(`/api/track/action`, { space_id: spaceId, page });
    } catch (error) {
      console.error("Error tracking action:", error);
    }
  };

  const trackTimeSpent = async (
    spaceId: string,
    page: string,
    timeSpent: number
  ) => {
    try {
      await axios.post(`/api/track/time-spent`, {
        space_id: spaceId,
        page,
        timeSpent,
      });
    } catch (error) {
      console.error("Error tracking time spent:", error);
    }
  };

  const totalPageViews = metrics.reduce((acc, item) => acc + item.pageViews, 0);
  const totalVisitors = metrics.reduce((acc, item) => acc + item.visitors, 0);
  const totalCompletedActions = metrics.reduce(
    (acc, item) => acc + item.completedActions! || 0,
    0
  );
  const totalTimeSpent = metrics.reduce(
    (acc, item) => acc + item.timeSpentOnWallOfLove! || 0,
    0
  );

  return {
    metrics,
    loading,
    fetchMetrics,
    trackPageView,
    trackUniqueVisitor,
    trackAction,
    trackTimeSpent,
    totalPageViews,
    totalVisitors,
    totalCompletedActions,
    totalTimeSpent,
  };
}
