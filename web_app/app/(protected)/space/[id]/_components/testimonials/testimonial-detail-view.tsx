"use client";
import React from "react";
import TestimonialPreviewCard from "./testimonial-preview-card";
import TestimonialEditFormView from "./edit-testimonial-form";
export default function TestimonialView() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="w-full">
          <TestimonialEditFormView />
        </div>

        {/* Preview Section */}
        <div className="w-full">
          <div className="sticky top-4">
            <TestimonialPreviewCard />
          </div>
        </div>
      </div>
    </div>
  );
}
