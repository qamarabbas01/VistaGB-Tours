import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { RegionDestination } from "@/data/types";

export function HomePopularDestinations({
  destinations,
}: {
  destinations: readonly RegionDestination[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="coord-label mb-3">On The Map</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              Popular Destinations
            </h2>
            <p className="mt-4 max-w-xl text-ice">
              Valleys and plateaus that define a first — or fiftieth — journey
              through the Karakoram.
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden text-sm font-medium text-apricot hover:underline md:inline"
          >
            View all destinations →
          </Link>
        </div>

        <div className="scroll-row mt-12 flex gap-6 overflow-x-auto pb-4">
          {destinations.map((dest) => (
            <Link
              href={`/destinations/${dest.slug}`}
              key={dest.slug}
              className="group relative h-[420px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl md:w-[340px]"
            >
              <OptimizedImage
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 300px, 340px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="coord-label mb-2">
                  {dest.region} · ALT {dest.altitude}
                </p>
                <h3 className="font-display text-2xl font-semibold text-glacier">
                  {dest.name}
                </h3>
                <p className="mt-1 text-sm text-ice">{dest.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/destinations"
            className="rounded-full bg-apricot px-6 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            View all destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
