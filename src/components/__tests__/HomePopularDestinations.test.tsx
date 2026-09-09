import { screen } from '@testing-library/react';
import { HomePopularDestinations } from '@/components/home/HomePopularDestinations';
import { mockRegion, renderWithPreferences } from '@/test-utils';

describe('HomePopularDestinations', () => {
  it('shows altitude, region, season, and explore on each card', () => {
    const hunza = {
      ...mockRegion,
      slug: 'hunza-valley',
      name: 'Hunza Valley',
      region: 'Hunza',
      altitude: '2,438M',
      bestTime: 'April–October; blossom in spring',
    };

    renderWithPreferences(
      <HomePopularDestinations destinations={[hunza]} />,
    );

    expect(
      screen.getByRole('heading', { name: 'Popular Destinations' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Hunza Valley' }),
    ).toBeInTheDocument();
    expect(screen.getByText('2,438m')).toBeInTheDocument();
    expect(screen.getByText('Hunza, Gilgit-Baltistan')).toBeInTheDocument();
    expect(screen.getByText('Best: Apr–Oct')).toBeInTheDocument();
    expect(screen.getByText('Explore →')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /hunza valley/i }),
    ).toHaveAttribute('href', '/destinations/hunza-valley');
  });
});
