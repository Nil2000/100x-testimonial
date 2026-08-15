import React from "react";
import Link from "next/link";
import { Theme, THEME_CHOICES } from "@/components/theme-constant";
import ThemeOptionCard from "./theme-option-card";

/** Theme values selectable without a customBranding plan (first light + first dark preset). */
export function getFreeThemeValues(themes: Theme[]): string[] {
  const light = themes.find((t) => t.type === "light");
  const dark = themes.find((t) => t.type === "dark");
  return [light?.value, dark?.value].filter((v): v is string => Boolean(v));
}

type ThemePickerProps = {
  selectedValue: string | null;
  noTheme: boolean;
  canCustomBrand: boolean;
  onSelect: (theme: Theme) => void;
};

export default function ThemePicker({
  selectedValue,
  noTheme,
  canCustomBrand,
  onSelect,
}: ThemePickerProps) {
  const freeThemeValues = React.useMemo(
    () => getFreeThemeValues(THEME_CHOICES),
    [],
  );

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium text-foreground">
          Theme Style
        </label>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose a pre-designed theme style
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
        {THEME_CHOICES.map((themeOption) => {
          const isSelected = selectedValue === themeOption.value;
          const isLocked =
            !canCustomBrand && !freeThemeValues.includes(themeOption.value);

          return (
            <ThemeOptionCard
              key={themeOption.value}
              themeOption={themeOption}
              isSelected={isSelected}
              isDisabled={noTheme || isLocked}
              isLocked={isLocked}
              onSelect={() => {
                if (isLocked) return;
                onSelect(themeOption);
              }}
            />
          );
        })}
      </div>
      {!canCustomBrand && (
        <p className="text-xs text-muted-foreground">
          2 themes are available on your plan.{" "}
          <Link href="/buy-premium" className="text-primary underline underline-offset-2">
            Upgrade to unlock all themes
          </Link>
          .
        </p>
      )}
    </div>
  );
}
