import React from "react";
import { getFeedbackById } from "@/actions/feedbackActions";
import { notFound } from "next/navigation";
import PublicEmbed from "./_component/_client";
import { TestimonialResponse } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ feedbackId: string }>;
}) {
  const { feedbackId } = await params;
  const feedback = await getFeedbackById(feedbackId);

  if (!feedback) {
    return notFound();
  }

  return <PublicEmbed feedback={feedback as TestimonialResponse} />;
}
