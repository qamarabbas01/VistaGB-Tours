import Button from '@/components/Button';
import { LazyFaqAccordion } from '@/components/lazy/FaqAccordion';
import type { faqs } from '@/data/hero';

type Faq = (typeof faqs)[number];

export function HomeFaq({ items }: { items: readonly Faq[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="coord-label mb-3">Before You Go</p>
        <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-ice">
          Practical answers for planning your first Gilgit-Baltistan trip.
        </p>
        <div className="mt-12">
          <LazyFaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-slate py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top, rgba(217,142,74,0.18), transparent 55%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="coord-label mb-4">Ready When You Are</p>
        <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
          Your journey through the Karakoram starts with one message.
        </h2>
        <p className="mt-4 text-ice">
          Tell us your dates and the valleys you&apos;re curious about —
          we&apos;ll build a route around them.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/book"
            className="inline-block rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Request dates
          </Button>
          <Button
            href="/destinations"
            className="inline-block rounded-full border border-ice/40 px-8 py-3 text-sm font-medium text-glacier transition-colors hover:border-apricot hover:text-apricot"
          >
            Browse Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
