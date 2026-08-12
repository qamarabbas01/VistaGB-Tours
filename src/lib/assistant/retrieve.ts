import {
  getLocationBySlug,
  getParentRegion,
  getPlacesForRegion,
  isPlace,
  searchLocations,
  type Place,
  type RegionDestination,
  type TravelLocation,
} from "@/data";
import { fetchDestinationWeather } from "@/lib/weather/fetch";
import type { DestinationWeather } from "@/lib/weather/types";

export type TravelIntent =
  | "overview"
  | "itinerary"
  | "hotels"
  | "food"
  | "best_time"
  | "weather"
  | "budget"
  | "roads"
  | "packing"
  | "nearby"
  | "general";

export type RetrievedDestination = {
  kind: "region" | "place";
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview: string;
  bestTime: string;
  altitude: string;
  gettingThere: string;
  highlights: string[];
  parentName?: string;
  placeType?: string;
  activities?: string[];
  guide?: RegionDestination["guide"];
  childPlaceNames?: string[];
};

export type TravelContext = {
  query: string;
  intent: TravelIntent;
  destinations: RetrievedDestination[];
  weather: DestinationWeather | null;
  generalTopics: Array<"budget" | "roads" | "packing">;
};

const INTENT_PATTERNS: Array<{ intent: TravelIntent; pattern: RegExp }> = [
  { intent: "itinerary", pattern: /\b(itinerar(?:y|ies)|day[- ]?by[- ]?day|5[- ]?day|7[- ]?day|schedule)\b/i },
  { intent: "hotels", pattern: /\b(hotels?|lodges?|stays?|accommodation|guesthouses?|where to stay)\b/i },
  { intent: "food", pattern: /\b(foods?|cuisine|eat|restaurants?|dishes?|famous food|what to eat)\b/i },
  { intent: "best_time", pattern: /\b(best time|when to (go|visit)|seasons?|which month)\b/i },
  { intent: "weather", pattern: /\b(weather|temperature|forecast|snowfall|raining|sunrise|sunset)\b/i },
  { intent: "budget", pattern: /\b(budget|costs?|prices?|expensive|cheap|how much|spend)\b/i },
  { intent: "roads", pattern: /\b(roads?|kkh|highway|landslides?|drive|jeep|access)\b/i },
  { intent: "packing", pattern: /\b(packs?|packing|what to (bring|wear)|gear|layers|clothes)\b/i },
  { intent: "nearby", pattern: /\b(nearby|near|around|close to|side trips?|from here)\b/i },
  { intent: "overview", pattern: /\b(tell me about|about|overview|introduce|what is)\b/i },
];

export function detectIntent(query: string): TravelIntent {
  for (const { intent, pattern } of INTENT_PATTERNS) {
    if (pattern.test(query)) return intent;
  }
  return "general";
}

function toRetrieved(location: TravelLocation): RetrievedDestination {
  if (isPlace(location)) {
    const parent = getParentRegion(location);
    return {
      kind: "place",
      slug: location.slug,
      name: location.name,
      tagline: location.tagline,
      description: location.description,
      overview: location.overview,
      bestTime: location.bestTime,
      altitude: location.altitude,
      gettingThere: location.gettingThere,
      highlights: location.highlights,
      parentName: parent?.name,
      placeType: location.type,
      activities: location.activities,
    };
  }

  const children = getPlacesForRegion(location.slug);
  return {
    kind: "region",
    slug: location.slug,
    name: location.name,
    tagline: location.tagline,
    description: location.description,
    overview: location.overview,
    bestTime: location.bestTime,
    altitude: location.altitude,
    gettingThere: location.gettingThere,
    highlights: location.highlights,
    guide: location.guide,
    childPlaceNames: children.slice(0, 12).map((p: Place) => p.name),
  };
}

function uniqueBySlug(items: RetrievedDestination[]): RetrievedDestination[] {
  const seen = new Set<string>();
  const out: RetrievedDestination[] = [];
  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
  }
  return out;
}

export async function buildTravelContext(
  query: string,
  destinationSlug?: string,
): Promise<TravelContext> {
  const intent = detectIntent(query);
  const destinations: RetrievedDestination[] = [];

  if (destinationSlug) {
    const hinted = getLocationBySlug(destinationSlug);
    if (hinted) destinations.push(toRetrieved(hinted));
  }

  const search = searchLocations(query);
  for (const region of search.regions.slice(0, 3)) {
    destinations.push(toRetrieved(region));
  }
  for (const place of search.places.slice(0, 4)) {
    destinations.push(toRetrieved(place));
  }

  // Common aliases that search may miss as short names
  const aliasMap: Record<string, string> = {
    hunza: "hunza-valley",
    skardu: "skardu",
    gilgit: "gilgit",
    nagar: "nagar",
    khaplu: "khaplu",
    astore: "astore-valley",
    "fairy meadows": "fairy-meadows",
    deosai: "deosai-plains",
    ghizer: "ghizer",
    broghil: "broghil-valley",
  };

  const lower = query.toLowerCase();
  for (const [alias, slug] of Object.entries(aliasMap)) {
    if (lower.includes(alias)) {
      const loc = getLocationBySlug(slug);
      if (loc) destinations.push(toRetrieved(loc));
    }
  }

  const unique = uniqueBySlug(destinations);
  const lowerName = query.toLowerCase();
  unique.sort((a, b) => {
    const score = (d: RetrievedDestination) => {
      const name = d.name.toLowerCase();
      const slugWords = d.slug.replace(/-/g, " ");
      if (lowerName.includes(name)) return 0;
      if (name.split(/\s+/).some((w) => w.length > 3 && lowerName.includes(w)))
        return 1;
      if (lowerName.includes(slugWords)) return 2;
      return 5;
    };
    return score(a) - score(b);
  });
  const ranked = unique.slice(0, 4);

  let weather: DestinationWeather | null = null;
  if (intent === "weather" || /\b(weather|forecast|temperature)\b/i.test(query)) {
    const weatherSlug = ranked[0]?.slug ?? destinationSlug;
    if (weatherSlug) {
      try {
        weather = await fetchDestinationWeather(weatherSlug);
      } catch {
        weather = null;
      }
    }
  }

  const generalTopics: TravelContext["generalTopics"] = [];
  if (intent === "budget" || /\bbudget\b/i.test(query)) generalTopics.push("budget");
  if (intent === "roads" || /\broad\b/i.test(query)) generalTopics.push("roads");
  if (intent === "packing" || /\bpack/i.test(query)) generalTopics.push("packing");

  return {
    query,
    intent,
    destinations: ranked,
    weather,
    generalTopics,
  };
}

