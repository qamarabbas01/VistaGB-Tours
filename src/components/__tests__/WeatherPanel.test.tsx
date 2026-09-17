import { fireEvent, render, screen } from '@testing-library/react';
import { WeatherPanel } from '@/components/destination-weather/WeatherPanel';
import type { DestinationWeather, WeatherDay } from '@/lib/weather/types';

function day(
  date: string,
  overrides: Partial<WeatherDay> = {},
): WeatherDay {
  return {
    date,
    weatherCode: 2,
    condition: 'Partly cloudy',
    tempMaxC: 18,
    tempMinC: 10,
    sunrise: `${date}T05:41:00`,
    sunset: `${date}T18:05:00`,
    rainMm: 0,
    snowfallCm: 0,
    precipProbability: 10,
    windMaxKmh: 8,
    ...overrides,
  };
}

const weather: DestinationWeather = {
  slug: 'hunza-valley',
  locationLabel: 'Hunza Valley',
  latitude: 36.3167,
  longitude: 74.65,
  timezone: 'Asia/Karachi',
  updatedAt: '2026-09-17T12:00',
  fetchedAt: '2026-09-17T12:00:00.000Z',
  current: {
    temperatureC: 18.2,
    feelsLikeC: 19.1,
    weatherCode: 2,
    condition: 'Partly cloudy',
    windKmh: 7,
    rainMm: 0,
    snowfallCm: 0,
    precipitationMm: 0,
  },
  today: day('2026-09-17'),
  forecast: [
    day('2026-09-17', { tempMaxC: 18, precipProbability: 10 }),
    day('2026-09-18', { tempMaxC: 21, tempMinC: 12, weatherCode: 0 }),
    day('2026-09-19', { tempMaxC: 20, tempMinC: 11 }),
  ],
};

describe('WeatherPanel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-09-17T12:08:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('frames live conditions around the destination rather than a generic station', () => {
    render(<WeatherPanel weather={weather} locationName="Hunza Valley" />);

    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Hunza Valley' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('18°').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
    expect(screen.getByText('Feels like 19°')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
    expect(screen.getByText('21°')).toBeInTheDocument();
    expect(screen.getByText('12°')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '7-day forecast →' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Last updated 8 minutes ago')).toBeInTheDocument();
  });

  it('reveals the rest of the week from the forecast control', () => {
    render(<WeatherPanel weather={weather} locationName="Hunza Valley" />);

    fireEvent.click(screen.getByRole('button', { name: '7-day forecast →' }));
    expect(screen.getByRole('button', { name: '7-day forecast →' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText('20°')).toBeInTheDocument();
  });
});
