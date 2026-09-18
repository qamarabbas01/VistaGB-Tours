export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Places', href: '/destinations/hunza-valley#places' },
      { label: 'Tours', href: '/#packages' },
      { label: 'Guides', href: '/destinations/hunza-valley#guide' },
      { label: 'Map', href: '/#map' },
    ],
  },
  {
    title: 'Plan',
    links: [
      { label: 'Trip Planner', href: '/plan' },
      { label: 'AI Travel Guide', href: '/assistant' },
      { label: 'Weather', href: '/destinations/hunza-valley#weather' },
      { label: 'Travel Information', href: '/alerts' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/news' },
      { label: 'Gallery', href: '/#gallery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
