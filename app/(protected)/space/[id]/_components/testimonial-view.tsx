"use client";
import React from "react";
import TestimonialPreview from "./testimonial-preview";
import TestimonialEditFormView from "./testimonial-edit-form";

export default function TestimonialView() {
  return (
    <div className="px-2 grid grid-cols-1 md:grid-cols-2">
      <TestimonialEditFormView />
      <TestimonialPreview />
    </div>
  );
}
