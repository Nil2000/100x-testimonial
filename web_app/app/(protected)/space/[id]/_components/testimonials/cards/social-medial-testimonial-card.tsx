import { toggleWallOfLove, deleteFeedback } from "@/actions/feedbackActions";
import ButtonWrapperTestimonailCard from "@/components/button-wrapper-testimonial";
import { Card } from "@/components/ui/card";
import VideoCustomComponent from "@/components/videojs-component";
import { videoJSOptions } from "@/lib/constants";
import { TestimonialResponse } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Loader2, Heart, Trash2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import ShareButton from "../../sharing/share-controls";
import BadgeOfTestimonials from "./badge-testimonial-type";
import Link from "next/link";
import Image from "next/image";

type Props = {
  testimonial: TestimonialResponse;
  removeFromWallOfLove: (id: string) => void;
  shareForImage: (testimonial: any) => void;
  shareForEmbed: (testimonial: any) => void;
  getLink: (testimonial: any) => void;
  removeFromList: (id: string) => void;
};

export default function SocialMedialTestimonialCard({
  testimonial,
  removeFromWallOfLove,
  shareForImage,
  shareForEmbed,
  getLink,
  removeFromList,
}: Props) {
  const [isLiked, setIsLiked] = useState(testimonial.addToWallOfLove);
  const [isPending, startTransition] = useTransition();
  const playerRef = React.useRef<HTMLVideoElement>(null);

  const toggleLike = async () => {
    startTransition(() => {
      toggleWallOfLove(testimonial.id, !isLiked).then((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        setIsLiked(!isLiked);
        if (testimonial.addToWallOfLove) {
          removeFromWallOfLove(testimonial.id);
        }
      });
    });
  };

  const deleteTestimonial = async () => {
    deleteFeedback(testimonial.id).then((res) => {
      if (res.error) {
        console.error(res.error);
        return;
      }
      removeFromList(testimonial.id);
    });
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  console.log(testimonial);
  return (
    <Card className="p-3 flex flex-col space-y-2">
      <div className="flex justify-between">
        <div>
          <BadgeOfTestimonials
            category={testimonial.feedbackType as "TEXT" | "VIDEO"}
          />
        </div>
        <div className="flex space-x-3">
          <ShareButton
            handleShareImage={() => shareForImage(testimonial)}
            handleEmbedTestimonial={() => shareForEmbed(testimonial)}
            handleGetLink={() => getLink(testimonial)}
            type={testimonial.feedbackType as "TEXT" | "VIDEO"}
          />
          <button
            onClick={toggleLike}
            className="text-muted-foreground hover:text-primary"
          >
            {isPending ? (
              <Loader2
                size={24}
                className="animate-spin text-muted-foreground"
              />
            ) : (
              <Heart
                size={24}
                fill={isLiked ? "red" : "none"}
                className={isLiked ? "text-red-500" : ""}
              />
            )}
          </button>
          <ButtonWrapperTestimonailCard
            buttonAction={deleteTestimonial}
            buttonIcon={Trash2}
            className="text-muted-foreground hover:text-red-500"
          />
        </div>
      </div>
      <div className="text-sm">
        {processTwitterBodyUsingMetadata(JSON.parse(testimonial.metadata))}
      </div>
      {testimonial.videoUrl ? (
        <div className="flex flex-col items-center relative w-1/2">
          <VideoCustomComponent
            options={{
              ...videoJSOptions,
              fill: true,
              sources: [
                {
                  src: testimonial.videoUrl,
                  type: "video/mp4",
                },
              ],
            }}
            onReady={handlePlayerReady}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center relative w-1/2">
          <Image
            src={testimonial.imageUrl!}
            alt="Image"
            width={500}
            height={500}
          />
        </div>
      )}
      <Avatar>
        <AvatarImage
          src={testimonial.profileImageUrl || ""}
          className="object-cover"
          alt="User Image"
        />
        <AvatarFallback>
          {testimonial.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-xs italic text-muted-foreground">
        <h3>{testimonial.name}</h3>
        <h4>{testimonial.email}</h4>
        <div>{renderDate(testimonial.createdAt.toString())}</div>
      </div>
    </Card>
  );
}

const dummyResponse = {
  result: {
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
  },
};

const dummyResponse2 = {
  result: {
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
  },
};

const processTwitterBodyUsingMetadata = (metadata: any) => {
  let text = metadata.data.text;

  let allEntities: Array<{
    start: number;
    end: number;
    type: string;
    data: any;
  }> = [];

  // Add all mentions
  metadata.data.entities.mentions?.forEach((mention: any) => {
    allEntities.push({
      start: mention.start,
      end: mention.end,
      type: "mention",
      data: mention,
    });
  });

  // Add all hashtags
  metadata.data.entities.hashtags?.forEach((hashtag: any) => {
    allEntities.push({
      start: hashtag.start,
      end: hashtag.end,
      type: "hashtag",
      data: hashtag,
    });
  });
  // Add all urls
  metadata.data.entities.urls?.forEach((url: any) => {
    allEntities.push({
      start: url.start,
      end: url.end,
      type: "url",
      data: url,
    });
  });

  //Sorting allentities
  allEntities.sort((a, b) => a.start - b.start);

  // Build JSX elements
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  allEntities.forEach((entity, index) => {
    // Add text before this entity
    if (entity.start > lastIndex) {
      elements.push(text.slice(lastIndex, entity.start));
    }

    // Add the entity as a link
    const entityText = text.slice(entity.start, entity.end);

    if (entity.type === "mention") {
      elements.push(
        <Link
          key={`mention-${index}`}
          href={`https://x.com/${entity.data.username}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {entityText}
        </Link>
      );
    } else if (entity.type === "hashtag") {
      elements.push(
        <Link
          key={`hashtag-${index}`}
          href={`https://x.com/hashtag/${entity.data.tag}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {entityText}
        </Link>
      );
    } else if (entity.type === "url") {
      elements.push(
        <Link
          key={`url-${index}`}
          href={entity.data.expanded_url}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {entity.data.expanded_url}
        </Link>
      );
    }

    lastIndex = entity.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }
  console.log(elements);
  return <span>{elements}</span>;
};

const renderDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
};
