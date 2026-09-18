import type { Metadata } from 'next';
import Button from '@/components/Button';
import OptimizedImage from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'Lost in the mountains',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-[70svh] items-center overflow-hidden md:min-h-[78vh]"
    >
      <OptimizedImage
        src="/images/commons/bd7ddfea0e6ee033.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-media object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim via-scrim/75 to-scrim/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-scrim/70 via-scrim/25 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <p className="coord-label mb-6">404</p>
        <h1
          id="not-found-heading"
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.08] text-glacier md:text-6xl"
        >
          Lost in the{' '}
          <span className="mt-2 block text-3xl italic text-apricot md:text-5xl">
            mountains?
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ice md:text-lg">
          We couldn&apos;t find this place.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
          <Button
            href="/destinations"
            className="rounded-full bg-apricot px-8 py-3 text-center text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Explore Destinations
          </Button>
          <Button
            href="/"
            className="rounded-full border border-ice/40 px-8 py-3 text-center text-sm font-medium text-glacier transition-colors hover:scale-100 hover:border-apricot hover:text-apricot"
          >
            Go Home
          </Button>
        </div>
      </div>
    </section>
  );
}
