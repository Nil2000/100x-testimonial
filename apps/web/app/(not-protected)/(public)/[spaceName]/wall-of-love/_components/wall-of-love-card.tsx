import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import VideoDisplayComponent from "@/components/video-display-component";
import { TestimonialResponse } from "@/lib/types";
import { Star, UserRoundIcon } from "lucide-react";
import React from "react";

type StyleOptions = {
  showRating?: string;
};

export default function WallOfLoveCard({
  testimonial,
  styleOptions = {},
}: {
  testimonial: TestimonialResponse;
  styleOptions?: StyleOptions;
}) {
  const showRating = styleOptions.showRating !== "false";
  const rating = Math.max(0, Math.min(5, Math.round(testimonial.rating || 0)));

  return (
    <Card className="relative flex flex-col gap-4 p-5 sm:p-6 w-full h-full overflow-hidden bg-card border border-border transition-colors hover:border-foreground/20 hover:bg-muted/40">
      {showRating && rating > 0 && (
        <div
          className="flex items-center gap-0.5"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }, (_, index) => (
            <Star
              key={index}
              size={14}
              className="fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {testimonial.feedbackType === "VIDEO" && testimonial.videoUrl ? (
        <div className="rounded-md overflow-hidden -mx-1">
          <VideoDisplayComponent videoUrl={testimonial.videoUrl} />
        </div>
      ) : (
        <p className="font-geist text-sm sm:text-[15px] leading-relaxed text-foreground/90">
          {testimonial.answer}
        </p>
      )}

      <div className="mt-auto pt-3 border-t border-border flex items-center gap-3 min-w-0">
        <Avatar className="w-9 h-9">
          <AvatarImage src={testimonial.profileImageUrl || ""} alt="" />
          <AvatarFallback className="bg-muted">
            <UserRoundIcon
              size={16}
              className="text-muted-foreground"
              aria-hidden="true"
            />
          </AvatarFallback>
        </Avatar>
        <p className="font-geist font-medium text-sm truncate text-foreground">
          {testimonial.name}
        </p>
      </div>
    </Card>
  );
}
