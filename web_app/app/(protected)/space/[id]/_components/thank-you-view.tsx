"use client";
import React from "react";
import ThankYouForm from "./thank-you-form";
import ThankYouViewPreview from "./thank-you-live-preview";

export default function ThankYouView() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="w-full">
          <ThankYouForm />
        </div>

        {/* Preview Section */}
        <div className="w-full">
          <div className="sticky top-4">
            <ThankYouViewPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
