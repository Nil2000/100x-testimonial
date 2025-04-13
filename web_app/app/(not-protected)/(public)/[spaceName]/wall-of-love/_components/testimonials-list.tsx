import { TestimonialResponse } from "@/lib/types";
import React from "react";
import WallOfLoveCard from "./wall-of-love-card";

type Props = {
  testimonials: TestimonialResponse[] | undefined;
};

export default function TestimonialsList({ testimonials }: Props) {
  if (!testimonials) return null;

  const dividedTestimonials = dividTestimonialsListCol3(testimonials);

  return (
    <div className="flex items-center gap-4 mt-8 px-4 overflow-x-hidden w-[130%]">
      {/* {testimonials.map((testimonial) => (
        <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
      ))} */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-1/3">
          {dividedTestimonials!.col3.map((testimonial) => (
            <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          {dividedTestimonials!.col1.map((testimonial) => (
            <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          {dividedTestimonials!.col2.map((testimonial) => (
            <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          {dividedTestimonials!.col3.map((testimonial) => (
            <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          {dividedTestimonials!.col1.map((testimonial) => (
            <WallOfLoveCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

const dividTestimonialsListCol3 = (t: TestimonialResponse[]) => {
  if (!t) return null;
  let result = {
    col1: [] as TestimonialResponse[],
    col2: [] as TestimonialResponse[],
    col3: [] as TestimonialResponse[],
  };
  t.map((testimonial, index) => {
    let colIndex = index % 3;
    if (colIndex === 0) {
      result.col1.push(testimonial);
    } else if (colIndex === 1) {
      result.col2.push(testimonial);
    } else {
      result.col3.push(testimonial);
    }
  });

  if (result.col1 > result.col2) {
    let temp = result.col1;
    result.col1 = result.col2;
    result.col2 = temp;
  } else if (result.col2 > result.col3) {
    let temp = result.col2;
    result.col2 = result.col3;
    result.col3 = temp;
  }

  return result;
};
