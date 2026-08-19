/** Pure helpers for the Wall of Love settings form. No framework imports. */

export type WallOfLoveStyle = "list" | "carousel" | "infiniteScrollHorizontal";
export type WallOfLoveCount = "1" | "2" | "3";

export type WallOfLoveStyleOptions = {
  columns?: WallOfLoveCount;
  rows?: WallOfLoveCount;
  showRating?: "true" | "false";
};

export type WallOfLoveSettings = {
  style: WallOfLoveStyle;
  styleOptions: WallOfLoveStyleOptions;
  headline?: string;
  subtitle?: string;
  hideBranding?: boolean;
};

const VALID_STYLES: WallOfLoveStyle[] = ["list", "carousel", "infiniteScrollHorizontal"];
const VALID_COUNTS: WallOfLoveCount[] = ["1", "2", "3"];

/** Legacy style values saved before vertical marquee and card-variant theming were dropped. */
const STYLE_ALIASES: Record<string, WallOfLoveStyle> = {
  infiniteScrollVertical: "list",
};

function normalizeStyle(value: unknown): WallOfLoveStyle {
  if (typeof value !== "string") return "list";
  if ((VALID_STYLES as string[]).includes(value)) return value as WallOfLoveStyle;
  return STYLE_ALIASES[value] ?? "list";
}

function normalizeCount(value: unknown, fallback: WallOfLoveCount): WallOfLoveCount {
  return typeof value === "string" && (VALID_COUNTS as string[]).includes(value)
    ? (value as WallOfLoveCount)
    : fallback;
}

/**
 * Coerces a saved `theme.wallOfLove` blob (which may predate the removal of
 * `gap`/`cardVariant`/`showDate`/`infiniteScrollVertical`) into the current shape.
 * Dead keys are silently dropped rather than migrated - `Space.theme` is a JSON
 * column with no migration path, so old spaces just fall back to defaults.
 */
export function normalizeWallOfLoveSettings(theme: unknown): WallOfLoveSettings {
  const record = theme as Record<string, unknown> | null | undefined;
  const raw = record?.wallOfLove as Record<string, unknown> | undefined;

  const style = normalizeStyle(raw?.style);
  const rawOptions = (raw?.styleOptions as Record<string, unknown>) ?? {};

  const styleOptions: WallOfLoveStyleOptions =
    style === "infiniteScrollHorizontal"
      ? { rows: normalizeCount(rawOptions.rows, "1") }
      : { columns: normalizeCount(rawOptions.columns, style === "carousel" ? "2" : "3") };

  styleOptions.showRating = rawOptions.showRating === "false" ? "false" : "true";

  return {
    style,
    styleOptions,
    headline: typeof raw?.headline === "string" ? raw.headline : undefined,
    subtitle: typeof raw?.subtitle === "string" ? raw.subtitle : undefined,
    hideBranding: raw?.hideBranding === true,
  };
}

/** True when `draft` matches `saved` and the form has nothing to save. */
export function isWallOfLovePristine(
  draft: WallOfLoveSettings,
  saved: WallOfLoveSettings,
): boolean {
  return (
    draft.style === saved.style &&
    (draft.styleOptions.columns ?? null) === (saved.styleOptions.columns ?? null) &&
    (draft.styleOptions.rows ?? null) === (saved.styleOptions.rows ?? null) &&
    (draft.styleOptions.showRating ?? "true") === (saved.styleOptions.showRating ?? "true") &&
    (draft.headline ?? "") === (saved.headline ?? "") &&
    (draft.subtitle ?? "") === (saved.subtitle ?? "") &&
    Boolean(draft.hideBranding) === Boolean(saved.hideBranding)
  );
}
