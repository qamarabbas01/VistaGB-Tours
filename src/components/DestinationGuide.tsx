import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import type { GuideListing, RegionDestination, RegionGuide } from "@/data/types";

function GuideLink({ item }: { item: GuideListing }) {
  if (!item.placeSlug) {
    return <span className="font-medium text-glacier">{item.name}</span>;
  }

  return (
    <Link
      href={`/destinations/${item.placeSlug}`}
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
              key={item.name}
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
  return (
    <>
      {(guide.history || guide.culture || guide.weather) && (
        <section className="border-t border-teal/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Know the place</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              History, culture & weather
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {guide.history ? (
                <div>
                  <p className="coord-label mb-3">History</p>
                  <p className="text-sm leading-relaxed text-ice">{guide.history}</p>
                </div>
              ) : null}
              {guide.culture ? (
                <div>
                  <p className="coord-label mb-3">Culture</p>
                  <p className="text-sm leading-relaxed text-ice">{guide.culture}</p>
                </div>
              ) : null}
              {guide.weather ? (
                <div>
                  <p className="coord-label mb-3">Weather</p>
                  <p className="text-sm leading-relaxed text-ice">{guide.weather}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {guide.famousFoods && guide.famousFoods.length > 0 ? (
        <ListingGrid
          label="Taste of the valley"
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
          label="Beyond the valley"
          heading="Nearby places"
          items={guide.nearbyDestinations}
        />
      ) : null}

      {guide.mapEmbedUrl ? (
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
