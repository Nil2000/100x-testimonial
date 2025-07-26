"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ColorPalette from "./ColorPalette";

type BackgroundTabContentProps = {
  background: string;
  setBackground: (value: string) => void;
  gradient?: string;
  setGradient?: (value: string) => void;
  backgroundType: string;
  setBackgroundType: (value: string) => void;
  title?: string;
};

const gradientOptions = [
  "bg-gradient-to-r from-pink-500 to-yellow-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-yellow-200 via-green-200 to-green-500",
  "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
  "bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400",
  "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
  "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
  "bg-gradient-to-br from-yellow-200 via-green-200 to-green-300",
  "bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200",
  "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600",
  "bg-gradient-to-br from-yellow-200 via-green-200 to-green-300",
  "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200",
  "bg-gradient-to-r from-green-200 via-green-300 to-blue-200",
  "bg-gradient-to-r from-yellow-200 via-yellow-300 to-red-200",
  "bg-gradient-to-tr from-purple-400 to-yellow-400",
  "bg-gradient-to-tl from-yellow-200 via-pink-200 to-pink-400",
];

export default function BackgroundTabContent({
  background,
  setBackground,
  gradient,
  setGradient,
  backgroundType,
  setBackgroundType,
  title = "Background",
}: BackgroundTabContentProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Label>{title} Type:</Label>
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
        {setGradient && (
          <div className="flex items-center gap-2">
            <RadioGroupItem id="gradient" value="gradient" />
            <Label htmlFor="gradient">Gradient</Label>
          </div>
        )}
        <div className="flex items-center gap-2">
          <RadioGroupItem id="transparent" value="transparent" />
          <Label htmlFor="transparent">Transparent</Label>
        </div>
      </RadioGroup>

      {backgroundType === "solid" && (
        <ColorPalette
          selectedColor={background}
          setSelectedColor={setBackground}
          title={`${title} Color:`}
        />
      )}

      {backgroundType === "gradient" && setGradient && (
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
    </div>
  );
}
