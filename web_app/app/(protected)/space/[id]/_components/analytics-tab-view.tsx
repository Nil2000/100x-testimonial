import SelectWrapper from "@/components/dropdown-wrapper";
import { DROPDOWN_ANALYTICS_PAGE_OPTIONS } from "@/lib/constants";
import React from "react";
import MetricsCard from "./analytics-subcomponent/metrics-card";
import { Clock, Eye } from "lucide-react";

export default function AnalyticsTabView() {
  const [selectedPage, setSelectedPage] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
  );
  return (
    <div className="w-full">
      <div className="w-full flex justify-end">
        <SelectWrapper
          defaultValue={DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value}
          listOfItems={DROPDOWN_ANALYTICS_PAGE_OPTIONS}
          placeholder="Select one"
          onChange={(value) => {
            setSelectedPage(value);
          }}
        />
      </div>
      <div className="grid grid-rows-1 grid-cols-3 gap-4 mt-4">
        <MetricsCard icon={Eye} title="Total Page Views" value="1,234" />
        <MetricsCard icon={Clock} title="Time on Page" value="5m 30s" />
        <MetricsCard icon={Eye} title="Completed Actions" value="123" />
      </div>
    </div>
  );
}
