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
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <div className="space-y-1">
          <Label className="text-sm font-medium">Show Border</Label>
          <p className="text-xs text-muted-foreground">
            Toggle border visibility
          </p>
        </div>
        <Switch
          checked={showBorder}
          onCheckedChange={() => setShowBorder(!showBorder)}
        />
      </div>

      {showBorder && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Border Radius
            </Label>
            <RadioGroup
              value={borderRadius}
              onValueChange={setBorderRadius}
              defaultValue="small"
              className="flex gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem id="small" value="small" />
                <Label htmlFor="small" className="cursor-pointer">
                  Small
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="medium" value="medium" />
                <Label htmlFor="medium" className="cursor-pointer">
                  Medium
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="large" value="large" />
                <Label htmlFor="large" className="cursor-pointer">
                  Large
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Border Thickness: {borderThickness}px
            </Label>
            <Slider
              defaultValue={[borderThickness]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setBorderThickness(value[0])}
              className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
            />
          </div>

          <div className="sm:col-span-2">
            <ColorPalette
              selectedColor={borderColor}
              setSelectedColor={setBorderColor}
              title="Border Color"
            />
          </div>
        </div>
      )}
    </div>
  );
}
