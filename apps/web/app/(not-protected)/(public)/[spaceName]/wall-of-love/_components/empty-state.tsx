"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  spaceName: string;
  hideBranding?: boolean;
};

export default function EmptyState({ spaceName, hideBranding }: Props) {
  return (
    <div className="flex flex-col items-start gap-4 py-8 max-w-xl">
      <h2 className="font-dm_serif text-3xl sm:text-4xl tracking-tight">
        No testimonials yet
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Be the first to share how {spaceName} worked for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link href={`/${spaceName}`}>
          <Button size="lg">Leave a testimonial</Button>
        </Link>
        {!hideBranding && (
          <Link href="/">
            <Button size="lg" variant="outline">
              Create your own
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
