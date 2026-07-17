import type { Place, RegionDestination, SearchResult, TravelLocation } from "./types";
import { hunzaDestination } from "./destinations/hunza";
import { skarduDestination } from "./destinations/skardu";
import { gilgitDestination } from "./destinations/gilgit";
import { nagarDestination } from "./destinations/nagar";
import { legacyDestinations } from "./destinations/legacy";
import { allPlaces } from "./places";

export { blogPosts } from "./blog";

export type {
  BlogPost,
  DestinationFaq,
  GalleryImage,
  GuideListing,
  ItineraryDay,
  Place,
  PlaceType,
  RegionDestination,
  RegionGuide,
  Destination,
  TravelLocation,
  SearchResult,
} from "./types";

/** Top-level region hubs shown on the destinations map */
export const regions: RegionDestination[] = [
  hunzaDestination,
  skarduDestination,
  gilgitDestination,
  nagarDestination,
  ...legacyDestinations,
];

/** @deprecated Use `regions` — kept for existing imports */
export const destinations = regions;

export const places: Place[] = allPlaces;

const placeBySlug = new Map(places.map((p) => [p.slug, p]));
const regionBySlug = new Map(regions.map((r) => [r.slug, r]));

export function isPlace(location: TravelLocation): location is Place {
  return "parentSlug" in location;
}

export function getRegionBySlug(slug: string): RegionDestination | undefined {
  return regionBySlug.get(slug);
}

/** Resolves a region or place by slug (for /destinations/[slug] routes) */
export function getLocationBySlug(slug: string): TravelLocation | undefined {
  return placeBySlug.get(slug) ?? regionBySlug.get(slug);
}

/** @deprecated Use getLocationBySlug */
export function getDestinationBySlug(slug: string): RegionDestination | undefined {
  return getRegionBySlug(slug);
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return placeBySlug.get(slug);
}

export function getPlacesForRegion(regionSlug: string): Place[] {
  const region = regionBySlug.get(regionSlug);
  if (!region) return [];
  return region.placeSlugs
    .map((slug) => placeBySlug.get(slug))
    .filter((p): p is Place => Boolean(p));
}

export function getParentRegion(place: Place): RegionDestination | undefined {
  return regionBySlug.get(place.parentSlug);
}

export function getAllStaticSlugs(): string[] {
  return [...regions.map((r) => r.slug), ...places.map((p) => p.slug)];
}

const SEARCH_ALIASES: Record<string, string[]> = {
  hunza: ["hunza-valley"],
  gojal: ["gojal-valley", "hunza-valley"],
  karimabad: ["karimabad", "hunza-valley"],
  baltit: ["baltit-fort", "hunza-valley"],
  altit: ["altit-fort", "hunza-valley"],
  attabad: ["attabad-lake", "hunza-valley"],
  passu: ["passu", "passu-cones", "hunza-valley"],
  khunjerab: ["khunjerab-pass", "hunza-valley"],
  hopper: ["hopper-valley", "nagar"],
  hoper: ["hopper-valley", "nagar"],
  nagar: ["nagar", "nagar-khas"],
  skardu: ["skardu"],
  kachura: ["shangrila-resort", "upper-kachura-lake", "skardu"],
  shangrila: ["shangrila-resort", "skardu"],
  deosai: ["deosai-plains", "skardu"],
  naltar: ["naltar-valley", "gilgit"],
  gilgit: ["gilgit"],
};

function scoreMatch(text: string, query: string): number {
  const lower = text.toLowerCase();
  if (lower === query) return 100;
  if (lower.startsWith(query)) return 80;
  if (lower.includes(query)) return 50;
  return 0;
}

function placeSearchText(place: Place): string {
  return [
    place.name,
    place.tagline,
    place.description,
    place.overview,
    place.type,
    ...(place.searchTags ?? []),
    ...place.highlights,
    ...place.activities,
    place.parentSlug,
  ].join(" ");
}

function regionSearchText(region: RegionDestination): string {
  const guide = region.guide;
  return [
    region.name,
    region.region,
    region.tagline,
    region.description,
    region.overview,
    ...(region.searchTags ?? []),
    ...(region.majorValleys ?? []),
    ...region.highlights,
    ...region.placeSlugs,
    guide?.history,
    guide?.culture,
    guide?.weather,
    guide?.population,
    ...(guide?.languages ?? []),
    ...(guide?.activities ?? []),
    ...(guide?.localTips ?? []),
    ...(guide?.famousFoods?.map((f) => `${f.name} ${f.detail}`) ?? []),
    ...(guide?.hotels?.map((h) => h.name) ?? []),
    ...(guide?.restaurants?.map((r) => r.name) ?? []),
    ...(guide?.trekkingRoutes?.map(
      (t) => `${t.name} ${t.detail} ${t.placeSlug ?? ""}`,
    ) ?? []),
    ...(guide?.nearbyDestinations?.map((n) => n.name) ?? []),
    ...(guide?.faqs?.map((f) => `${f.question} ${f.answer}`) ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

/** Search regions and places by names, categories, guide content, and keywords */
export function searchLocations(query: string): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { query, regions: [], places: [], placesByRegion: {} };
  }

  const taggedRegions = regions.filter((region) =>
    region.searchTags?.some((tag) => tag.toLowerCase() === q),
  );
  const taggedPlaces = places.filter((place) =>
    place.searchTags?.some((tag) => tag.toLowerCase() === q),
  );

  // Exact curated categories intentionally take precedence over incidental
  // mentions in prose (for example, a town that merely overlooks a fort).
  if (taggedRegions.length > 0 || taggedPlaces.length > 0) {
    return {
      query,
      regions: taggedRegions,
      places: taggedPlaces,
      placesByRegion: Object.fromEntries(
        taggedRegions.map((region) => [
          region.slug,
          getPlacesForRegion(region.slug),
        ]),
      ),
    };
  }

  const placeType = places.find(
    (place) => place.type.toLowerCase() === q,
  )?.type;

  if (placeType) {
    const typedRegions =
      q === "valley"
        ? regions.filter((region) =>
            region.name.toLowerCase().includes("valley"),
          )
        : [];

    return {
      query,
      regions: typedRegions,
      places: places.filter((place) => place.type === placeType),
      placesByRegion: Object.fromEntries(
        typedRegions.map((region) => [
          region.slug,
          getPlacesForRegion(region.slug),
        ]),
      ),
    };
  }

  const aliasSlugs = new Set<string>();
  for (const [alias, slugs] of Object.entries(SEARCH_ALIASES)) {
    if (alias.includes(q) || q.includes(alias)) {
      slugs.forEach((s) => aliasSlugs.add(s));
    }
  }

  const matchedRegions = regions
    .filter((r) => {
      if (aliasSlugs.has(r.slug)) return true;
      return scoreMatch(regionSearchText(r), q) > 0;
    })
    .sort(
      (a, b) =>
        scoreMatch(regionSearchText(b), q) - scoreMatch(regionSearchText(a), q),
    );

  const matchedPlaces = places
    .filter((p) => {
      if (aliasSlugs.has(p.slug)) return true;
      return scoreMatch(placeSearchText(p), q) > 0;
    })
    .sort(
      (a, b) =>
        scoreMatch(placeSearchText(b), q) - scoreMatch(placeSearchText(a), q),
    );

  const placesByRegion: Record<string, Place[]> = {};
  for (const region of matchedRegions) {
    placesByRegion[region.slug] = getPlacesForRegion(region.slug);
  }

  return {
    query,
    regions: matchedRegions,
    places: matchedPlaces,
    placesByRegion,
  };
}
