'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LOCALE_META, messages, type Locale, type Messages } from '@/lib/i18n';
import type { CurrencyCode } from '@/lib/currency';

export type ThemeMode = 'dark' | 'light';

const THEME_KEY = 'vistagb-theme';
const LOCALE_KEY = 'vistagb-locale';
const WISHLIST_KEY = 'vistagb-wishlist';
const COMPARE_KEY = 'vistagb-compare';
const CURRENCY_KEY = 'vistagb-currency';
const MAX_COMPARE = 3;

type PreferencesContextValue = {
  ready: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  wishlist: string[];
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
  compare: string[];
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => boolean;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function readList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute('data-theme', theme);
}

function applyLocale(locale: Locale) {
  const meta = LOCALE_META[locale];
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
  document.documentElement.setAttribute('data-locale', locale);
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [locale, setLocaleState] = useState<Locale>('en');
  const [currency, setCurrencyState] = useState<CurrencyCode>('PKR');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const storedLocale = localStorage.getItem(LOCALE_KEY);
    const storedCurrency = localStorage.getItem(CURRENCY_KEY);

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } else {
      applyTheme('dark');
    }

    if (storedLocale === 'en' || storedLocale === 'ur') {
      setLocaleState(storedLocale);
      applyLocale(storedLocale);
    }

    if (
      storedCurrency === 'PKR' ||
      storedCurrency === 'USD' ||
      storedCurrency === 'EUR' ||
      storedCurrency === 'GBP'
    ) {
      setCurrencyState(storedCurrency);
    }

    setWishlist(readList(WISHLIST_KEY));
    setCompare(readList(COMPARE_KEY).slice(0, MAX_COMPARE));
    setReady(true);
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_KEY, next);
    applyLocale(next);
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    localStorage.setItem(CURRENCY_KEY, next);
  }, []);

  const isWishlisted = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist],
  );

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isCompared = useCallback(
    (slug: string) => compare.includes(slug),
    [compare],
  );

  const toggleCompare = useCallback((slug: string) => {
    let accepted = true;
    setCompare((current) => {
      if (current.includes(slug)) {
        const next = current.filter((item) => item !== slug);
        localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
        return next;
      }
      if (current.length >= MAX_COMPARE) {
        accepted = false;
        return current;
      }
      const next = [...current, slug];
      localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      return next;
    });
    return accepted;
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      ready,
      theme,
      setTheme,
      locale,
      setLocale,
      t: messages[locale],
      currency,
      setCurrency,
      wishlist,
      isWishlisted,
      toggleWishlist,
      compare,
      isCompared,
      toggleCompare,
    }),
    [
      ready,
      theme,
      setTheme,
      locale,
      setLocale,
      currency,
      setCurrency,
      wishlist,
      isWishlisted,
      toggleWishlist,
      compare,
      isCompared,
      toggleCompare,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
}
