"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ColorPalette from "./ColorPalette";

type BorderTabContentProps = {
  showBorder: boolean;
  setShowBorder: (value: boolean) => void;
  borderRadius: string;
  setBorderRadius: (value: string) => void;
  borderColor: string;
  setBorderColor: (value: string) => void;
  borderThickness: number;
  setBorderThickness: (value: number) => void;
};

export default function BorderTabContent({
  showBorder,
  setShowBorder,
  borderRadius,
  setBorderRadius,
  borderColor,
  setBorderColor,
  borderThickness,
  setBorderThickness,
}: BorderTabContentProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center gap-x-4">
        <Label>Show Border:</Label>
        <Switch
          checked={showBorder}
          onCheckedChange={() => setShowBorder(!showBorder)}
        />
      </div>
      <div className="space-y-3">
        <Label>Border Radius:</Label>
        <div>
          <RadioGroup
            value={borderRadius}
            onValueChange={setBorderRadius}
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
      </div>
      <ColorPalette
        selectedColor={borderColor}
        setSelectedColor={setBorderColor}
      />
      <div className="max-w-sm space-y-3">
        <Label>Border Thickness:</Label>
        <Slider
          defaultValue={[borderThickness]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => setBorderThickness(value[0])}
          className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
        />
      </div>
    </div>
  );
}
