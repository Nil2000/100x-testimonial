"use client";

import { memo, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { ColorPicker, expandHex } from "@/components/ui/color-picker";
import { cn } from "@/lib/utils";

type ColorPaletteProps = {
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  title: string;
};

const COLOR_PALETTE = [
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
] as const;

function isLight(hex: string) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function ColorPalette({
  selectedColor,
  setSelectedColor,
  title,
}: ColorPaletteProps) {
  const selected = expandHex(selectedColor);
  const onPick = useCallback(
    (color: string) => setSelectedColor(color),
    [setSelectedColor],
  );

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">
        {title}
      </Label>
      <div className="flex flex-wrap items-center gap-2">
        {COLOR_PALETTE.map((color) => {
          const isSelected = selected === color;
          return (
            <button
              key={color}
              type="button"
              aria-label={color}
              aria-pressed={isSelected}
              title={color}
              onClick={() => onPick(color)}
              className={cn(
                "relative size-9 rounded-md ring-2 ring-offset-2 ring-offset-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-ring",
                isSelected ? "ring-primary" : "ring-border hover:ring-primary/50",
              )}
              style={{ backgroundColor: color }}
            >
              {isSelected && (
                <Check
                  className="absolute inset-0 m-auto size-4 drop-shadow-md"
                  style={{ color: isLight(color) ? "#111111" : "#FFFFFF" }}
                />
              )}
            </button>
          );
        })}
        <ColorPicker value={selectedColor} onChange={onPick} />
      </div>
    </div>
  );
}

export default memo(ColorPalette);
