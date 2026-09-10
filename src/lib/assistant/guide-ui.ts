export type GuideSuggestion = {
  label: string;
  prompt: string;
};

export type AssistantGuideCopy = {
  title: string;
  intro: string;
  placeholder: string;
  suggestions: GuideSuggestion[];
};

export function guidePlaceName(name: string) {
  return name.replace(/\s+Valley$/i, '').trim();
}

export function assistantGuideCopy(
  destinationName?: string,
): AssistantGuideCopy {
  const title = 'Your GB Travel Guide';

  if (destinationName?.trim()) {
    const place = guidePlaceName(destinationName);
    return {
      title,
      intro: `Ask about ${place}`,
      placeholder: `Ask about ${place}`,
      suggestions: [
        {
          label: `Plan my ${place} trip`,
          prompt: `Help me plan a trip to ${place}.`,
        },
        {
          label: 'Best places nearby',
          prompt: `What are the best places near ${place}?`,
        },
        {
          label: '3-day itinerary',
          prompt: `Give me a 3-day itinerary for ${place}.`,
        },
        {
          label: 'Best time to visit',
          prompt: `When is the best time to visit ${place}?`,
        },
      ],
    };
  }

  return {
    title,
    intro: 'Ask me anything about travelling through Gilgit-Baltistan.',
    placeholder: 'Ask me anything about travelling through Gilgit-Baltistan.',
    suggestions: [
      {
        label: 'Plan a trip',
        prompt: 'Help me plan a trip through Gilgit-Baltistan.',
      },
      {
        label: 'Best places',
        prompt: 'What are the best places to visit in Gilgit-Baltistan?',
      },
      {
        label: 'Budget trip',
        prompt: 'Help me plan a budget trip through Gilgit-Baltistan.',
      },
      {
        label: 'What should I pack?',
        prompt: 'What should I pack for a trip to Gilgit-Baltistan?',
      },
    ],
  };
}
