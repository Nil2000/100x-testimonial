"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPalette from "./ColorPalette";

export default function TextTabContent({
  headerColor,
  setHeaderColor,
  bodyColor,
  setBodyColor,
  headerSize,
  setHeaderSize,
  bodySize,
  setBodySize,
}: {
  headerColor: string;
  setHeaderColor: (color: string) => void;
  bodyColor: string;
  setBodyColor: (color: string) => void;
  headerSize: number;
  setHeaderSize: (size: number) => void;
  bodySize: number;
  setBodySize: (size: number) => void;
}) {
  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 gap-3">
      <ColorPalette
        title="Header Text Color"
        selectedColor={headerColor}
        setSelectedColor={setHeaderColor}
      />
      <div className="space-y-3">
        <Label>Header Text Size:</Label>
        <Slider
          defaultValue={[headerSize]}
          min={10}
          max={50}
          step={1}
          onValueChange={(value) => setHeaderSize(value[0])}
        />
      </div>
      <ColorPalette
        title="Body Text Color"
        selectedColor={bodyColor}
        setSelectedColor={setBodyColor}
      />
      <div className="space-y-3">
        <Label>Body Text Size:</Label>
        <Slider
          defaultValue={[bodySize]}
          min={10}
          max={50}
          step={1}
          onValueChange={(value) => setBodySize(value[0])}
        />
      </div>
    </div>
  );
}