export function formatContextForPrompt(ctx: TravelContext): string {
  const parts: string[] = [];

  parts.push(`User intent: ${ctx.intent}`);

  for (const dest of ctx.destinations) {
    const block: string[] = [
      `## ${dest.name} (${dest.kind})`,
      `Slug: ${dest.slug}`,
      `Tagline: ${dest.tagline}`,
      `Altitude: ${dest.altitude}`,
      `Best time: ${dest.bestTime}`,
      `Overview: ${dest.overview}`,
      `Getting there: ${dest.gettingThere}`,
      `Highlights: ${dest.highlights.join("; ")}`,
    ];

    if (dest.parentName) block.push(`Parent region: ${dest.parentName}`);
    if (dest.placeType) block.push(`Type: ${dest.placeType}`);
    if (dest.activities?.length) {
      block.push(`Activities: ${dest.activities.join("; ")}`);
    }
    if (dest.childPlaceNames?.length) {
      block.push(`Places inside: ${dest.childPlaceNames.join(", ")}`);
    }

    const guide = dest.guide;
    if (guide) {
      if (guide.history) block.push(`History: ${guide.history}`);
      if (guide.culture) block.push(`Culture: ${guide.culture}`);
      if (guide.weather) block.push(`Seasonal weather notes: ${guide.weather}`);
      if (guide.famousFoods?.length) {
        block.push(
          `Famous foods: ${guide.famousFoods
            .map((f) => `${f.name} — ${f.detail}`)
            .join(" | ")}`,
        );
      }
      if (guide.hotels?.length) {
        block.push(
          `Hotels & lodges: ${guide.hotels
            .map((h) => `${h.name} — ${h.detail}`)
            .join(" | ")}`,
        );
      }
      if (guide.restaurants?.length) {
        block.push(
          `Restaurants: ${guide.restaurants
            .map((r) => `${r.name} — ${r.detail}`)
            .join(" | ")}`,
        );
      }
      if (guide.suggestedItinerary?.length) {
        block.push(
          `Suggested itinerary: ${guide.suggestedItinerary
            .map(
              (d) =>
                `${d.day}: ${d.title} — ${d.summary}${
                  d.stops?.length ? ` (stops: ${d.stops.join(", ")})` : ""
                }`,
            )
            .join(" | ")}`,
        );
      }
      if (guide.trekkingRoutes?.length) {
        block.push(
          `Treks: ${guide.trekkingRoutes
            .map((t) => `${t.name} — ${t.detail}`)
            .join(" | ")}`,
        );
      }
      if (guide.localTips?.length) {
        block.push(`Local tips: ${guide.localTips.join("; ")}`);
      }
      if (guide.nearbyDestinations?.length) {
        block.push(
          `Nearby destinations: ${guide.nearbyDestinations
            .map((n) => `${n.name} — ${n.detail}`)
            .join(" | ")}`,
        );
      }
      if (guide.faqs?.length) {
        block.push(
          `FAQs: ${guide.faqs
            .slice(0, 6)
            .map((f) => `Q: ${f.question} A: ${f.answer}`)
            .join(" | ")}`,
        );
      }
      if (guide.travelDuration) {
        block.push(`Typical trip length: ${guide.travelDuration}`);
      }
    }

    parts.push(block.join("\n"));
  }

  if (ctx.weather) {
    parts.push(
      [
        `## Live weather for ${ctx.weather.locationLabel}`,
        `Now: ${ctx.weather.current.temperatureC}°C, ${ctx.weather.current.condition}`,
        `Wind: ${ctx.weather.current.windKmh} km/h · Rain: ${ctx.weather.current.rainMm} mm · Snow: ${ctx.weather.current.snowfallCm} cm`,
        `Sunrise: ${ctx.weather.today.sunrise} · Sunset: ${ctx.weather.today.sunset}`,
        `Forecast: ${ctx.weather.forecast
          .map(
            (d) =>
              `${d.date}: ${d.tempMinC}–${d.tempMaxC}°C, ${d.condition}, rain ${d.rainMm} mm, snow ${d.snowfallCm} cm`,
          )
          .join(" | ")}`,
      ].join("\n"),
    );
  }

  return parts.join("\n\n").slice(0, 12000);
}
