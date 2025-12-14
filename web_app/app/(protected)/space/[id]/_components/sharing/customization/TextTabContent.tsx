"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPalette from "./ColorPalette";
import FontPicker from "@/components/font-picker";

export default function TextTabContent({
  headerColor,
  setHeaderColor,
  bodyColor,
  setBodyColor,
  headerSize,
  setHeaderSize,
  bodySize,
  setBodySize,
  headerFont,
  setHeaderFont,
  bodyFont,
  setBodyFont,
}: {
  headerColor: string;
  setHeaderColor: (color: string) => void;
  bodyColor: string;
  setBodyColor: (color: string) => void;
  headerSize: number;
  setHeaderSize: (size: number) => void;
  bodySize: number;
  setBodySize: (size: number) => void;
  headerFont: string;
  setHeaderFont: (font: string) => void;
  bodyFont: string;
  setBodyFont: (font: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          Header Text
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorPalette
            title="Color"
            selectedColor={headerColor}
            setSelectedColor={setHeaderColor}
          />
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Font Family
            </Label>
            <FontPicker onSelect={setHeaderFont} selectedFont={headerFont} />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Font Size: {headerSize}px
          </Label>
          <Slider
            defaultValue={[headerSize]}
            min={10}
            max={50}
            step={1}
            onValueChange={(value) => setHeaderSize(value[0])}
            className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
          />
        </div>
      </div>

      <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          Body Text
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorPalette
            title="Color"
            selectedColor={bodyColor}
            setSelectedColor={setBodyColor}
          />
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Font Family
            </Label>
            <FontPicker onSelect={setBodyFont} selectedFont={bodyFont} />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Font Size: {bodySize}px
          </Label>
          <Slider
            defaultValue={[bodySize]}
            min={10}
            max={50}
            step={1}
            onValueChange={(value) => setBodySize(value[0])}
            className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
          />
        </div>
      </div>
    </div>
  );
}
