"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ColorPalette from "./ColorPalette";

type BackgroundTabContentProps = {
  background: string;
  setBackground: (value: string) => void;
};

const gradientOptions = [
  "linear-gradient(to right, #ff7e5f, #feb47b)",
  "linear-gradient(to right, #6a11cb, #2575fc)",
  "linear-gradient(to right, #ff6a00, #ee0979)",
  "linear-gradient(to right, #00c6ff, #0072ff)",
  "linear-gradient(to right, #f7971e, #ffd200)",
  "linear-gradient(to right, #00b09b, #96c93d)",
  "linear-gradient(to right, #fc5c7d, #6a82fb)",
  "linear-gradient(to right, #ff9a9e, #fad0c4)",
  "linear-gradient(to right, #a18cd1, #fbc2eb)",
  "linear-gradient(to right, #ffecd2, #fcb69f)",
];

export default function BackgroundTabContent({
  background,
  setBackground,
}: BackgroundTabContentProps) {
  const [backgroundType, setBackgroundType] = useState("solid");

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
            {gradientOptions.map((gradient, index) => (
              <div
                key={index}
                className="w-20 h-20 cursor-pointer rounded-sm"
                style={{ background: gradient }}
                onClick={() => setBackground(gradient)}
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
