import Link from "next/link";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import OptimizedImage from "@/components/OptimizedImage";
import { SectionDivider } from "@/components/home/SectionDivider";
import { contact } from "@/config/contact";
import { getRegionBySlug } from "@/data";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from "@/lib/seo";

const ABOUT_DESCRIPTION =
  "VistaGB Tours is a Skardu-based operator guiding travelers through Hunza, Baltistan, and the high valleys of Gilgit-Baltistan with local knowledge and tailored itineraries.";

const HERO_IMAGE = "/images/commons/1a2b77e8ff37f557.jpg";
const STORY_IMAGE = "/images/commons/4e0000c8d4bbe492.jpg";
const CTA_IMAGE = "/images/commons/bd7ddfea0e6ee033.jpg";

export const metadata = buildPageMetadata({
  title: "About Us",
  description: ABOUT_DESCRIPTION,
  path: "/about",
  image: HERO_IMAGE,
  imageAlt: "Karakoram peaks above Skardu valley",
});

const facts = [
  { mark: "SKD", title: "Based in Skardu", detail: "On the road into Baltistan, not a desk in another city." },
  { mark: "1:1", title: "Private itineraries", detail: "No coach tours. Every route is built around your dates and pace." },
  { mark: "G·B", title: "Hunza to Diamer", detail: "Hunza, Baltistan, Diamer, and the high roads between them." },
  { mark: "%", title: "Local partnerships", detail: "Homestays, porters, and lodges paid fairly, booked directly." },
] as const;

const services = [
  {
    step: "01",
    title: "Custom road trips",
    detail:
      "Jeep days along the Karakoram Highway, Deosai tracks, and high valley roads — paced for weather, not a timetable.",
  },
  {
    step: "02",
    title: "Treks and base camps",
    detail:
      "Day hikes to multi-day routes, with licensed guides and porters arranged from the valleys you are walking through.",
  },
  {
    step: "03",
    title: "Homestays and lodges",
    detail:
      "Nights with families and vetted guesthouses so your stay supports the communities you visit, not a chain desk.",
  },
  {
    step: "04",
    title: "Logistics on the ground",
    detail:
      "Airport pickups, permits, drivers, and road-status calls — the unglamorous work that keeps a mountain trip moving.",
  },
] as const;

const principles = [
  {
    mark: "KKH",
    title: "Born on the highway",
    detail:
      "VistaGB was founded by guides and drivers who grew up along the Karakoram Highway. The routes are not researched — they are home.",
  },
  {
    mark: "1:1",
    title: "Tailored, never packed",
    detail:
      "We do not run fixed bus tours. Season, group size, and the valleys you actually want to see decide the itinerary.",
  },
  {
    mark: "✓",
    title: "Roads and altitude first",
    detail:
      "Plans account for landslide season, pass closures, and elevation. Licensed drivers and a pace that can change with the weather.",
  },
  {
    mark: "%",
    title: "Fair to the valleys",
    detail:
      "We book directly with local families, porters, and lodges. Your trip should leave money in the places you pass through.",
  },
] as const;

const COVERAGE_SLUGS = [
  "hunza-valley",
  "skardu",
  "gilgit",
  "nagar",
  "fairy-meadows",
  "khaplu",
] as const;

function coverageImage(slug: string, fallback: string): string {
  const region = getRegionBySlug(slug);
  const local = region?.gallery.find((item) => item.src.startsWith("/images/"));
  return local?.src ?? region?.image ?? fallback;
}

