"use client";
import { TestimonialResponse } from "@/lib/types";
import React from "react";
import WallOfLoveCard from "./wall-of-love-card";
import { Marquee } from "@/components/ui/marquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {
  testimonials: TestimonialResponse[];
  style?: string;
  styleOptions?: {
    columns?: string;
    rows?: string;
    cardVariant?: string;
    showRating?: string;
    showDate?: string;
    gap?: string;
  };
};

export default function TestimonialsList({
  testimonials,
  style = "list",
  styleOptions = {},
}: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  const renderListStyle = () => {
    const columns = parseInt(styleOptions.columns || "3");
    const gapClass = getGapClass(styleOptions.gap);
    const dividedTestimonials = divideTestimonials(testimonials, columns);

    return (
      <div className={`flex ${gapClass} flex-col sm:flex-row justify-center`}>
        {dividedTestimonials.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col ${gapClass} w-full sm:w-1/2`}
          >
            {column.map((testimonial) => (
              <div className="gap-4" key={testimonial.id}>
                <WallOfLoveCard
                  testimonial={testimonial}
                  styleOptions={styleOptions}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderCarouselStyle = () => {
    const columns = parseInt(styleOptions.columns || "2");

    return (
      <div className="w-full flex items-center justify-center p-10 h-max">
        <Carousel
          opts={{
            align: "start",
          }}
          className={cn(
            columns == 3
              ? "w-full"
              : columns == 2
              ? "max-w-[40rem]"
              : "max-w-sm",
            "w-full"
          )}
        >
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className={`pl-1 flex items-center justify-center ${
                  columns == 3
                    ? "sm:basis-1/3 basis-full"
                    : columns == 2
                    ? "sm:basis-1/2 basis-full"
                    : ""
                }`}
              >
                <div className="w-full p-1">
                  <WallOfLoveCard
                    testimonial={testimonial}
                    styleOptions={styleOptions}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  };

  const renderInfiniteScrollHorizontal = () => {
    const rows = parseInt(styleOptions.rows || "1");
    const gapClass = getGapClass(styleOptions.gap);
    const dividedByRows = divideTestimonialsIntoRows(testimonials, rows);
    const duplicatedTestimonials = dividedByRows.map((row) => [...row, ...row]);

    return (
      <div className="w-full overflow-hidden relative">
        <div className={`flex flex-col ${gapClass} overflow-hidden`}>
          {duplicatedTestimonials.map((row, rowIndex) => (
            <Marquee key={rowIndex} pauseOnHover reverse={rowIndex % 2 === 0}>
              {row.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[200px] h-min"
                >
                  <WallOfLoveCard
                    testimonial={testimonial}
                    styleOptions={styleOptions}
                  />
                </div>
              ))}
            </Marquee>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    );
  };

  const renderInfiniteScrollVertical = () => {
    const columns = parseInt(styleOptions.columns || "2");
    const gapClass = getGapClass(styleOptions.gap);
    const dividedTestimonials = divideTestimonials(testimonials, columns);
    const duplicatedColumns = dividedTestimonials.map((column) => [
      ...column,
      ...column,
    ]);

    return (
      <div className="w-full overflow-hidden relative h-[600px]">
        <div
          className={`flex ${gapClass} overflow-hidden h-full justify-center w-full`}
        >
          {duplicatedColumns.map((column, colIndex) => (
            <Marquee
              key={colIndex}
              vertical={true}
              pauseOnHover
              reverse={colIndex % 2 === 0}
              className={`w-1/3`}
            >
              {column.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-full h-min"
                >
                  <WallOfLoveCard
                    testimonial={testimonial}
                    styleOptions={styleOptions}
                  />
                </div>
              ))}
            </Marquee>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>
    );
  };

  const renderContent = () => {
    switch (style) {
      case "carousel":
        return renderCarouselStyle();
      case "infiniteScrollHorizontal":
        return renderInfiniteScrollHorizontal();
      case "infiniteScrollVertical":
        return renderInfiniteScrollVertical();
      case "list":
      default:
        return renderListStyle();
    }
  };

  return <div className="w-full z-20 sm:px-5 px-2">{renderContent()}</div>;
}

const getGapClass = (gap?: string) => {
  switch (gap) {
    case "tight":
      return "gap-2";
    case "relaxed":
      return "gap-6";
    case "normal":
    default:
      return "gap-4";
  }
};

// Helper function to divide testimonials into columns
const divideTestimonials = (
  testimonials: TestimonialResponse[],
  columns: number
) => {
  const result: TestimonialResponse[][] = Array.from(
    { length: columns },
    () => []
  );

  testimonials.forEach((testimonial, index) => {
    const columnIndex = index % columns;
    result[columnIndex].push(testimonial);
  });

  return result;
};

// Helper function to divide testimonials into rows for horizontal scroll
const divideTestimonialsIntoRows = (
  testimonials: TestimonialResponse[],
  rows: number
) => {
  const result: TestimonialResponse[][] = Array.from(
    { length: rows },
    () => []
  );

  testimonials.forEach((testimonial, index) => {
    const rowIndex = index % rows;
    result[rowIndex].push(testimonial);
  });

  return result;
};
