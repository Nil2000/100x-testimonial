import React from "react";
import ThankYouForm from "./thankyou-form";
import ThankYouViewPreview from "./thankyou-live-preview";

export default function ThankYouView() {
  return (
    <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
      <ThankYouForm />
      <ThankYouViewPreview />
    </div>
  );
}
