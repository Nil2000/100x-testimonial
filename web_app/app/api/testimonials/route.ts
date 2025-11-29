import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const category = params.get("category") as
    | "TEXT"
    | "VIDEO"
    | "SPAM"
    | "X"
    | "LINKEDIN"
    | "INSTAGRAM";
  const spaceId = params.get("spaceId");
  const addToWallOfLove = params.get("addToWallOfLove");
  const isSocial = params.get("isSocial");
  const archived = params.get("archived");

  if (!spaceId) {
    return NextResponse.json({ error: "SpaceId is required" }, { status: 400 });
  }

  try {
    let feedbacks;

    // Handle social testimonials with optional platform filtering
    if (isSocial === "true") {
      const whereClause: any = {
        spaceId: spaceId,
        isSocial: true,
      };

      // If category is specified for social testimonials, filter by platform
      if (category && ["X", "LINKEDIN", "INSTAGRAM"].includes(category)) {
        whereClause.source = category;
      }

      feedbacks = await db.feedback.findMany({
        where: whereClause,
      });
      return NextResponse.json(feedbacks);
    }

    // Handle spam testimonials
    if (category && category === "SPAM") {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          isSpam: true,
          isSocial: false, // Exclude social testimonials from spam view
        },
      });
      return NextResponse.json(feedbacks);
    }

    // Handle wall of love testimonials
    if (addToWallOfLove) {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          addToWallOfLove: addToWallOfLove === "true",
          isSocial: false, // Exclude social testimonials from wall of love by default
        },
      });
      return NextResponse.json(feedbacks);
    }

    // Handle specific feedback type categories (TEXT, VIDEO)
    if (category && (category === "TEXT" || category === "VIDEO")) {
      feedbacks = await db.feedback.findMany({
        where: {
          spaceId: spaceId,
          feedbackType: category,
          isSocial: false, // Exclude social testimonials
        },
      });
      return NextResponse.json(feedbacks);
    }

    // Default case: get all non-social testimonials
    feedbacks = await db.feedback.findMany({
      where: {
        spaceId: spaceId,
        isSocial: false, // Exclude social testimonials by default
      },
    });

    console.log(feedbacks);
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
