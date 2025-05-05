import { METRIC_PAGE } from "@/lib/constants";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { space_id, page } = await request.json();

  if (!space_id) {
    return new NextResponse("Space id is required", { status: 400 });
  }

  if (!page) {
    return new NextResponse("Page is required", { status: 400 });
  }

  if (page !== METRIC_PAGE.REQ_PAGE) {
    return new NextResponse("Invalid page", { status: 400 });
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

    let createData = {
      dateId: dateData.id,
      spaceId: space_id,
      pageViews: 0,
      visitors: 0,
      completedActions: 1,
    };

    await db.requestTestimonialMetrics.upsert({
      where: {
        spaceId_dateId: {
          dateId: dateData.id,
          spaceId: space_id,
        },
      },
      create: createData,
      update: {
        completedActions: { increment: 1 },
      },
    });

    return NextResponse.json({ message: "Metrics updated successfully" });
  } catch (error) {
    console.error("Error updating metrics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
