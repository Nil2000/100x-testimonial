"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import LivePreviewbadge from "./live-preview-badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

export default function PreviewSpace({
  selectedFile,
}: {
  selectedFile: File | null;
}) {
  return (
    <Card className="relative w-full h-full">
      <LivePreviewbadge location="Testimonial" />
      <div className="flex flex-col items-center h-full gap-4 py-4">
        {selectedFile ? (
          <Image
            src={URL.createObjectURL(selectedFile).toString()}
            width={60}
            height={60}
            alt="company_logo"
          />
        ) : (
          <Image src={"/logo.svg"} width={60} height={60} alt="logo" />
        )}
        <h1 className="text-3xl font-semibold">Header goes here...</h1>
        <p className="text-center text-foreground/40">
          Your custom message goes here...
        </p>
        <div className="flex flex-col gap-4 w-full px-7">
          <h2 className="text-xl uppercase">Let us know</h2>
          <ul className="space-y-2 list-square list-inside text-muted-foreground">
            <li>Who are you / what are you working on?</li>
            <li>What is the best thing about [our product / service]</li>
            <li>How has [our product / service] helped you?</li>
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
  );
}
