"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative h-9 w-9", className)}
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all",
          mounted && isDark ? "scale-0 rotate-90 absolute" : "scale-100 rotate-0"
        )}
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-all",
          mounted && isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90 absolute"
        )}
      />
    </Button>
  );
}
