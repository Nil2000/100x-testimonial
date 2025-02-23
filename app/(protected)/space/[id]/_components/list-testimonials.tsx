"use client";
import React from "react";
import axios from "axios";
import { useSpaceStore } from "@/store/spaceStore";
import Loading from "@/components/loader";
import TestimonialCard from "./manage-testimonials/testimonial-card";
type Props = {
  category?: string;
  wallOfLove?: boolean;
  archived?: boolean;
};

export default function ListTestimonials({
  category,
  wallOfLove,
  archived,
}: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [testimonials, setTestimonials] = React.useState([]);
  const { spaceInfo } = useSpaceStore();
  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/testimonials", {
          params: {
            category,
            spaceId: spaceInfo.id,
            addToWallOfLove: wallOfLove,
            archived,
          },
        });
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }

  const removeFromWallOfLove = (id: string) => {
    if (!id) return;

    if (wallOfLove) {
      setTestimonials((prev) => prev.filter((t: any) => t.id !== id));
    }
  };

  return (
    <div
      key={`list-testimonials-${category}`}
      className="max-w-full p-3 space-y-3"
    >
      {!testimonials.length && (
        <div className="w-full text-center text-muted-foreground text-sm italic">
          No testimonials found
        </div>
      )}
      {testimonials.map((testimonial: any) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          removeFromWallOfLove={removeFromWallOfLove}
        />
      ))}
    </div>
  );
}
