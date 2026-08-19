import React from "react";
import MetricsCard from "./metrics-card";
import { BookOpenCheck, Clock, Eye, Users2 } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";
import { DROPDOWN_ANALYTICS_PAGE_OPTIONS } from "@/lib/constants";
import MetricsChart from "./metrics-chart";
import { useMetrics } from "@/hooks/useMetrics";

type Props = {
  pageTitle: string;
  dateRange: string;
};

export default function MetricsContainer({ pageTitle, dateRange }: Props) {
  const { spaceInfo } = useSpaceStore();
  const {
    fetchMetrics,
    loading,
    metrics,
    totalPageViewMetrics,
    totalSpecialCount,
    totalUniqueVisitorMetrics,
  } = useMetrics();

  React.useEffect(() => {
    void fetchMetrics(pageTitle, dateRange, spaceInfo.id);
  }, [dateRange, pageTitle, spaceInfo.id, fetchMetrics]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricsCard
          icon={Eye}
          title="Total Page Views"
          value={totalPageViewMetrics.toLocaleString()}
        />
        <MetricsCard
          icon={Users2}
          title="Total Visitors"
          value={totalUniqueVisitorMetrics.toLocaleString()}
        />
        {pageTitle === DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value ? (
          <MetricsCard
            icon={BookOpenCheck}
            title="Completed Action"
            value={totalSpecialCount.toLocaleString()}
          />
        ) : (
          <MetricsCard
            icon={Clock}
            title="Total Time Spent"
            value={totalSpecialCount.toLocaleString()}
          />
        )}
      </div>

      {loading ? (
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <div className="h-[200px] w-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Loading metrics...</p>
            </div>
          </div>
        </div>
      ) : (
        <MetricsChart chartData={metrics} />
      )}
    </div>
  );
}
