'use client';

import Link from 'next/link';
import { NewsFeed } from '@/components/news/NewsFeed';
import type { NewsItem } from '@/lib/news/types';

export function HomeNews({ items }: { items: readonly NewsItem[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="coord-label mb-3">Regional Updates</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              Latest News
            </h2>
            <p className="mt-4 max-w-xl text-ice">
              Festivals, events, and developments from across Gilgit-Baltistan.
            </p>
          </div>
          <Link
            href="/news"
            className="text-sm font-medium text-apricot hover:underline"
          >
            All news →
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="mt-14">
            <NewsFeed items={items} layout="tile" />
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-teal/20 bg-slate p-10 text-center">
            <p className="text-ice">
              News is temporarily unavailable.{' '}
              <Link href="/news" className="text-apricot hover:underline">
                Try the news page
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
