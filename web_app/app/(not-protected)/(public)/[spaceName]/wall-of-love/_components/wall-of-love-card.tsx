import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import VideoDisplayComponent from "@/components/video-display-component";
import { TestimonialResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Quote, Star, UserRoundIcon } from "lucide-react";
import React from "react";

type StyleOptions = {
  cardVariant?: string;
  showRating?: string;
  showDate?: string;
};

export default function WallOfLoveCard({
  testimonial,
  styleOptions = {},
}: {
  testimonial: TestimonialResponse;
  styleOptions?: StyleOptions;
}) {
  const cardVariant = styleOptions.cardVariant || "classic";
  const showRating = styleOptions.showRating !== "false";
  const showDate = styleOptions.showDate !== "false";

  const variantClasses = getCardVariantClasses(cardVariant);
  const isDark = cardVariant === "dark";
  const isGlass = cardVariant === "glass";

  return (
    <Card
      className={cn(
        "group relative flex flex-col gap-4 p-5 sm:p-6 w-full h-full overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        variantClasses
      )}
    >
      <Quote
        className={cn(
          "absolute -top-2 -right-2 w-20 h-20 rotate-180 pointer-events-none transition-transform duration-300 group-hover:scale-110",
          isDark
            ? "text-white/5"
            : isGlass
            ? "text-white/30"
            : "text-primary/5"
        )}
        strokeWidth={1}
        aria-hidden="true"
      />

      {showRating && testimonial.rating > 0 && (
        <div className="flex items-center gap-0.5">
          {renderStars(testimonial.rating, isDark)}
        </div>
      )}

      {testimonial.feedbackType === "VIDEO" && testimonial.videoUrl ? (
        <div className="rounded-lg overflow-hidden -mx-1">
          <VideoDisplayComponent videoUrl={testimonial.videoUrl} />
        </div>
      ) : (
        <p
          className={cn(
            "font-poppins text-sm sm:text-[15px] leading-relaxed relative z-10",
            isDark ? "text-zinc-100" : "text-foreground/90"
          )}
        >
          {testimonial.answer}
        </p>
      )}

      <div className="mt-auto pt-2 flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            className={cn(
              "w-10 h-10 ring-2 ring-offset-2 transition-all",
              isDark
                ? "ring-white/10 ring-offset-zinc-900"
                : isGlass
                ? "ring-white/40 ring-offset-transparent"
                : "ring-primary/10 ring-offset-background"
            )}
          >
            <AvatarImage src={testimonial.profileImageUrl || ""} />
            <AvatarFallback className="bg-primary/10">
              <UserRoundIcon
                size={18}
                className="text-primary/70"
                aria-hidden="true"
              />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3
              className={cn(
                "font-poppins font-semibold text-sm truncate",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              {testimonial.name}
            </h3>
            {showDate && (
              <p
                className={cn(
                  "text-xs font-poppins truncate",
                  isDark ? "text-zinc-400" : "text-muted-foreground"
                )}
              >
                {renderDate(testimonial.createdAt)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

const getCardVariantClasses = (variant: string) => {
  switch (variant) {
    case "glass":
      return "bg-white/30 backdrop-blur-xl border border-white/50 shadow-lg";
    case "dark":
      return "bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl";
    case "classic":
    default:
      return "bg-card border border-border/60 shadow-sm hover:border-primary/30";
  }
};

const renderStars = (rating: number, isDark: boolean) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      size={14}
      className={cn(
        "transition-colors",
        index < rating
          ? "fill-amber-400 text-amber-400"
          : isDark
          ? "text-zinc-700"
          : "text-muted-foreground/30"
      )}
    />
  ));
};

const renderDate = (date: Date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
