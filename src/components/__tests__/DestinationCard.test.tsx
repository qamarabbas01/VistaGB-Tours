import { screen } from '@testing-library/react';
import DestinationCard from '@/components/DestinationCard';
import { mockPlace, mockRegion, renderWithPreferences } from '@/test-utils';

jest.mock('@/data', () => ({
  isPlace: (location: { parentSlug?: string }) => 'parentSlug' in location,
  getParentRegion: (place: { parentSlug: string }) =>
    place.parentSlug === 'test-valley' ? { name: 'Test Valley' } : undefined,
}));

describe('DestinationCard', () => {
  it('renders a region destination with travel metadata and nested place count', () => {
    renderWithPreferences(<DestinationCard location={mockRegion} />);

    expect(
      screen.getByRole('heading', { name: 'Test Valley' }),
    ).toBeInTheDocument();
    expect(screen.getByText('2,400m')).toBeInTheDocument();
    expect(screen.getByText('Test, Gilgit-Baltistan')).toBeInTheDocument();
    expect(screen.getByText('Best: Apr–Oct')).toBeInTheDocument();
    expect(
      screen.getByText('Terraced orchards and glacial peaks for tests.'),
    ).toBeInTheDocument();
    expect(screen.getByText('2 places inside')).toBeInTheDocument();
    expect(screen.getByText('Explore →')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Test Valley' }).getAttribute('src'),
    ).toContain('test-valley.jpg');

    expect(screen.getByRole('link', { name: /test valley/i })).toHaveAttribute(
      'href',
      '/destinations/test-valley',
    );
    expect(
      screen.getByRole('button', { name: /save to wishlist/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add to compare/i }),
    ).toBeInTheDocument();
  });

  it('renders a place destination with its parent region and without compare', () => {
    renderWithPreferences(<DestinationCard location={mockPlace} />);

    expect(
      screen.getByRole('heading', { name: 'Test Town' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Town')).toBeInTheDocument();
    expect(screen.getByText('2,438m')).toBeInTheDocument();
    expect(
      screen.getByText('Test Valley, Gilgit-Baltistan'),
    ).toBeInTheDocument();
    expect(screen.getByText('Best: Apr–Oct')).toBeInTheDocument();
    expect(screen.queryByText(/places inside/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /add to compare/i }),
    ).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: /test town/i })).toHaveAttribute(
      'href',
      '/destinations/test-town',
    );
  });
});
