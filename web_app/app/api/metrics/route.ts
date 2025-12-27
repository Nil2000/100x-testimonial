/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import { METRIC_PAGE, POSTHOG_METRIC_EVENTS } from "@/lib/constants";
import { db } from "@/lib/db";
import { postHogExecQuery } from "@/lib/posthogUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const params = req.nextUrl.searchParams;
  const spaceId = params.get("spaceId");
  const days = params.get("days");
  const page = params.get("page");

  if (!spaceId) {
    return NextResponse.json(
      { error: "spaceId is required" },
      {
        status: 400,
      }
    );
  }

  if (!days) {
    return NextResponse.json(
      { error: "days is required" },
      {
        status: 400,
      }
    );
  }

  if (
    !page ||
    (page !== METRIC_PAGE.REQ_PAGE && page !== METRIC_PAGE.WALL_PAGE)
  ) {
    return NextResponse.json(
      { error: "event is required" },
      {
        status: 400,
      }
    );
  }

  try {
    const spaceExists = await db.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!spaceExists) {
      return NextResponse.json(
        { error: "Space not found" },
        {
          status: 404,
        }
      );
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${spaceExists.name}${
      page === METRIC_PAGE.WALL_PAGE ? "/wall-of-love" : ""
    }`;
    console.log("url", url);
    const pageViewMetricResponse = await postHogExecQuery(
      days,
      POSTHOG_METRIC_EVENTS.PAGE_VIEW,
      url
    );
    console.log("pageViewMetricResponse", pageViewMetricResponse);

    if (!pageViewMetricResponse) {
      return NextResponse.json(
        { error: "Unable to fetch page view metrics." },
        {
          status: 500,
        }
      );
    }

    const uniqueVisitorMetricResponse = await postHogExecQuery(
      days,
      POSTHOG_METRIC_EVENTS.UNIQUE_VISITORS,
      url
    );
    console.log("uniqueVisitorMetricResponse", uniqueVisitorMetricResponse);

    if (!uniqueVisitorMetricResponse) {
      return NextResponse.json(
        { error: "Unable to fetch unique visitor metrics." },
        {
          status: 500,
        }
      );
    }

    let countMetric;
    if (page === METRIC_PAGE.REQ_PAGE) {
      const completedTestimonialResponse = await postHogExecQuery(
        days,
        POSTHOG_METRIC_EVENTS.COMPLETED_TESTIMONIAL,
        url
      );

      console.log("completedTestimonialResponse", completedTestimonialResponse);

      if (!completedTestimonialResponse) {
        return NextResponse.json(
          { error: "Unable to fetch completed testimonial metrics." },
          {
            status: 500,
          }
        );
      }

      countMetric = completedTestimonialResponse[0].data.reduce(
        (acc: number, item: number) => acc + item,
        0
      );
    } else {
      const timeSpentResponse = await postHogExecQuery(
        days,
        POSTHOG_METRIC_EVENTS.TIME_SPENT_ON_WALL_OF_LOVE,
        url
      );
      console.log("timeSpentResponse", timeSpentResponse);
      if (!timeSpentResponse) {
        return NextResponse.json(
          { error: "Unable to fetch time spent metrics." },
          {
            status: 500,
          }
        );
      }

      countMetric = timeSpentResponse.reduce(
        (acc: number, item: any[]) => acc + (item[1] ?? 0),
        0
      );
    }

    const combinedMetrics = [];
    for (let i = 0; i < pageViewMetricResponse[0].data.length; i++) {
      // totalPageViews += pageViewMetricResponse[0].data[i];
      // totalVisitors += uniqueVisitorMetricResponse[0].data[i];
      combinedMetrics.push({
        date: pageViewMetricResponse[0].labels[i],
        pageViews: pageViewMetricResponse[0].data[i],
        visitors: uniqueVisitorMetricResponse[0].data[i],
      });
    }

    return NextResponse.json(
      {
        metrics: combinedMetrics,
        totalPageViews: pageViewMetricResponse[0].count,
        totalVisitors: uniqueVisitorMetricResponse[0].count,
        countMetric,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching PostHog data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
