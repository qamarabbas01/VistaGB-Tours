import { render, screen, waitFor } from '@testing-library/react';
import TravelAssistant from '@/components/TravelAssistant';

describe('TravelAssistant', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('sends the inbound destination planning prompt', async () => {
    Element.prototype.scrollIntoView = jest.fn();
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      body: {
        getReader: () => ({
          read: async () => ({ done: true, value: undefined }),
        }),
      },
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(
      <TravelAssistant
        destinationSlug="hunza-valley"
        destinationName="Hunza Valley"
        initialPrompt="Help me plan a trip to Hunza."
      />,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }];
    const payload = JSON.parse(init.body) as {
      destinationSlug: string;
      messages: { content: string }[];
    };
    expect(payload.destinationSlug).toBe('hunza-valley');
    expect(payload.messages[0].content).toBe(
      'Help me plan a trip to Hunza.',
    );
    expect(
      screen.getByText('Help me plan a trip to Hunza.'),
    ).toBeInTheDocument();
  });
});
