"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquareHeart,
  ArrowRight,
  Quote,
  Star,
  Heart,
} from "lucide-react";
import Link from "next/link";

type Props = {
  spaceName: string;
};

export default function EmptyState({ spaceName }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12 w-full">
      <div className="max-w-2xl w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute -top-3 -left-4 w-8 h-8 rounded-full bg-amber-200/40 blur-xl" />
            <div className="absolute -bottom-3 -right-4 w-8 h-8 rounded-full bg-primary/30 blur-xl" />

            <div className="relative bg-gradient-to-br from-card to-card/50 p-6 rounded-3xl border border-border/60 shadow-lg">
              <div className="relative">
                <Quote
                  className="absolute -top-1 -left-1 w-4 h-4 text-primary/40 rotate-180"
                  strokeWidth={2}
                />
                <MessageSquareHeart
                  className="w-14 h-14 text-primary"
                  strokeWidth={1.5}
                />
                <Quote
                  className="absolute -bottom-1 -right-1 w-4 h-4 text-primary/40"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-dm_serif">
              The wall is waiting for its first story
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto font-poppins leading-relaxed">
              Be the first to share your experience with{" "}
              <span className="text-foreground font-semibold">{spaceName}</span>
              . Your words might just be the spark someone else needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 w-full max-w-xl">
            <FeatureChip
              icon={<Star className="w-5 h-5" />}
              title="Share your story"
              description="Tell us what made it special"
            />
            <FeatureChip
              icon={<Heart className="w-5 h-5" />}
              title="Build trust"
              description="Help others feel confident"
            />
            <FeatureChip
              icon={<ArrowRight className="w-5 h-5" />}
              title="Make an impact"
              description="Inspire the next person"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link href={`/${spaceName}`}>
              <Button size="lg" className="w-full sm:w-auto shadow-md font-poppins">
                <MessageSquareHeart className="w-4 h-4 mr-2" />
                Be the First to Share
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-poppins"
              >
                Create Your Own
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureChip({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/15 transition-colors">
        {icon}
      </div>
      <p className="text-sm font-semibold font-poppins">{title}</p>
      <p className="text-xs text-muted-foreground font-poppins leading-snug">
        {description}
      </p>
    </div>
  );
}
