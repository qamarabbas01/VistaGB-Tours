import { render, screen } from '@testing-library/react';
import { PlanTripCta } from '@/components/PlanTripCta';

describe('PlanTripCta', () => {
  it('floats a destination planning link into the assistant', () => {
    render(<PlanTripCta slug="hunza-valley" name="Hunza Valley" />);

    const cta = screen.getByRole('link', { name: /plan a trip to hunza/i });
    expect(cta).toHaveAttribute(
      'href',
      '/assistant?destination=hunza-valley&prompt=Help+me+plan+a+trip+to+Hunza.',
    );
    expect(cta.className).toMatch(/\bfixed\b/);
  });
});
