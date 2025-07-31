import { getTweetById } from "@/lib/social/xClient";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tweetId, spaceId } = await req.json();

  if (!tweetId) {
    return NextResponse.json({ error: "TweetId is required" }, { status: 400 });
  }

  if (!spaceId) {
    return NextResponse.json({ error: "SpaceId is required" }, { status: 400 });
  }

  try {
    const tweet = await getTweetById(tweetId);

    if (!tweet || !tweet.data) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    // Check if this tweet is already imported
    const existingFeedback = await db.feedback.findFirst({
      where: {
        sourceUrl: `https://twitter.com/i/status/${tweetId}`,
        spaceId: spaceId,
      },
    });

    if (existingFeedback) {
      return NextResponse.json({
        success: true,
        data: existingFeedback,
        message: "Tweet already imported",
      });
    }

    console.log(tweet);

    // Save tweet as feedback in database
    const savedFeedback = await db.feedback.create({
      data: {
        answer: tweet.data.text,
        name: tweet.data.author_id || "Twitter User",
        email: "", // Twitter doesn't provide email
        rating: 5, // Default rating for imported tweets
        permission: true,
        spaceId: spaceId,
        feedbackType: "TEXT_AND_VIDEO",
        addToWallOfLove: false,
        videoUrl:
          tweet.includes?.media?.[0]?.type === "video"
            ? tweet.includes.media[0].url
            : null,
        imageUrl:
          tweet.includes?.media?.[0]?.type === "photo"
            ? tweet.includes.media[0].url
            : null,
        isSpam: false,
        sentiment: "POSITIVE",
        analysisStatus: "PENDING",
        source: "X",
        sourceUrl: `https://twitter.com/i/status/${tweetId}`,
        metadata: JSON.parse(JSON.stringify(tweet)),
      },
    });

    return NextResponse.json({
      success: true,
      data: savedFeedback,
      message: "Tweet imported successfully",
      metadata: tweet,
    });
  } catch (error) {
    console.error("Error importing tweet:", error);
    return NextResponse.json(
      { error: "Failed to import tweet" },
      { status: 500 }
    );
  }
}
