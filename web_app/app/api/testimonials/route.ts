import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const category = params.get("category") as "TEXT" | "VIDEO" | "SPAM" | "X";
  const spaceId = params.get("spaceId");
  const addToWallOfLove = params.get("addToWallOfLove");

  if (!spaceId) {
    return NextResponse.json({ error: "SpaceId is required" }, { status: 400 });
  }

  try {
    let feedbacks;

    if (category && category === "X") {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          source: "X",
        },
      });
      feedbacks.map((feedback) => {
        console.log(feedback.metadata);
      });
      return NextResponse.json(feedbacks);
    }

    if (category && category !== "SPAM") {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          feedbackType: category,
        },
      });
      return NextResponse.json(feedbacks);
    }

    if (category && category === "SPAM") {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          isSpam: true,
        },
      });
      return NextResponse.json(feedbacks);
    }

    if (addToWallOfLove) {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          addToWallOfLove: addToWallOfLove === "true",
        },
      });
      return NextResponse.json(feedbacks);
    }

    feedbacks = await db.feedback.findMany({
      where: {
        spaceId: spaceId,
      },
    });
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
