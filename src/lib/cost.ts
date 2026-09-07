import { regions } from '@/data';

export const TRAVEL_STYLES = ['backpacker', 'comfortable', 'premium'] as const;
export type TravelStyle = (typeof TRAVEL_STYLES)[number];

export const TRAVEL_STYLE_META: Record<
  TravelStyle,
  {
    label: string;
    hint: string;
    min: number;
    max: number;
    per: 'person-day' | 'group-day';
  }
> = {
  backpacker: {
    label: 'Homestay / backpacker',
    hint: 'Per person per day, excluding long jeep hires.',
    min: 8_000,
    max: 18_000,
    per: 'person-day',
  },
  comfortable: {
    label: 'Private jeep (mid-range)',
    hint: 'All-in day rate for a couple or small group: driver, fuel, lodge, breakfast.',
    min: 25_000,
    max: 45_000,
    per: 'group-day',
  },
  premium: {
    label: 'Private jeep (premium lodges)',
    hint: 'Higher-end stays and a dedicated vehicle — still a quote, not a ticket price.',
    min: 55_000,
    max: 90_000,
    per: 'group-day',
  },
};

const DESTINATION_MULTIPLIER: Record<string, number> = {
  gilgit: 0.92,
  'hunza-valley': 1,
  nagar: 1,
  skardu: 1.05,
  khaplu: 1.08,
  ghizer: 1.05,
  'astore-valley': 1.06,
  'fairy-meadows': 1.15,
  'deosai-plains': 1.12,
  broghil: 1.25,
};

export function destinationMultiplier(slug: string): number {
  return DESTINATION_MULTIPLIER[slug] ?? 1;
}

export function estimateTripCostPkr({
  days,
  groupSize,
  style,
  destinationSlug,
}: {
  days: number;
  groupSize: number;
  style: TravelStyle;
  destinationSlug: string;
}): { min: number; max: number } {
  const meta = TRAVEL_STYLE_META[style];
  const dest = destinationMultiplier(destinationSlug);
  const people = Math.max(1, groupSize);
  const nights = Math.max(1, days);
  const extraJeep =
    meta.per === 'group-day' && people > 4
      ? 1 + 0.2 * Math.ceil((people - 4) / 3)
      : 1;

  if (meta.per === 'person-day') {
    return {
      min: Math.round(meta.min * people * nights * dest),
      max: Math.round(meta.max * people * nights * dest),
    };
  }

  return {
    min: Math.round(meta.min * nights * dest * extraJeep),
    max: Math.round(meta.max * nights * dest * extraJeep),
  };
}

export function costDestinationOptions() {
  return regions.map((region) => ({ slug: region.slug, name: region.name }));
}
