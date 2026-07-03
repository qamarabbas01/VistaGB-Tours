import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  destinations,
  getDestinationBySlug,
} from "@/data/destinations";
import DestinationGallery from "@/components/DestinationGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return destinations.map((dest) => ({ slug: dest.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    return { title: "Destination Not Found — VistaGB Tours" };
  }

  return {
    title: `${dest.name} — VistaGB Tours`,
    description: dest.description,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    notFound();
  }

  const currentIndex = destinations.findIndex((d) => d.slug === dest.slug);
  const otherDestinations = [
    ...destinations.slice(currentIndex + 1),
    ...destinations.slice(0, currentIndex),
  ].slice(0, 3);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[60vh]">
        <Image
          src={dest.image}
          alt={dest.name}
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
              {dest.region} · ALT {dest.altitude}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl">
              {dest.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-apricot md:text-xl">
              {dest.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-10">
          <div className="md:col-span-2">
            <p className="coord-label mb-3">Overview</p>
            <p className="text-sm leading-relaxed text-ice md:text-base">
              {dest.overview}
            </p>

            <p className="coord-label mb-4 mt-12">Highlights</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {dest.highlights.map((item) => (
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
              <p className="text-sm leading-relaxed text-ice">{dest.bestTime}</p>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-slate p-6">
              <p className="coord-label mb-3">Getting There</p>
              <p className="text-sm leading-relaxed text-ice">
                {dest.gettingThere}
              </p>
            </div>

            <div className="rounded-2xl border border-apricot/30 bg-slate p-6">
              <p className="coord-label mb-3">Plan a Trip</p>
              <p className="text-sm leading-relaxed text-ice">
                Want an itinerary built around {dest.name}? Tell us your dates
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

      <DestinationGallery
        images={dest.gallery}
        heroImage={dest.image}
        destinationName={dest.name}
      />

      <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">More Places</p>
          <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
            Other Destinations
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherDestinations.map((other) => (
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
