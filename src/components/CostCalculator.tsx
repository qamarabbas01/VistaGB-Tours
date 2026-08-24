"use client";

import { useEffect, useMemo, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import {
  costDestinationOptions,
  estimateTripCostPkr,
  TRAVEL_STYLE_META,
  TRAVEL_STYLES,
  type TravelStyle,
} from "@/lib/cost";
import {
  convert,
  fallbackRates,
  fetchLiveRates,
  formatMoney,
  type RateTable,
} from "@/lib/currency";

export default function CostCalculator() {
  const { currency } = usePreferences();
  const destinations = useMemo(() => costDestinationOptions(), []);
  const [days, setDays] = useState(7);
  const [groupSize, setGroupSize] = useState(2);
  const [style, setStyle] = useState<TravelStyle>("comfortable");
  const [destinationSlug, setDestinationSlug] = useState(
    destinations[0]?.slug ?? "hunza-valley",
  );
  const [rates, setRates] = useState<RateTable>(fallbackRates);

  useEffect(() => {
    let cancelled = false;
    void fetchLiveRates().then((next) => {
      if (!next || cancelled) return;
      setRates(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const estimate = estimateTripCostPkr({
    days,
    groupSize,
    style,
    destinationSlug,
  });
  const min = convert(estimate.min, "PKR", currency, rates);
  const max = convert(estimate.max, "PKR", currency, rates);
  const meta = TRAVEL_STYLE_META[style];

  return (
    <div className="rounded-2xl border border-teal/20 bg-slate p-6">
      <p className="coord-label mb-2">Budget</p>
      <h2 className="font-display text-2xl font-semibold text-glacier">
        Travel cost calculator
      </h2>
      <p className="mt-2 text-sm text-ice">
        Planning ranges for a private VistaGB-style trip — not a ticket price.
        Ask us for a firm quote.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-ice">
          Days
          <input
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(event) => setDays(Number(event.target.value) || 1)}
            className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          />
        </label>
        <label className="text-sm text-ice">
          Travellers
          <input
            type="number"
            min={1}
            max={16}
            value={groupSize}
            onChange={(event) => setGroupSize(Number(event.target.value) || 1)}
            className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          />
        </label>
        <label className="text-sm text-ice">
          Style
          <select
            value={style}
            onChange={(event) => setStyle(event.target.value as TravelStyle)}
            className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          >
            {TRAVEL_STYLES.map((value) => (
              <option key={value} value={value}>
                {TRAVEL_STYLE_META[value].label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-ice">
          Focus destination
          <select
            value={destinationSlug}
            onChange={(event) => setDestinationSlug(event.target.value)}
            className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          >
            {destinations.map((destination) => (
              <option key={destination.slug} value={destination.slug}>
                {destination.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ice">{meta.hint}</p>
      <p className="mt-6 font-display text-3xl text-apricot">
        {formatMoney(min, currency)} – {formatMoney(max, currency)}
      </p>
    </div>
  );
}
