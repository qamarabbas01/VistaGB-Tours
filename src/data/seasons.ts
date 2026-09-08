export const PK_TIME_ZONE = 'Asia/Karachi';

export const SEASON_FEATURES = [
  {
    id: 'winter',
    months: [12, 1, 2],
    window: 'Dec–Feb',
    label: 'Winter Escapes',
    intro:
      'Clear skies, quieter roads, and snowbound valleys when the high passes rest.',
    image: '/images/commons/112aa7ad11d28437.jpg',
    imageAlt: 'Winter light on the Karakoram Highway toward Hunza',
    ctaLabel: 'Plan a winter escape',
    destinationSlugs: ['hunza-valley', 'gilgit', 'skardu'],
  },
  {
    id: 'spring',
    months: [3, 4, 5],
    window: 'Mar–May',
    label: 'Cherry Blossom Season',
    intro: 'Plan your spring escape — orchards in Hunza and Nagar turn first.',
    image: '/images/commons/bd7ddfea0e6ee033.jpg',
    imageAlt: 'Apricot blossom over Karimabad in spring',
    ctaLabel: 'Plan your spring escape',
    destinationSlugs: ['hunza-valley', 'nagar', 'gilgit'],
  },
  {
    id: 'summer',
    months: [6, 7, 8],
    window: 'Jun–Aug',
    label: 'High Country Season',
    intro:
      'Deosai, Fairy Meadows, and Khunjerab — the high roads and meadows are open.',
    image: '/images/commons/bf2171654d99937a.jpg',
    imageAlt: 'Nanga Parbat from Fairy Meadows in summer',
    ctaLabel: 'Plan a high-country trip',
    destinationSlugs: ['fairy-meadows', 'skardu', 'hunza-valley'],
  },
  {
    id: 'autumn',
    months: [9, 10, 11],
    window: 'Sep–Nov',
    label: 'Autumn in GB',
    intro: 'Discover the golden valleys of Hunza, Nagar and Skardu.',
    image: '/images/commons/5c94f723e71aac65.jpg',
    imageAlt: 'Golden autumn colour on the Passu Cones',
    ctaLabel: 'Plan your autumn trip',
    destinationSlugs: ['hunza-valley', 'nagar', 'skardu'],
  },
] as const;

export type SeasonFeature = (typeof SEASON_FEATURES)[number];
export type SeasonId = SeasonFeature['id'];

export function calendarMonth(
  date: Date,
  timeZone = PK_TIME_ZONE,
): number {
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone,
    month: 'numeric',
  }).format(date);
  return Number(formatted);
}

export function getFeaturedSeason(
  date: Date = new Date(),
  timeZone = PK_TIME_ZONE,
): SeasonFeature {
  const month = calendarMonth(date, timeZone);
  const season = SEASON_FEATURES.find((feature) =>
    (feature.months as readonly number[]).includes(month),
  );
  return season ?? SEASON_FEATURES[0];
}
