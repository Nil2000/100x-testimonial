"use client";
import React from "react";
import axios from "axios";
import { useSpaceStore } from "@/store/spaceStore";
import Loading from "@/components/loader";
import TestimonialCard from "./manage-testimonials/testimonial-card";
import { Virtuoso } from "react-virtuoso";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { feedbackPerPage } from "@/lib/constants";
import PaginationComponent from "@/components/pagination-component";

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
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(testimonials.length / feedbackPerPage);
  const [hasMore, setHasMore] = React.useState(true);
  const { spaceInfo } = useSpaceStore();

  const handleNextPage = () => {
    const isItemsLeft = testimonials.length - currentPage * feedbackPerPage > 0;
    if (isItemsLeft) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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

  const getTestimonialsByPage = () => {
    const start = (currentPage - 1) * feedbackPerPage;
    const end = start + feedbackPerPage;
    return testimonials.slice(start, end);
  };

  return (
    <div key={`list-testimonials-${category}`} className="w-full p-3 space-y-3">
      {!testimonials.length && (
        <div className="w-full text-center text-muted-foreground text-sm italic">
          No testimonials found
        </div>
      )}
      {getTestimonialsByPage().map((testimonial: any) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          removeFromWallOfLove={removeFromWallOfLove}
        />
      ))}
      <div className="w-full flex justify-center">
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
}
