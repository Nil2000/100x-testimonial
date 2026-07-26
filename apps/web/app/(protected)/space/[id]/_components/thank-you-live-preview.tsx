import LivePreviewbadge from "@/components/live-preview-badge";
import { Card } from "@/components/ui/card";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import React from "react";

export default function ThankYouViewPreview() {
  const { spaceInfo } = useSpaceStore();
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Live Preview
        </h3>
        <LivePreviewbadge location="ThankYou" />
      </div>
      <Card className="relative w-full overflow-hidden border-2 border-dashed border-muted-foreground/20 bg-gradient-to-b from-muted/30 to-background">
        <div className="flex flex-col items-center h-full gap-5 p-6 pt-8">
          {/* Celebration Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
            <Image
              src={
                "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmJ4eWVzeDU5dHJvMjF2ZWlmdDZidDV1dmRpNXVkanJkZjl3bGNqZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g9582DNuQppxC/giphy.gif"
              }
              alt="Thank you"
              width={280}
              height={280}
              className="relative rounded-lg"
            />
          </div>
          {/* Content */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {spaceInfo.thanksSpace.title || (
                <span className="text-muted-foreground/50">Thank you !!!</span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground max-w-md">
              {spaceInfo.thanksSpace.message || (
                <span className="text-muted-foreground/50">
                  Thank you for your feedback
                </span>
              )}
            </p>
          </div>
        </div>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        This is what users will see after submitting
      </p>
    </div>
  );
}
