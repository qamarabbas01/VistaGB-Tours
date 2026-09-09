import { reviews } from '@/data/hero';

const SLUG_MATCHERS: { slug: string; pattern: RegExp }[] = [
  { slug: 'hunza-valley', pattern: /\bhunza\b/i },
  { slug: 'skardu', pattern: /\bskardu\b|\bdeosai\b/i },
  { slug: 'fairy-meadows', pattern: /fairy meadows/i },
  { slug: 'nagar', pattern: /\bnagar\b/i },
];

export type DestinationRating = {
  score: number;
  count: number;
};

export function ratingForSlug(slug: string): DestinationRating | null {
  const matcher = SLUG_MATCHERS.find((item) => item.slug === slug);
  if (!matcher) return null;

  const matched = reviews.filter(
    (review) =>
      matcher.pattern.test(review.trip) || matcher.pattern.test(review.quote),
  );
  if (matched.length === 0) return null;

  const score =
    matched.reduce((sum, review) => sum + review.rating, 0) / matched.length;
  return { score, count: matched.length };
}
