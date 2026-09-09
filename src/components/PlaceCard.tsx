import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';
import WishlistButton from '@/components/WishlistButton';
import { LocationMeta } from '@/components/destination-card/LocationMeta';
import type { Place } from '@/data/types';

type Props = {
  place: Place;
  parentName: string;
  compact?: boolean;
};

export default function PlaceCard({
  place,
  parentName,
  compact = false,
}: Props) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50 ${
        compact ? '' : 'flex flex-col'
      }`}
    >
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton slug={place.slug} compact />
      </div>
      <Link href={`/destinations/${place.slug}`} className="group block">
        <div
          className={`relative w-full overflow-hidden ${
            compact ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <OptimizedImage
            src={place.image}
            alt={place.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-scrim/80 via-transparent to-transparent" />
          <span className="coord-label absolute left-4 top-4 rounded-full border border-teal/30 bg-scrim/80 px-3 py-1 text-[0.6rem]">
            {place.type}
          </span>
        </div>
      </Link>

      <div className={compact ? 'p-4' : 'flex flex-1 flex-col p-5'}>
        <Link href={`/destinations/${place.slug}`}>
          <h3 className="font-display text-lg font-semibold text-glacier transition-colors hover:text-apricot">
            {place.name}
          </h3>
        </Link>
        <LocationMeta
          altitude={place.altitude}
          region={parentName}
          bestTime={place.bestTime}
        />
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ice">
          {place.description}
        </p>

        {!compact && place.activities.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {place.activities.slice(0, 4).map((activity) => (
              <span
                key={activity}
                className="rounded-full border border-teal/20 px-2.5 py-0.5 text-xs text-ice"
              >
                {activity}
              </span>
            ))}
          </div>
        ) : null}

        <Link
          href={`/destinations/${place.slug}`}
          className="mt-auto inline-block pt-4 text-sm font-medium text-apricot hover:underline"
        >
          Explore →
        </Link>
      </div>
    </article>
  );
}
