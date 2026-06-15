export const metadata = {
  title: "About Us — VistaGB Tours",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Who We Are</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            About VistaGB Tours
          </h1>
          <p className="mt-4 max-w-2xl text-ice">
            We are a Skardu-based travel operator rooted in Gilgit-Baltistan —
            guiding travelers through the Karakoram with local knowledge, fair
            partnerships, and routes built around the valleys you want to see.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="text-sm leading-relaxed text-ice">
            VistaGB Tours was founded by guides and drivers who grew up along
            the Karakoram Highway. We arrange custom road trips, treks,
            homestays, and logistics across Hunza, Baltistan, Diamer, and the
            high valleys of northern Pakistan.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-ice">
            Every itinerary is tailored — no fixed bus tours. We work directly
            with local families, porters, and lodges so your trip supports the
            communities you visit.
          </p>
        </div>
      </section>
    </div>
  );
}
