import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { destinationTrail } from '@/lib/seo';

describe('Breadcrumbs', () => {
  it('renders Home / Destinations / Hunza Valley / Attabad Lake', () => {
    render(
      <Breadcrumbs
        items={destinationTrail({
          name: 'Attabad Lake',
          slug: 'attabad-lake',
          parent: { name: 'Hunza Valley', slug: 'hunza-valley' },
        })}
      />,
    );

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveTextContent(
      'Home/Destinations/Hunza Valley/Attabad Lake',
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'Destinations' })).toHaveAttribute(
      'href',
      '/destinations',
    );
    expect(screen.getByRole('link', { name: 'Hunza Valley' })).toHaveAttribute(
      'href',
      '/destinations/hunza-valley',
    );
    expect(screen.getByText('Attabad Lake')).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.queryByRole('link', { name: 'Attabad Lake' }),
    ).not.toBeInTheDocument();
  });
});

describe('destinationTrail', () => {
  it('stops at the region for destination pages', () => {
    expect(
      destinationTrail({ name: 'Hunza Valley', slug: 'hunza-valley' }),
    ).toEqual([
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Hunza Valley', path: '/destinations/hunza-valley' },
    ]);
  });
});
