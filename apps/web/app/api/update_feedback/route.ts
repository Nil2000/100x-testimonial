import { db } from "@/lib/db";
import { AnalysisStatus, SentimentType } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token || token.length === 0 || token !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!req.body) {
    return NextResponse.json({ error: "No body provided" }, { status: 400 });
  }

  const {
    feedbackId,
    spaceId,
    sentiment,
    spamStatus,
    sentimentStatus,
    isSpam,
  } = await req.json();

  try {
    const spaceExists = await db.space.findFirst({
      where: {
        id: spaceId,
      },
    });

    if (!spaceExists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const feedback = await db.feedback.findFirst({
      where: {
        id: feedbackId,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    if (isSpam && typeof isSpam !== "boolean") {
      return NextResponse.json(
        { error: "Invalid isSpam type" },
        { status: 400 }
      );
    }

    if (
      sentiment &&
      typeof sentiment !== "string" &&
      !Object.values(SentimentType).includes(sentiment)
    ) {
      return NextResponse.json(
        { error: "Invalid sentiment type" },
        { status: 400 }
      );
    }

    if (
      spamStatus &&
      typeof spamStatus !== "string" &&
      !Object.values(AnalysisStatus).includes(spamStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid spam status type" },
        { status: 400 }
      );
    }

    const updatedFields: Record<
      string,
      string | boolean | AnalysisStatus | SentimentType | undefined
    > = {};

    if (sentiment) {
      updatedFields.sentiment = sentiment;
    }

    if (isSpam) {
      updatedFields.isSpam = isSpam;
    }

    updatedFields.spamStatus = spamStatus;
    updatedFields.sentimentStatus = sentimentStatus;

    const updatedFeedback = await db.feedback.update({
      where: {
        id: feedbackId,
      },
      data: updatedFields,
    });

    return NextResponse.json(
      { message: "Feedback updated successfully", feedback: updatedFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.log("UPDATE FEEDBACK ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
