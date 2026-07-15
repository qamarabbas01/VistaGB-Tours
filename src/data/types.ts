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

export type DestinationFaq = {
  question: string;
  answer: string;
};

/** Named listing with optional link to a place page */
export type GuideListing = {
  name: string;
  detail: string;
  placeSlug?: string;
};

export type ItineraryDay = {
  day: string;
  title: string;
  summary: string;
  stops?: string[];
};

/** Rich travel guide content for a region destination page */
export type RegionGuide = {
  history?: string;
  culture?: string;
  weather?: string;
  population?: string;
  languages?: string[];
  famousFoods?: GuideListing[];
  hotels?: GuideListing[];
  restaurants?: GuideListing[];
  trekkingRoutes?: GuideListing[];
  activities?: string[];
  localTips?: string[];
  nearbyDestinations?: GuideListing[];
  /** Google Maps embed URL (output=embed) */
  mapEmbedUrl?: string;
  travelDuration?: string;
  suggestedItinerary?: ItineraryDay[];
  faqs?: DestinationFaq[];
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
  guide?: RegionGuide;
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

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  image: string;
};
