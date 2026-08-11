export type WeatherCurrent = {
  temperatureC: number;
  weatherCode: number;
  condition: string;
  windKmh: number;
  rainMm: number;
  snowfallCm: number;
  precipitationMm: number;
};

export type WeatherDay = {
  date: string;
  weatherCode: number;
  condition: string;
  tempMaxC: number;
  tempMinC: number;
  sunrise: string;
  sunset: string;
  rainMm: number;
  snowfallCm: number;
  precipProbability: number;
  windMaxKmh: number;
};

export type DestinationWeather = {
  slug: string;
  locationLabel: string;
  latitude: number;
  longitude: number;
  timezone: string;
  updatedAt: string;
  current: WeatherCurrent;
  today: WeatherDay;
  forecast: WeatherDay[];
};

export type WeatherError = {
  error: string;
};
