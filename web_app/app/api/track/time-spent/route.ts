import { METRIC_PAGE } from "@/lib/constants";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { space_id, page, timeSpent } = await request.json();

  if (!space_id) {
    return new NextResponse("Space id is required", { status: 400 });
  }

  if (!page) {
    return new NextResponse("Page is required", { status: 400 });
  }

  if (page !== METRIC_PAGE.WALL_PAGE) {
    return new NextResponse("Invalid page", { status: 400 });
  }

  if (!timeSpent) {
    return new NextResponse("Time spent is required", { status: 400 });
  }

  if (typeof timeSpent !== "number" || timeSpent < 0) {
    return new NextResponse("Time spent invalid", { status: 400 });
  }

  try {
    const spaceExists = await db.space.findUnique({
      where: {
        id: space_id,
      },
    });

    if (!spaceExists) {
      return new NextResponse("Space not found", { status: 404 });
    }

    // Normalize date to the start of the day
    const today = new Date(Date.now());
    today.setUTCHours(0, 0, 0, 0);

    let dateData = await db.metricsDate.findUnique({
      where: {
        date: today,
      },
    });

    if (!dateData) {
      dateData = await db.metricsDate.create({
        data: {
          date: today,
        },
      });
    }

    await db.wallOfLoveMetrics.upsert({
      where: {
        spaceId_dateId: {
          dateId: dateData.id,
          spaceId: space_id,
        },
      },
      create: {
        dateId: dateData.id,
        spaceId: space_id,
        pageViews: 1,
        visitors: 1,
        timeSpentOnWallOfLove: timeSpent,
      },
      update: {
        timeSpentOnWallOfLove: { increment: timeSpent },
      },
    });

    return NextResponse.json({ message: "Metrics updated successfully" });
  } catch (error) {
    console.error("Error updating metrics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
