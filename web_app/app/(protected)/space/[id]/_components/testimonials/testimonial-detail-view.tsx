"use client";
import React from "react";
import TestimonialPreviewCard from "./testimonial-preview-card";
import TestimonialEditFormView from "./edit-testimonial-form";
import { Eye } from "lucide-react";

export default function TestimonialView() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="space-y-4">
        <TestimonialEditFormView />
      </div>

      {/* Preview Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Eye className="h-4 w-4" />
          <span>Live Preview</span>
        </div>
        <div className="sticky top-4">
          <TestimonialPreviewCard />
        </div>
      </div>
    </div>
  );
}
