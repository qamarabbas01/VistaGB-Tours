'use client';

import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';
import CompareButton from '@/components/CompareButton';
import WishlistButton from '@/components/WishlistButton';
import { LocationMeta } from '@/components/destination-card/LocationMeta';
import { getParentRegion, isPlace, type TravelLocation } from '@/data';

type Props = {
  location: TravelLocation;
};

export default function DestinationCard({ location }: Props) {
  const place = isPlace(location);
  const parentRegion = place ? getParentRegion(location) : undefined;
  const regionLabel = place
    ? (parentRegion?.name ?? location.type)
    : location.region;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50">
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <WishlistButton slug={location.slug} compact />
        {!place ? <CompareButton slug={location.slug} compact /> : null}
      </div>
      <Link
        href={`/destinations/${location.slug}`}
        className="group flex flex-1 flex-col"
      >
        <div className="relative h-52 w-full overflow-hidden">
          <OptimizedImage
            src={location.image}
            alt={location.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {place ? (
            <span className="coord-label absolute left-4 top-4 rounded-full border border-teal/30 bg-scrim/80 px-3 py-1 text-[0.6rem]">
              {location.type}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h2 className="font-display text-2xl font-semibold text-glacier transition-colors group-hover:text-apricot">
            {location.name}
          </h2>
          <LocationMeta
            altitude={location.altitude}
            region={regionLabel}
            bestTime={location.bestTime}
          />
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ice">
            {location.description}
          </p>
          {!place && location.placeSlugs.length > 0 ? (
            <p className="mt-2 text-xs font-medium text-apricot">
              {location.placeSlugs.length} places inside
            </p>
          ) : null}
          <span className="mt-auto inline-block pt-5 text-sm font-medium text-apricot">
            Explore →
          </span>
        </div>
      </Link>
    </article>
  );
}
