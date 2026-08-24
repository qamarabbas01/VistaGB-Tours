import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import type { Place, RegionDestination } from "@/data/types";

export const mockRegion: RegionDestination = {
  kind: "region",
  slug: "test-valley",
  name: "Test Valley",
  region: "Test",
  tagline: "A sample high valley",
  description: "Terraced orchards and glacial peaks for tests.",
  image: "/images/test-valley.jpg",
  gallery: [],
  overview: "Overview of Test Valley.",
  highlights: ["Forts", "Lakes"],
  bestTime: "April–October",
  gettingThere: "Along the Karakoram Highway.",
  altitude: "2,400M",
  placeSlugs: ["test-town", "test-lake"],
};

export const mockPlace: Place = {
  slug: "test-town",
  name: "Test Town",
  parentSlug: "test-valley",
  type: "Town",
  tagline: "A bazaar beneath the peaks",
  description: "The main town used in card rendering tests.",
  image: "/images/test-town.jpg",
  gallery: [],
  overview: "Overview of Test Town.",
  highlights: ["Bazaar", "Fort"],
  activities: ["Heritage walks", "Photography", "Local cuisine", "Fort visits"],
  bestTime: "April–October",
  duration: "1–3 days",
  altitude: "2,438M",
  gettingThere: "Jeep from the nearest hub.",
  nearby: ["Nearby lake"],
};

export const mockRegionOptions = [
  {
    slug: "hunza-valley",
    name: "Hunza Valley",
    places: ["Karimabad", "Attabad Lake", "Passu"],
  },
  {
    slug: "skardu",
    name: "Skardu",
    places: ["Shangrila", "Deosai Plains"],
  },
  {
    slug: "not-sure",
    name: "Not sure yet — help me decide",
    places: [] as string[],
  },
];

export function renderWithPreferences(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: PreferencesProvider,
    ...options,
  });
}
