"use client";

import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { usePreferences } from "@/components/PreferencesProvider";
import type { RegionDestination } from "@/data/types";

type Props = {
  regions: RegionDestination[];
};

export default function CompareView({ regions }: Props) {
  const { compare, toggleCompare, ready } = usePreferences();
  const selected = regions.filter((region) => compare.includes(region.slug));

  if (!ready) {
    return <p className="text-ice">Loading comparison…</p>;
  }

  if (selected.length === 0) {
    return (
      <div className="rounded-2xl border border-teal/20 bg-slate p-8">
        <p className="text-ice">
          Add up to three regions from a destination page or card, then return here.
        </p>
        <Link
          href="/destinations"
          className="mt-4 inline-block text-sm font-medium text-apricot hover:underline"
        >
          Browse destinations →
        </Link>
      </div>
    );
  }

  const rows: { label: string; value: (region: RegionDestination) => string }[] = [
    { label: "Tagline", value: (region) => region.tagline },
    { label: "Altitude", value: (region) => region.altitude },
    { label: "Best time", value: (region) => region.bestTime },
    { label: "Getting there", value: (region) => region.gettingThere },
    {
      label: "Places inside",
      value: (region) => String(region.placeSlugs.length),
    },
    {
      label: "Treks listed",
      value: (region) => String(region.guide?.trekkingRoutes?.length ?? 0),
    },
    {
      label: "Itinerary days",
      value: (region) => String(region.guide?.suggestedItinerary?.length ?? 0),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-40 p-3 text-left text-ice" />
            {selected.map((region) => (
              <th key={region.slug} className="p-3 text-left align-top">
                <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl">
                  <OptimizedImage
                    src={region.image}
                    alt={region.name}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/destinations/${region.slug}`}
                  className="font-display text-xl text-glacier hover:text-apricot"
                >
                  {region.name}
                </Link>
                <button
                  type="button"
                  onClick={() => toggleCompare(region.slug)}
                  className="mt-2 block text-xs text-ice hover:text-apricot"
                >
                  Remove
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-teal/20">
              <th className="p-3 text-left align-top font-medium text-apricot">
                {row.label}
              </th>
              {selected.map((region) => (
                <td key={region.slug} className="p-3 align-top leading-relaxed text-ice">
                  {row.value(region)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-teal/20">
            <th className="p-3 text-left align-top font-medium text-apricot">
              Highlights
            </th>
            {selected.map((region) => (
              <td key={region.slug} className="p-3 align-top text-ice">
                <ul className="list-disc space-y-1 ps-4">
                  {region.highlights.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-6 text-sm text-ice">
        Ready to go?{" "}
        <Link href="/plan" className="text-apricot hover:underline">
          Build an itinerary
        </Link>{" "}
        or{" "}
        <Link href="/book" className="text-apricot hover:underline">
          request dates
        </Link>
        .
      </p>
    </div>
  );
}
