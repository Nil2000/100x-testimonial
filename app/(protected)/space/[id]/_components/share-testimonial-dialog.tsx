"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { feedbackConstants } from "@/lib/constants";
import { TestimonialResponse } from "@/lib/types";
import React, { useState } from "react";

type ShareTestimonialDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  feedbackInfo: TestimonialResponse | null;
};

export default function ShareTestimonialDialog({
  isOpen,
  onClose,
  feedbackInfo,
}: ShareTestimonialDialogProps) {
  const [alignment, setAlignment] = useState("center");
  const [padding, setPadding] = useState(10);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(670);
  const [borderRadius, setBorderRadius] = useState("medium");

  const handleDownloadPNG = () => {
    // Implement download PNG functionality
  };

  const handleCopyToClipboard = () => {
    // Implement copy to clipboard functionality
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-scroll sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a testimonial image</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        {feedbackInfo && (
          <>
            <div className="flex flex-col space-y-3">
              <h2>Alignment:</h2>
              <RadioGroup
                defaultValue="left"
                className="flex"
                onValueChange={setAlignment}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="left" value="left" />
                  <Label htmlFor="left">Left</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="center" value="center" />
                  <Label htmlFor="center">Center</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="Right" value="Right" />
                  <Label htmlFor="Right">Right</Label>
                </div>
              </RadioGroup>
              <div className="max-w-sm space-y-3">
                <h2>Padding:</h2>
                <Slider
                  defaultValue={[padding]}
                  min={0}
                  max={250}
                  step={5}
                  onValueChange={(value) => setPadding(value[0])}
                  id="padding"
                  className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
                />
              </div>
              <h2>Ratio:</h2>
              <RadioGroup
                defaultValue="auto"
                className="flex"
                onValueChange={(value) => {
                  if (value === "auto") {
                    setWidth(1200);
                    setHeight(670);
                    return;
                  }
                  const [w, h] = value.split("x").map(Number);
                  setWidth(w);
                  setHeight(h);
                }}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="1200x670" value="auto" />
                  <Label htmlFor="1200x670">Auto</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="1200x670" value="1200x670" />
                  <Label htmlFor="1200x670"> 1200x670</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="1200x1200" value="1200x1200" />
                  <Label htmlFor="1200x1200">1200x1200</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="1080x1920" value="1080x1920" />
                  <Label htmlFor="1080x1920">1080x1920</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-start overflow-x-hidden">
              <div
                className="flex justify-center items-center"
                style={{
                  aspectRatio: `${width}/${height}`,
                  textAlign: alignment as "left" | "center" | "right",
                  padding: `${padding * 2}px ${padding}px`,
                  border: "1px solid #fff",
                }}
              >
                <div className="w-full my-2">
                  <div className="p-3 bg-primary-foreground border-2 rounded-md h-full">
                    {/* <img src={feedbackInfo.avatar} alt={`${feedbackInfo.name}'s avatar`} /> */}
                    <h3>{feedbackInfo.name}</h3>
                    <p>{feedbackInfo.answer}</p>
                    <p>{renderStars(feedbackInfo.rating)}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 ">
          <Button onClick={handleDownloadPNG}>Download PNG</Button>
          <Button onClick={handleCopyToClipboard}>Copy to clipboard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index}>⭐</span>
  ));
};
