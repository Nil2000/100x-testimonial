"use client";
import React from "react";
import TestimonialsList from "./testimonials-list";
import EmptyState from "./empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Heart,
  MessageSquareHeart,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { TestimonialResponse } from "@/lib/types";

type Props = {
  spaceName: string;
  testimonialList: TestimonialResponse[];
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
  wallOfLoveSettings,
}: Props) {
  const total = testimonialList.length;
  const hasTestimonials = total > 0;

  const averageRating =
    hasTestimonials
      ? testimonialList.reduce((sum, t) => sum + (t.rating || 0), 0) /
        testimonialList.filter((t) => t.rating > 0).length
      : 0;

  const videoCount = testimonialList.filter(
    (t) => t.feedbackType === "VIDEO"
  ).length;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DecorativeBackground />

      <header className="relative z-50 border-b border-border/40 bg-background/70 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/30 transition-colors" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                  <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>
              <span className="font-poppins font-semibold text-sm sm:text-base">
                100xTestimonials
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link href={`/${spaceName}`} className="hidden sm:block">
                <Button variant="ghost" size="sm" className="font-poppins">
                  Leave a testimonial
                </Button>
              </Link>
              <Link href="/">
                <Button size="sm" className="font-poppins shadow-sm">
                  Create yours
                  <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 font-poppins text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Wall of Love
            </Badge>

            <h1 className="font-dm_serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              What people say about{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  {spaceName}
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/15 -z-0 rounded-sm"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="font-poppins text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Real stories from real people. Every testimonial below is a
              genuine voice from our community.
            </p>

            {hasTestimonials && (
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4">
                <StatChip
                  icon={<MessageSquareHeart className="w-4 h-4" />}
                  value={total.toString()}
                  label={total === 1 ? "testimonial" : "testimonials"}
                />
                {!Number.isNaN(averageRating) && averageRating > 0 && (
                  <StatChip
                    icon={
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    }
                    value={averageRating.toFixed(1)}
                    label="avg. rating"
                  />
                )}
                {videoCount > 0 && (
                  <StatChip
                    icon={<Sparkles className="w-4 h-4" />}
                    value={videoCount.toString()}
                    label={videoCount === 1 ? "video" : "videos"}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {hasTestimonials ? (
          <TestimonialsList
            testimonials={testimonialList}
            style={wallOfLoveSettings?.style}
            styleOptions={wallOfLoveSettings?.styleOptions}
          />
        ) : (
          <EmptyState spaceName={spaceName} />
        )}
      </section>

      {hasTestimonials && (
        <section className="relative z-10 border-t border-border/40 bg-gradient-to-b from-transparent via-primary/[0.03] to-primary/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6 shadow-sm">
              <Heart
                className="w-7 h-7 text-primary fill-primary/30"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-dm_serif text-3xl sm:text-4xl font-bold mb-3">
              Got something nice to say?
            </h3>
            <p className="font-poppins text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-8">
              Join the conversation and share how{" "}
              <span className="text-foreground font-medium">{spaceName}</span>{" "}
              made a difference for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${spaceName}`}>
                <Button size="lg" className="w-full sm:w-auto shadow-md font-poppins">
                  <MessageSquareHeart className="w-4 h-4 mr-2" />
                  Submit Your Testimonial
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-poppins"
                >
                  Build Your Own Wall
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="relative z-10 border-t border-border/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-poppins text-xs text-muted-foreground">
            © {new Date().getFullYear()} {spaceName}. All testimonials are
            shared with permission.
          </p>
          <Link
            href="/"
            className="font-poppins text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            Powered by{" "}
            <span className="font-semibold text-foreground">
              100xTestimonials
            </span>
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function StatChip({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/60 shadow-sm backdrop-blur-sm">
      <span className="text-primary">{icon}</span>
      <span className="font-poppins text-sm font-semibold">{value}</span>
      <span className="font-poppins text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function DecorativeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.07] rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-amber-200/[0.08] rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.015] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
    </div>
  );
}
