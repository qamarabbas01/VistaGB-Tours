import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

describe('NotFound', () => {
  it('offers a mountain-trail 404 with destinations and home', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /lost in the mountains\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we couldn't find this place/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Explore Destinations' }),
    ).toHaveAttribute('href', '/destinations');
    expect(screen.getByRole('link', { name: 'Go Home' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
