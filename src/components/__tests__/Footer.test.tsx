import { render, screen, within } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('is a navigation hub with explore, plan, discover, company, and follow', () => {
    render(<Footer />);

    const nav = screen.getByRole('navigation', { name: 'Footer' });

    expect(screen.getByText('Discover Gilgit-Baltistan.')).toBeInTheDocument();

    expect(
      within(nav).getByRole('link', { name: 'Destinations' }),
    ).toHaveAttribute('href', '/destinations');
    expect(within(nav).getByRole('link', { name: 'Places' })).toHaveAttribute(
      'href',
      '/destinations/hunza-valley#places',
    );
    expect(within(nav).getByRole('link', { name: 'Tours' })).toHaveAttribute(
      'href',
      '/#packages',
    );
    expect(within(nav).getByRole('link', { name: 'Guides' })).toHaveAttribute(
      'href',
      '/destinations/hunza-valley#guide',
    );
    expect(within(nav).getByRole('link', { name: 'Map' })).toHaveAttribute(
      'href',
      '/#map',
    );

    expect(
      within(nav).getByRole('link', { name: 'Trip Planner' }),
    ).toHaveAttribute('href', '/plan');
    expect(
      within(nav).getByRole('link', { name: 'AI Travel Guide' }),
    ).toHaveAttribute('href', '/assistant');
    expect(within(nav).getByRole('link', { name: 'Weather' })).toHaveAttribute(
      'href',
      '/destinations/hunza-valley#weather',
    );
    expect(
      within(nav).getByRole('link', { name: 'Travel Information' }),
    ).toHaveAttribute('href', '/alerts');

    expect(within(nav).getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      '/blog',
    );
    expect(within(nav).getByRole('link', { name: 'News' })).toHaveAttribute(
      'href',
      '/news',
    );
    expect(within(nav).getByRole('link', { name: 'Events' })).toHaveAttribute(
      'href',
      '/news',
    );
    expect(within(nav).getByRole('link', { name: 'Gallery' })).toHaveAttribute(
      'href',
      '/#gallery',
    );

    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(within(nav).getByRole('link', { name: 'Privacy' })).toHaveAttribute(
      'href',
      '/privacy',
    );
    expect(within(nav).getByRole('link', { name: 'Terms' })).toHaveAttribute(
      'href',
      '/terms',
    );

    expect(
      within(nav).getByRole('link', { name: 'Instagram' }),
    ).toHaveAttribute('href', 'https://www.instagram.com/');
    expect(within(nav).getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      'https://www.facebook.com/',
    );
    expect(within(nav).getByRole('link', { name: 'YouTube' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/',
    );
  });
});
