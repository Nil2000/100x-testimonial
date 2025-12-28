import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Loader2,
  Star,
  Archive,
  Calendar,
  AlertTriangle,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import React, { useState, useTransition } from "react";
import { archiveFeedback, toggleWallOfLove } from "@/actions/feedbackActions";
import BadgeOfTestimonials from "./badge-testimonial-type";
import { TestimonialResponse } from "@/lib/types";
import ButtonWrapperTestimonailCard from "@/components/button-wrapper-testimonial";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "../../sharing/share-controls";
import { toast } from "sonner";
import VideoDisplayComponent from "@/components/video-display-component";

type Props = {
  testimonial: TestimonialResponse;
  removeFromWallOfLove: (id: string) => void;
  shareForImage: (testimonial: TestimonialResponse) => void;
  shareForEmbed: (testimonial: TestimonialResponse) => void;
  getLink: (testimonial: TestimonialResponse) => void;
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

  const archiveTestimonial = async () => {
    archiveFeedback(testimonial.id).then((res) => {
      if (res.error) {
        console.error(res.error);
        toast.error("Failed to archive testimonial. Please try again.");
        return;
      }
      removeFromList(testimonial.id);
      toast.success("Testimonial archived successfully!");
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      <CardContent className="p-0">
        {/* Header with badges */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-muted/20 border-b border-border/30">
          <div className="flex items-center gap-2 flex-wrap">
            <BadgeOfTestimonials
              category={testimonial.feedbackType as "TEXT" | "VIDEO"}
            />
            {testimonial.isSpam && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800">
                <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                  Spam
                </span>
              </div>
            )}
            {testimonial.sentimentStatus === "COMPLETED" && (
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                  testimonial.sentiment === "POSITIVE"
                    ? "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800"
                    : testimonial.sentiment === "NEGATIVE"
                    ? "bg-orange-100 dark:bg-orange-950 border-orange-300 dark:border-orange-800"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                }`}
              >
                {testimonial.sentiment === "POSITIVE" ? (
                  <Smile className="h-3 w-3 text-green-600 dark:text-green-400" />
                ) : testimonial.sentiment === "NEGATIVE" ? (
                  <Frown className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                ) : (
                  <Meh className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                )}
                <span
                  className={`text-xs font-medium ${
                    testimonial.sentiment === "POSITIVE"
                      ? "text-green-700 dark:text-green-300"
                      : testimonial.sentiment === "NEGATIVE"
                      ? "text-orange-700 dark:text-orange-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {testimonial.sentiment.charAt(0) +
                    testimonial.sentiment.slice(1).toLowerCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>

        {/* User info section */}
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border-2 border-primary/10 ring-2 ring-primary/5">
              <AvatarImage
                src={testimonial.profileImageUrl || ""}
                className="object-cover"
                alt="User Image"
              />
              <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-muted-foreground font-semibold text-sm border border-border">
                {testimonial.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate text-foreground">
                {testimonial.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {testimonial.email}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {renderDateAndTime(testimonial.createdAt.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="px-4 pb-4">
          {testimonial.feedbackType === "TEXT" ? (
            <div className="text-sm leading-relaxed text-foreground/90 bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border border-border/40 shadow-sm">
              {testimonial.answer}
            </div>
          ) : (
            <div className="max-h-64 aspect-video overflow-hidden rounded-xl border border-border/40 shadow-sm">
              <VideoDisplayComponent videoUrl={testimonial.videoUrl || ""} />
            </div>
          )}
        </div>

        {/* Action buttons footer */}
        <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-muted/30 to-muted/20 border-t border-border/30">
          <div className="text-xs text-muted-foreground font-medium">
            {testimonial.rating}/5 rating
          </div>
          <div className="flex items-center gap-3">
            <ShareButton
              handleShareImage={() => shareForImage(testimonial)}
              handleEmbedTestimonial={() => shareForEmbed(testimonial)}
              handleGetLink={() => getLink(testimonial)}
              type={testimonial.feedbackType as "TEXT" | "VIDEO"}
            />
            <button
              onClick={toggleLike}
              className="rounded-lg hover:bg-background/80 transition-all duration-200"
              title={
                isLiked ? "Remove from wall of love" : "Add to wall of love"
              }
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
                      ? "text-red-500 transition-all"
                      : "text-muted-foreground hover:text-red-500 hover:scale-110 transition-all"
                  }
                />
              )}
            </button>
            <ButtonWrapperTestimonailCard
              buttonAction={archiveTestimonial}
              buttonIcon={Archive}
              className="rounded-lg text-muted-foreground hover:text-orange-500 hover:bg-background/80 hover:scale-110 transition-all duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const renderDateAndTime = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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
