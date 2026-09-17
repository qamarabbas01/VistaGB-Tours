import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import DestinationCard from '@/components/DestinationCard';
import { DiscoverySearch } from '@/components/DiscoverySearch';
import JsonLd from '@/components/JsonLd';
import Pagination from '@/components/Pagination';
import {
  EXPERIENCE_CATEGORIES,
  experienceHref,
  getExperienceCategory,
  regions,
  searchLocations,
  type TravelLocation,
} from '@/data';
import { DISCOVERY_SUGGESTIONS } from '@/lib/search/discovery';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  collectionJsonLd,
  DESTINATIONS_CRUMB,
  HOME_CRUMB,
  withJsonLdContext,
} from '@/lib/seo';

const DESTINATIONS_DESCRIPTION =
  'Explore Hunza, Skardu, Gilgit, Nagar, Fairy Meadows and more — valleys, lakes, forts, and treks across Gilgit-Baltistan.';

export const metadata = buildPageMetadata({
  title: 'Destinations',
  description: DESTINATIONS_DESCRIPTION,
  path: '/destinations',
});

const ITEMS_PER_PAGE = 9;

type Props = {
  searchParams?: {
    page?: string | string[];
    q?: string | string[];
  };
};

export default function DestinationsPage({ searchParams }: Props) {
  const queryParam = searchParams?.q;
  const query = (
    Array.isArray(queryParam) ? queryParam[0] : (queryParam ?? '')
  ).trim();
  const pageParam = searchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(1, parseInt(pageStr ?? '1', 10) || 1);
  const totalPages = Math.ceil(regions.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDestinations = regions.slice(start, start + ITEMS_PER_PAGE);
  const searchResult = query ? searchLocations(query) : null;
  const experience = query ? getExperienceCategory(query) : undefined;
  const searchLocationsList: TravelLocation[] = searchResult
    ? [...searchResult.regions, ...searchResult.places]
    : [];
  const visibleLocations = searchResult
    ? searchLocationsList
    : paginatedDestinations;

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([HOME_CRUMB, DESTINATIONS_CRUMB]),
          collectionJsonLd({
            name: 'Destinations',
            description: DESTINATIONS_DESCRIPTION,
            path: '/destinations',
            items: regions.map((region) => ({
              name: region.name,
              path: `/destinations/${region.slug}`,
            })),
          }),
        ])}
      />
      <section className="border-b border-teal/20 bg-slate py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Breadcrumbs items={[HOME_CRUMB, DESTINATIONS_CRUMB]} />
          <p className="coord-label mb-3 mt-6">The Map</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Destinations
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            From terraced apricot valleys to the cold deserts beneath K2 — these
            are the places that define a trip to Gilgit-Baltistan.
          </p>
          <DiscoverySearch defaultQuery={query} />
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono uppercase tracking-widest text-ice/60">
              Explore by
            </span>
            {EXPERIENCE_CATEGORIES.map((category) => {
              const active = experience?.slug === category.slug;
              return (
                <Link
                  key={category.slug}
                  href={experienceHref(category.slug)}
                  className={`rounded-full border px-3 py-1.5 transition-colors ${
                    active
                      ? 'border-apricot/60 bg-apricot/15 text-glacier'
                      : 'border-teal/30 bg-night/20 text-ice hover:border-apricot/60 hover:text-apricot'
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {searchResult ? (
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-teal/20 pb-5">
              <p className="text-ice">
                {searchLocationsList.length}{' '}
                {searchLocationsList.length === 1 ? 'result' : 'results'} for{' '}
                <span className="font-semibold text-glacier">
                  {experience ? experience.name : `\u201c${query}\u201d`}
                </span>
              </p>
              <Link
                href="/destinations"
                className="text-sm font-medium text-apricot hover:underline"
              >
                Clear search
              </Link>
            </div>
          ) : null}

          {visibleLocations.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleLocations.map((location) => (
                <DestinationCard key={location.slug} location={location} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-teal/20 bg-slate px-6 py-14 text-center">
              <h2 className="font-display text-2xl font-semibold text-glacier">
                No places found for &ldquo;{query}&rdquo;
              </h2>
              <p className="mt-2 text-ice">
                Try a destination, landmark, or one of these:
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {DISCOVERY_SUGGESTIONS.map((suggestion) => (
                  <Link
                    key={suggestion.href}
                    href={suggestion.href}
                    className="rounded-full border border-teal/40 px-3.5 py-1.5 text-sm text-glacier hover:border-apricot hover:text-apricot"
                  >
                    {suggestion.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!searchResult ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/destinations"
              className="mt-12"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
