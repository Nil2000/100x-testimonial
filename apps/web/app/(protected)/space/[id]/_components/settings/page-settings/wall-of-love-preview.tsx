"use client";
import React from "react";
import TestimonialsList from "@/app/(not-protected)/(public)/[spaceName]/wall-of-love/_components/testimonials-list";
import { useSpaceStore } from "@/store/spaceStore";
import type { TestimonialResponse } from "@/lib/types";
import type { WallOfLoveSettings } from "@/lib/wall-of-love-settings";
import {
  AnalysisStatus,
  FeedbackType,
  SentimentType,
  SourceType,
} from "@repo/db/enums";

type Props = {
  spaceId: string;
  settings: WallOfLoveSettings;
};

const PLACEHOLDER_TESTIMONIALS: Omit<TestimonialResponse, "id">[] = [
  {
    answer:
      "This completely changed how we collect feedback. Setup took minutes and our wall looks fantastic.",
    name: "Alex Rivera",
    rating: 5,
  },
  {
    answer: "Simple, clean, and exactly what we needed for our landing page.",
    name: "Priya Sharma",
    rating: 4,
  },
  {
    answer: "Our customers love leaving reviews now - the form is so easy to fill out.",
    name: "Jordan Lee",
    rating: 5,
  },
].map((placeholder) => ({
  ...placeholder,
  email: "",
  permission: true,
  spaceId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  feedbackType: FeedbackType.TEXT,
  addToWallOfLove: true,
  videoUrl: null,
  imageUrl: null,
  profileImageUrl: null,
  isSpam: false,
  spamStatus: AnalysisStatus.COMPLETED,
  isSocial: false,
  sentiment: SentimentType.POSITIVE,
  sentimentStatus: AnalysisStatus.COMPLETED,
  source: SourceType.WEBSITE,
  sourceUrl: null,
  metadata: null,
  styleSettings: null,
}));

export default function WallOfLovePreview({ spaceId, settings }: Props) {
  const { spaceInfo } = useSpaceStore();
  const [testimonials, setTestimonials] = React.useState<
    TestimonialResponse[] | null
  >(null);

  React.useEffect(() => {
    if (!spaceId) return;
    let cancelled = false;

    fetch(`/api/testimonials?spaceId=${spaceId}&addToWallOfLove=true`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((data: { records?: TestimonialResponse[] }) => {
        if (!cancelled) setTestimonials(data.records ?? []);
      })
      .catch(() => {
        if (!cancelled) setTestimonials([]);
      });

    return () => {
      cancelled = true;
    };
  }, [spaceId]);

  const showPlaceholders = testimonials !== null && testimonials.length === 0;
  const previewTestimonials = showPlaceholders
    ? PLACEHOLDER_TESTIMONIALS.map((placeholder, index) => ({
        ...placeholder,
        id: `placeholder-${index}`,
      }))
    : testimonials ?? [];

  const headline =
    settings.headline?.trim() ||
    `What people say about ${spaceInfo.name || "your space"}`;
  const subtitle =
    settings.subtitle?.trim() ||
    "Stories from people who used this product.";

  return (
    <div className="relative w-full rounded-lg border overflow-hidden bg-background text-foreground">
      <div className="w-full border-b border-border px-6 py-8">
        <h2 className="font-dm_serif text-2xl tracking-tight max-w-[20ch]">
          {headline}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-[60ch]">
          {subtitle}
        </p>
      </div>

      <div className="w-full p-6 min-h-[400px] flex items-center justify-center bg-background">
        {testimonials === null ? (
          <p className="text-sm text-muted-foreground">Loading preview...</p>
        ) : (
          <TestimonialsList
            testimonials={previewTestimonials}
            style={settings.style}
            styleOptions={settings.styleOptions}
          />
        )}
      </div>

      {showPlaceholders && (
        <p className="px-6 pb-4 text-xs text-muted-foreground">
          Showing sample testimonials. Add some to your Wall of Love to see real ones here.
        </p>
      )}
    </div>
  );
}
