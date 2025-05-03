import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { createId } from "@paralleldrive/cuid2";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const limit_days = params.get("limit_days");
  const space_id = params.get("space_id");

  if (!limit_days) {
    return NextResponse.json(
      { error: "limit_days is required" },
      { status: 400 }
    );
  }

  if (!space_id) {
    return NextResponse.json(
      { error: "space_id is required" },
      { status: 400 }
    );
  }

  try {
    const space = await db.space.findUnique({
      where: {
        id: space_id,
        createdById: session.user.id,
      },
    });

    if (!space) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const metrics = await db.dailyMetrics.findMany({
      where: {
        spaceId: space_id,
        date: {
          gte: new Date(
            new Date().setDate(new Date().getDate() - parseInt(limit_days))
          ),
        },
        space: {
          createdById: session.user.id,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Fill in missing days with zero values
    const filledMetrics = fillMissingDays(metrics, parseInt(limit_days));

    return NextResponse.json({ metrics: filledMetrics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Fill in missing days in metrics data with zero values
 * @param metrics The metrics data from the database
 * @param limitDays Number of days to look back
 * @returns An array of metrics with all days filled in
 */
function fillMissingDays(metrics: any[], limitDays: number) {
  // Create a map of existing metrics by date string
  const metricsByDate = new Map();
  metrics.forEach((metric) => {
    const dateStr = new Date(metric.date).toISOString().split("T")[0];
    metricsByDate.set(dateStr, metric);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - limitDays);

  const filledMetrics = [];
  const currentDate = new Date(startDate);

  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split("T")[0];

    if (metricsByDate.has(dateStr)) {
      const metric = metricsByDate.get(dateStr);
      filledMetrics.push({
        ...metric,
        date: dateStr,
      });
    } else {
      filledMetrics.push({
        id: createId(),
        spaceId: metrics.length > 0 ? metrics[0].spaceId : "",
        date: dateStr,
        pageViews: 0,
        visitors: 0,
        completedActions: 0,
        timeSpentOnWallOfLove: 0,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  metricsByDate.clear(); // Clear the map to free up memory

  return filledMetrics;
}
