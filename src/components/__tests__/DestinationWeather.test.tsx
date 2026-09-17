import { render, screen, waitFor } from '@testing-library/react';
import DestinationWeather from '@/components/DestinationWeather';

describe('DestinationWeather', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('loads Hunza conditions into the contextual weather card', async () => {
    const fetchedAt = new Date(Date.now() - 8 * 60_000).toISOString();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        slug: 'hunza-valley',
        locationLabel: 'Hunza Valley',
        fetchedAt,
        current: {
          temperatureC: 18,
          feelsLikeC: 19,
          weatherCode: 2,
          condition: 'Partly cloudy',
        },
        today: {
          date: '2026-09-17',
          weatherCode: 2,
          tempMaxC: 18,
          tempMinC: 10,
          precipProbability: 10,
        },
        forecast: [
          {
            date: '2026-09-17',
            weatherCode: 2,
            tempMaxC: 18,
            tempMinC: 10,
            precipProbability: 10,
          },
          {
            date: '2026-09-18',
            weatherCode: 0,
            tempMaxC: 21,
            tempMinC: 12,
            precipProbability: 5,
          },
        ],
      }),
    }) as unknown as typeof fetch;

    render(
      <DestinationWeather slug="hunza-valley" locationName="Hunza Valley" />,
    );

    await waitFor(() =>
      expect(screen.getByText('Feels like 19°')).toBeInTheDocument(),
    );
    expect(
      screen.getByRole('heading', { name: 'Hunza Valley' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Last updated 8 minutes ago')).toBeInTheDocument();
  });
});
