import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { getLocationBySlug } from "@/data";
import type { GuideListing, RegionDestination, RegionGuide } from "@/data/types";

function isTrustedMapEmbed(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const isGoogleMapsHost =
      host === "maps.google.com" ||
      host === "www.google.com" ||
      host === "www.google.co.uk" ||
      host.endsWith(".google.com");
    const looksLikeEmbed =
      parsed.searchParams.get("output") === "embed" ||
      parsed.pathname.includes("/maps/embed") ||
      parsed.pathname.includes("/maps");
    return isGoogleMapsHost && looksLikeEmbed;
  } catch {
    return false;
  }
}

function GuideLink({ item }: { item: GuideListing }) {
  const resolved = item.placeSlug ? getLocationBySlug(item.placeSlug) : undefined;

  if (!resolved) {
    return <span className="font-medium text-glacier">{item.name}</span>;
  }

  return (
    <Link
      href={`/destinations/${resolved.slug}`}
      className="font-medium text-glacier transition-colors hover:text-apricot"
    >
      {item.name}
    </Link>
  );
}

function ListingGrid({
  label,
  heading,
  items,
}: {
  label: string;
  heading: string;
  items: GuideListing[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-teal/20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">{label}</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {heading}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={`${item.name}-${item.placeSlug ?? item.detail}`}
              className="rounded-xl border border-teal/20 bg-slate p-5"
            >
              <p className="font-display text-lg text-glacier">
                <GuideLink item={item} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ice">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProseSection({
  label,
  heading,
  body,
  alternate,
}: {
  label: string;
  heading: string;
  body: string;
  alternate?: boolean;
}) {
  return (
    <section
      className={
        alternate
          ? "border-t border-teal/20 bg-slate py-16 md:py-24"
          : "border-t border-teal/20 py-16 md:py-24"
      }
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">{label}</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ice md:text-base">
          {body}
        </p>
      </div>
    </section>
  );
}

type Props = {
  region: RegionDestination;
  guide: RegionGuide;
};

export default function DestinationGuide({ region, guide }: Props) {
  const contextSections = [
    guide.history
      ? { key: "history", label: "History", body: guide.history }
      : null,
    guide.culture
      ? { key: "culture", label: "Culture", body: guide.culture }
      : null,
    guide.weather
      ? { key: "weather", label: "Weather", body: guide.weather }
      : null,
  ].filter((section): section is { key: string; label: string; body: string } =>
    Boolean(section),
  );

  const contextGridClass =
    contextSections.length === 1
      ? "mt-10 grid gap-10"
      : contextSections.length === 2
        ? "mt-10 grid gap-10 md:grid-cols-2"
        : "mt-10 grid gap-10 md:grid-cols-3";

  const contextHeading =
    contextSections.length === 1
      ? contextSections[0].label
      : contextSections.length === 2
        ? `${contextSections[0].label} & ${contextSections[1].label}`
        : "History, culture & weather";

  return (
    <>
      {contextSections.length > 0 ? (
        <section className="border-t border-teal/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Know the place</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              {contextHeading}
            </h2>
            <div className={contextGridClass}>
              {contextSections.map((section) => (
                <div key={section.key}>
                  <h3 className="coord-label mb-3">{section.label}</h3>
                  <p className="text-sm leading-relaxed text-ice">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {guide.famousFoods && guide.famousFoods.length > 0 ? (
        <ListingGrid
          label="Local flavours"
          heading="Famous foods"
          items={guide.famousFoods}
        />
      ) : null}

      {guide.activities && guide.activities.length > 0 ? (
        <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">What to do</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Activities
            </h2>
            <ul className="mt-10 flex flex-wrap gap-2">
              {guide.activities.map((activity) => (
                <li
                  key={activity}
                  className="rounded-full border border-apricot/30 bg-night px-4 py-2 text-sm text-glacier"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {guide.hotels && guide.hotels.length > 0 ? (
        <ListingGrid label="Where to stay" heading="Hotels & lodges" items={guide.hotels} />
      ) : null}

      {guide.restaurants && guide.restaurants.length > 0 ? (
        <ListingGrid
          label="Where to eat"
          heading="Restaurants"
          items={guide.restaurants}
        />
      ) : null}

      {guide.trekkingRoutes && guide.trekkingRoutes.length > 0 ? (
        <ListingGrid
          label="On foot"
          heading="Trekking routes"
          items={guide.trekkingRoutes}
        />
      ) : null}

      {guide.suggestedItinerary && guide.suggestedItinerary.length > 0 ? (
        <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Plan your days</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Suggested itinerary
            </h2>
            {guide.travelDuration ? (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ice md:text-base">
                {guide.travelDuration}
              </p>
            ) : null}
            <ol className="mt-10 space-y-4">
              {guide.suggestedItinerary.map((day) => (
                <li
                  key={day.day + day.title}
                  className="grid gap-4 rounded-xl border border-teal/20 bg-night p-5 md:grid-cols-[7rem_1fr]"
                >
                  <p className="coord-label pt-1">{day.day}</p>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-glacier">
                      {day.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ice">{day.summary}</p>
                    {day.stops && day.stops.length > 0 ? (
                      <p className="mt-3 text-xs text-apricot">
                        {day.stops.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : guide.travelDuration ? (
        <ProseSection
          label="How long"
          heading="Travel duration"
          body={guide.travelDuration}
          alternate
        />
      ) : null}

      {guide.localTips && guide.localTips.length > 0 ? (
        <section className="border-t border-teal/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">From the ground</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Local tips
            </h2>
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {guide.localTips.map((tip) => (
                <li
                  key={tip}
                  className="flex gap-3 rounded-xl border border-teal/20 bg-slate p-4 text-sm leading-relaxed text-ice"
                >
                  <span className="mt-0.5 font-display text-apricot">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {guide.nearbyDestinations && guide.nearbyDestinations.length > 0 ? (
        <ListingGrid
          label="Keep exploring"
          heading="Nearby places"
          items={guide.nearbyDestinations}
        />
      ) : null}

      {guide.mapEmbedUrl && isTrustedMapEmbed(guide.mapEmbedUrl) ? (
        <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Orientation</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Map of {region.name}
            </h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-teal/20">
              <iframe
                title={`Map of ${region.name}`}
                src={guide.mapEmbedUrl}
                className="h-[360px] w-full md:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      {guide.faqs && guide.faqs.length > 0 ? (
        <section className="border-t border-teal/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Questions</p>
            <h2 className="mb-10 font-display text-2xl font-semibold text-glacier md:text-3xl">
              FAQ — {region.name}
            </h2>
            <FaqAccordion items={guide.faqs} />
          </div>
        </section>
      ) : null}
    </>
  );
}
