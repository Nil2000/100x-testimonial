import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WALL_OF_LOVE_STYLE_CHOICES } from "@/lib/constants";
import React from "react";

type Props = {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
};

export default function StyleSelect({
  selectedStyle,
  setSelectedStyle,
}: Props) {
  return (
    <div className="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)] w-[200px]">
      <Select defaultValue={selectedStyle} onValueChange={setSelectedStyle}>
        <SelectTrigger>
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent className="font-sans">
          {WALL_OF_LOVE_STYLE_CHOICES.map((choice) => (
            <SelectItem key={choice.value} value={choice.value}>
              {choice.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
