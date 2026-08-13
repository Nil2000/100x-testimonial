/** Pure helpers for the Testimonial Page theme settings form. No framework imports. */

export type ThemeDraft = {
  theme: string | null;
  showBrandLogo: boolean;
  font: string | null;
};

/**
 * True when `draft` matches `saved` and the form has nothing to save.
 * Normalizes `theme`/`font` so "no theme selected" compares equal whether it
 * shows up as `null` (from the store) or `undefined` (from an unset local
 * choice) - the un-normalized comparison used to leave Save permanently
 * enabled for spaces with no theme.
 */
export function isThemePristine(draft: ThemeDraft, saved: ThemeDraft): boolean {
  return (
    (draft.theme ?? null) === (saved.theme ?? null) &&
    Boolean(draft.showBrandLogo) === Boolean(saved.showBrandLogo) &&
    (draft.font ?? null) === (saved.font ?? null)
  );
}
