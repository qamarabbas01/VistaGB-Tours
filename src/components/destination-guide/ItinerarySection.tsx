import Link from "next/link";
import type { ItineraryDay, RegionDestination } from "@/data/types";

export function ItinerarySection({
  region,
  days,
  travelDuration,
}: {
  region: RegionDestination;
  days: ItineraryDay[];
  travelDuration?: string;
}) {
  return (
    <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="coord-label mb-3">Plan your days</p>
            <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
              Suggested itinerary
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/plan?region=${region.slug}`}
              className="text-sm font-medium text-apricot hover:underline"
            >
              Open in trip planner →
            </Link>
            <Link
              href={`/book?region=${region.slug}`}
              className="text-sm font-medium text-ice hover:text-apricot hover:underline"
            >
              Request dates
            </Link>
          </div>
        </div>
        {travelDuration ? (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ice md:text-base">
            {travelDuration}
          </p>
        ) : null}
        <ol className="mt-10 space-y-4">
          {days.map((day) => (
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
  );
}
