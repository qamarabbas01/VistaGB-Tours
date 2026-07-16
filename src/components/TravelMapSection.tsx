"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { MapLocation } from "@/components/InteractiveMap";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] items-center justify-center rounded-2xl border border-teal/20 bg-night">
      <p className="coord-label">Loading map…</p>
    </div>
  ),
});

type TravelMapSectionProps = {
  locations: readonly MapLocation[];
};

export default function TravelMapSection({ locations }: TravelMapSectionProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section className="bg-slate py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="coord-label mb-3">The Region</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              Travel Map
            </h2>
            <p className="mt-4 max-w-md text-ice">
              Explore the valleys and plateaus we operate across — tap a pin or
              select a place to fly there on the map.
            </p>
            <ul className="mt-8 space-y-3">
              {locations.map((pin) => {
                const isActive = pin.slug === activeSlug;
                return (
                  <li key={pin.slug}>
                    <button
                      type="button"
                      onClick={() => setActiveSlug(pin.slug)}
                      className={
                        "group flex w-full items-baseline justify-between gap-4 border-b py-2 text-left transition-colors " +
                        (isActive
                          ? "border-apricot/50"
                          : "border-teal/15 hover:border-apricot/40")
                      }
                    >
                      <span
                        className={
                          "font-display text-lg transition-colors " +
                          (isActive
                            ? "text-apricot"
                            : "text-glacier group-hover:text-apricot")
                        }
                      >
                        {pin.name}
                      </span>
                      <span className="coord-label shrink-0">{pin.alt}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-ice">
              Or{" "}
              <Link
                href="/destinations"
                className="text-apricot underline-offset-4 transition-colors hover:underline"
              >
                browse all destinations
              </Link>
              .
            </p>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[5/4]">
            <InteractiveMap
              locations={locations}
              activeSlug={activeSlug}
              onSelect={setActiveSlug}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
