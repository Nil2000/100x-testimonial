"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type BackgroundTabContentProps = {
  background: string;
  setBackground: (value: string) => void;
};

const colorPalette = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FFA500",
  "#800080",
  "#00FFFF",
  "#FFC0CB",
];

export default function BackgroundTabContent({
  background,
  setBackground,
}: BackgroundTabContentProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Label>Background Color:</Label>
      <div className="flex gap-2">
        {colorPalette.map((color) => (
          <div
            key={color}
            className={`w-6 h-6 cursor-pointer border ${
              background === color ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setBackground(color)}
          />
        ))}
      </div>
      <Input
        type="text"
        maxLength={7}
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        placeholder="#FFFFFF"
      />
    </div>
  );
}
