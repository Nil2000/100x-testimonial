import SelectWrapper from "@/components/dropdown-wrapper";
import {
  DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS,
  DROPDOWN_ANALYTICS_PAGE_OPTIONS,
} from "@/lib/constants";
import React from "react";
import MetricsCard from "./analytics-subcomponent/metrics-card";
import { BookOpenCheck, Clock, Eye, Users2 } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";
import axios from "axios";
import { MetricsResponse } from "@/lib/types";
import MetricsChart from "./analytics-subcomponent/metrics-chart";
import Loading from "@/components/loader";
import { Card } from "@/components/ui/card";
import MetricsContainer from "./analytics-subcomponent/metrics-container";

export default function AnalyticsTabView() {
  const [selectedPage, setSelectedPage] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
  );
  const [selectedDate, setSelectedDate] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[1].value
  );

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex sm:justify-end justify-center gap-x-2">
        <SelectWrapper
          defaultValue={DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value}
          listOfItems={DROPDOWN_ANALYTICS_PAGE_OPTIONS}
          placeholder="Select one"
          onChange={(value) => {
            setSelectedPage(value);
          }}
        />
        <SelectWrapper
          defaultValue={DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[1].value}
          listOfItems={DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS}
          placeholder="Select one"
          onChange={(value) => {
            setSelectedDate(value);
          }}
        />
      </div>
      <MetricsContainer pageTitle={selectedPage} dateRange={selectedDate} />
    </div>
  );
}
