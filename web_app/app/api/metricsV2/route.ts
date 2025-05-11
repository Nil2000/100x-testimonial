import { auth } from "@/lib/auth";
import { POSTHOG_METRIC_EVENTS } from "@/lib/constants";
import { db } from "@/lib/db";
import { postHogExecQuery } from "@/lib/posthog-utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
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
  const event = params.get("event");

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
    !event ||
    event !== POSTHOG_METRIC_EVENTS.COMPLETED_TESTIMONIAL ||
    event !== POSTHOG_METRIC_EVENTS.PAGE_VIEW
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

    const postHogResponse = await postHogExecQuery(days, postHogOptions!);

    if (!postHogResponse) {
      return NextResponse.json(
        { error: "PostHog query failed" },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        data: postHogResponse,
        message: "PostHog query success",
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
