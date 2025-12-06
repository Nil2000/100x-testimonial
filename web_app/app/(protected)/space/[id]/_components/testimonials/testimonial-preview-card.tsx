import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LivePreviewbadge from "@/components/live-preview-badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Pen, Video } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import { CollectionType } from "@/generated/prisma/enums";

export default function TestimonialPreview() {
  const { spaceInfo } = useSpaceStore();
  const { headerTitle, headerSubtitle, questions, collectionType } = spaceInfo;

  console.log("Preview card - collectionType:", collectionType);

  const showText =
    collectionType === CollectionType.TEXT ||
    collectionType === CollectionType.TEXT_AND_VIDEO;
  const showVideo =
    collectionType === CollectionType.VIDEO ||
    collectionType === CollectionType.TEXT_AND_VIDEO;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Live Preview
        </h3>
        <LivePreviewbadge location="Testimonial" />
      </div>
      <Card className="relative w-full overflow-hidden border-2 border-dashed border-muted-foreground/20 bg-gradient-to-b from-muted/30 to-background">
        <div className="flex flex-col items-center h-full gap-5 p-6 pt-8">
          {/* Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <Image
              src={spaceInfo.logo}
              width={100}
              height={100}
              alt={spaceInfo.name}
              className="relative"
            />
          </div>
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {headerTitle || (
                <span className="text-muted-foreground/50">
                  Header goes here...
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs">
              {headerSubtitle || (
                <span className="text-muted-foreground/50">
                  Your custom message goes here...
                </span>
              )}
            </p>
          </div>
          {/* Questions */}
          <div className="w-full space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Questions
            </h2>
            <ul className="space-y-2">
              {questions.length > 0 ? (
                questions.map((question: any) => (
                  <li
                    key={question.id}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>{question.title}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground/50 italic">
                  No questions added yet...
                </li>
              )}
            </ul>
          </div>
          {/* CTA Buttons */}
          <div className="w-full pt-2">
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {showVideo && (
                <Button className="w-full group gap-2" variant={"outline"}>
                  <Video
                    className="transition-transform group-hover:-rotate-12"
                    size={16}
                    strokeWidth={2}
                  />
                  Upload video
                </Button>
              )}
              {showText && (
                <Button className="w-full group gap-2">
                  <Pen
                    className="transition-transform group-hover:-rotate-12"
                    size={16}
                    strokeWidth={2}
                  />
                  Write as text
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        This is how your testimonial page will look
      </p>
    </div>
  );
}
