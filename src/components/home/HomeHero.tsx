import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/Button';

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative flex min-h-[85svh] items-center overflow-hidden md:min-h-[92vh]"
    >
      <OptimizedImage
        src="/images/commons/bd7ddfea0e6ee033.jpg"
        alt="Snow-capped peaks of the Karakoram range above Hunza Valley"
        fill
        priority
        sizes="100vw"
        className="hero-media object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim via-scrim/75 to-scrim/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-scrim/70 via-scrim/25 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <p className="coord-label rise-in mb-6">
          35.8°N · 75.5°E · KARAKORAM RANGE
        </p>
        <h1
          id="home-hero-heading"
          className="rise-in rise-in-delay-1 max-w-4xl font-display text-5xl font-semibold leading-[1.08] text-glacier md:text-7xl"
        >
          Discover{' '}
          <span className="mt-2 block text-4xl italic text-apricot md:text-6xl">
            Gilgit-Baltistan
          </span>
        </h1>
        <p className="rise-in rise-in-delay-2 mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ice md:text-lg">
          Explore destinations, plan your journey, discover hidden places, and
          experience the mountains.
        </p>
        <div className="rise-in rise-in-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
          <Button
            href="/destinations"
            className="rounded-full bg-apricot px-8 py-3 text-center text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Explore Destinations
          </Button>
          <Button
            href="/book"
            className="rounded-full border border-ice/40 px-8 py-3 text-center text-sm font-medium text-glacier transition-colors hover:scale-100 hover:border-apricot hover:text-apricot"
          >
            Plan Your Trip
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="altitude-line" />
      </div>
    </section>
  );
}
