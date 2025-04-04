import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LivePreviewbadge from "@/components/live-preview-badge";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";

export default function TestimonialPreview() {
  const { spaceInfo } = useSpaceStore();
  const { headerTitle, headerSubtitle, questions } = spaceInfo;
  return (
    <div className="pt-4 sm:max-w-[400px] w-full mx-auto">
      <Card className="relative w-full h-max pb-4 rounded-md">
        <CardContent>
          <LivePreviewbadge location="Testimonial" />
          <div className="flex flex-col items-center h-full gap-4 py-4">
            {/* <ImagePrview selectedFile={selectedFile} /> */}
            <Image
              src={spaceInfo.logo}
              width={100}
              height={100}
              alt={spaceInfo.name}
            />
            <h1 className="text-3xl font-semibold">
              {headerTitle || "Header goes here..."}
            </h1>
            <p className="text-center text-foreground/40">
              {headerSubtitle || "Your custom message goes here..."}
            </p>
            <div className="flex flex-col gap-4 w-full px-7">
              <h2 className="text-xl uppercase">Let us know</h2>
              <ul className="space-y-2 list-square list-inside text-muted-foreground">
                {questions.map((question: any) => (
                  <li key={question.id}>{question.title}</li>
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
        </CardContent>
      </Card>
    </div>
  );
}
