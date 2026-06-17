import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";

const reasons = [
  {
    title: "Local Expertise",
    detail:
      "Our guides are born and raised across Gilgit-Baltistan — they know the trails, the weather, and the families who'll host you.",
    mark: "G·B",
  },
  {
    title: "Tailored Itineraries",
    detail:
      "No fixed bus tours. Every route is built around your pace, season, and the valleys you actually want to see.",
    mark: "1:1",
  },
  {
    title: "Safety First",
    detail:
      "Licensed drivers, vetted lodges, and trip plans that account for landslide season, altitude, and road conditions.",
    mark: "✓",
  },
  {
    title: "Fair to Communities",
    detail:
      "We work directly with local homestays, porters, and cooks — your trip supports the valleys you're visiting.",
    mark: "%",
  },
];

const services = [
  {
    title: "Custom Tours",
    detail:
      "Multi-day road trips along the Karakoram Highway, built around the valleys, food, and pace you choose.",
  },
  {
    title: "Trekking & Expeditions",
    detail:
      "From Fairy Meadows day hikes to multi-week K2 base camp treks, with permits and porters arranged.",
  },
  {
    title: "Hotel & Homestay Booking",
    detail:
      "Hand-picked stays — from heritage forts to riverside lodges and family homestays in remote valleys.",
  },
  {
    title: "Transport & Logistics",
    detail:
      "4x4 jeep transfers, airport pickups, and Karakoram Highway driving with experienced mountain drivers.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=2400&auto=format&fit=crop"
          alt="Snow-capped peaks of the Karakoram range above Hunza Valley"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-6">35.8°N · 75.5°E · KARAKORAM RANGE</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.1] text-glacier md:text-7xl">
            Where the Karakoram
            <span className="block italic text-apricot">meets the sky.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ice md:text-lg">
            VistaGB Tours leads journeys through Gilgit-Baltistan — the
            valleys, glaciers, and ancient roads of northern Pakistan, guided
            by the people who call them home.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/destinations"
              className="rounded-full bg-apricot px-8 py-3 text-center text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
            >
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-ice/40 px-8 py-3 text-center text-sm font-medium text-glacier transition-colors hover:border-apricot hover:text-apricot"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="altitude-line" />
        </div>
      </section>

      {/* Why Choose VistaGB */}
      <section className="bg-slate py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Why Travel With Us</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Why Choose VistaGB
          </h2>
          <p className="mt-4 max-w-xl text-ice">
            Gilgit-Baltistan rewards travelers who go with people who know it.
            Here&apos;s what that looks like in practice.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-teal/20 bg-teal/10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="bg-slate p-8">
                <span className="font-display text-2xl italic text-apricot">
                  {reason.mark}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-glacier">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {reason.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="coord-label mb-3">On The Map</p>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Trending Destinations
              </h2>
            </div>
            <Link
              href="/destinations"
              className="text-sm font-medium text-apricot hover:underline"
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
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 300px, 340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
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
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="altitude-line" />
      </div>

      {/* Our Services */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">What We Offer</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Our Services
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="rounded-2xl border border-teal/20 bg-slate p-8 transition-colors hover:border-apricot/50"
              >
                <p className="coord-label mb-4">SERVICE {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-2xl font-semibold text-glacier">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="coord-label mb-4">Ready When You Are</p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Your journey through the Karakoram starts with one message.
          </h2>
          <p className="mt-4 text-ice">
            Tell us your dates and the valleys you&apos;re curious about — we&apos;ll
            build a route around them.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
