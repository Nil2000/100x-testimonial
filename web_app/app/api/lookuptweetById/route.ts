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
        name: tweet.data.author_id || "Twitter User",
        email: "", // Twitter doesn't provide email
        rating: 3, // Default rating for imported tweets
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
        profileImageUrl: profileImageUrl || null,
        isSpam: false,
        sentiment: "POSITIVE",
        analysisStatus: "PENDING",
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

const dummyResponse = {
  data: {
    entities: {
      annotations: [
        {
          start: 40,
          end: 56,
          probability: 0.6458,
          type: "Other",
          normalized_text: "Aceternity UI Pro",
        },
      ],
      mentions: [
        {
          start: 74,
          end: 82,
          username: "lovable",
          id: "12215652",
        },
        {
          start: 84,
          end: 95,
          username: "boltdotnew",
          id: "2279695508",
        },
        {
          start: 102,
          end: 105,
          username: "v0",
          id: "1711764162290847745",
        },
      ],
      urls: [
        {
          start: 132,
          end: 155,
          url: "https://t.co/aG7sW1oa0h",
          expanded_url:
            "https://x.com/mannupaaji/status/1951202257447403763/video/1",
          display_url: "pic.x.com/aG7sW1oa0h",
          media_key: "13_1951202106544889856",
        },
      ],
    },
    public_metrics: {
      retweet_count: 4,
      reply_count: 8,
      like_count: 97,
      quote_count: 0,
      bookmark_count: 17,
      impression_count: 3912,
    },
    id: "1951202257447403763",
    attachments: {
      media_keys: ["13_1951202106544889856"],
    },
    lang: "en",
    created_at: "2025-08-01T08:44:04.000Z",
    author_id: "1211217056483303424",
    context_annotations: [
      {
        domain: {
          id: "46",
          name: "Business Taxonomy",
          description:
            "Categories within Brand Verticals that narrow down the scope of Brands",
        },
        entity: {
          id: "1557696940178935808",
          name: "Gaming Business",
          description:
            "Brands, companies, advertisers and every non-person handle with the profit intent related to offline and online games such as gaming consoles, tabletop games, video game publishers",
        },
      },
    ],
    edit_history_tweet_ids: ["1951202165487468983", "1951202257447403763"],
    text: "FYI you can copy prompts for all of the Aceternity UI Pro components into @lovable, @boltdotnew , and @v0 and it will work spot on! https://t.co/aG7sW1oa0h",
  },
  includes: {
    media: [
      {
        duration_ms: 25350,
        variants: [
          {
            bit_rate: 288000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1951202106544889856/vid/avc1/410x270/TNKQrE1MPIDIDRqm.mp4?tag=14",
          },
          {
            bit_rate: 832000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1951202106544889856/vid/avc1/546x360/PA1OVIsCclWplizQ.mp4?tag=14",
          },
          {
            bit_rate: 2176000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1951202106544889856/vid/avc1/1092x720/suU2zU1QXuGd0bCe.mp4?tag=14",
          },
          {
            content_type: "application/x-mpegURL",
            url: "https://video.twimg.com/amplify_video/1951202106544889856/pl/QqjztjcZ1vwdeYov.m3u8?tag=14",
          },
        ],
        type: "video",
        media_key: "13_1951202106544889856",
        width: 1640,
        preview_image_url:
          "https://pbs.twimg.com/amplify_video_thumb/1951202106544889856/img/5xgEEu1VlP_dGdH4.jpg",
        height: 1080,
      },
    ],
    users: [
      {
        id: "1211217056483303424",
        name: "Manu Arora",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_normal.jpg",
        username: "mannupaaji",
      },
    ],
  },
  extended_entities: {
    media: [
      {
        video_info: {
          variants: [
            {
              bit_rate: 288000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1951202106544889856/vid/avc1/410x270/TNKQrE1MPIDIDRqm.mp4?tag=14",
            },
            {
              bit_rate: 832000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1951202106544889856/vid/avc1/546x360/PA1OVIsCclWplizQ.mp4?tag=14",
            },
            {
              bit_rate: 2176000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1951202106544889856/vid/avc1/1092x720/suU2zU1QXuGd0bCe.mp4?tag=14",
            },
            {
              content_type: "application/x-mpegURL",
              url: "https://video.twimg.com/amplify_video/1951202106544889856/pl/QqjztjcZ1vwdeYov.m3u8?tag=14",
            },
          ],
        },
        type: "video",
      },
    ],
  },
};

