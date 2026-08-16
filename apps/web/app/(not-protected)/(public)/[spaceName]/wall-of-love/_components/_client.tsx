"use client";

import React from "react";
import Image from "next/image";
import TestimonialsList from "./testimonials-list";
import EmptyState from "./empty-state";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Heart, Moon, Star, Sun } from "lucide-react";
import Link from "next/link";
import { TestimonialResponse } from "@/lib/types";
import type { WallOfLoveSettings } from "@/lib/wall-of-love-settings";
import { pickFeaturedTestimonial } from "@/lib/wall-of-love-featured";
import { cn } from "@/lib/utils";

export type WallOfLoveSpaceBranding = {
  logo: string | null;
  showBrandLogo: boolean;
  font: string | null;
  themeType: "light" | "dark";
};

type Props = {
  spaceName: string;
  testimonialList: TestimonialResponse[];
  wallOfLoveSettings?: WallOfLoveSettings;
  space: WallOfLoveSpaceBranding;
};

export default function WallOfLovePage({
  spaceName,
  testimonialList,
  wallOfLoveSettings,
  space,
}: Props) {
  const [override, setOverride] = React.useState<"light" | "dark" | null>(null);
  const scheme = override ?? space.themeType;

  const total = testimonialList.length;
  const hasTestimonials = total > 0;
  const hideBranding = Boolean(wallOfLoveSettings?.hideBranding);
  const brandLogoSrc = space.showBrandLogo && space.logo ? space.logo : null;
  const bodyFont = space.font
    ? { fontFamily: `'${space.font}', ui-sans-serif, sans-serif` }
    : undefined;

  const headline =
    wallOfLoveSettings?.headline?.trim() ||
    `What people say about ${spaceName}`;
  const subtitle =
    wallOfLoveSettings?.subtitle?.trim() ||
    "Stories from people who used this product.";

  const rated = testimonialList.filter((t) => t.rating > 0);
  const averageRating = rated.length
    ? rated.reduce((sum, t) => sum + t.rating, 0) / rated.length
    : 0;
  const videoCount = testimonialList.filter(
    (t) => t.feedbackType === "VIDEO",
  ).length;

  const featured = pickFeaturedTestimonial(testimonialList);
  const wallTestimonials = featured
    ? testimonialList.filter((t) => t.id !== featured.id)
    : testimonialList;

  const showRating = wallOfLoveSettings?.styleOptions?.showRating !== "false";
  const featuredRating = Math.max(
    0,
    Math.min(5, Math.round(featured?.rating || 0)),
  );

  return (
    <div
      className={cn(
        "relative min-h-screen bg-background text-foreground",
        !space.font && "font-geist",
        scheme === "dark" ? "dark" : "light",
      )}
      style={bodyFont}
    >
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {brandLogoSrc ? (
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 rounded-md overflow-hidden border border-border shrink-0">
                  <Image
                    src={brandLogoSrc}
                    alt={spaceName}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-sm sm:text-base truncate">
                  {spaceName}
                </span>
              </div>
            ) : !hideBranding ? (
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-md border border-border flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-foreground" />
                </div>
                <span className="font-medium text-sm sm:text-base">
                  TestiFlow
                </span>
              </Link>
            ) : (
              <span className="font-medium text-sm sm:text-base truncate">
                {spaceName}
              </span>
            )}

            <div className="flex items-center gap-1 sm:gap-2">
              <SchemeToggle
                scheme={scheme}
                onToggle={() =>
                  setOverride(scheme === "dark" ? "light" : "dark")
                }
              />
              <Link href={`/${spaceName}`} className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Leave a testimonial
                </Button>
              </Link>
              {!hideBranding && (
                <Link href="/">
                  <Button size="sm" variant="outline">
                    Create yours
                    <ArrowUpRight size={14} className="ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-12 pb-8 sm:pt-20 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0}>
            <h1 className="font-dm_serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] max-w-[20ch]">
              {headline}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-[60ch] leading-relaxed">
              {subtitle}
            </p>
          </FadeIn>

          {hasTestimonials && (
            <FadeIn delay={60}>
              <StatsRule
                total={total}
                averageRating={averageRating}
                videoCount={videoCount}
              />
            </FadeIn>
          )}
        </div>
      </section>

      {featured && featured.answer && (
        <section className="relative z-10 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={120}>
              <blockquote className="relative max-w-3xl pl-2 sm:pl-4">
                <span
                  className="font-dm_serif text-7xl sm:text-8xl leading-none text-primary select-none absolute -left-1 -top-6 sm:-left-3"
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-dm_serif text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight pt-8">
                  {featured.answer.trim()}
                </p>
                <footer className="mt-6 flex items-center gap-3 text-sm">
                  <cite className="not-italic font-medium">{featured.name}</cite>
                  {showRating && featuredRating > 0 && (
                    <span
                      className="inline-flex items-center gap-0.5"
                      aria-label={`${featuredRating} out of 5 stars`}
                    >
                      {Array.from({ length: featuredRating }, (_, index) => (
                        <Star
                          key={index}
                          size={14}
                          className="fill-amber-400 text-amber-400"
                          aria-hidden="true"
                        />
                      ))}
                    </span>
                  )}
                </footer>
              </blockquote>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {hasTestimonials ? (
          <FadeIn delay={180}>
            <TestimonialsList
              testimonials={wallTestimonials}
              style={wallOfLoveSettings?.style}
              styleOptions={wallOfLoveSettings?.styleOptions}
            />
          </FadeIn>
        ) : (
          <EmptyState spaceName={spaceName} hideBranding={hideBranding} />
        )}
      </section>

      {hasTestimonials && (
        <section className="relative z-10 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="font-dm_serif text-2xl sm:text-3xl tracking-tight">
              Got something to add?
            </h2>
            <Link href={`/${spaceName}`}>
              <Button size="lg">Leave a testimonial</Button>
            </Link>
          </div>
        </section>
      )}

      <footer className="relative z-10 border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="font-geist_mono text-[11px] uppercase tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} {spaceName}. All testimonials are
            shared with permission.
          </p>
          {!hideBranding && (
            <Link
              href="/"
              className="font-geist_mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Powered by{" "}
              <span className="text-foreground">TestiFlow</span>
              <ArrowUpRight size={12} />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

function FadeIn({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="motion-safe:animate-wol-enter motion-reduce:animate-none"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StatsRule({
  total,
  averageRating,
  videoCount,
}: {
  total: number;
  averageRating: number;
  videoCount: number;
}) {
  const parts: { value: string; label: string }[] = [
    {
      value: total.toString(),
      label: total === 1 ? "testimonial" : "testimonials",
    },
  ];
  if (averageRating > 0) {
    parts.push({ value: averageRating.toFixed(1), label: "avg" });
  }
  if (videoCount > 0) {
    parts.push({
      value: videoCount.toString(),
      label: videoCount === 1 ? "video" : "videos",
    });
  }

  return (
    <p className="mt-8 pt-4 border-t border-border font-geist_mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
      {parts.map((part, index) => (
        <span key={part.label}>
          {index > 0 && (
            <span className="mr-4 text-border" aria-hidden="true">
              ·
            </span>
          )}
          <span className="text-foreground">{part.value}</span> {part.label}
        </span>
      ))}
    </p>
  );
}

function SchemeToggle({
  scheme,
  onToggle,
}: {
  scheme: "light" | "dark";
  onToggle: () => void;
}) {
  const isDark = scheme === "dark";
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative h-9 w-9"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all",
          isDark ? "scale-0 rotate-90 absolute" : "scale-100 rotate-0",
        )}
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-all",
          isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90 absolute",
        )}
      />
    </Button>
  );
}
