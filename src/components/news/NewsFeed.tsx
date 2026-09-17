'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { NewsModal } from '@/components/news/NewsModal';
import type { NewsItem } from '@/lib/news/types';

type Props = {
  items: readonly NewsItem[];
  layout?: 'row' | 'tile';
  syncUrl?: boolean;
  initialStoryId?: string;
};

export function NewsFeed({
  items,
  layout = 'row',
  syncUrl = false,
  initialStoryId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (!initialStoryId) return;
    const match = items.find((item) => item.id === initialStoryId);
    if (match) {
      setOpenItem(match);
      return;
    }

    let cancelled = false;
    fetch(`/api/news/${initialStoryId}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: NewsItem | null) => {
        if (!cancelled && payload) setOpenItem(payload);
      })
      .catch(() => {
        /* Story may have been removed. */
      });

    return () => {
      cancelled = true;
    };
  }, [items, initialStoryId]);

  const replaceQuery = useCallback(
    (story?: string) => {
      if (!syncUrl || typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      if (story) params.set('story', story);
      else params.delete('story');
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, syncUrl],
  );

  function open(item: NewsItem) {
    setOpenItem(item);
    replaceQuery(item.id);
  }

  function close() {
    setOpenItem(null);
    replaceQuery();
  }

  const grid =
    layout === 'tile'
      ? 'grid gap-8 md:grid-cols-3'
      : 'flex flex-col gap-5 md:gap-6';

  return (
    <>
      <div className={grid}>
        {items.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            onOpen={open}
            layout={layout}
            headingLevel={layout === 'tile' ? 'h3' : 'h2'}
          />
        ))}
      </div>
      {openItem ? <NewsModal item={openItem} onClose={close} /> : null}
    </>
  );
}
