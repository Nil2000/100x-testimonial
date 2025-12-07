import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { TestimonialResponse } from "@/lib/types";
import { UserRoundIcon } from "lucide-react";
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

  return (
    <Card
      className={`flex flex-col items-center gap-2 p-4 w-full h-max border ${getCardVariantClasses(
        cardVariant
      )}`}
    >
      <Avatar className="sm:w-12 sm:h-12 w-10 h-10">
        <AvatarFallback className="p-2">
          <UserRoundIcon size={30} className="opacity-60" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <h3 className="font-bold font-poppins text-xs sm:text-base">
        {testimonial.name}
      </h3>
      <p className="text-center font-dm_serif text-xs sm:text-sm">
        {testimonial.answer}
      </p>
      {showRating && (
        <div className="text-xs">{renderStars(testimonial.rating)}</div>
      )}
      {showDate && (
        <div className="text-xs mx-auto">
          <span className="text-xs text-muted-foreground">
            {renderDate(testimonial.createdAt.toDateString())}
          </span>
        </div>
      )}
    </Card>
  );
}
const getCardVariantClasses = (variant: string) => {
  switch (variant) {
    case "glass":
      return "bg-white/20 backdrop-blur-lg border-white/40 shadow-lg text-white";
    case "dark":
      return "bg-zinc-900 text-white border-zinc-700 shadow-xl";
    case "classic":
    default:
      return "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground shadow-sm";
  }
};
const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index} className="text-xs">
      ⭐
    </span>
  ));
};
const renderDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
