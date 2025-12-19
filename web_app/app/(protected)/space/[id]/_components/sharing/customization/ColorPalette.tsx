"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

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
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">
        {title}
      </Label>
      <div className="flex gap-2 flex-wrap items-center">
        {colorPalette.map((color) => (
          <button
            key={color}
            type="button"
            className={`relative w-9 h-9 cursor-pointer rounded-md ring-2 transition-all hover:scale-110 ${
              selectedColor.toUpperCase() === color.toUpperCase()
                ? "ring-primary ring-offset-2"
                : "ring-border hover:ring-primary/50"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
            title={color}
          >
            {selectedColor.toUpperCase() === color.toUpperCase() && (
              <Check
                className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md"
                style={{
                  color: color === "#FFFFFF" ? "#000000" : "#FFFFFF",
                }}
              />
            )}
          </button>
        ))}
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-12 h-12 cursor-pointer rounded-md"
            title="Pick custom color"
          />
          <Input
            type="text"
            maxLength={7}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            placeholder="#000000"
            className="w-24 h-9 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}
