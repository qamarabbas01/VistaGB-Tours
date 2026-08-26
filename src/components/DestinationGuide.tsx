import { ContextSection } from "@/components/destination-guide/ContextSection";
import { ItinerarySection } from "@/components/destination-guide/ItinerarySection";
import { ListingGrid } from "@/components/destination-guide/ListingGrid";
import { ProseSection } from "@/components/destination-guide/ProseSection";
import { isTrustedMapEmbed } from "@/components/destination-guide/map-embed";
import { LazyFaqAccordion } from "@/components/lazy/FaqAccordion";
import type { RegionDestination, RegionGuide } from "@/data/types";

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

  return (
    <>
      <ContextSection sections={contextSections} />

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
        <ItinerarySection
          region={region}
          days={guide.suggestedItinerary}
          travelDuration={guide.travelDuration}
        />
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
            <LazyFaqAccordion items={guide.faqs} />
          </div>
        </section>
      ) : null}
    </>
  );
}
