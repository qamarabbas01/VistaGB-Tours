"use client";

import { useCallback, useState } from "react";
import InfiniteSentinel from "@/components/InfiniteSentinel";
import NewsCard from "@/components/NewsCard";
import { NewsListSkeleton } from "@/components/skeletons";
import type { NewsItem } from "@/lib/news/types";

type Props = {
  nextPage: number;
  totalPages: number;
};

export default function NewsInfiniteRest({ nextPage, totalPages }: Props) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(nextPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const done = page > totalPages;

  const loadMore = useCallback(async () => {
    if (done || loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/news?page=${page}`);
      if (!response.ok) {
        throw new Error("Could not load more news.");
      }
      const data = (await response.json()) as { items?: NewsItem[] };
      const nextItems = data.items ?? [];
      setItems((current) => {
        const seen = new Set(current.map((item) => item.id));
        return [...current, ...nextItems.filter((item) => !seen.has(item.id))];
      });
      setPage((current) => current + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load more news.");
    } finally {
      setLoading(false);
    }
  }, [done, loading, page]);

  if (nextPage > totalPages) return null;

  return (
    <>
      {items.length > 0 ? (
        <div className="mt-6 flex flex-col gap-6">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6">
          <NewsListSkeleton count={2} />
        </div>
      ) : null}

      {error ? <p className="mt-6 text-center text-sm text-ice">{error}</p> : null}

      {!done ? (
        <div className="mt-10 flex flex-col items-center gap-4">
          <InfiniteSentinel onVisible={loadMore} disabled={loading} />
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-full border border-teal/20 px-6 py-2 text-sm font-medium text-ice transition-colors hover:border-apricot/50 hover:text-apricot disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load more news"}
          </button>
        </div>
      ) : null}
    </>
  );
}
