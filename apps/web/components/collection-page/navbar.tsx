"use client";
import AppLogo from "@/components/app-logo";
import { cx } from "class-variance-authority";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

type Props = {
  themeType: string | null;
  /** Optional trailing slot, e.g. an admin "Preview Mode" chip. */
  badge?: ReactNode;
};

export default function CollectionPageNavbar({ themeType, badge }: Props) {
  const { resolvedTheme } = useTheme();
  const logoThemeOverride =
    themeType === "dark"
      ? "dark"
      : themeType === "light"
        ? "light"
        : resolvedTheme === "dark"
          ? "dark"
          : "light";

  return (
    <nav
      className={cx(
        "w-full px-6 md:px-8 py-4 border-b flex items-center justify-between backdrop-blur-sm",
        themeType === "default"
          ? resolvedTheme === "dark"
            ? "border-white/10 bg-black/20"
            : "border-black/10 bg-white/20"
          : themeType === "dark"
            ? "border-white/10 bg-black/20"
            : "border-black/10 bg-white/20",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <AppLogo width={20} height={20} themeOverride={logoThemeOverride} />
        </div>
        <h2
          className={cx(
            "font-poppins font-semibold text-lg md:text-xl",
            themeType === "dark"
              ? "text-white"
              : themeType === "light"
                ? "text-black"
                : "text-foreground",
          )}
        >
          TestiFlow
        </h2>
      </div>
      {badge}
    </nav>
  );
}