const dummyResponse2 = {
  data: {
    entities: {
      urls: [
        {
          start: 272,
          end: 295,
          url: "https://t.co/LaV02EF9SM",
          expanded_url:
            "https://x.com/Dipanjan_Dey/status/1950934543050928354/video/1",
          display_url: "pic.x.com/LaV02EF9SM",
          media_key: "13_1950930280040079360",
        },
      ],
      annotations: [
        {
          start: 12,
          end: 17,
          probability: 0.5633,
          type: "Person",
          normalized_text: "Kombai",
        },
        {
          start: 72,
          end: 77,
          probability: 0.3157,
          type: "Other",
          normalized_text: "Kombai",
        },
        {
          start: 98,
          end: 101,
          probability: 0.3772,
          type: "Other",
          normalized_text: "SOTA",
        },
        {
          start: 195,
          end: 197,
          probability: 0.4337,
          type: "Other",
          normalized_text: "OSS",
        },
      ],
    },
    text: "Introducing Kombai, the first AI agent built for frontend development.\n\nKombai vastly outperforms SOTA models + generic agents in real-world benchmarks.\n\nWatch it add a complex new feature to an OSS codebase with 500K+ lines of code.\n\nMore use cases and links in comments https://t.co/LaV02EF9SM",
    id: "1950934543050928354",
    created_at: "2025-07-31T15:00:16.000Z",
    author_id: "373860676",
    public_metrics: {
      retweet_count: 165,
      reply_count: 159,
      like_count: 920,
      quote_count: 99,
      bookmark_count: 889,
      impression_count: 572833,
    },
    edit_history_tweet_ids: ["1950934543050928354"],
    attachments: {
      media_keys: ["13_1950930280040079360"],
    },
    lang: "en",
    context_annotations: [
      {
        domain: {
          id: "46",
          name: "Business Taxonomy",
          description:
            "Categories within Brand Verticals that narrow down the scope of Brands",
        },
        entity: {
          id: "1557697333571112960",
          name: "Technology Business",
          description:
            "Brands, companies, advertisers and every non-person handle with the profit intent related to softwares, apps, communication equipments, hardwares",
        },
      },
      {
        domain: {
          id: "30",
          name: "Entities [Entity Service]",
          description:
            "Entity Service top level domain, every item that is in Entity Service should be in this domain",
        },
        entity: {
          id: "848920371311001600",
          name: "Technology",
          description: "Technology and computing",
        },
      },
      {
        domain: {
          id: "66",
          name: "Interests and Hobbies Category",
          description:
            "A grouping of interests and hobbies entities, like Novelty Food or Destinations",
        },
        entity: {
          id: "898673391980261376",
          name: "Web development",
          description: "Web Development",
        },
      },
      {
        domain: {
          id: "131",
          name: "Unified Twitter Taxonomy",
          description: "A taxonomy of user interests. ",
        },
        entity: {
          id: "848921413196984320",
          name: "Computer programming",
          description: "Computer programming",
        },
      },
      {
        domain: {
          id: "131",
          name: "Unified Twitter Taxonomy",
          description: "A taxonomy of user interests. ",
        },
        entity: {
          id: "898673391980261376",
          name: "Web development",
          description: "Web Development",
        },
      },
    ],
  },
  includes: {
    media: [
      {
        type: "video",
        height: 2160,
        variants: [
          {
            content_type: "application/x-mpegURL",
            url: "https://video.twimg.com/amplify_video/1950930280040079360/pl/3jcgPdd4h08hr10a.m3u8?v=bde",
          },
          {
            bit_rate: 10368000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/1920x1080/86y-4GFcLK47h1_1.mp4",
          },
          {
            bit_rate: 25128000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/3840x2160/UViYBx__ulgHV4rS.mp4",
          },
          {
            bit_rate: 2176000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/1280x720/aYlRpNVb1BeYqHXu.mp4",
          },
          {
            bit_rate: 832000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/640x360/O5q8y5Z2xdaHIZbb.mp4",
          },
          {
            bit_rate: 256000,
            content_type: "video/mp4",
            url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/480x270/VgHkOuNNSgTRtcXt.mp4",
          },
        ],
        media_key: "13_1950930280040079360",
        width: 3840,
        duration_ms: 188600,
        preview_image_url:
          "https://pbs.twimg.com/amplify_video_thumb/1950930280040079360/img/tq-ya3SQS_PQz9c0.jpg",
      },
    ],
    users: [
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1652920741917073408/Aa1I0RQf_normal.jpg",
        name: "Dipanjan Dey",
        username: "Dipanjan_Dey",
        id: "373860676",
      },
    ],
  },
  extended_entities: {
    media: [
      {
        video_info: {
          variants: [
            {
              content_type: "application/x-mpegURL",
              url: "https://video.twimg.com/amplify_video/1950930280040079360/pl/3jcgPdd4h08hr10a.m3u8?v=bde",
            },
            {
              bit_rate: 10368000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/1920x1080/86y-4GFcLK47h1_1.mp4",
            },
            {
              bit_rate: 25128000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/3840x2160/UViYBx__ulgHV4rS.mp4",
            },
            {
              bit_rate: 2176000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/1280x720/aYlRpNVb1BeYqHXu.mp4",
            },
            {
              bit_rate: 832000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/640x360/O5q8y5Z2xdaHIZbb.mp4",
            },
            {
              bit_rate: 256000,
              content_type: "video/mp4",
              url: "https://video.twimg.com/amplify_video/1950930280040079360/vid/avc1/480x270/VgHkOuNNSgTRtcXt.mp4",
            },
          ],
        },
        type: "video",
      },
    ],
  },
};

