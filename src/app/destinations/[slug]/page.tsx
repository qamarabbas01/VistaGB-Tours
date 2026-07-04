import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationGallery from "@/components/DestinationGallery";
import PlaceCard from "@/components/PlaceCard";
import {
  getAllStaticSlugs,
  getLocationBySlug,
  getParentRegion,
  getPlacesForRegion,
  isPlace,
  regions,
  type Place,
  type RegionDestination,
} from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Destination Not Found — VistaGB Tours" };
  }

  const name = location.name;

  return {
    title: `${name} — VistaGB Tours`,
    description: location.description,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  if (isPlace(location)) {
    return <PlaceDetailPage place={location} />;
  }

  return <RegionDetailPage region={location} />;
}

function PlaceDetailPage({ place }: { place: Place }) {
  const parent = getParentRegion(place);
  const nearbyPlaces = place.nearby
    .map((s) => getLocationBySlug(s))
    .filter((loc): loc is Place => Boolean(loc && isPlace(loc)));

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden md:h-[55vh]">
        <Image
          src={place.image}
          alt={place.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/20" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:px-10 md:pb-16">
            {parent ? (
              <nav className="coord-label mb-4 flex flex-wrap items-center gap-2 text-ice">
                <Link href="/destinations" className="transition-colors hover:text-apricot">
                  All Destinations
                </Link>
                <span>/</span>
                <Link
                  href={`/destinations/${parent.slug}`}
                  className="transition-colors hover:text-apricot"
                >
                  {parent.name}
                </Link>
              </nav>
            ) : (
              <Link
                href="/destinations"
                className="coord-label mb-4 inline-block text-ice transition-colors hover:text-apricot"
              >
                ← All Destinations
              </Link>
            )}
            <p className="coord-label mb-3">
              {place.type} · ALT {place.altitude}
              {place.duration ? ` · ${place.duration}` : ""}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-glacier md:text-5xl">
              {place.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-apricot md:text-xl">
              {place.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-10">
          <div className="md:col-span-2">
            <p className="coord-label mb-3">Overview</p>
            <p className="text-sm leading-relaxed text-ice md:text-base">
              {place.overview}
            </p>

            {place.activities.length > 0 ? (
              <>
                <p className="coord-label mb-4 mt-12">Things To Do</p>
                <ul className="flex flex-wrap gap-2">
                  {place.activities.map((activity) => (
                    <li
                      key={activity}
                      className="rounded-full border border-apricot/30 bg-slate px-4 py-2 text-sm text-glacier"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="coord-label mb-4 mt-12">Highlights</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {place.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-teal/20 bg-slate p-4 text-sm leading-relaxed text-ice"
                >
                  <span className="mt-0.5 font-display text-apricot">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-teal/20 bg-slate p-6">
              <p className="coord-label mb-3">Best Time to Visit</p>
              <p className="text-sm leading-relaxed text-ice">{place.bestTime}</p>
            </div>

            {place.distanceFromHub ? (
              <div className="rounded-2xl border border-teal/20 bg-slate p-6">
                <p className="coord-label mb-3">Distance</p>
                <p className="text-sm leading-relaxed text-ice">
                  {place.distanceFromHub}
                  {place.hubName ? ` from ${place.hubName}` : ""}
                </p>
              </div>
            ) : null}

            {place.coordinates ? (
              <div className="rounded-2xl border border-teal/20 bg-slate p-6">
                <p className="coord-label mb-3">Coordinates</p>
                <p className="text-sm leading-relaxed text-ice">{place.coordinates}</p>
              </div>
            ) : null}

            <div className="rounded-2xl border border-teal/20 bg-slate p-6">
              <p className="coord-label mb-3">Getting There</p>
              <p className="text-sm leading-relaxed text-ice">{place.gettingThere}</p>
            </div>

            {parent ? (
              <div className="rounded-2xl border border-apricot/30 bg-slate p-6">
                <p className="coord-label mb-3">Part of</p>
                <Link
                  href={`/destinations/${parent.slug}`}
                  className="font-display text-lg font-semibold text-glacier transition-colors hover:text-apricot"
                >
                  {parent.name} →
                </Link>
                <p className="mt-2 text-sm text-ice">{parent.tagline}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <DestinationGallery
        images={place.gallery}
        heroImage={place.image}
        destinationName={place.name}
      />

      {nearbyPlaces.length > 0 ? (
        <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Nearby</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Places nearby
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyPlaces.slice(0, 3).map((nearby) => (
                <PlaceCard
                  key={nearby.slug}
                  place={nearby}
                  parentName={parent?.name ?? "Gilgit-Baltistan"}
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function RegionDetailPage({
  region,
}: {
  region: RegionDestination;
}) {
  const childPlaces = getPlacesForRegion(region.slug);
  const otherRegions = regions.filter((r) => r.slug !== region.slug).slice(0, 3);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[60vh]">
        <Image
          src={region.image}
          alt={region.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/20" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:px-10 md:pb-16">
            <Link
              href="/destinations"
              className="coord-label mb-4 inline-block text-ice transition-colors hover:text-apricot"
            >
              ← All Destinations
            </Link>
            <p className="coord-label mb-3">
              {region.region} · ALT {region.altitude}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl">
              {region.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-apricot md:text-xl">
              {region.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-10">
          <div className="md:col-span-2">
            <p className="coord-label mb-3">Overview</p>
            <p className="text-sm leading-relaxed text-ice md:text-base">
              {region.overview}
            </p>

            {region.majorValleys && region.majorValleys.length > 0 ? (
              <>
                <p className="coord-label mb-4 mt-12">Major Valleys</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {region.majorValleys.map((valley) => (
                    <li
                      key={valley}
                      className="rounded-xl border border-teal/20 bg-slate px-4 py-3 text-sm text-ice"
                    >
                      {valley}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="coord-label mb-4 mt-12">Highlights</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {region.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-teal/20 bg-slate p-4 text-sm leading-relaxed text-ice"
                >
                  <span className="mt-0.5 font-display text-apricot">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-teal/20 bg-slate p-6">
              <p className="coord-label mb-3">Best Time to Visit</p>
              <p className="text-sm leading-relaxed text-ice">{region.bestTime}</p>
            </div>
            <div className="rounded-2xl border border-teal/20 bg-slate p-6">
              <p className="coord-label mb-3">Getting There</p>
              <p className="text-sm leading-relaxed text-ice">{region.gettingThere}</p>
            </div>
            <div className="rounded-2xl border border-apricot/30 bg-slate p-6">
              <p className="coord-label mb-3">Plan a Trip</p>
              <p className="text-sm leading-relaxed text-ice">
                Want an itinerary built around {region.name}? Tell us your dates
                and we&apos;ll put a route together.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-medium text-apricot hover:underline"
              >
                Contact us →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {childPlaces.length > 0 ? (
        <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Places in {region.name}</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Top attractions
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ice md:text-base">
              Every valley, fort, lake, and viewpoint in {region.name} — each with
              its own photos, activities, and travel details.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {childPlaces.map((place) => (
                <PlaceCard
                  key={place.slug}
                  place={place}
                  parentName={region.name}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <DestinationGallery
        images={region.gallery}
        heroImage={region.image}
        destinationName={region.name}
      />

      <section className="border-t border-teal/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">More Places</p>
          <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
            Other regions
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherRegions.map((other) => (
              <Link
                key={other.slug}
                href={`/destinations/${other.slug}`}
                className="group overflow-hidden rounded-2xl border border-teal/20 bg-night transition-colors hover:border-apricot/50"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <p className="coord-label mb-1">
                    {other.region} · ALT {other.altitude}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-glacier transition-colors group-hover:text-apricot">
                    {other.name}
                  </h3>
                  <p className="mt-1 text-sm text-ice">{other.tagline}</p>
                  {other.placeSlugs.length > 0 ? (
                    <p className="mt-2 text-xs text-apricot">
                      {other.placeSlugs.length} places to explore
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
