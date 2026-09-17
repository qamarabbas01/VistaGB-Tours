'use client';

import { useCallback, useState } from 'react';
import InfiniteSentinel from '@/components/InfiniteSentinel';
import Pagination from '@/components/Pagination';
import { NewsFeed } from '@/components/news/NewsFeed';
import { NewsListSkeleton } from '@/components/skeletons';
import type { NewsItem } from '@/lib/news/types';

type Props = {
  items: NewsItem[];
  currentPage: number;
  totalPages: number;
  initialStoryId?: string;
};

export function NewsListing({
  items,
  currentPage,
  totalPages,
  initialStoryId,
}: Props) {
  const [extra, setExtra] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const infinite = currentPage === 1;
  const done = !infinite || page > totalPages;
  const seen = new Set(items.map((item) => item.id));
  const feedItems = [...items, ...extra.filter((item) => !seen.has(item.id))];

  const loadMore = useCallback(async () => {
    if (done || loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/news?page=${page}`);
      if (!response.ok) {
        throw new Error('Could not load more news.');
      }
      const data = (await response.json()) as { items?: NewsItem[] };
      const nextItems = data.items ?? [];
      setExtra((current) => {
        const ids = new Set(current.map((item) => item.id));
        return [...current, ...nextItems.filter((item) => !ids.has(item.id))];
      });
      setPage((current) => current + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not load more news.',
      );
    } finally {
      setLoading(false);
    }
  }, [done, loading, page]);

  return (
    <>
      <NewsFeed items={feedItems} syncUrl initialStoryId={initialStoryId} />

      {infinite && loading ? (
        <div className="mt-6">
          <NewsListSkeleton count={2} />
        </div>
      ) : null}

      {infinite && error ? (
        <div className="mt-6 text-center">
          <p className="text-sm text-ice">{error}</p>
          <button
            type="button"
            onClick={loadMore}
            className="mt-3 text-sm font-medium text-apricot hover:underline"
          >
            Try again
          </button>
        </div>
      ) : null}

      {infinite && !done ? (
        <div className="mt-10 flex flex-col items-center gap-4">
          <InfiniteSentinel onVisible={loadMore} disabled={loading} />
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-full border border-teal/20 px-6 py-2 text-sm font-medium text-ice transition-colors hover:border-apricot/50 hover:text-apricot disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Load more news'}
          </button>
        </div>
      ) : null}

      {!infinite ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/news"
          className="mt-12"
        />
      ) : null}
    </>
  );
}
