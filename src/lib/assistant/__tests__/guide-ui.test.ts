import { assistantGuideCopy, guidePlaceName } from '@/lib/assistant/guide-ui';

describe('assistantGuideCopy', () => {
  it('introduces a GB travel guide with four planning prompts', () => {
    const copy = assistantGuideCopy();
    expect(copy.title).toBe('Your GB Travel Guide');
    expect(copy.intro).toBe(
      'Ask me anything about travelling through Gilgit-Baltistan.',
    );
    expect(copy.suggestions.map((item) => item.label)).toEqual([
      'Plan a trip',
      'Best places',
      'Budget trip',
      'What should I pack?',
    ]);
  });

  it('narrows the guide to Hunza when a destination is in focus', () => {
    expect(guidePlaceName('Hunza Valley')).toBe('Hunza');
    expect(guidePlaceName('Karimabad')).toBe('Karimabad');

    const copy = assistantGuideCopy('Hunza Valley');
    expect(copy.intro).toBe('Ask about Hunza');
    expect(copy.suggestions.map((item) => item.label)).toEqual([
      'Plan my Hunza trip',
      'Best places nearby',
      '3-day itinerary',
      'Best time to visit',
    ]);
    expect(copy.suggestions[0].prompt).toBe('Help me plan a trip to Hunza.');
  });
});
