"use client";
import { TestimonialResponse } from "@/lib/types";
import React from "react";
import WallOfLoveCard from "./wall-of-love-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

type Props = {
  testimonials: TestimonialResponse[] | undefined;
  style?: string;
  styleOptions?: {
    columns?: string;
    rows?: string;
  };
};

export default function TestimonialsList({
  testimonials,
  style = "list",
  styleOptions = {},
}: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const renderListStyle = () => {
    const columns = parseInt(styleOptions.columns || "3");
    const dividedTestimonials = divideTestimonials(testimonials, columns);

    return (
      <div className="flex gap-4 flex-col sm:flex-row">
        {dividedTestimonials.map((column, colIndex) => (
          <div key={colIndex} className={`flex flex-col gap-4 w-full sm:w-1/2`}>
            {column.map((testimonial) => (
              <div className="gap-4">
                <WallOfLoveCard
                  testimonial={testimonial}
                  key={testimonial.id}
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
    const itemsPerSlide = columns;
    const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const currentTestimonials = testimonials.slice(
      currentIndex * itemsPerSlide,
      (currentIndex + 1) * itemsPerSlide
    );

    return (
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="p-2"
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {totalSlides}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="p-2"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        <div
          className={`grid gap-4 ${
            columns === 1
              ? "grid-cols-1"
              : columns === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {currentTestimonials.map((testimonial) => (
            <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
      </div>
    );
  };

  const renderInfiniteScrollHorizontal = () => {
    const rows = parseInt(styleOptions.rows || "1");
    const dividedByRows = divideTestimonialsIntoRows(testimonials, rows);
    const duplicatedTestimonials = dividedByRows.map((row) => [...row, ...row]);

    return (
      <div className="w-full overflow-hidden relative">
        <div
          ref={scrollContainerRef}
          className="flex flex-col gap-4 overflow-hidden"
        >
          {duplicatedTestimonials.map((row, rowIndex) => (
            <Marquee key={rowIndex} pauseOnHover reverse={rowIndex % 2 === 0}>
              {row.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-max h-min"
                >
                  <WallOfLoveCard testimonial={testimonial} />
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
    const dividedTestimonials = divideTestimonials(testimonials, columns);
    const duplicatedColumns = dividedTestimonials.map((column) => [
      ...column,
      ...column,
    ]);

    return (
      <div className="w-full overflow-hidden" style={{ height: "600px" }}>
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-hidden h-full ${
            columns === 1
              ? ""
              : columns === 2
              ? "justify-center"
              : "justify-center"
          }`}
        >
          {duplicatedColumns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`flex flex-col gap-4 animate-scroll-vertical ${
                columns === 1 ? "w-full" : columns === 2 ? "w-80" : "w-72"
              }`}
              style={{
                animation: `scrollVertical ${
                  column.length * 2
                }s linear infinite`,
              }}
            >
              {column.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0"
                >
                  <WallOfLoveCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          ))}
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
      case "infiniteScrollVertical":
        return renderInfiniteScrollVertical();
      case "list":
      default:
        return renderListStyle();
    }
  };

  return <div className="w-full z-20 sm:px-5 px-2">{renderContent()}</div>;
}

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
