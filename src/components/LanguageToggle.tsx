'use client';

import { usePreferences } from '@/components/PreferencesProvider';

export default function LanguageToggle() {
  const { locale, setLocale } = usePreferences();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === 'en' ? 'ur' : 'en')}
      aria-label={locale === 'en' ? 'Switch to Urdu' : 'Switch to English'}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-teal/30 px-2 font-mono text-[0.65rem] tracking-wider text-ice transition-colors hover:border-apricot hover:text-apricot"
    >
      {locale === 'en' ? 'اردو' : 'EN'}
    </button>
  );
}
