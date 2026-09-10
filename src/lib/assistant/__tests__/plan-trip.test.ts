import { planTripHref, planTripPrompt, tripPlaceName } from '@/lib/assistant/plan-trip';

describe('plan-trip helpers', () => {
  it('shortens valley names for the Hunza-style CTA copy', () => {
    expect(tripPlaceName('Hunza Valley')).toBe('Hunza');
    expect(tripPlaceName('Karimabad')).toBe('Karimabad');
    expect(planTripPrompt('Hunza Valley')).toBe(
      'Help me plan a trip to Hunza.',
    );
  });

  it('opens the assistant focused on that destination and prompt', () => {
    expect(planTripHref('hunza-valley', 'Hunza Valley')).toBe(
      '/assistant?destination=hunza-valley&prompt=Help+me+plan+a+trip+to+Hunza.',
    );
  });
});
