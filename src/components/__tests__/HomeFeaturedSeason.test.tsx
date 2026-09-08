import { screen } from '@testing-library/react';
import { HomeFeaturedSeason } from '@/components/home/HomeFeaturedSeason';
import { getFeaturedSeason } from '@/data/seasons';
import { mockRegion, renderWithPreferences } from '@/test-utils';

describe('HomeFeaturedSeason', () => {
  it('renders the current season copy, booking CTA, and featured valleys', () => {
    const autumn = getFeaturedSeason(new Date('2026-09-08T12:00:00+05:00'));
    const hunza = {
      ...mockRegion,
      slug: 'hunza-valley',
      name: 'Hunza Valley',
      region: 'Hunza',
    };

    renderWithPreferences(
      <HomeFeaturedSeason season={autumn} destinations={[hunza]} />,
    );

    expect(
      screen.getByRole('heading', { name: 'Autumn in GB' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/golden valleys of hunza, nagar and skardu/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Plan your autumn trip' }),
    ).toHaveAttribute('href', '/book');
    expect(
      screen.getByRole('link', { name: /hunza valley/i }),
    ).toHaveAttribute('href', '/destinations/hunza-valley');
  });

  it('renders cherry blossom copy in spring', () => {
    const spring = getFeaturedSeason(new Date('2026-04-10T12:00:00+05:00'));

    renderWithPreferences(
      <HomeFeaturedSeason season={spring} destinations={[]} />,
    );

    expect(
      screen.getByRole('heading', { name: 'Cherry Blossom Season' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Plan your spring escape' }),
    ).toHaveAttribute('href', '/book');
  });
});
