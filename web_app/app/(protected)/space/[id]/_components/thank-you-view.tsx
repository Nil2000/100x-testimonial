import React from "react";
import ThankYouForm from "./thank-you-form";
import ThankYouViewPreview from "./thank-you-live-preview";

export default function ThankYouView() {
  return (
    <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
      <ThankYouForm />
      <ThankYouViewPreview />
    </div>
  );
}
