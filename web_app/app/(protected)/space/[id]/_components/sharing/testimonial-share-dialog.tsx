"use client";
import { Button } from "@/components/ui/button";
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
import React, { useState } from "react";
import { TbBorderRadius } from "react-icons/tb";
import { RiShadowFill } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import BorderTabContent from "./customization/BorderTabContent";
import ShadowTabContent from "./customization/ShadowTabContent";
import BackgroundTabContent from "./customization/BackgroundTabContent";
import {
  Text,
  UserRound,
  Download,
  Copy,
  Image as ImageIcon,
} from "lucide-react";
import TextTabContent from "./customization/TextTabContent";
import { toPng, toBlob } from "html-to-image";
import { useTheme } from "next-themes";
import { toast } from "sonner";

type TestimonialShareDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  feedbackInfo: TestimonialResponse | null;
};

export default function TestimonialShareDialog({
  isOpen,
  onClose,
  feedbackInfo,
}: TestimonialShareDialogProps) {
  const { theme } = useTheme();
  const [alignment, setAlignment] = useState("left");
  const [padding, setPadding] = useState(10);
  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
  const [borderRadius, setBorderRadius] = useState("medium");
  const [shadowType, setShadowType] = useState("none");
  const [shadowSize, setShadowSize] = useState("small");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [gradient, setGradient] = useState("");
  const [backgroundType, setBackgroundType] = useState("solid");
  const [cardBackground, setCardBackground] = useState("#000000");
  const [cardBackgroundType, setCardBackgroundType] = useState("solid");
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderThickness, setBorderThickness] = useState(1);
  const [headerColor, setHeaderColor] = useState(
    theme === "dark" ? "#000000" : "#ffffff"
  );
  const [bodyColor, setBodyColor] = useState(
    theme === "dark" ? "#000000" : "#ffffff"
  );
  const [headerSize, setHeaderSize] = useState(20);
  const [bodySize, setBodySize] = useState(16);
  const [headerFont, setHeaderFont] = useState("");
  const [bodyFont, setBodyFont] = useState("");
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);
  const downloadNodeRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPNG = React.useCallback(() => {
    if (!feedbackInfo || !downloadNodeRef.current) return;

    setIsDownloading(true);
    toPng(downloadNodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `testimonial-${feedbackInfo.name.replace(
          /\s+/g,
          "-"
        )}-${feedbackInfo.id}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Image downloaded successfully!");
      })
      .catch(function (error) {
        console.error("Failed to download image", error);
        toast.error("Failed to download image. Please try again.");
      })
      .finally(() => {
        setIsDownloading(false);
      });
  }, [downloadNodeRef, feedbackInfo]);

  const handleCopyToClipboard = () => {
    if (!downloadNodeRef.current) return;

    setIsCopying(true);
    toBlob(downloadNodeRef.current)
      .then(function (blob) {
        if (!blob) {
          toast.error("Failed to create image");
          return;
        }

        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        toast.success("Image copied to clipboard!");
      })
      .catch(function (error) {
        console.error("Failed to copy image to clipboard", error);
        toast.error("Failed to copy image. Please try again.");
      })
      .finally(() => {
        setIsCopying(false);
      });
  };

  if (!feedbackInfo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto max-w-4xl overflow-x-hidden p-6">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                Create Testimonial Image
              </DialogTitle>
              <DialogDescription className="text-sm">
                Customize and download your testimonial as an image
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-4 space-y-4 border">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Layout Settings
            </h3>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Alignment
                </Label>
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
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Padding
                </Label>
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
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Aspect Ratio
              </Label>
              <RadioGroup
                defaultValue="auto"
                className="flex"
                onValueChange={(value) => {
                  if (value === "auto") {
                    setWidth("auto");
                    setHeight("auto");
                    return;
                  }
                  const [w, h] = value.split("x").map(String);
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
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Style Customization
            </h3>
            <Tabs defaultValue="border" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
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
                <TabsTrigger value="test" className="flex items-center gap-2">
                  <Text size={24} />
                  Text
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
              <TabsContent value="background" className="space-y-3">
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
              <TabsContent value="test">
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
        </div>
        <div className="bg-muted/30 rounded-lg p-4 border">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            Preview
          </h3>
          <div className="bg-background rounded-lg p-4 border-2 border-dashed">
            <div
              ref={downloadNodeRef}
              className={`flex justify-center items-center w-full
                  ${backgroundType === "gradient" ? gradient : ""}
                `}
              style={{
                aspectRatio: `${
                  width === "auto" && height === "auto"
                    ? "auto"
                    : width + "/" + height
                }`,
                textAlign: alignment as "left" | "center" | "right",
                padding: `${padding * 2}px ${padding}px`,
                backgroundColor:
                  backgroundType === "solid"
                    ? background
                    : backgroundType === "transparent"
                    ? "transparent"
                    : "transparent",
              }}
            >
              <div
                className={`p-6 border-2 rounded-md h-min w-full space-y-2
                `}
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
                      ? `3px 3px 0 0 ${shadowColor}77`
                      : shadowSize === "medium"
                      ? `6px 6px 0 0 ${shadowColor}77`
                      : `9px 9px 0 0 ${shadowColor}77`,
                  color: bodyColor,
                  fontFamily: bodyFont,
                }}
              >
                <div className="flex items-center gap-4">
                  {feedbackInfo.profileImageUrl ? (
                    <img
                      src={feedbackInfo.profileImageUrl}
                      alt="User Image"
                      className="rounded-full w-12 h-12 object-cover"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="rounded-full w-12 h-12 bg-secondary flex items-center justify-center text-foreground">
                      <UserRound />
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
                    {feedbackInfo.name}
                  </h3>
                </div>
                {!feedbackInfo.isSocial && (
                  <p>{renderStars(feedbackInfo.rating)}</p>
                )}
                <div
                  style={{
                    fontSize: `${bodySize}px`,
                    fontFamily: bodyFont,
                  }}
                >
                  {feedbackInfo.source === "X" && feedbackInfo.metadata
                    ? processTwitterBodyUsingMetadata(
                        JSON.parse(feedbackInfo.metadata)
                      )
                    : feedbackInfo.answer}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Image will be exported at high quality
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              disabled={isCopying}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {isCopying ? "Copying..." : "Copy Image"}
            </Button>
            <Button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download PNG"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const processTwitterBodyUsingMetadata = (metadata: any) => {
  let text = metadata.data.text;

  let allEntities: Array<{
    start: number;
    end: number;
    type: string;
    data: any;
  }> = [];

  // Add all mentions
  metadata.data.entities.mentions?.forEach((mention: any) => {
    allEntities.push({
      start: mention.start,
      end: mention.end,
      type: "mention",
      data: mention,
    });
  });

  // Add all hashtags
  metadata.data.entities.hashtags?.forEach((hashtag: any) => {
    allEntities.push({
      start: hashtag.start,
      end: hashtag.end,
      type: "hashtag",
      data: hashtag,
    });
  });
  // Add all urls
  metadata.data.entities.urls?.forEach((url: any) => {
    allEntities.push({
      start: url.start,
      end: url.end,
      type: "url",
      data: url,
    });
  });

  //Sorting allentities
  allEntities.sort((a, b) => a.start - b.start);

  // Build JSX elements
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  allEntities.forEach((entity, index) => {
    // Add text before this entity
    if (entity.start > lastIndex) {
      elements.push(text.slice(lastIndex, entity.start));
    }

    // Add the entity as a link
    const entityText = text.slice(entity.start, entity.end);

    if (entity.type === "mention") {
      elements.push(
        <a
          key={`mention-${index}`}
          href={`https://x.com/${entity.data.username}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {entityText}
        </a>
      );
    } else if (entity.type === "hashtag") {
      elements.push(
        <a
          key={`hashtag-${index}`}
          href={`https://x.com/hashtag/${entity.data.tag}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {entityText}
        </a>
      );
    } else if (entity.type === "url") {
      elements.push(
        <a
          key={`url-${index}`}
          href={entity.data.expanded_url}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {entity.data.expanded_url}
        </a>
      );
    }

    lastIndex = entity.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <span>{elements}</span>;
};

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index}>⭐</span>
  ));
};
