"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Pen } from "lucide-react";
import ImagePrview from "./image-preview";
import LivePreviewbadge from "@/components/live-preview-badge";
import { CreateSpaceQuestion } from "@/lib/types";
import { CollectionType } from "@/generated/prisma/enums";

export default function PreviewSpace({
  selectedFile,
  headerTitle,
  customMessage,
  questions,
  collectionType,
}: {
  selectedFile: File | null;
  headerTitle: string;
  customMessage: string;
  questions: CreateSpaceQuestion[];
  collectionType: CollectionType;
}) {
  const validQuestions = questions.filter((q) => q.title.trim() !== "");

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
            <ImagePrview selectedFile={selectedFile} />
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
              {customMessage || (
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
              {validQuestions.length > 0 ? (
                validQuestions.map((question) => (
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
                  Add questions in the form...
                </li>
              )}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="w-full pt-2">
            <Button className="w-full group gap-2" size="lg">
              <Pen
                className="transition-transform group-hover:-rotate-12"
                size={16}
                strokeWidth={2}
              />
              Write a Testimonial
            </Button>
          </div>
        </div>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        This is how your testimonial page will look
      </p>
    </div>
  );
}
