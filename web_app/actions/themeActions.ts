"use server";

import { db } from "@/lib/db";

type ThemeProps = {
  theme: string | null;
  themeOptions: object | null;
  spaceId: string;
};

export const setThemeForSpace = async ({
  theme,
  themeOptions,
  spaceId,
}: ThemeProps) => {
  if (!theme || !spaceId) {
    throw new Error("Theme and spaceId are required");
  }

  try {
    await db.space.update({
      where: {
        id: spaceId,
      },
      data: {
        themeForRequestTestimonials: {
          theme: theme,
          themeOptions: themeOptions,
        },
      },
    });
  } catch (error) {
    console.error("Error updating theme for space:", error);
    throw new Error("Failed to update theme for space");
  }
};
