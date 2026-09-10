import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TravelAssistant from '@/components/TravelAssistant';

describe('TravelAssistant', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('greets visitors as a GB travel guide', () => {
    render(<TravelAssistant />);

    expect(
      screen.getByRole('heading', { name: 'Your GB Travel Guide' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ask me anything about travelling through Gilgit-Baltistan.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Plan a trip' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Best places' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Budget trip' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'What should I pack?' }),
    ).toBeInTheDocument();
  });

  it('asks about Hunza when that destination is in focus', () => {
    render(
      <TravelAssistant
        destinationSlug="hunza-valley"
        destinationName="Hunza Valley"
      />,
    );

    expect(screen.getByText('Ask about Hunza')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Plan my Hunza trip' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Best places nearby' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '3-day itinerary' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Best time to visit' }),
    ).toBeInTheDocument();
  });

  it('sends the Hunza planning prompt from the suggestion chip', async () => {
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
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Plan my Hunza trip' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }];
    const payload = JSON.parse(init.body) as {
      destinationSlug: string;
      messages: { content: string }[];
    };
    expect(payload.destinationSlug).toBe('hunza-valley');
    expect(payload.messages[0].content).toBe('Help me plan a trip to Hunza.');
  });
});
