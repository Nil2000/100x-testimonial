import LivePreviewbadge from "@/components/live-preview-badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import React from "react";

export default function ThankYouViewPreview() {
  const { spaceInfo } = useSpaceStore();
  return (
    <div className="pt-4 sm:w-[300px] w-full mx-auto">
      <Card className="relative rounded-md">
        <CardContent className="space-y-4">
          <LivePreviewbadge location="ThankYou" />
          <Image
            src={
              "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmJ4eWVzeDU5dHJvMjF2ZWlmdDZidDV1dmRpNXVkanJkZjl3bGNqZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g9582DNuQppxC/giphy.gif"
            }
            alt="Thank you"
            width={300}
            height={300}
          />
          <h1 className="w-full text-center text-2xl font-bold">
            {spaceInfo.thanksSpace.title || "Thank you !!!"}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            {spaceInfo.thanksSpace.message || "Thank you for your feedback"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
