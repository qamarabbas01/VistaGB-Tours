import Image from "next/image";
import Link from "next/link";
import type { Place } from "@/data/types";

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
      className={`overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50 ${
        compact ? "" : "flex flex-col"
      }`}
    >
      <Link href={`/destinations/${place.slug}`} className="group block">
        <div
          className={`relative w-full overflow-hidden ${
            compact ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={place.image}
            alt={place.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
          <span className="coord-label absolute left-4 top-4 rounded-full border border-teal/30 bg-night/80 px-3 py-1 text-[0.6rem]">
            {place.type}
          </span>
        </div>
      </Link>

      <div className={compact ? "p-4" : "flex flex-1 flex-col p-5"}>
        <p className="coord-label mb-1 text-[0.65rem]">
          {parentName} · ALT {place.altitude}
        </p>
        <Link href={`/destinations/${place.slug}`}>
          <h3 className="font-display text-lg font-semibold text-glacier transition-colors hover:text-apricot">
            {place.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-apricot">{place.tagline}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ice">
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

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs text-ice">
          {place.duration ? <span>{place.duration}</span> : null}
          {place.duration && place.bestTime ? (
            <span className="text-teal">·</span>
          ) : null}
          {place.bestTime ? <span>{place.bestTime}</span> : null}
        </div>

        <Link
          href={`/destinations/${place.slug}`}
          className="mt-3 inline-block text-sm font-medium text-apricot hover:underline"
        >
          Open details →
        </Link>
      </div>
    </article>
  );
}
