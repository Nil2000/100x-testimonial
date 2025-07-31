import { Client } from "twitter-api-sdk";
import { initClient } from "../storage/initClient";
import { parseS3PublicBaseUrl } from "../storage/parseS3publicBaseUrl";
import { uploadImageToS3, uploadVideoToS3 } from "../storage/uploadUtils";

let xClient: Client | null;

export const getXClient = () => {
  if (!xClient) {
    xClient = new Client(process.env.TWITTER_TOKEN!);
  }
  return xClient;
};

export const getTweetById = async (tweetId: string) => {
  const client = getXClient();
  const tweet = await client.tweets.findTweetById(tweetId, {
    "tweet.fields": [
      "attachments",
      "author_id",
      "context_annotations",
      "conversation_id",
      "created_at",
      "edit_controls",
      "edit_history_tweet_ids",
      "entities",
      "geo",
      "id",
      "in_reply_to_user_id",
      "lang",
      "non_public_metrics",
      "organic_metrics",
      "possibly_sensitive",
      "promoted_metrics",
      "public_metrics",
      "referenced_tweets",
      "reply_settings",
      "source",
      "text",
      "withheld",
    ],
    "user.fields": [
      "created_at",
      "description",
      "entities",
      "location",
      "name",
      "protected",
      "url",
      "username",
      "verified",
      "withheld",
    ],
    expansions: [
      "attachments.media_keys",
      "author_id",
      "entities.mentions.username",
      "geo.place_id",
      "in_reply_to_user_id",
      "referenced_tweets.id",
      "referenced_tweets.id.author_id",
    ],
    "media.fields": [
      "duration_ms",
      "height",
      "media_key",
      "preview_image_url",
      "type",
      "url",
      "width",
      "public_metrics",
      "alt_text",
    ],

    "place.fields": [
      "contained_within",
      "country",
      "country_code",
      "full_name",
      "geo",
      "id",
      "name",
      "place_type",
    ],
  });
  console.log(tweet);

  // Process and upload single image if available
  const processedTweet = await processTweetMedia(tweet);

  return processedTweet;
};

// Process tweet media to upload only the first image to S3
const processTweetMedia = async (tweet: any) => {
  // Check if tweet has media attachments
  if (!tweet.includes?.media || tweet.includes.media.length === 0) {
    return tweet;
  }

  // Filter for image and video media (ignore polls, but include photos and videos)
  const supportedMedia = tweet.includes.media.filter(
    (media: any) => media.type === "photo" || media.type === "video"
  );

  if (supportedMedia.length === 0) {
    return tweet;
  }

  // Select only the first media item (image or video)
  const firstMedia = supportedMedia[0];

  try {
    let uploadedMediaUrl: string;

    if (firstMedia.type === "photo") {
      // Download and upload the image to S3
      uploadedMediaUrl = await uploadImageToS3(
        firstMedia.url,
        firstMedia.media_key
      );
    } else if (firstMedia.type === "video") {
      // Download and upload the video to S3
      uploadedMediaUrl = await uploadVideoToS3(
        firstMedia.url,
        firstMedia.media_key
      );
    } else {
      // Fallback - shouldn't reach here due to filtering above
      return tweet;
    }

    // Replace the original media with only the uploaded media
    const processedTweet = {
      ...tweet,
      includes: {
        ...tweet.includes,
        media: [
          {
            ...firstMedia,
            url: uploadedMediaUrl,
            uploaded_to_storage: true,
          },
        ],
      },
    };

    return processedTweet;
  } catch (error) {
    console.error("Error processing tweet media:", error);
    return tweet;
  }
};
