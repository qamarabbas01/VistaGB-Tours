import { getCoordinatesForSlug } from "@/data/coordinates";
import { weatherCodeLabel } from "@/lib/weather/codes";
import type { DestinationWeather, WeatherDay } from "@/lib/weather/types";

type OpenMeteoResponse = {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    rain: number;
    snowfall: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    rain_sum: number[];
    snowfall_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
  };
};

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function mapDay(
  daily: OpenMeteoResponse["daily"],
  index: number,
): WeatherDay | null {
  const date = daily.time[index];
  if (!date) return null;

  const weatherCode = daily.weather_code[index] ?? 0;

  return {
    date,
    weatherCode,
    condition: weatherCodeLabel(weatherCode),
    tempMaxC: round1(daily.temperature_2m_max[index] ?? 0),
    tempMinC: round1(daily.temperature_2m_min[index] ?? 0),
    sunrise: daily.sunrise[index] ?? "",
    sunset: daily.sunset[index] ?? "",
    rainMm: round1(daily.rain_sum[index] ?? 0),
    snowfallCm: round1(daily.snowfall_sum[index] ?? 0),
    precipProbability: Math.round(
      daily.precipitation_probability_max[index] ?? 0,
    ),
    windMaxKmh: round1(daily.wind_speed_10m_max[index] ?? 0),
  };
}

export async function fetchDestinationWeather(
  slug: string,
): Promise<DestinationWeather> {
  const point = getCoordinatesForSlug(slug);
  if (!point) {
    throw new Error("No coordinates available for this destination");
  }

  const params = new URLSearchParams({
    latitude: String(point.lat),
    longitude: String(point.lng),
    timezone: "Asia/Karachi",
    forecast_days: "5",
    current: [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "rain",
      "snowfall",
      "precipitation",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "rain_sum",
      "snowfall_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ].join(","),
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    {
      next: { revalidate: 1800 },
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Weather provider returned ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const today = mapDay(data.daily, 0);
  if (!today) {
    throw new Error("Weather forecast was incomplete");
  }

  const forecast = data.daily.time
    .map((_, index) => mapDay(data.daily, index))
    .filter((day): day is WeatherDay => Boolean(day));

  return {
    slug,
    locationLabel: point.label,
    latitude: point.lat,
    longitude: point.lng,
    timezone: data.timezone,
    updatedAt: data.current.time,
    current: {
      temperatureC: round1(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      condition: weatherCodeLabel(data.current.weather_code),
      windKmh: round1(data.current.wind_speed_10m),
      rainMm: round1(data.current.rain),
      snowfallCm: round1(data.current.snowfall),
      precipitationMm: round1(data.current.precipitation),
    },
    today,
    forecast,
  };
}
