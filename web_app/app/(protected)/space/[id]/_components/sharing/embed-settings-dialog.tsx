"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TestimonialResponse } from "@/lib/types";
import { TbBorderRadius } from "react-icons/tb";
import { RiShadowFill } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import { Text, UserRound, Layout } from "lucide-react";
import BorderTabContent from "./customization/BorderTabContent";
import ShadowTabContent from "./customization/ShadowTabContent";
import BackgroundTabContent from "./customization/BackgroundTabContent";
import TextTabContent from "./customization/TextTabContent";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

type EmbedSettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonial: TestimonialResponse | null;
};

export default function EmbedSettingsDialog({
  isOpen,
  onClose,
  testimonial,
}: EmbedSettingsDialogProps) {
  const { theme } = useTheme();

  // Layout states
  const [alignment, setAlignment] = useState("left");
  const [padding, setPadding] = useState(10);

  // Border states
  const [borderRadius, setBorderRadius] = useState("medium");
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderThickness, setBorderThickness] = useState(1);

  // Shadow states
  const [shadowType, setShadowType] = useState("none");
  const [shadowSize, setShadowSize] = useState("small");
  const [shadowColor, setShadowColor] = useState("#000000");

  // Background states
  const [background, setBackground] = useState("#ffffff");
  const [gradient, setGradient] = useState("");
  const [backgroundType, setBackgroundType] = useState("solid");
  const [cardBackground, setCardBackground] = useState("#000000");
  const [cardBackgroundType, setCardBackgroundType] = useState("solid");

  // Text states
  const [headerColor, setHeaderColor] = useState(
    theme === "dark" ? "#ffffff" : "#000000"
  );
  const [bodyColor, setBodyColor] = useState(
    theme === "dark" ? "#ffffff" : "#000000"
  );
  const [headerSize, setHeaderSize] = useState(20);
  const [bodySize, setBodySize] = useState(16);
  const [headerFont, setHeaderFont] = useState("");
  const [bodyFont, setBodyFont] = useState("");

  if (!testimonial) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto max-w-4xl overflow-x-hidden p-6">
        <DialogHeader className="max-w-[48rem]">
          <DialogTitle>Embed Settings</DialogTitle>
          <DialogDescription>
            Customize the appearance of your embedded testimonial
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-4">
            <Tabs defaultValue="layout" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="layout" className="flex items-center gap-1">
                  <Layout size={16} />
                  <span className="hidden sm:inline">Layout</span>
                </TabsTrigger>
                <TabsTrigger value="border" className="flex items-center gap-1">
                  <TbBorderRadius size={16} />
                  <span className="hidden sm:inline">Border</span>
                </TabsTrigger>
                <TabsTrigger value="shadow" className="flex items-center gap-1">
                  <RiShadowFill size={16} />
                  <span className="hidden sm:inline">Shadow</span>
                </TabsTrigger>
                <TabsTrigger
                  value="background"
                  className="flex items-center gap-1"
                >
                  <TbBackground size={16} />
                  <span className="hidden sm:inline">Background</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-1">
                  <Text size={16} />
                  <span className="hidden sm:inline">Text</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="layout" className="space-y-3 mt-3">
                <div className="space-y-3">
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
                      <RadioGroupItem id="right" value="right" />
                      <Label htmlFor="right">Right</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Padding: {padding}px</Label>
                  <Slider
                    defaultValue={[padding]}
                    min={0}
                    max={50}
                    step={2}
                    onValueChange={(value) => setPadding(value[0])}
                    className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
                  />
                </div>
              </TabsContent>

              <TabsContent value="border" className="mt-3">
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

              <TabsContent value="shadow" className="mt-3">
                <ShadowTabContent
                  shadowType={shadowType}
                  setShadowType={setShadowType}
                  shadowSize={shadowSize}
                  setShadowSize={setShadowSize}
                  shadowColor={shadowColor}
                  setShadowColor={setShadowColor}
                />
              </TabsContent>

              <TabsContent
                value="background"
                className="grid grid-cols-2 gap-x-3 mt-3"
              >
                <BackgroundTabContent
                  background={background}
                  setBackground={setBackground}
                  gradient={gradient}
                  setGradient={setGradient}
                  backgroundType={backgroundType}
                  setBackgroundType={setBackgroundType}
                />
                <BackgroundTabContent
                  background={cardBackground}
                  setBackground={setCardBackground}
                  backgroundType={cardBackgroundType}
                  setBackgroundType={setCardBackgroundType}
                  title="Card Background"
                />
              </TabsContent>

              <TabsContent value="text" className="mt-3">
                <TextTabContent
                  headerColor={headerColor}
                  setHeaderColor={setHeaderColor}
                  bodyColor={bodyColor}
                  setBodyColor={setBodyColor}
                  headerSize={headerSize}
                  setHeaderSize={setHeaderSize}
                  bodySize={bodySize}
                  setBodySize={setBodySize}
                  headerFont={headerFont}
                  setHeaderFont={setHeaderFont}
                  bodyFont={bodyFont}
                  setBodyFont={setBodyFont}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Preview:</Label>
            <div
              className={`flex justify-center items-center w-full border rounded-lg
                ${backgroundType === "gradient" ? gradient : ""}
              `}
              style={{
                aspectRatio: "auto",
                textAlign: alignment as "left" | "center" | "right",
                padding: `${padding}px`,
                backgroundColor:
                  backgroundType === "solid"
                    ? background
                    : backgroundType === "transparent"
                    ? "transparent"
                    : "transparent",
              }}
            >
              <div
                className={`p-4 border-2 rounded-md h-min w-full space-y-2`}
                style={{
                  backgroundColor:
                    cardBackgroundType === "solid"
                      ? cardBackground
                      : cardBackgroundType === "transparent"
                      ? "transparent"
                      : "transparent",
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
                        ? `0 4px 6px -1px ${shadowColor}40, 0 2px 4px -2px ${shadowColor}40`
                        : shadowSize === "medium"
                        ? `0 10px 15px -3px ${shadowColor}40, 0 4px 6px -4px ${shadowColor}40`
                        : `0 25px 50px -12px ${shadowColor}40`
                      : shadowSize === "small"
                      ? `3px 3px 0 0 ${shadowColor}`
                      : shadowSize === "medium"
                      ? `6px 6px 0 0 ${shadowColor}`
                      : `9px 9px 0 0 ${shadowColor}`,
                  color: bodyColor,
                  fontFamily: bodyFont,
                }}
              >
                <div
                  className="flex items-center gap-3"
                  style={{
                    justifyContent:
                      alignment === "left"
                        ? "flex-start"
                        : alignment === "center"
                        ? "center"
                        : alignment === "right"
                        ? "flex-end"
                        : "center",
                  }}
                >
                  {testimonial.profileImageUrl ? (
                    <img
                      src={testimonial.profileImageUrl}
                      alt="User Image"
                      className="rounded-full w-10 h-10 object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="rounded-full w-10 h-10 bg-secondary flex items-center justify-center text-foreground">
                      <UserRound size={20} />
                    </div>
                  )}
                  <h3
                    className="font-bold"
                    style={{
                      color: headerColor,
                      fontSize: `${headerSize}px`,
                      fontFamily: headerFont,
                    }}
                  >
                    {testimonial.name}
                  </h3>
                </div>
                {!testimonial.isSocial && (
                  <p>{renderStars(testimonial.rating)}</p>
                )}
                <div
                  style={{
                    fontSize: `${bodySize}px`,
                    fontFamily: bodyFont,
                  }}
                >
                  {testimonial.answer}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button>Generate Code</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index}>⭐</span>
  ));
};
