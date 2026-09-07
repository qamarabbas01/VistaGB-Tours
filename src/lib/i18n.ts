export const LOCALES = ['en', 'ur'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { label: string; htmlLang: string; dir: 'ltr' | 'rtl' }
> = {
  en: { label: 'EN', htmlLang: 'en', dir: 'ltr' },
  ur: { label: 'اردو', htmlLang: 'ur', dir: 'rtl' },
};

const en = {
  nav: {
    home: 'Home',
    destinations: 'Destinations',
    tools: 'Tools',
    assistant: 'Assistant',
    about: 'About',
    blog: 'Blog',
    news: 'News',
    contact: 'Contact',
    planTrip: 'Plan a Trip',
    wishlist: 'Wishlist',
    menu: 'Toggle menu',
  },
  theme: {
    light: 'Light theme',
    dark: 'Dark theme',
  },
  wishlist: {
    save: 'Save to wishlist',
    saved: 'Saved to wishlist',
    empty: 'No saved destinations yet.',
    browse: 'Browse destinations',
  },
  compare: {
    add: 'Add to compare',
    added: 'In compare list',
    full: 'Compare list is full (3 destinations)',
  },
  chat: {
    open: 'Open live chat',
    close: 'Close chat',
    title: 'Live chat',
  },
  alerts: {
    label: 'Travel alerts',
    more: 'Road status & alerts',
  },
  common: {
    print: 'Print / save PDF',
    book: 'Request to book',
  },
};

const ur: typeof en = {
  nav: {
    home: 'ہوم',
    destinations: 'مقامات',
    tools: 'ٹولز',
    assistant: 'اسسٹنٹ',
    about: 'ہمارے بارے',
    blog: 'بلاگ',
    news: 'خبریں',
    contact: 'رابطہ',
    planTrip: 'سفر کی منصوبہ بندی',
    wishlist: 'پسندیدہ',
    menu: 'مینو',
  },
  theme: {
    light: 'روشن تھیم',
    dark: 'تاریک تھیم',
  },
  wishlist: {
    save: 'پسندیدہ میں شامل کریں',
    saved: 'پسندیدہ میں محفوظ',
    empty: 'ابھی کوئی مقام محفوظ نہیں۔',
    browse: 'مقامات دیکھیں',
  },
  compare: {
    add: 'موازنہ میں شامل کریں',
    added: 'موازنہ کی فہرست میں',
    full: 'موازنہ کی فہرست بھری ہوئی ہے (۳ مقامات)',
  },
  chat: {
    open: 'لائیو چیٹ کھولیں',
    close: 'چیٹ بند کریں',
    title: 'لائیو چیٹ',
  },
  alerts: {
    label: 'سفر کی اطلاعات',
    more: 'سڑک کی صورتحال',
  },
  common: {
    print: 'پرنٹ / پی ڈی ایف',
    book: 'بکنگ کی درخواست',
  },
};

export const messages: Record<Locale, typeof en> = { en, ur };

export type Messages = typeof en;
