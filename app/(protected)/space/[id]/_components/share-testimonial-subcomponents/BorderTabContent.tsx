"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const colorPalette = [
  "#000000",
  "#FFFFFF",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#5D5DFF",
];

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
    <div className="space-y-3 grid grid-cols-2 gap-3">
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
              <RadioGroupItem id="small" value="left" />
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
      <div className="space-y-3">
        <Label>Border Color:</Label>
        <div className="flex gap-2 flex-wrap">
          {colorPalette.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 cursor-pointer rounded-sm`}
              style={{ backgroundColor: color }}
              onClick={() => setBorderColor(color)}
            />
          ))}
          <Input
            type="text"
            maxLength={7}
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            placeholder="#000000"
            className="w-28"
          />
        </div>
      </div>
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
