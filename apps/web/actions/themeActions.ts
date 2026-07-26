"use server";

import { db } from "@repo/db";
import { assertSpaceOwnership, requireAuth } from "@/lib/authGuards";

type ThemeProps = {
  theme: string | null;
  themeOptions: object | null;
  spaceId: string;
};

export const updateThemeForSpace = async ({
  theme,
  themeOptions,
  spaceId,
}: ThemeProps) => {
  if (!spaceId) {
    throw new Error("Theme and spaceId are required");
  }

  const authResult = await requireAuth();
  if ("error" in authResult) {
    throw new Error(authResult.error);
  }

  const ownership = await assertSpaceOwnership(authResult.userId, spaceId);
  if ("error" in ownership) {
    throw new Error(ownership.error);
  }

  try {
    await db.space.update({
      where: {
        id: spaceId,
      },
      data: {
        theme: {
          theme: theme ?? null,
          themeOptions: themeOptions,
        },
      },
    });
  } catch (error) {
    console.error("Error updating theme for space:", error);
    throw new Error("Failed to update theme for space");
  }
};
