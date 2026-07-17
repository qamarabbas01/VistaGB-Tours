import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import {
  getParentRegion,
  isPlace,
  regions,
  searchLocations,
  type TravelLocation,
} from "@/data";

export const metadata = {
  title: "Destinations",
};

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
    Array.isArray(queryParam) ? queryParam[0] : queryParam ?? ""
  ).trim();
  const pageParam = searchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(
    1,
    parseInt(pageStr ?? "1", 10) || 1
  );
  const totalPages = Math.ceil(regions.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDestinations = regions.slice(start, start + ITEMS_PER_PAGE);
  const searchResult = query ? searchLocations(query) : null;
  const searchLocationsList: TravelLocation[] = searchResult
    ? [...searchResult.regions, ...searchResult.places]
    : [];
  const visibleLocations = searchResult
    ? searchLocationsList
    : paginatedDestinations;

  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">The Map</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Destinations
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            From terraced apricot valleys to the cold deserts beneath K2 —
            these are the places that define a trip to Gilgit-Baltistan.
          </p>
          <form
            action="/destinations"
            method="get"
            role="search"
            className="mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl border border-teal/30 bg-night/70 p-2 shadow-2xl shadow-black/10 transition-colors focus-within:border-apricot/70 sm:flex-row"
          >
            <label htmlFor="destination-search" className="sr-only">
              Search destinations
            </label>
            <input
              id="destination-search"
              name="q"
              type="search"
              defaultValue={query}
              maxLength={120}
              placeholder="Search a destination, valley, lake, mountain, route…"
              className="min-w-0 flex-1 appearance-none bg-transparent px-4 py-3 text-glacier outline-none placeholder:text-ice/60"
            />
            <button
              type="submit"
              className="rounded-xl bg-apricot px-7 py-3 font-semibold text-night transition-colors hover:bg-glacier"
            >
              Search
            </button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono uppercase tracking-widest text-ice/60">
              Explore by
            </span>
            {["fort", "lake", "valley", "trekking route"].map((term) => (
              <Link
                key={term}
                href={`/destinations?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-teal/30 bg-night/20 px-3 py-1.5 capitalize text-ice transition-colors hover:border-apricot/60 hover:text-apricot"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {searchResult ? (
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-teal/20 pb-5">
              <p className="text-ice">
                {searchLocationsList.length}{" "}
                {searchLocationsList.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-glacier">
                  &ldquo;{query}&rdquo;
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
              {visibleLocations.map((location) => {
                const place = isPlace(location);
                const parentRegion = place
                  ? getParentRegion(location)
                  : undefined;
                const label = place
                  ? `${location.type}${parentRegion ? ` · ${parentRegion.name}` : ""}`
                  : `${location.region} · ALT ${location.altitude}`;

                return (
                  <Link
                    key={`${place ? "place" : "region"}-${location.slug}`}
                    href={`/destinations/${location.slug}`}
                    className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={location.image}
                        alt={location.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <p className="coord-label mb-2">{label}</p>
                      <h2 className="font-display text-2xl font-semibold text-glacier transition-colors group-hover:text-apricot">
                        {location.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-apricot">
                        {location.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ice">
                        {location.description}
                      </p>
                      {!place && location.placeSlugs.length > 0 ? (
                        <p className="mt-2 text-xs font-medium text-apricot">
                          {location.placeSlugs.length} places inside
                        </p>
                      ) : null}
                      <span className="mt-4 inline-block text-sm font-medium text-apricot">
                        Explore →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-teal/20 bg-slate px-6 py-14 text-center">
              <h2 className="font-display text-2xl font-semibold text-glacier">
                No destinations found
              </h2>
              <p className="mt-2 text-ice">
                Try a place name, district, lake, mountain, fort, or trekking
                route.
              </p>
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
