"use client";
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
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Create a testimonial image</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        {feedbackInfo && (
          <>
            <div>
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
                <div>
                  <Label htmlFor="padding">Padding:</Label>
                  <Slider
                    defaultValue={[padding]}
                    min={0}
                    max={50}
                    onValueChange={(value) => setPadding(value[0])}
                    id="padding"
                    className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
                  />
                </div>
                <h2>Ratio:</h2>
                <RadioGroup
                  defaultValue="1200x670"
                  className="flex"
                  onValueChange={(value) => {
                    const [w, h] = value.split("x").map(Number);
                    setWidth(w);
                    setHeight(h);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="1200x670" value="1200x670" />
                    <Label htmlFor="1200x670">1200x670</Label>
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
                <label>
                  Border Radius:
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="small"
                        checked={borderRadius === "small"}
                        onChange={() => setBorderRadius("small")}
                      />
                      Small
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="medium"
                        checked={borderRadius === "medium"}
                        onChange={() => setBorderRadius("medium")}
                      />
                      Medium
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="large"
                        checked={borderRadius === "large"}
                        onChange={() => setBorderRadius("large")}
                      />
                      Large
                    </label>
                  </div>
                </label>
              </div>
              <div
                className="testimonial-preview"
                style={{
                  textAlign: alignment as "left" | "center" | "right",
                  padding: `${padding}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  border: "1px solid #fff",
                }}
              >
                <div className="p-3 bg-primary-foreground border-2 rounded-md">
                  {/* <img src={feedbackInfo.avatar} alt={`${feedbackInfo.name}'s avatar`} /> */}
                  <h3>{feedbackInfo.name}</h3>
                  <p>{feedbackInfo.answer}</p>
                  <p>{renderStars(feedbackInfo.rating)}</p>
                </div>
              </div>
            </div>
          </>
        )}
        <DialogFooter>
          <button onClick={handleDownloadPNG}>Download PNG</button>
          <button onClick={handleCopyToClipboard}>Copy to clipboard</button>
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
