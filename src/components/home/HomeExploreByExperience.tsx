import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';
import {
  EXPERIENCE_CATEGORIES,
  experienceHref,
  type ExperienceSlug,
} from '@/data';

function ExperienceIcon({ slug }: { slug: ExperienceSlug }) {
  const common = {
    viewBox: '0 0 24 24',
    className: 'h-6 w-6',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    'aria-hidden': true as const,
  };

  switch (slug) {
    case 'mountains':
      return (
        <svg {...common}>
          <path d="M3 19h18L14.5 6.5 11 12 8.5 8.5 3 19z" />
        </svg>
      );
    case 'valleys':
      return (
        <svg {...common}>
          <path d="M3 7c4 0 4 10 8 10s4-10 8-10" />
          <path d="M3 17h18" />
        </svg>
      );
    case 'lakes':
      return (
        <svg {...common}>
          <path d="M4 14c1.5-1 3-1 4 0s2.5 1 4 0 3-1 4 0 2.5 1 4 0" />
          <path d="M4 18c1.5-1 3-1 4 0s2.5 1 4 0 3-1 4 0 2.5 1 4 0" />
          <path d="M8 6.5C8 8.5 12 11 12 11s4-2.5 4-4.5a4 4 0 1 0-8 0z" />
        </svg>
      );
    case 'trekking':
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.2" />
          <path d="M10 8.5 7.5 13l3 2.2L9 21" />
          <path d="M14 8.5 16 13l-2.2 1.6L17 21" />
        </svg>
      );
    case 'camping':
      return (
        <svg {...common}>
          <path d="M12 4 3 20h18L12 4z" />
          <path d="M12 12v8" />
        </svg>
      );
    case 'forts':
      return (
        <svg {...common}>
          <path d="M4 20V9l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2v11H4z" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case 'polo':
      return (
        <svg {...common}>
          <circle cx="7.5" cy="16" r="2.2" />
          <circle cx="16.5" cy="16.5" r="2.2" />
          <path d="M9.5 15.2 13 8.5l4 2.5" />
          <path d="M13 8.5 11 4" />
        </svg>
      );
    case 'photography':
      return (
        <svg {...common}>
          <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8z" />
          <circle cx="12" cy="13.5" r="3.2" />
        </svg>
      );
  }
}

export function HomeExploreByExperience() {
  return (
    <section className="bg-slate py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">Another Way In</p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          Explore by Experience
        </h2>
        <p className="mt-4 max-w-xl text-ice">
          Skip the map if you already know the kind of journey you want —
          mountains, lakes, forts, polo, or a long walk.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {EXPERIENCE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={experienceHref(category.slug)}
              className="group relative min-h-[220px] overflow-hidden rounded-2xl md:min-h-[260px]"
            >
              <OptimizedImage
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/55 to-scrim/20" />
              <div className="relative flex h-full min-h-[220px] flex-col justify-between p-4 md:min-h-[260px] md:p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ice/30 bg-scrim/40 text-apricot backdrop-blur-sm">
                  <ExperienceIcon slug={category.slug} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-glacier md:text-2xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ice md:text-sm">
                    {category.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
