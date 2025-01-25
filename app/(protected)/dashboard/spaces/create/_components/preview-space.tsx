"use client";
import { Card } from "@/components/ui/card";
import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import ImagePrview from "./image-preview";
import LivePreviewbadge from "@/components/live-preview-badge";

export default function PreviewSpace({
  selectedFile,
  headerTitle,
  customMessage,
  questions,
}: {
  selectedFile: File | null;
  headerTitle: string;
  customMessage: string;
  questions: { id: string; question: string; maxLength: number }[];
}) {
  return (
    <div>
      <Card className="relative w-full h-max pb-4">
        <LivePreviewbadge location="Testimonial" />
        <div className="flex flex-col items-center h-full gap-4 py-4">
          <ImagePrview selectedFile={selectedFile} />
          <h1 className="text-3xl font-semibold">
            {headerTitle || "Header goes here..."}
          </h1>
          <p className="text-center text-foreground/40">
            {customMessage || "Your custom message goes here..."}
          </p>
          <div className="flex flex-col gap-4 w-full px-7">
            <h2 className="text-xl uppercase">Let us know</h2>
            <ul className="space-y-2 list-square list-inside text-muted-foreground">
              {questions.map((question) => (
                <li key={question.id}>{question.question}</li>
              ))}
            </ul>
          </div>
          <div className="w-full px-7 mt-4 flex justify-center">
            <Button className="w-full max-w-72 group flex gap-1">
              <Pen
                className="me-1 transition-transform group-hover:-translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <h2>Write as text</h2>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
