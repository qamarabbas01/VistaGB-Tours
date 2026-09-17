import { blogPosts, searchLocations } from '@/data';
import type { NewsItem } from '@/lib/news/types';

export type DiscoveryGroupName = 'Destinations' | 'Places' | 'Guides' | 'News';

export type DiscoveryHit = {
  id: string;
  group: DiscoveryGroupName;
  label: string;
  href: string;
  external?: boolean;
};

export type DiscoveryGroup = {
  name: DiscoveryGroupName;
  hits: DiscoveryHit[];
};

export type DiscoveryResults = {
  query: string;
  groups: DiscoveryGroup[];
  hits: DiscoveryHit[];
};

export const DISCOVERY_SUGGESTIONS = [
  { label: 'Hunza Valley', href: '/destinations/hunza-valley' },
  { label: 'Skardu', href: '/destinations/skardu' },
  { label: 'Attabad Lake', href: '/destinations/attabad-lake' },
  { label: 'Baltit Fort', href: '/destinations/baltit-fort' },
] as const;

const LIMITS: Record<DiscoveryGroupName, number> = {
  Destinations: 5,
  Places: 5,
  Guides: 3,
  News: 3,
};

function scoreMatch(text: string, query: string): number {
  const lower = text.toLowerCase();
  if (lower === query) return 100;
  if (lower.startsWith(query)) return 80;
  if (lower.includes(query)) return 50;
  return 0;
}

function bestScore(parts: string[], query: string): number {
  return Math.max(0, ...parts.map((part) => scoreMatch(part, query)));
}

export function searchDiscovery(
  rawQuery: string,
  news: Pick<NewsItem, 'id' | 'title' | 'summary' | 'url'>[] = [],
): DiscoveryResults {
  const query = rawQuery.trim();
  if (!query) {
    return { query: rawQuery, groups: [], hits: [] };
  }

  const q = query.toLowerCase();
  const found = searchLocations(query);

  const namedRegions = found.regions.filter(
    (region) =>
      scoreMatch(region.name.toLowerCase(), q) > 0 ||
      scoreMatch(region.region.toLowerCase(), q) > 0,
  );
  const destinationSource =
    namedRegions.length > 0 ? namedRegions : found.regions;
  const destinations: DiscoveryHit[] = destinationSource
    .slice(0, LIMITS.Destinations)
    .map((region) => ({
      id: `destination:${region.slug}`,
      group: 'Destinations' as const,
      label: region.name,
      href: `/destinations/${region.slug}`,
    }));

  const namedPlaces = found.places.filter(
    (place) => scoreMatch(place.name.toLowerCase(), q) > 0,
  );
  const placeSource = namedPlaces.length > 0 ? namedPlaces : found.places;
  const places: DiscoveryHit[] = placeSource
    .slice(0, LIMITS.Places)
    .map((place) => ({
      id: `place:${place.slug}`,
      group: 'Places' as const,
      label: place.name,
      href: `/destinations/${place.slug}`,
    }));

  const guides: DiscoveryHit[] = blogPosts
    .map((post) => ({
      post,
      score: bestScore([post.title, post.excerpt, post.tag], q),
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.post.title.localeCompare(b.post.title),
    )
    .slice(0, LIMITS.Guides)
    .map((item) => ({
      id: `guide:${item.post.title}`,
      group: 'Guides' as const,
      label: item.post.title,
      href: '/blog',
    }));

  const newsHits: DiscoveryHit[] = news
    .map((item) => ({
      item,
      score: bestScore([item.title, item.summary], q),
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title),
    )
    .slice(0, LIMITS.News)
    .map((entry) => ({
      id: `news:${entry.item.id}`,
      group: 'News' as const,
      label: entry.item.title,
      href: `/news?story=${entry.item.id}`,
    }));

  const groups = [
    { name: 'Destinations' as const, hits: destinations },
    { name: 'Places' as const, hits: places },
    { name: 'Guides' as const, hits: guides },
    { name: 'News' as const, hits: newsHits },
  ].filter((group) => group.hits.length > 0);

  return {
    query: rawQuery,
    groups,
    hits: groups.flatMap((group) => group.hits),
  };
}
