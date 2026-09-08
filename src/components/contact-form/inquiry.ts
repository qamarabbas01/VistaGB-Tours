export type RegionFormOption = {
  slug: string;
  name: string;
  places: string[];
};

export const DURATION_OPTIONS = [
  '3 days',
  '4–5 days',
  '6–7 days',
  '8–10 days',
  '11–14 days',
  '2+ weeks',
  'Not sure yet',
] as const;

export const CONTACT_INPUT_CLASS =
  'w-full rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60';

export function buildMonthOptions() {
  const options: { value: string; label: string }[] = [];
  const now = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
    options.push({ value, label });
  }

  return options;
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

/** Parse YYYY-MM-DD as a local calendar date so timezone does not shift the day. */
export function parseIsoDate(iso: string): Date | null {
  const match = ISO_DATE.exec(iso.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export type TripLength = {
  days: number;
  nights: number;
  label: string;
};

export function formatTripLength(days: number): TripLength | null {
  if (!Number.isInteger(days) || days < 1) return null;
  const nights = days - 1;
  if (days === 1) {
    return { days, nights, label: '1 day' };
  }
  const nightLabel = nights === 1 ? '1 night' : `${nights} nights`;
  return { days, nights, label: `${days} days · ${nightLabel}` };
}

/** Inclusive calendar days: 1 Jan → 7 Jan is a 7-day trip (6 nights). */
export function tripLengthFromDates(
  fromIso: string,
  toIso: string,
): TripLength | null {
  const from = parseIsoDate(fromIso);
  const to = parseIsoDate(toIso);
  if (!from || !to) return null;
  const days =
    Math.round((to.getTime() - from.getTime()) / MS_PER_DAY) + 1;
  return formatTripLength(days);
}

export function validateInquiry(input: {
  duration: string;
  datesFlexible: boolean;
  travelFrom: string;
  travelTo?: string;
  travelMonth: string;
}): string | null {
  if (!input.datesFlexible && !input.travelFrom) {
    return 'Please choose when you want to travel, or mark your dates as flexible.';
  }
  if (input.datesFlexible && !input.travelMonth) {
    return 'Please choose the month you are hoping to travel.';
  }
  if (!input.datesFlexible && input.travelFrom && input.travelTo) {
    if (!tripLengthFromDates(input.travelFrom, input.travelTo)) {
      return 'End date needs to be on or after the start date.';
    }
  }
  if (!input.duration) {
    return 'Please select how long you want to travel.';
  }
  return null;
}

export function placesSummary(input: {
  placesFlexible: boolean;
  selectedPlaces: string[];
  hasPlaces: boolean;
}): string {
  if (input.placesFlexible) return 'Please suggest places for me';
  if (input.selectedPlaces.length > 0) return input.selectedPlaces.join(', ');
  if (input.hasPlaces) return 'No specific places selected';
  return '';
}
