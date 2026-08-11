"use client";

import { useEffect, useState } from "react";
import type { DestinationWeather as WeatherPayload } from "@/lib/weather/types";

type Props = {
  slug: string;
  locationName: string;
};

function formatTemp(value: number): string {
  return `${Math.round(value)}°`;
}

function formatClock(isoLocal: string): string {
  const timePart = isoLocal.includes("T") ? isoLocal.split("T")[1] : isoLocal;
  if (!timePart) return "—";
  const [hours, minutes] = timePart.split(":");
  if (!hours || !minutes) return "—";

  const hour = Number.parseInt(hours, 10);
  if (!Number.isFinite(hour)) return "—";

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}

function formatDayLabel(date: string, index: number): string {
  if (index === 0) return "Today";
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", { weekday: "short" });
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-teal/20 bg-night/40 px-3 py-3">
      <p className="text-[10px] uppercase tracking-wider text-teal">{label}</p>
      <p className="mt-1 text-sm font-medium text-glacier">{value}</p>
    </div>
  );
}

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

      {!loading && weather ? (
        <div className="space-y-5">
          <div>
            <p className="font-display text-4xl font-semibold text-glacier">
              {formatTemp(weather.current.temperatureC)}
              <span className="ml-1 text-lg font-medium text-ice">C</span>
            </p>
            <p className="mt-1 text-sm text-apricot">{weather.current.condition}</p>
            <p className="mt-1 text-xs text-ice">
              Today {formatTemp(weather.today.tempMinC)} –{" "}
              {formatTemp(weather.today.tempMaxC)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Metric
              label="Snow"
              value={`${weather.current.snowfallCm} cm`}
            />
            <Metric label="Rain" value={`${weather.current.rainMm} mm`} />
            <Metric label="Wind" value={`${weather.current.windKmh} km/h`} />
            <Metric
              label="Chance"
              value={`${weather.today.precipProbability}%`}
            />
            <Metric
              label="Sunrise"
              value={formatClock(weather.today.sunrise)}
            />
            <Metric
              label="Sunset"
              value={formatClock(weather.today.sunset)}
            />
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-wider text-teal">
              5-day forecast
            </p>
            <ul className="space-y-2">
              {weather.forecast.map((day, index) => (
                <li
                  key={day.date}
                  className="flex items-center justify-between gap-3 border-t border-teal/15 pt-2 text-sm first:border-t-0 first:pt-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-glacier">
                      {formatDayLabel(day.date, index)}
                    </p>
                    <p className="truncate text-xs text-ice">{day.condition}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-glacier">
                      {formatTemp(day.tempMaxC)}{" "}
                      <span className="text-ice">
                        / {formatTemp(day.tempMinC)}
                      </span>
                    </p>
                    <p className="text-[11px] text-ice">
                      {day.snowfallCm > 0
                        ? `Snow ${day.snowfallCm} cm`
                        : day.rainMm > 0
                          ? `Rain ${day.rainMm} mm`
                          : `Wind ${Math.round(day.windMaxKmh)} km/h`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] leading-relaxed text-ice/50">
            Conditions update about every 30 minutes · Open-Meteo
          </p>
        </div>
      ) : null}
    </div>
  );
}
