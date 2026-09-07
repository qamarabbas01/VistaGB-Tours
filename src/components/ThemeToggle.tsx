'use client';

import { usePreferences } from '@/components/PreferencesProvider';

export default function ThemeToggle() {
  const { theme, setTheme, t } = usePreferences();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={next === 'light' ? t.theme.light : t.theme.dark}
      title={next === 'light' ? t.theme.light : t.theme.dark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-ice transition-colors hover:border-apricot hover:text-apricot"
    >
      {theme === 'dark' ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2 4.8 4.8M19.2 19.2l-1.4-1.4M6.2 17.8 4.8 19.2M19.2 4.8l-1.4 1.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path
            d="M18 13.5A6.5 6.5 0 1 1 10.5 6 5.2 5.2 0 0 0 18 13.5z"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
