import { getUserPlanInfo } from "@/lib/accessControl";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PLAN_LIMITS } from "@/lib/subscription";
import { NextRequest, NextResponse } from "next/server";
import { FeedbackType, PlanType } from "@/generated/prisma/enums";

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
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!spaceId) {
    return NextResponse.json({ error: "SpaceId is required" }, { status: 400 });
  }
  
  const userPlanInfo = await getUserPlanInfo(session.user.id);

  if (!userPlanInfo) {
    console.error("Error retrieving plan info");
    return NextResponse.json(
      { error: "Error retrieving plan info" },
      { status: 404 }
    );
  }

  const planLimits = PLAN_LIMITS[userPlanInfo.plan as PlanType];
  const textLimit = planLimits.textTestimonialsPerSpace;
  const videoLimit = planLimits.videoFeedbacksPerSpace;
  const resolveLimit = (limit: number) => (limit === -1 ? undefined : limit);

  const respond = (records: unknown, meta: Record<string, unknown>) =>
    NextResponse.json({ records, meta });

  try {

    // Handle archived testimonials
    if (archived === "true") {
      const where = {
        spaceId: spaceId,
        isArchived: true,
      };
      const [records, total] = await Promise.all([
        db.feedback.findMany({
          where,
          orderBy: {
            createdAt: "asc",
          },
        }),
        db.feedback.count({ where }),
      ]);

      return respond(records, { total });
    }

    // Handle social testimonials with optional platform filtering
    if (isSocial === "true") {
      const whereClause: Record<string, string | boolean | undefined> = {
        spaceId: spaceId,
        isSocial: true,
        isArchived: false,
      };

      // If category is specified for social testimonials, filter by platform
      if (category && ["X", "LINKEDIN", "INSTAGRAM"].includes(category)) {
        whereClause.source = category;
      }

      const [records, total] = await Promise.all([
        db.feedback.findMany({
          where: whereClause,
          orderBy: {
            createdAt: "asc",
          },
        }),
        db.feedback.count({ where: whereClause }),
      ]);

      return respond(records, { total });
    }

    // Handle spam testimonials
    if (category && category === "SPAM") {
      const where = {
        spaceId: spaceId,
        isSpam: true,
        isSocial: false, // Exclude social testimonials from spam view
        isArchived: false,
      };
      const [records, total] = await Promise.all([
        db.feedback.findMany({
          where,
          orderBy: {
            createdAt: "asc",
          },
        }),
        db.feedback.count({ where }),
      ]);

      return respond(records, { total });
    }

    // Handle wall of love testimonials
    if (addToWallOfLove) {
      const where = {
        spaceId: spaceId,
        addToWallOfLove: addToWallOfLove === "true",
        isSocial: false, // Exclude social testimonials from wall of love by default
        isArchived: false,
      };
      const [records, total] = await Promise.all([
        db.feedback.findMany({
          where,
          orderBy: {
            createdAt: "asc",
          },
        }),
        db.feedback.count({ where }),
      ]);

      return respond(records, { total });
    }
    const baseWhere = {
      spaceId: spaceId,
      isSocial: false,
      isArchived: false,
    };

    if (category && category === "TEXT") {
      const where = {
        ...baseWhere,
        feedbackType: FeedbackType.TEXT,
      };
      const [records, total] = await Promise.all([
        db.feedback.findMany({
          where,
          orderBy: {
            createdAt: "asc",
          },
          take: resolveLimit(textLimit),
        }),
        db.feedback.count({ where }),
      ]);

      return respond(records, { text: { total } });
    }

    if (category && category === "VIDEO") {
      const where = {
        ...baseWhere,
        feedbackType: FeedbackType.VIDEO,
      };
      const [records, total] = await Promise.all([
        db.feedback.findMany({
          where,
          orderBy: {
            createdAt: "asc",
          },
          take: resolveLimit(videoLimit),
        }),
        db.feedback.count({ where }),
      ]);

      return respond(records, { video: { total } });
    }

    const [textRecords, textTotal, videoRecords, videoTotal] =
      await Promise.all([
        db.feedback.findMany({
          where: {
            ...baseWhere,
            feedbackType: FeedbackType.TEXT,
          },
          orderBy: {
            createdAt: "asc",
          },
          take: resolveLimit(textLimit),
        }),
        db.feedback.count({
          where: {
            ...baseWhere,
            feedbackType: FeedbackType.TEXT,
          },
        }),
        db.feedback.findMany({
          where: {
            ...baseWhere,
            feedbackType: FeedbackType.VIDEO,
          },
          orderBy: {
            createdAt: "asc",
          },
          take: resolveLimit(videoLimit),
        }),
        db.feedback.count({
          where: {
            ...baseWhere,
            feedbackType: FeedbackType.VIDEO,
          },
        }),
      ]);

    const records = [...textRecords, ...videoRecords].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return respond(records, {
      text: { total: textTotal },
      video: { total: videoTotal },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
