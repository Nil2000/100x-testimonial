"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ColorPalette from "./ColorPalette";

type BackgroundTabContentProps = {
  background: string;
  setBackground: (value: string) => void;
  gradient: string;
  setGradient: (value: string) => void;
  backgroundType: string;
  setBackgroundType: (value: string) => void;
};

const gradientOptions = [
  "bg-gradient-to-r from-pink-500 to-yellow-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  "bg-gradient-to-r from-yellow-200 via-green-200 to-green-500",
  "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
  "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
  "bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200",
  "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200",
  "bg-gradient-to-r from-green-200 via-green-300 to-blue-200",
  "bg-gradient-to-r from-yellow-200 via-yellow-300 to-red-200",
];

export default function BackgroundTabContent({
  background,
  setBackground,
  gradient,
  setGradient,
  backgroundType,
  setBackgroundType,
}: BackgroundTabContentProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Label>Background Type:</Label>
      <RadioGroup
        value={backgroundType}
        onValueChange={setBackgroundType}
        defaultValue="solid"
        className="flex gap-2"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem id="solid" value="solid" />
          <Label htmlFor="solid">Solid</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="gradient" value="gradient" />
          <Label htmlFor="gradient">Gradient</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="transparent" value="transparent" />
          <Label htmlFor="transparent">Transparent</Label>
        </div>
      </RadioGroup>

      {backgroundType === "solid" && (
        <ColorPalette
          selectedColor={background}
          setSelectedColor={setBackground}
          title="Background Color:"
        />
      )}

      {backgroundType === "gradient" && (
        <div className="space-y-3">
          <Label>Gradient Options:</Label>
          <div className="flex gap-2 flex-wrap">
            {gradientOptions.map((gradientClass, index) => (
              <div
                key={index}
                className={`w-8 h-8 cursor-pointer rounded-sm ${gradientClass}`}
                onClick={() => setGradient(gradientClass)}
              />
            ))}
          </div>
        </div>
      )}

      {backgroundType === "transparent" && (
        <div className="space-y-3">
          <Label>Transparency:</Label>
          <div className="flex gap-2">
            <button
              className="w-20 h-20 border border-gray-300 rounded-sm"
              onClick={() => setBackground("transparent")}
            >
              Card Background
            </button>
            <button
              className="w-20 h-20 border border-gray-300 rounded-sm"
              onClick={() => setBackground("rgba(0, 0, 0, 0)")}
            >
              Card's Background
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
