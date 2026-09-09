import { render, screen } from '@testing-library/react';
import { DestinationSectionNav } from '@/components/DestinationSectionNav';

describe('DestinationSectionNav', () => {
  it('renders section links and stays out of the way on short pages', () => {
    const { rerender } = render(
      <DestinationSectionNav
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'places', label: 'Places' },
          { id: 'weather', label: 'Weather' },
        ]}
      />,
    );

    const nav = screen.getByRole('navigation', { name: 'On this page' });
    expect(nav.className).toMatch(/sticky/);
    expect(nav.className).not.toMatch(/\bfixed\b/);
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'href',
      '#overview',
    );
    expect(screen.getByRole('link', { name: 'Places' })).toHaveAttribute(
      'href',
      '#places',
    );

    rerender(
      <DestinationSectionNav items={[{ id: 'overview', label: 'Overview' }]} />,
    );
    expect(
      screen.queryByRole('navigation', { name: 'On this page' }),
    ).not.toBeInTheDocument();
  });
});
