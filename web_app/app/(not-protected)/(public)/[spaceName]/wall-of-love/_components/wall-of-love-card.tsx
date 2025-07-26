import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { TestimonialResponse } from "@/lib/types";
import { UserRoundIcon } from "lucide-react";
import React from "react";

export default function WallOfLoveCard({
  testimonial,
}: {
  testimonial: TestimonialResponse;
}) {
  return (
    <Card className="flex flex-col items-center gap-2 p-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer ring-1 ring-zinc-500 dark:ring-zinc-700 rounded-lg w-full h-max">
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
      <div className="text-xs">{renderStars(testimonial.rating)}</div>
      <div className="text-xs mx-auto">
        <span className="text-xs text-muted-foreground">
          {renderDate(testimonial.createdAt.toDateString())}
        </span>
      </div>
    </Card>
  );
}
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
