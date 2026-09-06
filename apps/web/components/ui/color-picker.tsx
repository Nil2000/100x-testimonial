"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function expandHex(value: string): string {
  const hex = value.startsWith("#") ? value : `#${value}`;
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toUpperCase();
  }
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase();
  return "#FFFFFF";
}

function ColorPicker({
  value,
  onChange,
  className,
  disabled,
}: ColorPickerProps) {
  const incoming = expandHex(value);
  const [local, setLocal] = useState({
    value,
    draft: incoming,
    emitted: incoming,
  });

  if (value !== local.value) {
    if (incoming !== local.emitted) {
      setLocal({ value, draft: incoming, emitted: incoming });
    } else {
      setLocal({ ...local, value });
    }
  }

  const onChangeRef = useRef(onChange);
  const rafRef = useRef(0);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ponytail: rAF-throttle parent updates. Ceiling is one commit per frame;
  // debounce (~50ms) if the live preview still janks.
  const emit = useCallback((next: string) => {
    const hex = expandHex(next);
    setLocal((prev) => ({ ...prev, draft: hex, emitted: hex }));
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      onChangeRef.current(hex);
    });
  }, []);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            type="button"
            disabled={disabled}
            aria-label="Pick custom color"
            title="Pick custom color"
            className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: local.draft }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
              style={{
                background:
                  "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
              }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[220px] p-3">
          <HexColorPicker
            color={local.draft}
            onChange={emit}
            className="!h-[152px] !w-full rounded-md [&_.react-colorful__hue]:mt-2 [&_.react-colorful__hue]:rounded-sm [&_.react-colorful__saturation]:rounded-sm"
          />
        </PopoverContent>
      </Popover>
      <HexColorInput
        aria-label="Hex color"
        prefixed
        color={local.draft}
        onChange={emit}
        disabled={disabled}
        className="h-9 w-[6.5rem] rounded-lg border border-input bg-background px-2 font-mono text-xs uppercase shadow-sm focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

const MemoColorPicker = memo(ColorPicker);
MemoColorPicker.displayName = "ColorPicker";

export { MemoColorPicker as ColorPicker };
