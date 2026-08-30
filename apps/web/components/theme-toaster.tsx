"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ThemeToaster() {
  const { theme } = useTheme();
  return <Toaster richColors theme={theme as "system" | "light" | "dark"} />;
}
