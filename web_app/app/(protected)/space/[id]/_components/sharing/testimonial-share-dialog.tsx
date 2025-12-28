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
import {
  TestimonialResponse,
  TwitterEntity,
  TwitterMetadata,
} from "@/lib/types";
import React from "react";
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
  const getDefaultSettings = () => ({
    alignment: "left",
    padding: 10,
    width: "auto",
    height: "auto",
    borderRadius: "medium",
    shadowType: "none",
    shadowSize: "small",
    shadowColor: "#000000",
    background: "#ffffff",
    gradient: "",
    backgroundType: "solid",
    cardBackground: "#ffffff",
    cardBackgroundType: "solid",
    showBorder: true,
    borderColor: "#000000",
    borderThickness: 1,
    headerColor: "#000",
    bodyColor: "#000",
    headerSize: 20,
    bodySize: 16,
    headerFont: "",
    bodyFont: "",
  });

  const [settings, setSettings] = React.useState(getDefaultSettings);

  const updateSetting = (key: string, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const ratioValue =
    settings.width === "auto" && settings.height === "auto"
      ? "auto"
      : `${settings.width}x${settings.height}`;

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
                  className="flex"
                  value={settings.alignment}
                  onValueChange={(value) => updateSetting("alignment", value)}
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
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Padding
                </Label>
                <Slider
                  value={[settings.padding]}
                  min={0}
                  max={250}
                  step={5}
                  onValueChange={(value) => updateSetting("padding", value[0])}
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
                value={ratioValue}
                className="flex"
                onValueChange={(value) => {
                  if (value === "auto") {
                    updateSetting("width", "auto");
                    updateSetting("height", "auto");
                    return;
                  }
                  const [w, h] = value.split("x").map(String);
                  updateSetting("width", w);
                  updateSetting("height", h);
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
                  showBorder={settings.showBorder}
                  setShowBorder={(value) => updateSetting("showBorder", value)}
                  borderRadius={settings.borderRadius}
                  setBorderRadius={(value) =>
                    updateSetting("borderRadius", value)
                  }
                  borderColor={settings.borderColor}
                  setBorderColor={(value) =>
                    updateSetting("borderColor", value)
                  }
                  borderThickness={settings.borderThickness}
                  setBorderThickness={(value) =>
                    updateSetting("borderThickness", value)
                  }
                />
              </TabsContent>
              <TabsContent value="shadow">
                <ShadowTabContent
                  shadowType={settings.shadowType}
                  setShadowType={(value) => updateSetting("shadowType", value)}
                  shadowSize={settings.shadowSize}
                  setShadowSize={(value) => updateSetting("shadowSize", value)}
                  shadowColor={settings.shadowColor}
                  setShadowColor={(value) =>
                    updateSetting("shadowColor", value)
                  }
                />
              </TabsContent>
              <TabsContent value="background" className="space-y-3">
                <BackgroundTabContent
                  background={settings.background}
                  setBackground={(value) => updateSetting("background", value)}
                  gradient={settings.gradient}
                  setGradient={(value) => updateSetting("gradient", value)}
                  backgroundType={settings.backgroundType}
                  setBackgroundType={(value) =>
                    updateSetting("backgroundType", value)
                  }
                />
                <BackgroundTabContent
                  background={settings.cardBackground}
                  setBackground={(value) =>
                    updateSetting("cardBackground", value)
                  }
                  backgroundType={settings.cardBackgroundType}
                  setBackgroundType={(value) =>
                    updateSetting("cardBackgroundType", value)
                  }
                  title="Card Background"
                />
              </TabsContent>
              <TabsContent value="test">
                <TextTabContent
                  headerColor={settings.headerColor}
                  setHeaderColor={(value) =>
                    updateSetting("headerColor", value)
                  }
                  bodyColor={settings.bodyColor}
                  setBodyColor={(value) => updateSetting("bodyColor", value)}
                  headerSize={settings.headerSize}
                  setHeaderSize={(value) => updateSetting("headerSize", value)}
                  bodySize={settings.bodySize}
                  setBodySize={(value) => updateSetting("bodySize", value)}
                  headerFont={settings.headerFont}
                  setHeaderFont={(value) => updateSetting("headerFont", value)}
                  bodyFont={settings.bodyFont}
                  setBodyFont={(value) => updateSetting("bodyFont", value)}
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
                  ${
                    settings.backgroundType === "gradient"
                      ? settings.gradient
                      : ""
                  }
                `}
              style={{
                aspectRatio: `${
                  settings.width === "auto" && settings.height === "auto"
                    ? "auto"
                    : settings.width + "/" + settings.height
                }`,
                textAlign: settings.alignment as "left" | "center" | "right",
                padding: `${settings.padding * 2}px ${settings.padding}px`,
                backgroundColor:
                  settings.backgroundType === "solid"
                    ? settings.background
                    : settings.backgroundType === "transparent"
                    ? "transparent"
                    : "transparent",
              }}
            >
              <div
                className={`p-6 border-2 rounded-md h-min w-full space-y-2
                `}
                style={{
                  backgroundColor:
                    settings.cardBackgroundType === "solid"
                      ? settings.cardBackground
                      : settings.cardBackgroundType === "transparent"
                      ? "transparent"
                      : "transparent",
                  border: settings.showBorder
                    ? `${settings.borderThickness}px solid ${settings.borderColor}`
                    : "none",
                  borderRadius:
                    settings.borderRadius === "small"
                      ? "5px"
                      : settings.borderRadius === "medium"
                      ? "10px"
                      : "15px",
                  boxShadow:
                    settings.shadowType === "none"
                      ? "none"
                      : settings.shadowType === "standard"
                      ? settings.shadowSize === "small"
                        ? `0 4px 6px -1px ${settings.shadowColor}40, 0 2px 4px -2px ${settings.shadowColor}40`
                        : settings.shadowSize === "medium"
                        ? `0 10px 15px -3px ${settings.shadowColor}40, 0 4px 6px -4px ${settings.shadowColor}40`
                        : `0 25px 50px -12px ${settings.shadowColor}40`
                      : settings.shadowSize === "small"
                      ? `3px 3px 0 0 ${settings.shadowColor}77`
                      : settings.shadowSize === "medium"
                      ? `6px 6px 0 0 ${settings.shadowColor}77`
                      : `9px 9px 0 0 ${settings.shadowColor}77`,
                  color: settings.bodyColor,
                  fontFamily: settings.bodyFont,
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
                      color: settings.headerColor,
                      fontSize: `${settings.headerSize}px`,
                      fontFamily: settings.headerFont,
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
                    fontSize: `${settings.bodySize}px`,
                    fontFamily: settings.bodyFont,
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

const processTwitterBodyUsingMetadata = (metadata: TwitterMetadata) => {
  const text = metadata.data.text;

  const allEntities: TwitterEntity[] = [];

  // Add all mentions
  metadata.data.entities.mentions?.forEach((mention) => {
    allEntities.push({
      start: mention.start,
      end: mention.end,
      type: "mention",
      data: mention,
    });
  });

  // Add all hashtags
  metadata.data.entities.hashtags?.forEach((hashtag) => {
    allEntities.push({
      start: hashtag.start,
      end: hashtag.end,
      type: "hashtag",
      data: hashtag,
    });
  });
  // Add all urls
  metadata.data.entities.urls?.forEach((url) => {
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
