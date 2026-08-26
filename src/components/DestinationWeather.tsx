"use client";

import { WeatherPanel } from "@/components/destination-weather/WeatherPanel";
import { useEffect, useState } from "react";
import type { DestinationWeather as WeatherPayload } from "@/lib/weather/types";

type Props = {
  slug: string;
  locationName: string;
};

export default function DestinationWeather({ slug, locationName }: Props) {
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/weather?slug=${encodeURIComponent(slug)}`,
          { signal: controller.signal },
        );
        const payload = (await response.json()) as
          | WeatherPayload
          | { error?: string };

        if (!response.ok) {
          throw new Error(
            "error" in payload && payload.error
              ? payload.error
              : "Unable to load weather",
          );
        }

        if (!cancelled) {
          setWeather(payload as WeatherPayload);
        }
      } catch (err) {
        if (cancelled || controller.signal.aborted) return;
        setWeather(null);
        setError(
          err instanceof Error ? err.message : "Unable to load weather",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [slug]);

  return (
    <div className="rounded-2xl border border-teal/20 bg-slate p-6">
      <p className="coord-label mb-1">Live weather</p>
      <p className="mb-4 text-xs text-ice/70">{locationName}</p>

      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-live="polite">
          <div className="h-12 animate-pulse rounded-lg bg-night/50" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-14 animate-pulse rounded-xl bg-night/40" />
            <div className="h-14 animate-pulse rounded-xl bg-night/40" />
            <div className="h-14 animate-pulse rounded-xl bg-night/40" />
            <div className="h-14 animate-pulse rounded-xl bg-night/40" />
          </div>
          <div className="h-28 animate-pulse rounded-xl bg-night/40" />
        </div>
      ) : null}

      {!loading && error ? (
        <p className="text-sm leading-relaxed text-ice">
          Weather is temporarily unavailable. Check again before you travel.
        </p>
      ) : null}

      {!loading && weather ? <WeatherPanel weather={weather} /> : null}
    </div>
  );
}
