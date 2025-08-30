import { TestimonialResponse } from "@/lib/types";
import React from "react";

type PublicEmbedProps = {
  feedback: TestimonialResponse & {
    styleSettings: any;
  };
};

export default function PublicEmbed({ feedback }: PublicEmbedProps) {
  // TODO: Add the stylings saved and just display the feedback
  return <div>JSON.stringify(feedback.styleSettings)</div>;
}