export default function AboutPage() {
  const heroCoords =
    contact.location.coords || "35.3°N · 75.6°E · SKARDU";
  const coverage = COVERAGE_SLUGS.map((slug) => {
    const region = getRegionBySlug(slug);
    if (!region) return null;
    return {
      slug: region.slug,
      name: region.name,
      tagline: region.tagline,
      label: `${region.region} · ALT ${region.altitude}`,
      image: coverageImage(slug, region.image),
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
          webPageJsonLd({
            type: "AboutPage",
            name: "About VistaGB Tours",
            description: ABOUT_DESCRIPTION,
            path: "/about",
          }),
        ])}
      />

      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <OptimizedImage
          src={HERO_IMAGE}
          alt="Karakoram peaks above Skardu valley"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/80 to-scrim/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-scrim/70 via-scrim/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:px-10 md:pb-20">
          <p className="coord-label mb-3">{heroCoords}</p>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            About VistaGB Tours
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            A Skardu-based operator rooted in Gilgit-Baltistan — guiding
            travelers through the Karakoram with local knowledge, fair
            partnerships, and routes built around the valleys you want to see.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 md:px-10">
          <div className="lg:col-span-6">
            <p className="coord-label mb-3">Our Story</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-glacier md:text-4xl">
              Guides and drivers from the Karakoram Highway
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ice md:text-base">
              VistaGB Tours was founded by people who grew up along the
              Karakoram Highway. We arrange custom road trips, treks, homestays,
              and logistics across Hunza, Baltistan, Diamer, and the high
              valleys of northern Pakistan.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ice md:text-base">
              Every itinerary is tailored — no fixed bus tours. We work directly
              with local families, porters, and lodges so your trip supports the
              communities you visit, and so the plan can change when the weather
              or the road does.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ice md:text-base">
              From first inquiry to the last jeep day, you deal with the same
              team that knows the valleys — not a call centre forwarding a
              spreadsheet.
            </p>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-teal/20 lg:col-span-6 lg:min-h-[460px]">
            <OptimizedImage
              src={STORY_IMAGE}
              alt="Jeep on a high valley road in Gilgit-Baltistan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_70%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scrim/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="coord-label mb-1">On the road</p>
              <p className="font-display text-xl font-semibold text-white">
                Private jeeps, local drivers, real weather.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">At a Glance</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-glacier md:text-4xl">
            How VistaGB actually works
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-teal/20 bg-teal/10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.title} className="bg-slate p-8">
                <span className="font-display text-2xl italic text-apricot">
                  {fact.mark}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-glacier">
                  {fact.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">What We Arrange</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-glacier md:text-4xl">
            From the first message to the open road
          </h2>
          <p className="mt-4 max-w-xl text-ice">
            Tell us the valleys and the dates. We handle the rest — or as much
            of it as you want us to.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-teal/20 bg-slate p-8 transition-colors hover:border-apricot/40"
              >
                <p className="coord-label mb-4">{item.step}</p>
                <h3 className="font-display text-xl font-semibold text-glacier">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">How We Travel</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-glacier md:text-4xl">
            Principles we will not drop for a tighter quote
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-teal/20 bg-night/40 p-8"
              >
                <span className="font-display text-2xl italic text-apricot">
                  {item.mark}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-glacier">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {coverage.length > 0 ? (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="coord-label mb-3">Where We Operate</p>
                <h2 className="font-display text-3xl font-semibold leading-tight text-glacier md:text-4xl">
                  Valleys we know by name
                </h2>
                <p className="mt-4 max-w-xl text-ice">
                  Hunza, Baltistan, Diamer, and the high country between them —
                  the map we build routes from.
                </p>
              </div>
              <Link
                href="/destinations"
                className="hidden text-sm font-medium text-apricot hover:underline md:inline"
              >
                All destinations →
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coverage.map((item) => (
                <Link
                  key={item.slug}
                  href={`/destinations/${item.slug}`}
                  className="group relative min-h-[240px] overflow-hidden rounded-2xl"
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="coord-label mb-2">{item.label}</p>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">{item.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:hidden">
              <Link
                href="/destinations"
                className="rounded-full bg-apricot px-6 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                All destinations
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <SectionDivider />

      <section className="relative overflow-hidden py-20 md:py-28">
        <OptimizedImage
          src={CTA_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          aria-hidden
        />
        <div className="absolute inset-0 bg-night/80" />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="coord-label mb-4">Ready When You Are</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            Travel with people who grew up here.
          </h2>
          <p className="mt-4 text-white/80">
            Share your dates and the valleys you&apos;re curious about —
            we&apos;ll come back with a route, a timeline, and a clear price.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/contact"
              className="inline-block rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Plan your trip
            </Button>
            <Button
              href="/book"
              className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-apricot hover:text-apricot"
            >
              Request dates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
