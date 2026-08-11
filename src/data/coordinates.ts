import { getLocationBySlug, getParentRegion, isPlace } from "@/data";

export type GeoPoint = {
  lat: number;
  lng: number;
  label: string;
};

/** Approximate hub coordinates for destination weather lookups */
const DESTINATION_COORDS: Record<string, { lat: number; lng: number }> = {
  "hunza-valley": { lat: 36.3167, lng: 74.65 },
  nagar: { lat: 36.2667, lng: 74.7833 },
  skardu: { lat: 35.2971, lng: 75.6335 },
  "shigar-valley": { lat: 35.4222, lng: 75.7333 },
  khaplu: { lat: 35.1547, lng: 76.3375 },
  "deosai-plains": { lat: 34.9833, lng: 75.4 },
  "astore-valley": { lat: 35.3583, lng: 74.8556 },
  "fairy-meadows": { lat: 35.3889, lng: 74.5856 },
  gilgit: { lat: 35.9208, lng: 74.3083 },
  ghizer: { lat: 36.1667, lng: 73.7667 },
  "broghil-valley": { lat: 36.85, lng: 73.35 },
};

/** Parse display strings like `36.316°N, 74.650°E` */
export function parseCoordinateString(
  value: string,
): { lat: number; lng: number } | null {
  const match = value
    .trim()
    .match(/([\d.]+)\s*°?\s*([NS])\s*,\s*([\d.]+)\s*°?\s*([EW])/i);

  if (!match) return null;

  let lat = Number.parseFloat(match[1]);
  let lng = Number.parseFloat(match[3]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  if (match[2].toUpperCase() === "S") lat = -lat;
  if (match[4].toUpperCase() === "W") lng = -lng;

  return { lat, lng };
}

export function getCoordinatesForSlug(slug: string): GeoPoint | null {
  const location = getLocationBySlug(slug);
  if (!location) {
    const known = DESTINATION_COORDS[slug];
    return known ? { ...known, label: slug } : null;
  }

  if (isPlace(location)) {
    if (location.coordinates) {
      const parsed = parseCoordinateString(location.coordinates);
      if (parsed) {
        return { ...parsed, label: location.name };
      }
    }

    const knownPlace = DESTINATION_COORDS[location.slug];
    if (knownPlace) {
      return { ...knownPlace, label: location.name };
    }

    const parent = getParentRegion(location);
    if (parent) {
      const parentCoords = DESTINATION_COORDS[parent.slug];
      if (parentCoords) {
        return { ...parentCoords, label: parent.name };
      }
    }

    return null;
  }

  const regionCoords = DESTINATION_COORDS[location.slug];
  if (!regionCoords) return null;

  return { ...regionCoords, label: location.name };
}
