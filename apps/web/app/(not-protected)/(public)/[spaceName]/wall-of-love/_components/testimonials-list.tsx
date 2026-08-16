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
    showRating?: string;
  };
  themeType?: "light" | "dark";
};

export default function TestimonialsList({
  testimonials,
  style = "list",
  styleOptions = {},
  themeType = "light",
}: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  const renderListStyle = () => {
    const columns = parseInt(styleOptions.columns || "3");
    const dividedTestimonials = divideTestimonials(testimonials, columns);
    const columnWidthClass = getColumnWidthClass(columns);

    return (
      <div className="flex gap-5 flex-col md:flex-row justify-center w-full">
        {dividedTestimonials.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col gap-5 w-full ${columnWidthClass}`}
          >
            {column.map((testimonial) => (
              <WallOfLoveCard
                key={testimonial.id}
                testimonial={testimonial}
                styleOptions={styleOptions}
                themeType={themeType}
              />
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
                    themeType={themeType}
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
    const dividedByRows = divideTestimonialsIntoRows(testimonials, rows);
    const duplicatedTestimonials = dividedByRows.map((row) => [...row, ...row]);

    return (
      <div className="w-full overflow-hidden relative">
        <div className="flex flex-col gap-5 overflow-hidden">
          {duplicatedTestimonials.map((row, rowIndex) => (
            <Marquee key={rowIndex} pauseOnHover reverse={rowIndex % 2 === 0}>
              {row.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[320px] h-min mx-2"
                >
                  <WallOfLoveCard
                    testimonial={testimonial}
                    styleOptions={styleOptions}
                    themeType={themeType}
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

  const renderContent = () => {
    switch (style) {
      case "carousel":
        return renderCarouselStyle();
      case "infiniteScrollHorizontal":
        return renderInfiniteScrollHorizontal();
      case "list":
      default:
        return renderListStyle();
    }
  };

  return <div className="w-full z-20 sm:px-5 px-2">{renderContent()}</div>;
}

const getColumnWidthClass = (columns: number) => {
  switch (columns) {
    case 1:
      return "md:max-w-2xl";
    case 2:
      return "md:w-1/2";
    case 4:
      return "md:w-1/4";
    case 3:
    default:
      return "md:w-1/3";
  }
};

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
