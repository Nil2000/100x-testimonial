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
    <Card className="flex flex-col items-center gap-2 p-4 bg-zinc-500/20 border border-zinc-700 rounded-lg w-[15rem] h-max max-h-[30rem]">
      <Avatar className="w-12 h-12">
        <AvatarFallback className="p-2">
          <UserRoundIcon size={30} className="opacity-60" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <h3 className="font-bold font-poppins">{testimonial.name}</h3>
      <p className="text-center font-dm_serif">{testimonial.answer}</p>
      <div>{renderStars(testimonial.rating)}</div>
      <div>
        <span className="text-muted-foreground">
          {renderDate(testimonial.createdAt.toDateString())}
        </span>
      </div>
    </Card>
  );
}
const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index}>⭐</span>
  ));
};
const renderDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
