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
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Shadow Type
          </Label>
          <RadioGroup
            value={shadowType}
            onValueChange={setShadowType}
            defaultValue="none"
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id="none" value="none" />
              <Label htmlFor="none" className="cursor-pointer">
                None
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="standard" value="standard" />
              <Label htmlFor="standard" className="cursor-pointer">
                Standard
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="spotlight" value="spotlight" />
              <Label htmlFor="spotlight" className="cursor-pointer">
                Spotlight
              </Label>
            </div>
          </RadioGroup>
        </div>

        {shadowType !== "none" && (
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Shadow Size
            </Label>
            <RadioGroup
              value={shadowSize}
              onValueChange={setShadowSize}
              defaultValue="small"
              className="flex flex-col gap-2"
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
        )}
      </div>

      {shadowType !== "none" && (
        <div>
          <ColorPalette
            selectedColor={shadowColor}
            setSelectedColor={setShadowColor}
            title="Shadow Color"
          />
        </div>
      )}
    </div>
  );
}
