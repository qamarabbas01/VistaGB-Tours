import { render, screen } from '@testing-library/react';
import { HomeHero } from '@/components/home/HomeHero';

describe('HomeHero', () => {
  it('leads with Discover Gilgit-Baltistan and only two CTAs', () => {
    render(<HomeHero />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /discover gilgit-baltistan/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /explore destinations, plan your journey, discover hidden places, and experience the mountains/i,
      ),
    ).toBeInTheDocument();

    const explore = screen.getByRole('link', { name: 'Explore Destinations' });
    const plan = screen.getByRole('link', { name: 'Plan Your Trip' });

    expect(explore).toHaveAttribute('href', '/destinations');
    expect(plan).toHaveAttribute('href', '/book');

    const hero = screen.getByRole('region', {
      name: /discover gilgit-baltistan/i,
    });
    expect(hero.querySelectorAll('a')).toHaveLength(2);
  });
});
