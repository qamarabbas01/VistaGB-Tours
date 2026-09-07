'use client';

import { useState } from 'react';
import { usePreferences } from '@/components/PreferencesProvider';

type Props = {
  slug: string;
  compact?: boolean;
};

export default function CompareButton({ slug, compact = false }: Props) {
  const { isCompared, toggleCompare, t } = usePreferences();
  const active = isCompared(slug);
  const [full, setFull] = useState(false);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const ok = toggleCompare(slug);
        setFull(!ok);
        if (ok) {
          window.setTimeout(() => setFull(false), 0);
        } else {
          window.setTimeout(() => setFull(false), 1800);
        }
      }}
      aria-pressed={active}
      aria-label={
        full ? t.compare.full : active ? t.compare.added : t.compare.add
      }
      title={full ? t.compare.full : active ? t.compare.added : t.compare.add}
      className={`inline-flex items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
        active
          ? 'border-apricot/70 bg-apricot text-ink'
          : 'border-teal/40 bg-night/70 text-glacier hover:border-apricot hover:text-apricot'
      } ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={compact ? 'h-4 w-4' : 'h-5 w-5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M7 4v16M17 4v16M4 8h6M14 16h6" strokeLinecap="round" />
      </svg>
    </button>
  );
}
