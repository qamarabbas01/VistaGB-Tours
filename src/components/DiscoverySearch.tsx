'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  DISCOVERY_SUGGESTIONS,
  searchDiscovery,
  type DiscoveryHit,
} from '@/lib/search/discovery';
import type { NewsItem } from '@/lib/news/types';

type Props = {
  defaultQuery?: string;
  newsItems?: Pick<NewsItem, 'id' | 'title' | 'summary' | 'url'>[];
};

export function DiscoverySearch({ defaultQuery = '', newsItems }: Props) {
  const router = useRouter();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [news, setNews] = useState<
    Pick<NewsItem, 'id' | 'title' | 'summary' | 'url'>[]
  >(newsItems ?? []);

  useEffect(() => {
    if (newsItems) {
      setNews(newsItems);
      return;
    }

    let cancelled = false;
    fetch('/api/news?page=1')
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { items?: NewsItem[] } | null) => {
        if (!cancelled && payload?.items) setNews(payload.items);
      })
      .catch(() => {
        /* News is optional in the dropdown. */
      });

    return () => {
      cancelled = true;
    };
  }, [newsItems]);

  const results = useMemo(
    () => searchDiscovery(query, news),
    [query, news],
  );
  const showPanel = open && query.trim().length > 0;
  const hits = results.hits;
  const activeHit = hits[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      event.currentTarget.blur();
      return;
    }

    if (event.key === 'Enter' && showPanel && activeHit) {
      event.preventDefault();
      followHit(activeHit);
      return;
    }

    if (!showPanel) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (hits.length === 0) return;
      setActiveIndex((index) => (index + 1) % hits.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (hits.length === 0) return;
      setActiveIndex((index) => (index - 1 + hits.length) % hits.length);
    }
  }

  function followHit(hit: DiscoveryHit) {
    setOpen(false);
    if (hit.external) {
      window.open(hit.href, '_blank', 'noopener,noreferrer');
      return;
    }
    router.push(hit.href);
  }

  return (
    <div ref={rootRef} className="relative mt-8 max-w-3xl">
      <form
        action="/destinations"
        method="get"
        role="search"
        className="flex flex-col gap-2 rounded-2xl border border-teal/30 bg-night/70 p-2 shadow-2xl shadow-black/10 transition-colors focus-within:border-apricot/70 sm:flex-row"
      >
        <label htmlFor="destination-search" className="sr-only">
          Search VistaGB
        </label>
        <input
          id="destination-search"
          name="q"
          type="search"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-activedescendant={
            showPanel && activeHit ? activeHit.id : undefined
          }
          value={query}
          maxLength={120}
          placeholder="Search VistaGB..."
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 appearance-none bg-transparent px-4 py-3 text-glacier outline-none placeholder:text-ice/60"
        />
        <button
          type="submit"
          className="rounded-xl bg-apricot px-7 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
        >
          Search
        </button>
      </form>

      {showPanel ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-40 mt-2 max-h-[min(28rem,70vh)] w-full overflow-y-auto rounded-2xl border border-teal/30 bg-slate py-3 shadow-2xl shadow-black/30"
        >
          {hits.length === 0 ? (
            <div className="px-5 py-6 text-center">
              <p className="font-display text-lg font-semibold text-glacier">
                No places found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-2 text-sm text-ice">Try one of these instead:</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {DISCOVERY_SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion.href}>
                    <Link
                      href={suggestion.href}
                      className="inline-flex rounded-full border border-teal/40 px-3.5 py-1.5 text-sm text-glacier transition-colors hover:border-apricot hover:text-apricot"
                    >
                      {suggestion.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            results.groups.map((group) => (
              <div key={group.name} className="px-2 py-1">
                <p className="coord-label px-3 pb-1.5 pt-2">{group.name}</p>
                <ul>
                  {group.hits.map((hit) => {
                    const selected = activeHit?.id === hit.id;
                    return (
                      <li key={hit.id}>
                        <Link
                          id={hit.id}
                          role="option"
                          aria-selected={selected}
                          href={hit.href}
                          target={hit.external ? '_blank' : undefined}
                          rel={hit.external ? 'noopener noreferrer' : undefined}
                          onMouseEnter={() =>
                            setActiveIndex(hits.findIndex((item) => item.id === hit.id))
                          }
                          onClick={() => setOpen(false)}
                          className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                            selected
                              ? 'bg-apricot/15 text-glacier'
                              : 'text-ice hover:bg-night/50 hover:text-glacier'
                          }`}
                        >
                          {hit.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
