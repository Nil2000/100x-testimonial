"use client";
import React from "react";
import TestimonialsList from "./testimonials-list";
import EmptyState from "./empty-state";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type Props = {
  spaceName: string;
  testimonialList: any;
  spaceId: string;
  wallOfLoveSettings?: {
    style: string;
    styleOptions: {
      columns?: string;
      rows?: string;
      cardVariant?: string;
      showRating?: string;
      showDate?: string;
      gap?: string;
    };
  };
};

export default function WallOfLovePage({
  spaceName,
  testimonialList,
  spaceId,
  wallOfLoveSettings,
}: Props) {
  console.log(wallOfLoveSettings);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <MessageSquareHeart className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-lg font-semibold font-dm_serif">
                  Wall of Love
                </h1>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Create yours <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-dm_serif">
              {spaceName}
            </h2>
            {testimonialList.length > 0 && (
              <p className="text-base sm:text-lg text-muted-foreground font-poppins">
                {testimonialList.length}{" "}
                {testimonialList.length === 1 ? "testimonial" : "testimonials"}{" "}
                from our community
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {testimonialList.length > 0 ? (
          <TestimonialsList
            testimonials={testimonialList}
            style={wallOfLoveSettings?.style}
            styleOptions={wallOfLoveSettings?.styleOptions}
          />
        ) : (
          <EmptyState spaceName={spaceName} />
        )}
      </div>

      {/* Footer - Only show when there are testimonials */}
      {testimonialList.length > 0 && (
        <div className="border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-6 max-w-xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold font-dm_serif">
                  Want to add yours?
                </h3>
                <p className="text-muted-foreground font-poppins">
                  Share your experience and help others make informed decisions
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/${spaceName}`}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Submit Your Feedback
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Build Your Own
                  </Button>
                </Link>
              </div>

              <Separator className="my-6" />

              <p className="text-xs text-muted-foreground font-poppins">
                Powered by 100x Testimonial
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
