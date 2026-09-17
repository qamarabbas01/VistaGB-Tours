import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsFeed } from '@/components/news/NewsFeed';
import type { NewsItem } from '@/lib/news/types';

const replace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/news',
}));

const item: NewsItem = {
  id: '94',
  title: 'Independence Day in GB',
  summary: 'Celebrations across the region.',
  body: 'Celebrations across the region...',
  date: '14 August, 2026',
  time: '10:00:00 AM',
  views: 321,
  image: 'https://visitgilgitbaltistan.gov.pk/public/storage/images/story.jpg',
  url: 'https://visitgilgitbaltistan.gov.pk/public/pages/news/94',
};

describe('NewsFeed', () => {
  beforeEach(() => {
    replace.mockClear();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ...item,
        body: 'Full story from the tourism department.\n\nA second paragraph.',
      }),
    }) as unknown as typeof fetch;
  });

  it('opens a story in a modal instead of leaving the site', async () => {
    render(<NewsFeed items={[item]} />);

    expect(
      screen.queryByRole('link', { name: /independence day/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /independence day in gb/i }),
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveTextContent('Independence Day in GB');
    expect(dialog).toHaveTextContent('14 August, 2026');

    await waitFor(() => {
      expect(dialog).toHaveTextContent(
        'Full story from the tourism department.',
      );
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/news/94');

    fireEvent.click(screen.getByRole('button', { name: 'Close story' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
