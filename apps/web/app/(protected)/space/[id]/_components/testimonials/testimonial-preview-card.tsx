import React from "react";
import { Card } from "@/components/ui/card";
import LivePreviewbadge from "@/components/live-preview-badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ImageIcon, Pen, Star, Video } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";
import { CollectionType } from "@repo/db/enums";
import { Question } from "@/lib/types";

export default function TestimonialPreview() {
  const { spaceInfo } = useSpaceStore();
  const {
    headerTitle,
    headerSubtitle,
    questions,
    collectionType,
    collectStar,
    logo,
  } = spaceInfo;

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
      <Card className="relative w-full overflow-hidden border-2 border-dashed border-muted-foreground/20">
        <div className="flex flex-col items-center h-full gap-5 p-6 pt-8">
          {/* Logo */}
          {logo ? (
            /* ponytail: plain img, not next/image — the picked-file preview is a
               blob: URL that next/image refuses to parse, and an 80px logo gains
               nothing from optimization. */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={spaceInfo.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <ImageIcon className="h-7 w-7" />
            </div>
          )}
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
                questions.map((question: Question) => (
                  <li
                    key={question.id}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>{question.title || "Untitled question"}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground/50 italic">
                  No questions added yet...
                </li>
              )}
            </ul>
          </div>
          {/* Star rating */}
          {collectStar && (
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 text-muted-foreground/40"
                  strokeWidth={2}
                />
              ))}
            </div>
          )}
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
