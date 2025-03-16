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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { feedbackConstants } from "@/lib/constants";
import { TestimonialResponse } from "@/lib/types";
import React, { useState } from "react";
import { TbBorderRadius } from "react-icons/tb";
import { RiShadowFill } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import BorderTabContent from "./share-testimonial-subcomponents/BorderTabContent";
import ShadowTabContent from "./share-testimonial-subcomponents/ShadowTabContent";
import BackgroundTabContent from "./share-testimonial-subcomponents/BackgroundTabContent";
import { Avatar } from "@/components/ui/avatar";

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
  const [alignment, setAlignment] = useState("left");
  const [padding, setPadding] = useState(10);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(670);
  const [borderRadius, setBorderRadius] = useState("medium");
  const [shadowType, setShadowType] = useState("none");
  const [shadowSize, setShadowSize] = useState("small");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderThickness, setBorderThickness] = useState(1);

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
              <Label>Alignment:</Label>
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
                <Label>Padding:</Label>
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
              <Label>Ratio:</Label>
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
            <Tabs defaultValue="border" className="mt-4 w-full">
              <TabsList>
                <TabsTrigger value="border" className="flex items-center gap-2">
                  <TbBorderRadius size={24} />
                  Border
                </TabsTrigger>
                <TabsTrigger value="shadow" className="flex items-center gap-2">
                  <RiShadowFill size={24} />
                  Shadow
                </TabsTrigger>
                <TabsTrigger
                  value="background"
                  className="flex items-center gap-2"
                >
                  <TbBackground size={24} />
                  Background
                </TabsTrigger>
              </TabsList>
              <TabsContent value="border">
                <BorderTabContent
                  showBorder={showBorder}
                  setShowBorder={setShowBorder}
                  borderRadius={borderRadius}
                  setBorderRadius={setBorderRadius}
                  borderColor={borderColor}
                  setBorderColor={setBorderColor}
                  borderThickness={borderThickness}
                  setBorderThickness={setBorderThickness}
                />
              </TabsContent>
              <TabsContent value="shadow">
                <ShadowTabContent
                  shadowType={shadowType}
                  setShadowType={setShadowType}
                  shadowSize={shadowSize}
                  setShadowSize={setShadowSize}
                  shadowColor={shadowColor}
                  setShadowColor={setShadowColor}
                />
              </TabsContent>
              <TabsContent value="background">
                <BackgroundTabContent
                  background={background}
                  setBackground={setBackground}
                />
              </TabsContent>
            </Tabs>
            <div className="flex items-start overflow-x-hidden">
              <div
                className="flex justify-center items-center"
                style={{
                  aspectRatio: `${width}/${height}`,
                  textAlign: alignment as "left" | "center" | "right",
                  padding: `${padding * 2}px ${padding}px`,
                  backgroundColor: background,
                }}
              >
                <div className="w-full my-2">
                  <div
                    className="p-6 bg-primary-foreground border-2 rounded-md h-full"
                    style={{
                      border: showBorder
                        ? `${borderThickness}px solid ${borderColor}`
                        : "none",
                      borderRadius:
                        borderRadius === "small"
                          ? "5px"
                          : borderRadius === "medium"
                          ? "10px"
                          : "15px",
                      boxShadow:
                        shadowType === "none"
                          ? "none"
                          : shadowType === "standard"
                          ? shadowSize === "small"
                            ? `0 1px 3px ${shadowColor}`
                            : shadowSize === "medium"
                            ? `0 4px 6px ${shadowColor}`
                            : `0 10px 20px ${shadowColor}`
                          : shadowSize === "small"
                          ? `3px 3px 0 0 ${shadowColor}`
                          : shadowSize === "medium"
                          ? `6px 6px 0 0 ${shadowColor}`
                          : `9px 9px 0 0 ${shadowColor}`,
                    }}
                  >
                    {/* <img src={feedbackInfo.avatar} alt={`${feedbackInfo.name}'s avatar`} /> */}
                    <h3 className="font-bold">{feedbackInfo.name}</h3>
                    <p>{renderStars(feedbackInfo.rating)}</p>
                    <p className="w-[80%]">{feedbackInfo.answer}</p>
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
