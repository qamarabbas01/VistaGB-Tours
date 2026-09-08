import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/Button';
import Link from 'next/link';
import type { SeasonFeature } from '@/data/seasons';
import type { RegionDestination } from '@/data/types';

export function HomeFeaturedSeason({
  season,
  destinations,
}: {
  season: SeasonFeature;
  destinations: readonly RegionDestination[];
}) {
  return (
    <section aria-labelledby="featured-season-heading">
      <div className="relative min-h-[70vh] overflow-hidden md:min-h-[560px]">
        <OptimizedImage
          src={season.image}
          alt={season.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim via-scrim/60 to-scrim/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-scrim/70 via-scrim/20 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col justify-end px-6 py-14 md:min-h-[560px] md:px-10 md:py-20">
          <p className="coord-label mb-3">Featured This Season</p>
          <p className="coord-label mb-4 text-ice">{season.window}</p>
          <h2
            id="featured-season-heading"
            className="max-w-3xl font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl"
          >
            {season.label}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ice md:text-lg">
            {season.intro}
          </p>
          <div className="mt-8">
            <Button
              href="/book"
              className="inline-block rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              {season.ctaLabel}
            </Button>
          </div>
        </div>
      </div>

      {destinations.length > 0 ? (
        <div className="border-b border-teal/20 bg-slate">
          <div className="mx-auto grid max-w-7xl gap-px bg-teal/10 md:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative min-h-[220px] overflow-hidden bg-slate"
              >
                <OptimizedImage
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="coord-label mb-2">{destination.region}</p>
                  <h3 className="font-display text-2xl font-semibold text-glacier">
                    {destination.name}
                  </h3>
                  <p className="mt-1 text-sm text-ice">{destination.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
