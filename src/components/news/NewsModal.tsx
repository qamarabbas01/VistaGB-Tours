'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { NewsImage } from '@/components/news/NewsImage';
import { NewsArticleSkeleton } from '@/components/skeletons';
import type { NewsItem } from '@/lib/news/types';

type Props = {
  item: NewsItem;
  onClose: () => void;
};

function paragraphsFrom(item: NewsItem): string[] {
  const source = item.body?.trim() || item.summary;
  if (!source) return [];
  return source
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function NewsModal({ item, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [story, setStory] = useState(item);
  const [loading, setLoading] = useState(
    !item.body || item.body.endsWith('...'),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStory(item);
    setError(null);
    setLoading(!item.body || item.body.endsWith('...'));
  }, [item]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!/^\d+$/.test(item.id)) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/news/${item.id}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: NewsItem) => {
        if (!cancelled) {
          setStory(payload);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Full story could not be loaded just now.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [item.id]);

  const paragraphs = paragraphsFrom(story);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-night/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-teal/20 bg-slate shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-teal/20 px-5 py-4 md:px-8">
          <p className="coord-label pt-1">News</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-teal/30 px-4 py-2 text-sm text-ice transition-colors hover:border-apricot/50 hover:text-apricot"
            aria-label="Close story"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          <p className="coord-label mb-3">
            {story.date}
            {story.time ? ` · ${story.time}` : ''}
            {story.views > 0 ? ` · ${story.views.toLocaleString()} views` : ''}
          </p>
          <h2
            id={titleId}
            className="font-display text-2xl font-semibold leading-snug text-glacier md:text-3xl"
          >
            {story.title}
          </h2>

          {story.image ? (
            <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-teal/15 bg-night">
              <NewsImage
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                priority
              />
            </div>
          ) : null}

          {loading && paragraphs.length === 0 ? <NewsArticleSkeleton /> : null}

          {paragraphs.length > 0 ? (
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ice md:text-base">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {error ? <p className="mt-4 text-sm text-ice">{error}</p> : null}

          {story.url ? (
            <p className="mt-8 text-xs text-ice/70">
              Source:{' '}
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-apricot hover:underline"
              >
                Gilgit-Baltistan Tourism Department
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
