import axios from "axios";
import { POSTHOG_METRIC_EVENTS } from "./constants";

export const generateOptions = (event: string) => {
  let postHogOptions;

  switch (event) {
    case POSTHOG_METRIC_EVENTS.COMPLETED_TESTIMONIAL:
      postHogOptions = {
        event: "completed-testimonial",
        name: "completed-testimonial",
        math: "total",
      };
      break;
    case POSTHOG_METRIC_EVENTS.PAGE_VIEW:
      postHogOptions = {
        event: "$pageview",
        name: "$pageview",
        math: "total",
      };
      break;
    case POSTHOG_METRIC_EVENTS.UNIQUE_VISITORS:
      postHogOptions = {
        event: "$pageview",
        name: "$pageview",
        math: "dau",
      };
    default:
      break;
  }
  return postHogOptions;
};

const generateQuery = (days: string, event: string, url: string) => {
  if (event === POSTHOG_METRIC_EVENTS.TIME_SPENT_ON_WALL_OF_LOVE) {
    return {
      query: {
        kind: "HogQLQuery",
        query: `WITH session_times as (SELECT\ntoDate(toString(MIN(timestamp))) AS day,\ndateDiff(\n  'second',\n  MIN(CASE WHEN event = '$pageview' THEN timestamp ELSE NULL END),\n  MAX(CASE WHEN event = '$pageleave' THEN timestamp ELSE NULL END)\n) AS session_duration_seconds\nFROM events\nWHERE event IN ['$pageview', '$pageleave'] AND properties.$current_url = '${url}'\nGROUP BY\n$session_id)\n\nSELECT\n  day,\n  SUM(session_duration_seconds) AS total_time_spent_seconds\nFROM session_times\nWHERE day >= today() - ${days}\nGROUP BY day\nORDER BY day ASC`,
        variables: {},
      },
      refresh: "force_blocking",
      filters_override: null,
    };
  }

  return {
    query: {
      kind: "TrendsQuery",
      series: [
        {
          kind: "EventsNode",
          ...generateOptions(event),
          properties: [
            {
              key: "$current_url",
              value: [`${url}`],
              operator: "exact",
              type: "event",
            },
          ],
        },
      ],
      interval: "day",
      dateRange: {
        date_from: `-${days}d`,
        date_to: null,
        explicitDate: false,
      },
      trendsFilter: {
        formulaNodes: [],
      },
    },
    refresh: "blocking",
    filters_override: null,
    variables_override: null,
  };
};

export const postHogExecQuery = async (
  days: string,
  event: string,
  url: string
) => {
  const query = generateQuery(days, event, url);
  // console.log("PostHog query", JSON.stringify(query));
  const posthogResponse = await axios.post(
    process.env.POSTHOG_METRICS_QUERY_URL || "",
    query,
    {
      headers: {
        Authorization: `Bearer ${process.env.POSTHOG_QUERY_TOKEN}`,
      },
    }
  );
  if (posthogResponse.status !== 200) {
    throw new Error("PostHog query failed");
  }
  return posthogResponse.data.results;
};
