"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ColorPalette from "./ColorPalette";

type ShadowTabContentProps = {
  shadowType: string;
  setShadowType: (value: string) => void;
  shadowSize: string;
  setShadowSize: (value: string) => void;
  shadowColor: string;
  setShadowColor: (value: string) => void;
};

export default function ShadowTabContent({
  shadowType,
  setShadowType,
  shadowSize,
  setShadowSize,
  shadowColor,
  setShadowColor,
}: ShadowTabContentProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-3">
        <Label>Shadow Type:</Label>
        <RadioGroup
          value={shadowType}
          onValueChange={setShadowType}
          defaultValue="none"
          className="flex gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem id="none" value="none" />
            <Label htmlFor="none">None</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="standard" value="standard" />
            <Label htmlFor="standard">Standard</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="spotlight" value="spotlight" />
            <Label htmlFor="spotlight">Spotlight</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3">
        <Label>Shadow Size:</Label>
        <RadioGroup
          value={shadowSize}
          onValueChange={setShadowSize}
          defaultValue="small"
          className="flex gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem id="small" value="small" />
            <Label htmlFor="small">Small</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="medium" value="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="large" value="large" />
            <Label htmlFor="large">Large</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="max-w-sm">
        <ColorPalette
          selectedColor={shadowColor}
          setSelectedColor={setShadowColor}
        />
      </div>
    </div>
  );
}
