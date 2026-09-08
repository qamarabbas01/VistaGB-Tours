import { getRegionBySlug } from '@/data';
import {
  SEASON_FEATURES,
  calendarMonth,
  getFeaturedSeason,
} from '@/data/seasons';

describe('featured seasons', () => {
  it('maps Pakistan calendar months to winter, spring, summer, and autumn', () => {
    expect(
      getFeaturedSeason(new Date('2026-01-15T12:00:00+05:00')).id,
    ).toBe('winter');
    expect(
      getFeaturedSeason(new Date('2026-04-12T12:00:00+05:00')).label,
    ).toBe('Cherry Blossom Season');
    expect(
      getFeaturedSeason(new Date('2026-07-01T12:00:00+05:00')).id,
    ).toBe('summer');
    expect(
      getFeaturedSeason(new Date('2026-09-08T12:00:00+05:00')).label,
    ).toBe('Autumn in GB');
    expect(
      getFeaturedSeason(new Date('2026-09-08T12:00:00+05:00')).intro,
    ).toMatch(/hunza, nagar and skardu/i);
  });

  it('covers every month exactly once', () => {
    const months = SEASON_FEATURES.flatMap((season) => [...season.months]);
    expect(months.sort((a, b) => a - b)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
  });

  it('resolves featured destinations that exist in the catalog', () => {
    for (const season of SEASON_FEATURES) {
      expect(season.destinationSlugs).toHaveLength(3);
      for (const slug of season.destinationSlugs) {
        expect(getRegionBySlug(slug)?.slug).toBe(slug);
      }
    }
  });

  it('reads the calendar month in Asia/Karachi', () => {
    expect(calendarMonth(new Date('2026-11-30T22:00:00+05:00'))).toBe(11);
    expect(calendarMonth(new Date('2026-12-01T00:30:00+05:00'))).toBe(12);
  });
});
