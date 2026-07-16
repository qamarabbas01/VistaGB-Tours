import Image from "next/image";
import Link from "next/link";
import { blogPosts, regions } from "@/data";
import {
  activities,
  experiences,
  faqs,
  galleryImages,
  mapPins,
  packages,
  reviews,
  statistics,
} from "@/data/hero";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import TravelMapSection from "@/components/TravelMapSection";
import { fetchNewsPage } from "@/lib/news/scraper";

export const revalidate = 3600;

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

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="altitude-line" />
    </div>
  );
}

const popularDestinations = regions.slice(0, 6);

const latestPosts = [...blogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default async function Home() {
  let latestNews: Awaited<ReturnType<typeof fetchNewsPage>>["items"] = [];
  try {
    const news = await fetchNewsPage(1);
    latestNews = news.items.slice(0, 3);
  } catch {
    latestNews = [];
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <Image
          src="/images/commons/bd7ddfea0e6ee033.jpg"
          alt="Snow-capped peaks of the Karakoram range above Hunza Valley"
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="coord-label rise-in mb-6">
            35.8°N · 75.5°E · KARAKORAM RANGE
          </p>
          <h1 className="rise-in rise-in-delay-1 max-w-3xl font-display text-5xl font-semibold leading-[1.1] text-glacier md:text-7xl">
            VistaGB
            <span className="mt-2 block text-4xl italic text-apricot md:text-6xl">
              Where the Karakoram meets the sky.
            </span>
          </h1>
          <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-base leading-relaxed text-ice md:text-lg">
            Journeys through Gilgit-Baltistan — valleys, glaciers, and ancient
            roads of northern Pakistan, guided by the people who call them home.
          </p>
          <div className="rise-in rise-in-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              href="/destinations"
              className="rounded-full bg-apricot px-8 py-3 text-center text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
            >
              Explore Destinations
            </Button>
            <Button
              href="/contact"
              className="rounded-full border border-ice/40 px-8 py-3 text-center text-sm font-medium text-glacier transition-colors hover:border-apricot hover:text-apricot"
            >
              Plan Your Trip
            </Button>
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

      {/* Popular Destinations */}
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
            {popularDestinations.map((dest) => (
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
          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/destinations"
              className="rounded-full bg-apricot px-6 py-2 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
            >
              View all destinations
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Top Experiences */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Must See</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Top Experiences
          </h2>
          <p className="mt-4 max-w-xl text-ice">
            Places our travelers ask for again — lakes, forts, meadows, and
            ridges that stay with you.
          </p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item, index) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className={
                  "group relative min-h-[300px] overflow-hidden rounded-2xl lg:min-h-[340px] " +
                  (index === 0 ? "sm:col-span-2 lg:col-span-2" : "")
                }
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="coord-label mb-2">{item.region}</p>
                  <h3 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-ice">{item.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure Activities */}
      <section className="relative overflow-hidden bg-slate py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #d98e4a 0%, transparent 40%), radial-gradient(circle at 80% 80%, #5c7a8a 0%, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">On The Ground</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Adventure Activities
          </h2>
          <p className="mt-4 max-w-xl text-ice">
            How you move through the mountains — on foot, by jeep, through
            heritage sites, or behind a camera.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {activities.map((activity) => (
              <article
                key={activity.title}
                className="group relative min-h-[280px] overflow-hidden rounded-2xl"
              >
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-night via-night/75 to-night/20" />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                  <p className="coord-label mb-3">{activity.mark}</p>
                  <h3 className="font-display text-3xl font-semibold text-glacier">
                    {activity.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ice">
                    {activity.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="coord-label mb-3">Ready Routes</p>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Tour Packages
              </h2>
              <p className="mt-4 max-w-xl text-ice">
                Starting points we tailor to your dates, pace, and the valleys
                you want most.
              </p>
            </div>
            <Link
              href="/contact"
              className="text-sm font-medium text-apricot hover:underline"
            >
              Request a custom quote →
            </Link>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className="overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/40"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                    <p className="coord-label">{pkg.days}</p>
                    <p className="font-mono text-xs text-apricot">{pkg.price}</p>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl font-semibold text-glacier">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {pkg.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-teal"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    className="mt-6 inline-block rounded-full border border-ice/30 px-6 py-2 text-center text-sm font-medium text-glacier transition-colors hover:border-apricot hover:text-apricot"
                  >
                    Enquire
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Customer Reviews */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">From The Road</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Customer Reviews
          </h2>
          <p className="mt-4 max-w-xl text-ice">
            Words from travelers who trusted us with their first — or return —
            journey north.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {reviews.map((review) => (
              <blockquote key={review.name} className="relative">
                <span
                  className="font-display text-5xl leading-none text-apricot/40"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="mt-2 text-base leading-relaxed text-glacier">
                  {review.quote}
                </p>
                <footer className="mt-6">
                  <p className="font-display text-lg font-semibold text-glacier">
                    {review.name}
                  </p>
                  <p className="coord-label mt-2">
                    {review.from} · {review.trip}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Statistics */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/images/commons/112aa7ad11d28437.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          aria-hidden
        />
        <div className="absolute inset-0 bg-night/80" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">By The Numbers</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Travel Statistics
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl font-semibold text-apricot md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-display text-xl font-semibold text-glacier">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm text-ice">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TravelMapSection locations={mapPins} />

      {/* Latest News */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="coord-label mb-3">Regional Updates</p>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Latest News
              </h2>
              <p className="mt-4 max-w-xl text-ice">
                Festivals, events, and developments from across Gilgit-Baltistan.
              </p>
            </div>
            <Link
              href="/news"
              className="text-sm font-medium text-apricot hover:underline"
            >
              All news →
            </Link>
          </div>

          {latestNews.length > 0 ? (
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {latestNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50"
                >
                  {item.image ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <p className="coord-label mb-2">
                      {item.date}
                      {item.time ? ` · ${item.time}` : ""}
                    </p>
                    <h3 className="font-display text-xl font-semibold leading-snug text-glacier transition-colors group-hover:text-apricot">
                      {item.title}
                    </h3>
                    {item.summary ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ice">
                        {item.summary}
                      </p>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-14 rounded-2xl border border-teal/20 bg-slate p-10 text-center">
              <p className="text-ice">
                News is temporarily unavailable.{" "}
                <Link href="/news" className="text-apricot hover:underline">
                  Try the news page
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <SectionDivider />

      {/* Blog */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="coord-label mb-3">Field Notes</p>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                From the Blog
              </h2>
              <p className="mt-4 max-w-xl text-ice">
                Guides, season tips, and stories from the road across northern
                Pakistan.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-apricot hover:underline"
            >
              Read the blog →
            </Link>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="coord-label mb-2">
                    {post.tag} · {post.date}
                  </p>
                  <h3 className="font-display text-xl font-semibold leading-snug text-glacier">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="bg-slate py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="coord-label mb-3">On Film</p>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Instagram Gallery
              </h2>
              <p className="mt-4 max-w-xl text-ice">
                Frames from the valleys — forts, glaciers, and road light along
                the Karakoram Highway.
              </p>
            </div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-apricot hover:underline"
            >
              @vistagbtours →
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={
                  "relative overflow-hidden rounded-xl " +
                  (index === 0 || index === 5
                    ? "aspect-square md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[360px]"
                    : "aspect-square")
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                  <p className="coord-label">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="coord-label mb-3">Before You Go</p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-ice">
            Practical answers for planning your first Gilgit-Baltistan trip.
          </p>
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-slate py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(217,142,74,0.18), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="coord-label mb-4">Ready When You Are</p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Your journey through the Karakoram starts with one message.
          </h2>
          <p className="mt-4 text-ice">
            Tell us your dates and the valleys you&apos;re curious about —
            we&apos;ll build a route around them.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/contact"
              className="inline-block rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
            >
              Get in Touch
            </Button>
            <Button
              href="/destinations"
              className="inline-block rounded-full border border-ice/40 px-8 py-3 text-sm font-medium text-glacier transition-colors hover:border-apricot hover:text-apricot"
            >
              Browse Destinations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}