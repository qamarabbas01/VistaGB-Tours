export type GalleryImage = {
  src: string;
  title: string;
  caption?: string;
};

export type PlaceType =
  | "Town"
  | "Fort"
  | "Viewpoint"
  | "Lake"
  | "Village"
  | "Valley"
  | "Pass"
  | "Glacier"
  | "Bridge"
  | "Meadow"
  | "Desert"
  | "Waterfall";

export type Place = {
  slug: string;
  name: string;
  parentSlug: string;
  type: PlaceType;
  tagline: string;
  description: string;
  image: string;
  gallery: GalleryImage[];
  overview: string;
  highlights: string[];
  activities: string[];
  bestTime: string;
  duration?: string;
  distanceFromHub?: string;
  hubName?: string;
  coordinates?: string;
  altitude: string;
  gettingThere: string;
  nearby: string[];
};

export type RegionDestination = {
  kind: "region";
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  gallery: GalleryImage[];
  overview: string;
  highlights: string[];
  bestTime: string;
  gettingThere: string;
  altitude: string;
  majorValleys?: string[];
  placeSlugs: string[];
};

/** @deprecated Use RegionDestination — kept for gradual migration */
export type Destination = RegionDestination;

export type TravelLocation = RegionDestination | Place;

export type SearchResult = {
  query: string;
  regions: RegionDestination[];
  places: Place[];
  /** When a region matches, all of its places are included here */
  placesByRegion: Record<string, Place[]>;
};
