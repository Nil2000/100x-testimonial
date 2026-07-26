"use client";

import ThemeToggle from "@/components/theme-toggle";

export default function PublicPageThemeBar() {
  return (
    <div className="flex justify-end p-4">
      <ThemeToggle />
    </div>
  );
}
