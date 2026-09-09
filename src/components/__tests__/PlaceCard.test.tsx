import { screen } from '@testing-library/react';
import PlaceCard from '@/components/PlaceCard';
import { mockPlace, renderWithPreferences } from '@/test-utils';

describe('PlaceCard', () => {
  it('renders place details, travel metadata, activities, and an explore link', () => {
    renderWithPreferences(
      <PlaceCard place={mockPlace} parentName="Test Valley" />,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Town' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Town')).toBeInTheDocument();
    expect(screen.getByText('2,438m')).toBeInTheDocument();
    expect(
      screen.getByText('Test Valley, Gilgit-Baltistan'),
    ).toBeInTheDocument();
    expect(screen.getByText('Best: Apr–Oct')).toBeInTheDocument();
    expect(
      screen.getByText('The main town used in card rendering tests.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Heritage walks')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Test Town' }).getAttribute('src'),
    ).toContain('test-town.jpg');
    expect(screen.getByRole('link', { name: /explore/i })).toHaveAttribute(
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
