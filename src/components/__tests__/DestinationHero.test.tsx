import { screen } from '@testing-library/react';
import { DestinationHero } from '@/components/DestinationHero';
import { renderWithPreferences } from '@/test-utils';

describe('DestinationHero', () => {
  it('leads with back link, title, huge media, and trip actions', () => {
    renderWithPreferences(
      <DestinationHero
        slug="hunza-valley"
        name="Hunza Valley"
        tagline="Terraced orchards beneath Rakaposhi"
        image="/images/commons/bd7ddfea0e6ee033.jpg"
        location="Hunza"
        altitude="2,438M"
        addToTripHref="/plan?region=hunza-valley"
      />,
    );

    expect(
      screen.getByRole('link', { name: /back to destinations/i }),
    ).toHaveAttribute('href', '/destinations');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Hunza Valley' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Hunza Valley' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Hunza, Gilgit-Baltistan')).toBeInTheDocument();
    expect(screen.getByText('2,438m')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Add to Trip' }),
    ).toHaveAttribute('href', '/plan?region=hunza-valley');
    expect(screen.getByRole('button', { name: /save to wishlist/i })).toHaveTextContent(
      'Save',
    );
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
    expect(screen.getByLabelText(/out of 5/i)).toBeInTheDocument();
  });
});
