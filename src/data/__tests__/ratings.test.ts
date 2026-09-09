import { ratingForSlug } from '@/data/ratings';

describe('ratingForSlug', () => {
  it('averages Hunza reviews that mention the valley', () => {
    const rating = ratingForSlug('hunza-valley');
    expect(rating).not.toBeNull();
    expect(rating?.count).toBeGreaterThanOrEqual(2);
    expect(rating?.score).toBe(5);
  });

  it('returns nothing when a place has no matching reviews', () => {
    expect(ratingForSlug('karimabad')).toBeNull();
  });
});
