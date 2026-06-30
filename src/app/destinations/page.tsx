import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Destinations — VistaGB Tours",
};

const ITEMS_PER_PAGE = 9;

type Props = {
  searchParams?: { page?: string | string[] };
};

export default function DestinationsPage({ searchParams }: Props) {
  const pageParam = searchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(
    1,
    parseInt(pageStr ?? "1", 10) || 1
  );
  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDestinations = destinations.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">The Map</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Destinations
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            From terraced apricot valleys to the cold deserts beneath K2 —
            these are the places that define a trip to Gilgit-Baltistan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="coord-label mb-2">
                    {dest.region} · ALT {dest.altitude}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-glacier transition-colors group-hover:text-apricot">
                    {dest.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-apricot">
                    {dest.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {dest.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-apricot">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/destinations"
            className="mt-12"
          />
        </div>
      </section>
    </div>
  );
}
