"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ColorPaletteProps = {
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  title: string;
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

export default function ColorPalette({
  selectedColor,
  setSelectedColor,
  title,
}: ColorPaletteProps) {
  return (
    <div className="space-y-3">
      <Label>{title}</Label>
      <div className="flex gap-2 flex-wrap">
        {colorPalette.map((color) => (
          <div
            key={color}
            className={`w-8 h-8 cursor-pointer rounded-sm ring-1 ring-zinc-200 dark:ring-zinc-600 shadow-sm`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
        <Input
          type="text"
          maxLength={7}
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          placeholder="#000000"
          className="w-28"
        />
      </div>
    </div>
  );
}
