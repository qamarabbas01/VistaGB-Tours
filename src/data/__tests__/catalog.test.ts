import {
  getAllStaticSlugs,
  getLocationBySlug,
  getParentRegion,
  getPlaceBySlug,
  getPlacesForRegion,
  getRegionBySlug,
  isPlace,
  places,
  regions,
  searchLocations,
} from "@/data";

describe("destination data modules", () => {
  it("keeps region and place slugs unique across the catalog", () => {
    const slugs = [
      ...regions.map((region) => region.slug),
      ...places.map((place) => place.slug),
    ];

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBeGreaterThan(10);
  });

  it("resolves regions, places, parent hubs, and nested place lists", () => {
    const hunza = getRegionBySlug("hunza-valley");
    const karimabad = getPlaceBySlug("karimabad");

    expect(hunza?.name).toBe("Hunza Valley");
    expect(karimabad?.name).toBe("Karimabad");
    expect(isPlace(hunza!)).toBe(false);
    expect(isPlace(karimabad!)).toBe(true);
    expect(getLocationBySlug("hunza-valley")).toEqual(hunza);
    expect(getLocationBySlug("karimabad")).toEqual(karimabad);
    expect(getParentRegion(karimabad!)?.slug).toBe("hunza-valley");

    const hunzaPlaces = getPlacesForRegion("hunza-valley");
    expect(hunzaPlaces.length).toBeGreaterThan(0);
    expect(hunzaPlaces.every((place) => place.parentSlug === "hunza-valley")).toBe(
      true,
    );
    expect(getPlacesForRegion("missing-region")).toEqual([]);
    expect(getAllStaticSlugs()).toEqual([
      ...regions.map((region) => region.slug),
      ...places.map((place) => place.slug),
    ]);
  });

  it("returns an empty search result for a blank query", () => {
    expect(searchLocations("   ")).toEqual({
      query: "   ",
      regions: [],
      places: [],
      placesByRegion: {},
    });
  });

  it("finds regions and places by name, alias, and place type", () => {
    const hunza = searchLocations("hunza");
    expect(hunza.regions.some((region) => region.slug === "hunza-valley")).toBe(
      true,
    );

    const karimabad = searchLocations("karimabad");
    expect(karimabad.places.some((place) => place.slug === "karimabad")).toBe(
      true,
    );

    const lakes = searchLocations("lake");
    expect(lakes.places.length).toBeGreaterThan(0);
    expect(lakes.places.every((place) => place.type === "Lake")).toBe(true);

    expect(searchLocations("zzzznotarealplace").regions).toEqual([]);
    expect(searchLocations("zzzznotarealplace").places).toEqual([]);
  });
});
