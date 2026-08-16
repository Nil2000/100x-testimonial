/** Runnable check for wall-of-love-settings.ts. Run with: bun apps/web/lib/wall-of-love-settings.check.ts */
import assert from "node:assert";
import {
  normalizeWallOfLoveSettings,
  isWallOfLovePristine,
} from "./wall-of-love-settings";

// No saved theme -> list defaults.
assert.deepStrictEqual(normalizeWallOfLoveSettings(null), {
  style: "list",
  styleOptions: { columns: "3", showRating: "true" },
  headline: undefined,
  subtitle: undefined,
  hideBranding: false,
});

// Legacy vertical marquee coerces to list; dead keys (gap/cardVariant/showDate) are dropped.
assert.deepStrictEqual(
  normalizeWallOfLoveSettings({
    wallOfLove: {
      style: "infiniteScrollVertical",
      styleOptions: {
        columns: "2",
        gap: "relaxed",
        cardVariant: "dark",
        showDate: "true",
      },
    },
  }),
  {
    style: "list",
    styleOptions: { columns: "2", showRating: "true" },
    headline: undefined,
    subtitle: undefined,
    hideBranding: false,
  },
);

// Out-of-range counts fall back to the layout default.
assert.deepStrictEqual(
  normalizeWallOfLoveSettings({
    wallOfLove: { style: "carousel", styleOptions: { columns: "9" } },
  }).styleOptions,
  { columns: "2", showRating: "true" },
);

// Marquee keeps rows, not columns.
assert.deepStrictEqual(
  normalizeWallOfLoveSettings({
    wallOfLove: {
      style: "infiniteScrollHorizontal",
      styleOptions: { rows: "2", showRating: "false" },
    },
  }).styleOptions,
  { rows: "2", showRating: "false" },
);

// Chrome fields pass through when present.
assert.deepStrictEqual(
  normalizeWallOfLoveSettings({
    wallOfLove: {
      style: "list",
      headline: "Loved by our users",
      subtitle: "See for yourself",
      hideBranding: true,
    },
  }),
  {
    style: "list",
    styleOptions: { columns: "3", showRating: "true" },
    headline: "Loved by our users",
    subtitle: "See for yourself",
    hideBranding: true,
  },
);

// Pristine comparison.
const saved = normalizeWallOfLoveSettings(null);
assert.strictEqual(isWallOfLovePristine(saved, saved), true);
assert.strictEqual(
  isWallOfLovePristine({ ...saved, headline: "New" }, saved),
  false,
);
assert.strictEqual(
  isWallOfLovePristine(
    { ...saved, styleOptions: { ...saved.styleOptions, showRating: "false" } },
    saved,
  ),
  false,
);

console.log("wall-of-love-settings.check.ts: all assertions passed");
