'use client';

import { WeatherPanel } from '@/components/destination-weather/WeatherPanel';
import { useEffect, useState } from 'react';
import type { DestinationWeather as WeatherPayload } from '@/lib/weather/types';

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
            'error' in payload && payload.error
              ? payload.error
              : 'Unable to load weather',
          );
        }

        if (!cancelled) {
          setWeather(payload as WeatherPayload);
        }
      } catch (err) {
        if (cancelled || controller.signal.aborted) return;
        setWeather(null);
        setError(err instanceof Error ? err.message : 'Unable to load weather');
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
      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-live="polite">
          <div className="h-3 w-16 animate-pulse rounded bg-night/50" />
          <div className="h-6 w-40 animate-pulse rounded bg-night/50" />
          <div className="h-12 w-24 animate-pulse rounded-lg bg-night/50" />
          <div className="h-20 animate-pulse rounded-xl bg-night/40" />
        </div>
      ) : null}

      {!loading && error ? (
        <>
          <p className="coord-label mb-1">Weather</p>
          <h2 className="font-display text-xl font-semibold text-glacier">
            {locationName}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice">
            Weather is temporarily unavailable. Check again before you travel.
          </p>
        </>
      ) : null}

      {!loading && weather ? (
        <WeatherPanel weather={weather} locationName={locationName} />
      ) : null}
    </div>
  );
}
