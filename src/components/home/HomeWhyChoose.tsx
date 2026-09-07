const reasons = [
  {
    title: 'Local Expertise',
    detail:
      "Our guides are born and raised across Gilgit-Baltistan — they know the trails, the weather, and the families who'll host you.",
    mark: 'G·B',
  },
  {
    title: 'Tailored Itineraries',
    detail:
      'No fixed bus tours. Every route is built around your pace, season, and the valleys you actually want to see.',
    mark: '1:1',
  },
  {
    title: 'Safety First',
    detail:
      'Licensed drivers, vetted lodges, and trip plans that account for landslide season, altitude, and road conditions.',
    mark: '✓',
  },
  {
    title: 'Fair to Communities',
    detail:
      "We work directly with local homestays, porters, and cooks — your trip supports the valleys you're visiting.",
    mark: '%',
  },
] as const;

export function HomeWhyChoose() {
  return (
    <section className="bg-slate py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">Why Travel With Us</p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          Why Choose VistaGB
        </h2>
        <p className="mt-4 max-w-xl text-ice">
          Gilgit-Baltistan rewards travelers who go with people who know it.
          Here&apos;s what that looks like in practice.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-teal/20 bg-teal/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-slate p-8">
              <span className="font-display text-2xl italic text-apricot">
                {reason.mark}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-glacier">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ice">
                {reason.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
