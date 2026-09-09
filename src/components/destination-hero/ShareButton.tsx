'use client';

import { useState } from 'react';

type Props = {
  title: string;
};

export function ShareButton({ title }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-night/70 px-4 py-2 text-sm text-glacier backdrop-blur-md transition-colors hover:border-apricot hover:text-apricot"
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="18" cy="5" r="2.4" />
        <circle cx="6" cy="12" r="2.4" />
        <circle cx="18" cy="19" r="2.4" />
        <path d="M8.2 10.8 15.7 6.4M8.2 13.2 15.7 17.6" strokeLinecap="round" />
      </svg>
      {copied ? 'Copied' : 'Share'}
    </button>
  );
}
