'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { WeatherGlyph } from '@/components/destination-weather/WeatherGlyph';
import {
  formatCondition,
  formatDayLabel,
  formatTemp,
  formatUpdatedAgo,
} from '@/components/destination-weather/format';
import type { DestinationWeather as WeatherPayload } from '@/lib/weather/types';

type Props = {
  weather: WeatherPayload;
  locationName: string;
};

export function WeatherPanel({ weather, locationName }: Props) {
  const [now, setNow] = useState(() => Date.now());
  const [forecastOpen, setForecastOpen] = useState(false);
  const today = weather.forecast[0] ?? weather.today;
  const tomorrow = weather.forecast[1];
  const remaining = weather.forecast.slice(2);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="coord-label mb-1">Weather</p>
      <h2 className="font-display text-xl font-semibold text-glacier">
        {locationName}
      </h2>

      <p className="mt-5 font-display text-5xl font-semibold leading-none text-glacier">
        {formatTemp(weather.current.temperatureC)}
      </p>
      <p className="mt-2 text-sm text-apricot">
        {formatCondition(weather.current.condition)}
      </p>
      <p className="mt-1 text-sm text-ice">
        Feels like {formatTemp(weather.current.feelsLikeC)}
      </p>

      <div className="mt-6 space-y-3">
        <DayRow
          label="Today"
          primary={
            <>
              <WeatherGlyph kind="condition" code={today.weatherCode} />
              <span>{formatTemp(today.tempMaxC)}</span>
            </>
          }
          secondary={
            <>
              <WeatherGlyph kind="rain" />
              <span>{today.precipProbability}%</span>
            </>
          }
        />
        {tomorrow ? (
          <DayRow
            label="Tomorrow"
            primary={
              <>
                <WeatherGlyph kind="condition" code={tomorrow.weatherCode} />
                <span>{formatTemp(tomorrow.tempMaxC)}</span>
              </>
            }
            secondary={
              <>
                <WeatherGlyph kind="moon" />
                <span>{formatTemp(tomorrow.tempMinC)}</span>
              </>
            }
          />
        ) : null}
      </div>

      {remaining.length > 0 ? (
        <div className="mt-5">
          <button
            type="button"
            aria-expanded={forecastOpen}
            onClick={() => setForecastOpen((open) => !open)}
            className="text-sm font-medium text-apricot hover:underline"
          >
            7-day forecast →
          </button>
          {forecastOpen ? (
            <ul className="mt-3 space-y-2">
              {remaining.map((day, index) => (
                <li
                  key={day.date}
                  className="flex items-center justify-between gap-3 border-t border-teal/15 pt-2 text-sm"
                >
                  <span className="font-medium text-glacier">
                    {formatDayLabel(day.date, index + 2)}
                  </span>
                  <span className="inline-flex items-center gap-3 text-ice">
                    <span className="inline-flex items-center gap-1.5">
                      <WeatherGlyph kind="condition" code={day.weatherCode} />
                      {formatTemp(day.tempMaxC)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <WeatherGlyph kind="moon" />
                      {formatTemp(day.tempMinC)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <p className="mt-5 text-xs text-ice/60">
        {formatUpdatedAgo(weather.fetchedAt, now)}
      </p>
    </div>
  );
}

function DayRow({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: ReactNode;
  secondary: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-teal">
        {label}
      </p>
      <div className="mt-1.5 flex items-center justify-between text-sm text-glacier">
        <span className="inline-flex items-center gap-2">{primary}</span>
        <span className="inline-flex items-center gap-2 text-ice">
          {secondary}
        </span>
      </div>
    </div>
  );
}
