import axios from "axios";

export const generateQuery = (days: string, options: object) => {
  return {
    query: {
      kind: "TrendsQuery",
      series: [
        {
          kind: "EventsNode",
          // math: "total",
          // name: "completed-testimonial",
          // event: "completed-testimonial",
          ...options,
        },
      ],
      interval: "day",
      dateRange: {
        date_from: `-${days}d`,
        date_to: null,
        explicitDate: false,
      },
      trendsFilter: {},
    },
    refresh: "blocking",
    filters_override: null,
    variables_override: null,
  };
};

export const postHogExecQuery = async (days: string, options: object) => {
  const posthogResponse = await axios.post(
    process.env.POSTHOG_METRICS_QUERY_URL || "",
    generateQuery(days, options),
    {
      headers: {
        Authorization: `Bearer ${process.env.POSTHOG_QUERY_TOKEN}`,
      },
    }
  );
  if (
    posthogResponse.status !== 200 ||
    posthogResponse.data.results.length === 0
  ) {
    throw new Error("PostHog query failed");
  }
  return posthogResponse.data.results[0];
};
