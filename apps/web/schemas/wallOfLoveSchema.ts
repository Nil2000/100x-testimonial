import * as z from "zod";
import type { WallOfLoveSettings } from "@/lib/wall-of-love-settings";

const countChoice = z.enum(["1", "2", "3"]);
const showRatingValue = z.enum(["true", "false"]);

/** `satisfies` keeps this in sync with WallOfLoveSettings without widening its literal unions to `string`. */
export const wallOfLoveSchema = z.object({
  style: z.enum(["list", "carousel", "infiniteScrollHorizontal"]),
  styleOptions: z.object({
    columns: countChoice.optional(),
    rows: countChoice.optional(),
    showRating: showRatingValue.optional(),
  }),
  headline: z.string().trim().max(120, "Headline is too long").optional(),
  subtitle: z.string().trim().max(200, "Subtitle is too long").optional(),
  hideBranding: z.boolean().optional(),
}) satisfies z.ZodType<WallOfLoveSettings, z.ZodTypeDef, unknown>;
