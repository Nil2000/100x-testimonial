import SelectWrapper from "@/components/dropdown-wrapper";
import {
  DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS,
  DROPDOWN_ANALYTICS_PAGE_OPTIONS,
} from "@/lib/constants";
import React from "react";
import MetricsContainer from "./metrics/metrics-container";

export default function AnalyticsTabView() {
  const [selectedPage, setSelectedPage] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_OPTIONS[0].value
  );
  const [selectedDate, setSelectedDate] = React.useState(
    DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[1].value
  );
  const [isLoading, setIsLoading] = React.useState(true);

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
          disabled={isLoading}
        />
        <SelectWrapper
          defaultValue={DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS[1].value}
          listOfItems={DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS}
          placeholder="Select one"
          onChange={(value) => {
            setSelectedDate(value);
          }}
          disabled={isLoading}
        />
      </div>
      <MetricsContainer
        pageTitle={selectedPage}
        dateRange={selectedDate}
        changePending={(status) => {
          setIsLoading(status);
        }}
      />
    </div>
  );
}
