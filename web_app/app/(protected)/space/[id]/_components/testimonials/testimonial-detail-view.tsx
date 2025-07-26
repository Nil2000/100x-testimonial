"use client";
import React from "react";
import TestimonialPreviewCard from "./testimonial-preview-card";
import TestimonialEditFormView from "./edit-testimonial-form";

export default function TestimonialView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-2">
      <TestimonialEditFormView />
      <TestimonialPreviewCard />
    </div>
  );
}
