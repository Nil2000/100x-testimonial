import { Card, CardContent } from "@/components/ui/card";
import { Heart, Loader2, Share2, Star, Trash2, Calendar } from "lucide-react";
import React, { useState, useTransition } from "react";
import { deleteFeedback, toggleWallOfLove } from "@/actions/feedbackActions";
import BadgeOfTestimonials from "./badge-testimonial-type";
import VideoCustomComponent from "@/components/videojs-component";
import { videoJSOptions } from "@/lib/constants";
import { TestimonialResponse } from "@/lib/types";
import ButtonWrapperTestimonailCard from "@/components/button-wrapper-testimonial";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "../../sharing/share-controls";
import { toast } from "sonner";

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
          toast.error("Failed to update testimonial. Please try again.");
          return;
        }
        setIsLiked(!isLiked);
        if (testimonial.addToWallOfLove) {
          removeFromWallOfLove(testimonial.id);
        } else {
          toast.success("Added to wall of love!");
        }
      });
    });
  };

  const deleteTestimonial = async () => {
    deleteFeedback(testimonial.id).then((res) => {
      if (res.error) {
        console.error(res.error);
        toast.error("Failed to delete testimonial. Please try again.");
        return;
      }
      removeFromList(testimonial.id);
      toast.success("Testimonial deleted successfully!");
    });
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage
                  src={testimonial.profileImageUrl || ""}
                  className="object-cover"
                  alt="User Image"
                />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {testimonial.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {testimonial.email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {renderDate(testimonial.createdAt.toString())}
                  </span>
                </div>
              </div>
            </div>
            <BadgeOfTestimonials
              category={testimonial.feedbackType as "TEXT" | "VIDEO"}
            />
          </div>

          <div className="flex items-center gap-1">
            {renderStars(testimonial.rating)}
            <span className="text-xs text-muted-foreground ml-1">
              ({testimonial.rating}/5)
            </span>
          </div>

          {testimonial.feedbackType === "TEXT" ? (
            <div className="text-sm leading-relaxed text-foreground/90 bg-muted/30 rounded-lg p-4 border border-border/50">
              {testimonial.answer}
            </div>
          ) : (
            <div className="flex flex-col items-center relative w-full rounded-lg overflow-hidden">
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
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-3 bg-muted/30 border-t">
          <ShareButton
            handleShareImage={() => shareForImage(testimonial)}
            handleEmbedTestimonial={() => shareForEmbed(testimonial)}
            handleGetLink={() => getLink(testimonial)}
            type={testimonial.feedbackType as "TEXT" | "VIDEO"}
          />
          <button
            onClick={toggleLike}
            className="p-2 rounded-lg hover:bg-background transition-colors"
            title={isLiked ? "Remove from wall of love" : "Add to wall of love"}
          >
            {isPending ? (
              <Loader2
                size={18}
                className="animate-spin text-muted-foreground"
              />
            ) : (
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
                className={
                  isLiked
                    ? "text-red-500"
                    : "text-muted-foreground hover:text-red-500"
                }
              />
            )}
          </button>
          <ButtonWrapperTestimonailCard
            buttonAction={deleteTestimonial}
            buttonIcon={Trash2}
            className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-background transition-colors"
          />
        </div>
      </CardContent>
    </Card>
  );
}

const renderDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      size={16}
      className={
        index < rating
          ? "fill-yellow-400 text-yellow-400"
          : "fill-muted text-muted"
      }
    />
  ));
};
