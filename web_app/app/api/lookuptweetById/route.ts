import { getTweetById } from "@/lib/social/xClient";
import { uploadImageToS3 } from "@/lib/storage/uploadUtils";
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
    const tweet = await getTweetById(tweetId, spaceId);

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

    // Upload Twitter user's profile image to S3
    let profileImageUrl = "";
    if (tweet.includes?.users?.[0]?.profile_image_url) {
      try {
        const uploadedProfileImageUrl = await uploadImageToS3(
          tweet.includes.users[0].profile_image_url,
          `profile_${tweet.data.author_id}`,
          spaceId
        );
        profileImageUrl = uploadedProfileImageUrl;
      } catch (error) {
        console.error("Failed to upload profile image:", error);
        // Continue without profile image if upload fails
      }
    }

    // Save tweet as feedback in database
    const savedFeedback = await db.feedback.create({
      data: {
        answer: tweet.data.text,
        name: tweet.includes.users[0].username || "Twitter User",
        email: "", // Twitter doesn't provide email
        rating: 3, // Default rating for imported tweets
        permission: true,
        spaceId: spaceId,
        feedbackType:
          tweet.includes?.media?.[0]?.type === "video" ? "VIDEO" : "TEXT",
        addToWallOfLove: false,
        videoUrl:
          tweet.includes?.media?.[0]?.type === "video"
            ? tweet.includes.media[0].url
            : null,
        imageUrl:
          tweet.includes?.media?.[0]?.type === "photo"
            ? tweet.includes.media[0].url
            : null,
        profileImageUrl: profileImageUrl || null,
        isSpam: false,
        isSocial: true, // Mark as social testimonial
        sentiment: "POSITIVE",
        sentimentStatus: "PENDING",
        source: "X",
        sourceUrl: `https://twitter.com/i/status/${tweetId}`,
        metadata: JSON.stringify(tweet),
      },
    });

    return NextResponse.json({
      success: true,
      data: savedFeedback,
      message: "Tweet imported successfully",
      metadata: JSON.stringify(tweet),
    });
  } catch (error) {
    console.error("Error importing tweet:", error);
    return NextResponse.json(
      { error: "Failed to import tweet" },
      { status: 500 }
    );
  }
}
