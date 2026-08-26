export type RegionFormOption = {
  slug: string;
  name: string;
  places: string[];
};

export const DURATION_OPTIONS = [
  "3 days",
  "4–5 days",
  "6–7 days",
  "8–10 days",
  "11–14 days",
  "2+ weeks",
  "Not sure yet",
] as const;

export const CONTACT_INPUT_CLASS =
  "w-full rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60";

export function buildMonthOptions() {
  const options: { value: string; label: string }[] = [];
  const now = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
    options.push({ value, label });
  }

  return options;
}

export function validateInquiry(input: {
  duration: string;
  datesFlexible: boolean;
  travelFrom: string;
  travelMonth: string;
}): string | null {
  if (!input.duration) {
    return "Please select how long you want to travel.";
  }
  if (!input.datesFlexible && !input.travelFrom) {
    return "Please choose when you want to travel, or mark your dates as flexible.";
  }
  if (input.datesFlexible && !input.travelMonth) {
    return "Please choose the month you are hoping to travel.";
  }
  return null;
}

export function placesSummary(input: {
  placesFlexible: boolean;
  selectedPlaces: string[];
  hasPlaces: boolean;
}): string {
  if (input.placesFlexible) return "Please suggest places for me";
  if (input.selectedPlaces.length > 0) return input.selectedPlaces.join(", ");
  if (input.hasPlaces) return "No specific places selected";
  return "";
}
