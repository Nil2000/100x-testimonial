"use server";

import { db } from "@repo/db";
import { assertSpaceOwnership, requireAuth } from "@/lib/authGuards";
import { checkUserAccess } from "@/lib/accessControl";
import { THEME_CHOICES } from "@/components/theme-constant";

type ThemeOptions = {
  showBrandLogo?: boolean;
  font?: string;
};

type ThemeProps = {
  theme: string | null;
  themeOptions: ThemeOptions | null;
  spaceId: string;
};

type ThemeActionResult = { error: string } | { error: null; success: true };

/** Theme values selectable without a customBranding plan (first light + first dark preset). */
const FREE_THEME_VALUES = [
  THEME_CHOICES.find((t) => t.type === "light")?.value,
  THEME_CHOICES.find((t) => t.type === "dark")?.value,
].filter((value): value is string => Boolean(value));

export const updateThemeForSpace = async ({
  theme,
  themeOptions,
  spaceId,
}: ThemeProps): Promise<ThemeActionResult> => {
  if (!spaceId) {
    return { error: "Space ID is required" };
  }

  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, spaceId);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  const { space } = ownership;
  const currentTheme = (space.theme as Record<string, unknown>) || {};
  const currentThemeOptions =
    (currentTheme.themeOptions as ThemeOptions | undefined) || {};
  const currentThemeValue = (currentTheme.theme as string | null) ?? null;

  const access = await checkUserAccess(authResult.userId, "customBranding");
  const canCustomBrand = access.hasAccess;

  const requestedThemeValue = theme ?? null;
  const isFreeThemeChoice =
    requestedThemeValue === null ||
    FREE_THEME_VALUES.includes(requestedThemeValue);

  // Gated users may only switch between free-tier themes; anything else, and any
  // font/logo change, is ignored server-side and the previously stored (possibly
  // paid-era) values are kept as-is rather than reset to a default.
  const nextThemeValue =
    canCustomBrand || isFreeThemeChoice
      ? requestedThemeValue
      : currentThemeValue;

  const nextThemeOptions = canCustomBrand
    ? { ...currentThemeOptions, ...themeOptions }
    : currentThemeOptions;

  try {
    await db.space.update({
      where: { id: spaceId },
      data: {
        theme: {
          ...currentTheme,
          theme: nextThemeValue,
          themeOptions: nextThemeOptions,
        },
      },
    });

    return { error: null, success: true };
  } catch (error) {
    console.error("Error updating theme for space:", error);
    return { error: "Failed to update theme for space" };
  }
};
