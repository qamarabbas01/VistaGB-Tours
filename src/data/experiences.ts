import type { Place, PlaceType, RegionDestination } from './types';

export const EXPERIENCE_CATEGORIES = [
  {
    slug: 'mountains',
    name: 'Mountains',
    tagline: 'Karakoram giants, ridgelines, and high passes',
    image: '/images/commons/9df8326eb5be0e2f.jpg',
    imageAlt: 'High peaks of Gilgit-Baltistan',
  },
  {
    slug: 'valleys',
    name: 'Valleys',
    tagline: 'Apricot terraces, river corridors, and hidden side valleys',
    image: '/images/commons/c75f51bdff0ce7b1.jpg',
    imageAlt: 'Broghil Valley pastures',
  },
  {
    slug: 'lakes',
    name: 'Lakes',
    tagline: 'Turquoise Attabad, Kachura, and high alpine water',
    image: '/images/commons/4680a3d14ca1af46.jpg',
    imageAlt: 'Attabad Lake on the Karakoram Highway',
  },
  {
    slug: 'trekking',
    name: 'Trekking',
    tagline: 'Base-camp walks, glacier trails, and multi-day routes',
    image: '/images/commons/ba4b0d53d291cba4.jpg',
    imageAlt: 'Trekking toward high Karakoram camps',
  },
  {
    slug: 'camping',
    name: 'Camping',
    tagline: 'Deosai nights, pine camps, and meadow lodges',
    image: '/images/commons/b1292e3b1646570c.jpg',
    imageAlt: 'Deosai Plains camping country',
  },
  {
    slug: 'forts',
    name: 'Forts & Heritage',
    tagline: 'Baltit, Altit, Shigar, and restored palaces',
    image: '/images/commons/92ff9643469e41ed.jpg',
    imageAlt: 'Baltit Fort above Karimabad',
  },
  {
    slug: 'polo',
    name: 'Polo',
    tagline: 'Shandur Top and highland arenas of the west',
    image: '/images/commons/3eee7ecb9b6c95a3.jpg',
    imageAlt: 'Polo country toward Shandur',
  },
  {
    slug: 'photography',
    name: 'Photography',
    tagline: 'Golden-hour ridges, lakes, and night skies',
    image: '/images/commons/4f5d8c42e41eb43e.jpg',
    imageAlt: 'Reflection lake trail for photography',
  },
] as const;

export type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number];
export type ExperienceSlug = ExperienceCategory['slug'];

export const EXPERIENCE_QUERY_ALIASES: Record<string, ExperienceSlug> = {
  mountain: 'mountains',
  mountains: 'mountains',
  valley: 'valleys',
  valleys: 'valleys',
  lake: 'lakes',
  lakes: 'lakes',
  trek: 'trekking',
  trekking: 'trekking',
  'trekking route': 'trekking',
  'trekking routes': 'trekking',
  camp: 'camping',
  camping: 'camping',
  fort: 'forts',
  forts: 'forts',
  heritage: 'forts',
  polo: 'polo',
  photography: 'photography',
  photo: 'photography',
};

export function resolveExperienceSlug(query: string): ExperienceSlug | undefined {
  return EXPERIENCE_QUERY_ALIASES[query.trim().toLowerCase()];
}

export function getExperienceCategory(
  query: string,
): ExperienceCategory | undefined {
  const slug = resolveExperienceSlug(query);
  if (!slug) return undefined;
  return EXPERIENCE_CATEGORIES.find((category) => category.slug === slug);
}

export function experienceHref(slug: ExperienceSlug): string {
  return `/destinations?q=${encodeURIComponent(slug)}`;
}

function placeBlob(place: Place): string {
  return [
    place.name,
    place.slug,
    place.tagline,
    place.description,
    place.overview,
    place.type,
    ...(place.searchTags ?? []),
    ...place.highlights,
    ...place.activities,
  ]
    .join(' ')
    .toLowerCase();
}

function regionBlob(region: RegionDestination): string {
  return [
    region.name,
    region.slug,
    region.tagline,
    region.description,
    region.overview,
    ...(region.searchTags ?? []),
    ...(region.highlights ?? []),
    ...(region.majorValleys ?? []),
    ...(region.guide?.activities ?? []),
  ]
    .join(' ')
    .toLowerCase();
}

function hasActivity(place: Place, pattern: RegExp): boolean {
  return place.activities.some((activity) => pattern.test(activity));
}

function hasType(place: Place, types: PlaceType[]): boolean {
  return types.includes(place.type);
}

export function matchExperienceLocations(
  slug: ExperienceSlug,
  regions: RegionDestination[],
  places: Place[],
): { regions: RegionDestination[]; places: Place[] } {
  switch (slug) {
    case 'mountains':
      return {
        regions: regions.filter((region) =>
          /nanga|rakaposhi|k2|parbat/i.test(regionBlob(region)),
        ),
        places: places.filter(
          (place) =>
            hasType(place, ['Glacier', 'Pass']) ||
            /rakaposhi|nanga|k2|cones|parbat|khunjerab/i.test(
              `${place.name} ${place.slug}`,
            ),
        ),
      };
    case 'valleys':
      return {
        regions: regions.filter((region) =>
          region.name.toLowerCase().includes('valley'),
        ),
        places: places.filter((place) => place.type === 'Valley'),
      };
    case 'lakes':
      return {
        regions: [],
        places: places.filter((place) => place.type === 'Lake'),
      };
    case 'trekking':
      return {
        regions: regions.filter((region) =>
          /trek|base camp|fairy meadows/i.test(regionBlob(region)),
        ),
        places: places.filter(
          (place) =>
            hasActivity(
              place,
              /trek|hike|hiking|base camp|glacier trek|mountaineering/i,
            ) || /base-camp|trek/i.test(place.slug),
        ),
      };
    case 'camping':
      return {
        regions: regions.filter((region) =>
          /camp|meadow|yurt|deosai|broghil/i.test(regionBlob(region)),
        ),
        places: places.filter(
          (place) =>
            hasActivity(place, /camp/i) || /camp/i.test(placeBlob(place)),
        ),
      };
    case 'forts':
      return {
        regions: regions.filter((region) =>
          region.searchTags?.some((tag) => tag.toLowerCase() === 'fort'),
        ),
        places: places.filter(
          (place) =>
            place.type === 'Fort' ||
            place.searchTags?.some((tag) => tag.toLowerCase() === 'fort'),
        ),
      };
    case 'polo':
      return {
        regions: regions.filter((region) =>
          /polo|shandur/i.test(regionBlob(region)),
        ),
        places: places.filter((place) => /polo|shandur/i.test(placeBlob(place))),
      };
    case 'photography':
      return {
        regions: [],
        places: places.filter(
          (place) =>
            place.type === 'Viewpoint' ||
            hasActivity(place, /sunrise|sunset|stargazing/i) ||
            (place.type === 'Lake' && hasActivity(place, /photography/i)),
        ),
      };
  }
}
