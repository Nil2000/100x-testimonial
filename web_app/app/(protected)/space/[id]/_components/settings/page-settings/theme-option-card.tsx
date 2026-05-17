import { Theme } from '@/components/theme-constant';
import React from 'react'
import clsx from 'clsx';

type ThemeOptionCardProps = {
  themeOption: Theme;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
};

export default function ThemeOptionCard(
  { themeOption, isSelected, isDisabled, onSelect }: ThemeOptionCardProps
) {
    return (
      <button
        type="button"
        disabled={isDisabled}
        onClick={onSelect}
        className={clsx(
          "relative group rounded-lg border-2 p-3 text-left transition-all duration-200 hover:shadow-md",
          isSelected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border hover:border-primary/50 bg-card",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="w-3 h-3 text-primary-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
  
        {/* Theme Icon & Type Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{themeOption.icon}</span>
          <span
            className={clsx(
              "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
              themeOption.type === "dark"
                ? "bg-slate-800 text-slate-100"
                : "bg-amber-100 text-amber-800"
            )}
          >
            {themeOption.type}
          </span>
        </div>
  
        {/* Theme Name */}
        <h4 className="font-semibold text-sm mb-1">{themeOption.label}</h4>
  
        {/* Theme Description */}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {themeOption.description}
        </p>
  
        {/* Color Palette Preview */}
        <div className="flex gap-1.5 mb-2">
          {themeOption.colorPalette.map((color, idx) => (
            <div
              key={idx}
              className="h-6 flex-1 rounded border border-border/50 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
  
        {/* Category Badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground font-medium">
            {themeOption.category}
          </span>
          <span className="text-[10px] text-muted-foreground">•</span>
          <span className="text-[10px] text-muted-foreground font-medium">
            {themeOption.defaultFont}
          </span>
        </div>
      </button>
    );
  }