const dummyResponse3 = {
  data: {
    entities: {
      urls: [
        {
          start: 101,
          end: 124,
          url: "https://t.co/oPpzva4o38",
          expanded_url:
            "https://x.com/boltdotnew/status/1951327847353651639/photo/1",
          display_url: "pic.x.com/oPpzva4o38",
          media_key: "3_1951327826742808576",
        },
      ],
      annotations: [
        {
          start: 95,
          end: 98,
          probability: 0.6525,
          type: "Organization",
          normalized_text: "Bolt",
        },
      ],
    },
    author_id: "2279695508",
    attachments: {
      media_keys: ["3_1951327826742808576"],
    },
    text: "See this? Want one? We're giving 3 away! \n\nLike this post and tell us what you love most about Bolt! https://t.co/oPpzva4o38",
    edit_history_tweet_ids: ["1951327847353651639"],
    created_at: "2025-08-01T17:03:07.000Z",
    lang: "en",
    public_metrics: {
      retweet_count: 26,
      reply_count: 444,
      like_count: 936,
      quote_count: 8,
      bookmark_count: 55,
      impression_count: 48606,
    },
    id: "1951327847353651639",
  },
  includes: {
    media: [
      {
        height: 2000,
        width: 2000,
        url: "https://pbs.twimg.com/media/GxSCUeFXEAAVLjY.jpg",
        media_key: "3_1951327826742808576",
        type: "photo",
      },
    ],
    users: [
      {
        name: "bolt.new",
        username: "boltdotnew",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1880702021122342912/fe9TlQqJ_normal.jpg",
        id: "2279695508",
      },
    ],
  },
};
