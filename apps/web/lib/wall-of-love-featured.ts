/** Pick one testimonial to promote as the wall's pull quote. No framework imports. */

const MIN_ANSWER_LENGTH = 60;
const MAX_ANSWER_LENGTH = 280;
const MIN_WALL_SIZE = 3;

export type FeaturedCandidate = {
  id: string;
  answer: string | null;
  rating: number;
  feedbackType: string;
};

/**
 * Returns a text testimonial whose answer is long enough to read as a quote
 * and short enough to set at display scale. Needs at least three testimonials
 * so the quote does not just repeat the wall. Highest rating wins; ties go
 * to the longer answer.
 */
export function pickFeaturedTestimonial<T extends FeaturedCandidate>(
  list: T[],
): T | null {
  if (list.length < MIN_WALL_SIZE) return null;

  const eligible = list.filter((item) => {
    if (item.feedbackType !== "TEXT") return false;
    const length = item.answer?.trim().length ?? 0;
    return length >= MIN_ANSWER_LENGTH && length <= MAX_ANSWER_LENGTH;
  });

  if (eligible.length === 0) return null;

  return eligible.reduce((best, item) => {
    if (item.rating !== best.rating) {
      return item.rating > best.rating ? item : best;
    }
    const itemLength = item.answer?.trim().length ?? 0;
    const bestLength = best.answer?.trim().length ?? 0;
    return itemLength > bestLength ? item : best;
  });
}
