"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";

export function getAppLogoSrc(isDark: boolean) {
  return isDark ? "/new-logo-white.png" : "/new-logo.png";
}

type AppLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  themeOverride?: "light" | "dark";
};

export default function AppLogo({
  width = 32,
  height = 32,
  className,
  alt = "TestiFlow logo",
  themeOverride,
}: AppLogoProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useIsClient();

  const isDark =
    themeOverride !== undefined
      ? themeOverride === "dark"
      : resolvedTheme === "dark";

  const src = mounted ? getAppLogoSrc(isDark) : getAppLogoSrc(false);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
    />
  );
}
