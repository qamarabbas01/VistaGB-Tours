import { Metric } from '@/components/destination-weather/Metric';
import {
  formatClock,
  formatDayLabel,
  formatTemp,
} from '@/components/destination-weather/format';
import type { DestinationWeather as WeatherPayload } from '@/lib/weather/types';

export function WeatherPanel({ weather }: { weather: WeatherPayload }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-display text-4xl font-semibold text-glacier">
          {formatTemp(weather.current.temperatureC)}
          <span className="ml-1 text-lg font-medium text-ice">C</span>
        </p>
        <p className="mt-1 text-sm text-apricot">{weather.current.condition}</p>
        <p className="mt-1 text-xs text-ice">
          Today {formatTemp(weather.today.tempMinC)} –{' '}
          {formatTemp(weather.today.tempMaxC)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Metric label="Snow" value={`${weather.current.snowfallCm} cm`} />
        <Metric label="Rain" value={`${weather.current.rainMm} mm`} />
        <Metric label="Wind" value={`${weather.current.windKmh} km/h`} />
        <Metric label="Chance" value={`${weather.today.precipProbability}%`} />
        <Metric label="Sunrise" value={formatClock(weather.today.sunrise)} />
        <Metric label="Sunset" value={formatClock(weather.today.sunset)} />
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
                  {formatTemp(day.tempMaxC)}{' '}
                  <span className="text-ice">/ {formatTemp(day.tempMinC)}</span>
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
  );
}
