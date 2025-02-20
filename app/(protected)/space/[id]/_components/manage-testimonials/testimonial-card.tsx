import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toggleWallOfLove } from "@/actions/feedbackActions";
import BadgeOfTestimonials from "./badge-testimonial-type";

export default function TestimonialCard({ testimonial }: { testimonial: any }) {
  const [isLiked, setIsLiked] = useState(testimonial.addToWallOfLove);
  const [isPending, startTransition] = useTransition();

  const toggleLike = async () => {
    startTransition(() => {
      toggleWallOfLove(testimonial.id, !isLiked).then((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        setIsLiked(!isLiked);
      });
    });
  };

  return (
    <Card className="p-3 flex flex-col space-y-2">
      <div className="flex justify-between">
        <div>
          <BadgeOfTestimonials category={testimonial.feedbackType} />
        </div>
        <button onClick={toggleLike}>
          <Heart
            size={24}
            fill={isLiked ? "red" : "none"}
            className={isLiked ? "text-red-500" : ""}
          />
        </button>
      </div>
      <div className="flex">{renderStars(testimonial.rating)}</div>
      <div className="text-sm">{testimonial.answer}</div>
      <div className="text-xs italic text-muted-foreground">
        <h3>{testimonial.name}</h3>
        <h4>{testimonial.email}</h4>
        <div>{renderDate(testimonial.createdAt)}</div>
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
