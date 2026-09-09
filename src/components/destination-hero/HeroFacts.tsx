'use client';

import type { ReactNode } from 'react';
import { formatAltitude, formatLocationLabel } from '@/components/destination-card/meta';
import { formatTemp } from '@/components/destination-weather/format';
import { useEffect, useState } from 'react';
import type { DestinationWeather as WeatherPayload } from '@/lib/weather/types';

type Props = {
  location: string;
  altitude: string;
  weatherSlug?: string;
};

function FactIcon({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <span className="flex items-center gap-2 text-sm text-ice">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal/25 bg-night/50 text-apricot">
        {children}
      </span>
      <span>{label}</span>
    </span>
  );
}

export function HeroFacts({ location, altitude, weatherSlug }: Props) {
  const [temp, setTemp] = useState<string | null>(null);

  useEffect(() => {
    if (!weatherSlug) return;
    const slug = weatherSlug;
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(
          `/api/weather?slug=${encodeURIComponent(slug)}`,
          { signal: controller.signal },
        );
        if (!response.ok) return;
        const payload = (await response.json()) as WeatherPayload;
        setTemp(`${formatTemp(payload.current.temperatureC)}C`);
      } catch {
        if (controller.signal.aborted) return;
        setTemp(null);
      }
    }

    void load();
    return () => controller.abort();
  }, [weatherSlug]);

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <li>
        <FactIcon label={formatLocationLabel(location)}>
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
            />
            <circle cx="12" cy="10" r="2.2" />
          </svg>
        </FactIcon>
      </li>
      <li>
        <FactIcon label={formatAltitude(altitude)}>
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 19h18L14.5 6.5 11 12 8.5 8.5 3 19z"
            />
          </svg>
        </FactIcon>
      </li>
      {temp ? (
        <li>
          <FactIcon label={temp}>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <circle cx="12" cy="12" r="3.2" />
              <path
                strokeLinecap="round"
                d="M12 3v2.2M12 18.8V21M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M3 12h2.2M18.8 12H21M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
              />
            </svg>
          </FactIcon>
        </li>
      ) : null}
    </ul>
  );
}
