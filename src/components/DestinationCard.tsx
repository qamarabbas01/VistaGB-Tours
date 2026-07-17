import Image from "next/image";
import Link from "next/link";
import {
  getParentRegion,
  isPlace,
  type TravelLocation,
} from "@/data";

type Props = {
  location: TravelLocation;
};

export default function DestinationCard({ location }: Props) {
  const place = isPlace(location);
  const parentRegion = place ? getParentRegion(location) : undefined;
  const label = place
    ? `${location.type}${parentRegion ? ` · ${parentRegion.name}` : ""}`
    : `${location.region} · ALT ${location.altitude}`;

  return (
    <Link
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
}