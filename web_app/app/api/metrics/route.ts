import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

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
        date: "desc",
      },
    });

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
