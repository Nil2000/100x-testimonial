"use client";
import React, { useState, useTransition, useEffect } from "react";
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
import { StyleSettings, TestimonialResponse } from "@/lib/types";
import { TbBorderRadius } from "react-icons/tb";
import { RiShadowFill } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import { Text, UserRound, Layout, Code2, Copy, Save } from "lucide-react";
import BorderTabContent from "./customization/BorderTabContent";
import ShadowTabContent from "./customization/ShadowTabContent";
import BackgroundTabContent from "./customization/BackgroundTabContent";
import TextTabContent from "./customization/TextTabContent";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import CodeBlock from "./code-block";
import { updateFeedbackStyleSettings } from "@/actions/feedbackActions";
import { toast } from "sonner";

type EmbedSettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonial:
    | (TestimonialResponse & {
        styleSettings?: StyleSettings | null;
      })
    | null;
};

export default function EmbedSettingsDialog({
  isOpen,
  onClose,
  testimonial,
}: EmbedSettingsDialogProps) {
  const { theme } = useTheme();

  const [isPending, startTransition] = useTransition();

  // Default settings object
  const getDefaultSettings: () => StyleSettings = () => ({
    alignment: "left",
    padding: 10,
    borderRadius: "medium",
    showBorder: true,
    borderColor: "#000000",
    borderThickness: 1,
    shadowType: "none",
    shadowSize: "small",
    shadowColor: "#000000",
    background: "#ffffff",
    gradient: "",
    backgroundType: "solid",
    cardBackground: "#ffffff",
    cardBackgroundType: "solid",
    headerColor: "#000",
    bodyColor: "#000",
    headerSize: 20,
    bodySize: 16,
    headerFont: "",
    bodyFont: "",
  });

  // Single settings object
  const [settings, setSettings] = useState(getDefaultSettings());
  const [initialSettings, setInitialSettings] = useState<StyleSettings | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Helper function to update settings
  const updateSetting = (
    key: string,
    value: string | number | boolean | null
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Initialize settings from testimonial
  useEffect(() => {
    if (testimonial && !initialSettings) {
      const savedSettings = testimonial.styleSettings || {};
      const mergedSettings = { ...getDefaultSettings(), ...savedSettings };
      setInitialSettings(mergedSettings);
      setSettings(mergedSettings);
    }
  }, [testimonial, theme, initialSettings]);

  // Check for changes
  useEffect(() => {
    if (initialSettings) {
      const changed =
        JSON.stringify(settings) !== JSON.stringify(initialSettings);
      setHasChanges(changed);
    }
  }, [settings, initialSettings]);

  if (!testimonial) return null;

  const handleGenerateEmbedCode = () => {
    startTransition(() => {
      updateFeedbackStyleSettings(testimonial.id, settings).then((res) => {
        if (res.error) {
          console.error(res.error);
          toast.error("Failed to update testimonial. Please try again.");
          return;
        }
        toast.success("Feedback style settings applied successfully!");
        setInitialSettings(settings);
      });
    });
  };

  // Generate iframe embed code
  const generateEmbedCode = () => {
    const embedUrl = `${window.location.origin}/embed/${testimonial.id}`;
    return `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="300" 
  frameborder="0" 
  style="border: none; border-radius: 8px;"
  title="Testimonial from ${testimonial.name}">
</iframe>`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto max-w-4xl overflow-x-hidden p-6">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Embed Settings</DialogTitle>
              <DialogDescription className="text-sm">
                Customize the appearance of your embedded testimonial
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          {/* Settings Panel */}
          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Customization Options
            </h3>
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

              <TabsContent value="layout" className="space-y-4 mt-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Alignment
                  </Label>
                  <RadioGroup
                    value={settings.alignment}
                    className="flex gap-3"
                    onValueChange={(value) => updateSetting("alignment", value)}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="left" value="left" />
                      <Label htmlFor="left" className="cursor-pointer">
                        Left
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="center" value="center" />
                      <Label htmlFor="center" className="cursor-pointer">
                        Center
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="right" value="right" />
                      <Label htmlFor="right" className="cursor-pointer">
                        Right
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Padding: {settings.padding}px
                  </Label>
                  <Slider
                    value={[settings.padding]}
                    min={0}
                    max={50}
                    step={2}
                    onValueChange={(value) =>
                      updateSetting("padding", value[0])
                    }
                    className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
                  />
                </div>
              </TabsContent>

              <TabsContent value="border" className="mt-3">
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

              <TabsContent value="shadow" className="mt-3">
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

              <TabsContent value="background" className="space-y-4 mt-3">
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

              <TabsContent value="text" className="mt-3">
                <TextTabContent
                  headerColor={settings.headerColor}
                  setHeaderColor={(value) =>
                    updateSetting("headerColor", value)
                  }
                  bodyColor={settings.bodyColor}
                  setBodyColor={(value) => updateSetting("bodyColor", value)}
                  headerSize={settings.headerSize!}
                  setHeaderSize={(value) => updateSetting("headerSize", value)}
                  bodySize={settings.bodySize!}
                  setBodySize={(value) => updateSetting("bodySize", value)}
                  headerFont={settings.headerFont}
                  setHeaderFont={(value) => updateSetting("headerFont", value)}
                  bodyFont={settings.bodyFont}
                  setBodyFont={(value) => updateSetting("bodyFont", value)}
                  hideBodyText={testimonial?.feedbackType === "VIDEO"}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Preview
            </h3>
            <div className="bg-background rounded-lg p-4 border-2 border-dashed">
              <div
                className={`flex justify-center items-center w-full border rounded-lg
                ${
                  settings.backgroundType === "gradient"
                    ? settings.gradient
                    : ""
                }
              `}
                style={{
                  aspectRatio: "auto",
                  textAlign: settings.alignment as "left" | "center" | "right",
                  padding: `${settings.padding}px`,
                  backgroundColor:
                    settings.backgroundType === "solid"
                      ? settings.background
                      : settings.backgroundType === "transparent"
                      ? "transparent"
                      : "transparent",
                }}
              >
                <div
                  className={`p-4 border-2 rounded-md h-min w-full space-y-2`}
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
                        ? `3px 3px 0 0 ${settings.shadowColor}`
                        : settings.shadowSize === "medium"
                        ? `6px 6px 0 0 ${settings.shadowColor}`
                        : `9px 9px 0 0 ${settings.shadowColor}`,
                    color: settings.bodyColor,
                    fontFamily: settings.bodyFont,
                  }}
                >
                  <div
                    className="flex items-center gap-3"
                    style={{
                      justifyContent:
                        settings.alignment === "left"
                          ? "flex-start"
                          : settings.alignment === "center"
                          ? "center"
                          : "flex-end",
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
                        color: settings.headerColor,
                        fontSize: `${settings.headerSize}px`,
                        fontFamily: settings.headerFont,
                      }}
                    >
                      {testimonial.name}
                    </h3>
                  </div>
                  {!testimonial.isSocial && (
                    <p>{renderStars(testimonial.rating)}</p>
                  )}
                  {testimonial.feedbackType !== "VIDEO" && (
                    <div
                      style={{
                        fontSize: `${settings.bodySize}px`,
                        fontFamily: settings.bodyFont,
                      }}
                    >
                      {testimonial.answer}
                    </div>
                  )}
                  {testimonial.feedbackType === "VIDEO" && (
                    <div>
                      <video
                        src={testimonial.videoUrl!}
                        controls
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Embed Code Section */}
          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Embed Code
            </h3>
            <CodeBlock codeString={generateEmbedCode()} language="html" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          {hasChanges ? (
            <p className="text-xs text-amber-600 dark:text-amber-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full animate-pulse"></span>
              Unsaved changes
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">All changes saved</p>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(generateEmbedCode());
                toast.success("Embed code copied to clipboard!");
              }}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Code
            </Button>
            <Button
              onClick={handleGenerateEmbedCode}
              disabled={isPending || !hasChanges}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
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
