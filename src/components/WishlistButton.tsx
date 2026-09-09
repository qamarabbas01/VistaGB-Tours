'use client';

import { usePreferences } from '@/components/PreferencesProvider';

type Props = {
  slug: string;
  compact?: boolean;
  labeled?: boolean;
};

export default function WishlistButton({
  slug,
  compact = false,
  labeled = false,
}: Props) {
  const { isWishlisted, toggleWishlist, t } = usePreferences();
  const saved = isWishlisted(slug);
  const iconSize = compact ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? t.wishlist.saved : t.wishlist.save}
      title={saved ? t.wishlist.saved : t.wishlist.save}
      className={`inline-flex items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
        saved
          ? 'border-apricot/70 bg-apricot text-ink'
          : 'border-teal/40 bg-night/70 text-glacier hover:border-apricot hover:text-apricot'
      } ${
        labeled
          ? 'gap-2 px-4 py-2 text-sm'
          : compact
            ? 'h-9 w-9'
            : 'h-10 w-10'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={iconSize}
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M12 21s-6.2-4.35-9.15-8.4C.9 10.05 1.2 6.6 3.75 5.1 6.05 3.75 8.55 4.5 12 7.35 15.45 4.5 17.95 3.75 20.25 5.1c2.55 1.5 2.85 4.95.9 7.5C18.2 16.65 12 21 12 21z" />
      </svg>
      {labeled ? <span>{saved ? 'Saved' : 'Save'}</span> : null}
    </button>
  );
}
