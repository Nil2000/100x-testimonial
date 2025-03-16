"use client";
import React from "react";
import { Label } from "@/components/ui/label";

type ShadowTabContentProps = {
  shadow: string;
  setShadow: (value: string) => void;
};

export default function ShadowTabContent({
  shadow,
  setShadow,
}: ShadowTabContentProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Label>Shadow:</Label>
      <div>
        <label>
          <input
            type="radio"
            value="none"
            checked={shadow === "none"}
            onChange={() => setShadow("none")}
          />
          None
        </label>
        <label>
          <input
            type="radio"
            value="small"
            checked={shadow === "small"}
            onChange={() => setShadow("small")}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            value="medium"
            checked={shadow === "medium"}
            onChange={() => setShadow("medium")}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="large"
            checked={shadow === "large"}
            onChange={() => setShadow("large")}
          />
          Large
        </label>
      </div>
    </div>
  );
}
