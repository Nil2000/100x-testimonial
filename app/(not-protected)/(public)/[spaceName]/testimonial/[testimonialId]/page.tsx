import { getFeedbackByIdAndSpaceName } from "@/actions/feedbackActions";
import { notFound } from "next/navigation";
import React from "react";
import TestimonialCard from "./_components/testimonial-card";
import { TestimonialResponse } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string; testimonialId: string }>;
}) {
  const { spaceName, testimonialId } = await params;

  const feedbackResponse = await getFeedbackByIdAndSpaceName(
    spaceName,
    testimonialId
  );

  if (!feedbackResponse) {
    return notFound();
  }

  return (
    <div className="lg:max-w-[1000px] mx-auto w-full overflow-x-hidden">
      <TestimonialCard testimonial={feedbackResponse as TestimonialResponse} />
    </div>
  );
}
