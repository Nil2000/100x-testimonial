"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareHeart, ArrowRight, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

type Props = {
  spaceName: string;
};

export default function EmptyState({ spaceName }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-16 w-full">
      <div className="max-w-2xl w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative bg-primary/5 p-6 rounded-2xl border border-primary/20">
              <MessageSquareHeart
                className="w-16 h-16 text-primary"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-dm_serif">
              No testimonials yet
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto font-poppins">
              Be the first to share your experience with{" "}
              <span className="text-primary font-semibold">{spaceName}</span>{" "}
              and inspire others.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4 w-full max-w-lg">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <Sparkles className="w-6 h-6 text-primary" />
              <p className="text-xs sm:text-sm font-medium font-poppins">
                Share story
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <Heart className="w-6 h-6 text-primary" />
              <p className="text-xs sm:text-sm font-medium font-poppins">
                Build trust
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <ArrowRight className="w-6 h-6 text-primary" />
              <p className="text-xs sm:text-sm font-medium font-poppins">
                Make impact
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link href={`/${spaceName}`}>
              <Button size="lg" className="w-full sm:w-auto">
                <MessageSquareHeart className="w-4 h-4 mr-2" />
                Submit Your Feedback
              </Button>
            </Link>

            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
