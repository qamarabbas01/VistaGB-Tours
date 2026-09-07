import { screen } from '@testing-library/react';
import PlaceCard from '@/components/PlaceCard';
import { mockPlace, renderWithPreferences } from '@/test-utils';

describe('PlaceCard', () => {
  it('renders place details, parent region, activities, and a details link', () => {
    renderWithPreferences(
      <PlaceCard place={mockPlace} parentName="Test Valley" />,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Town' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Town')).toBeInTheDocument();
    expect(screen.getByText('Test Valley · ALT 2,438M')).toBeInTheDocument();
    expect(screen.getByText('A bazaar beneath the peaks')).toBeInTheDocument();
    expect(
      screen.getByText('The main town used in card rendering tests.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Heritage walks')).toBeInTheDocument();
    expect(screen.getByText('1–3 days')).toBeInTheDocument();
    expect(screen.getByText('April–October')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Test Town' }).getAttribute('src'),
    ).toContain('test-town.jpg');
    expect(screen.getByRole('link', { name: /open details/i })).toHaveAttribute(
      'href',
      '/destinations/test-town',
    );
    expect(
      screen.getByRole('button', { name: /save to wishlist/i }),
    ).toBeInTheDocument();
  });

  it('hides activity chips in compact mode', () => {
    renderWithPreferences(
      <PlaceCard place={mockPlace} parentName="Test Valley" compact />,
    );

    expect(screen.queryByText('Heritage walks')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Test Town' }),
    ).toBeInTheDocument();
  });
});
