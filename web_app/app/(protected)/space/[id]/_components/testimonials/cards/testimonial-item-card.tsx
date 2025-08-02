import { Card, CardContent } from "@/components/ui/card";
import { Heart, Loader2, Share2, Star, Trash2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { deleteFeedback, toggleWallOfLove } from "@/actions/feedbackActions";
import BadgeOfTestimonials from "./badge-testimonial-type";
import VideoCustomComponent from "@/components/videojs-component";
import { videoJSOptions } from "@/lib/constants";
import { TestimonialResponse } from "@/lib/types";
import ButtonWrapperTestimonailCard from "@/components/button-wrapper-testimonial";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "../../sharing/share-controls";

type Props = {
  testimonial: TestimonialResponse;
  removeFromWallOfLove: (id: string) => void;
  shareForImage: (testimonial: any) => void;
  shareForEmbed: (testimonial: any) => void;
  getLink: (testimonial: any) => void;
  removeFromList: (id: string) => void;
};

export default function TestimonialCard({
  testimonial,
  removeFromWallOfLove,
  shareForImage,
  shareForEmbed,
  removeFromList,
  getLink,
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
      {testimonial.feedbackType === "TEXT" ? (
        <div className="text-sm">{testimonial.answer}</div>
      ) : (
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
      )}
      <div className="flex">{renderStars(testimonial.rating)}</div>
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

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index}>⭐</span>
  ));
};
