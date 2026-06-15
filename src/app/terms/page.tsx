export const metadata = {
  title: "Terms of Service — VistaGB Tours",
};

export default function TermsPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Legal</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-2xl text-ice">
            Terms governing use of this website and booking travel services with
            VistaGB Tours.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-sm leading-relaxed text-ice md:px-10">
          <p>
            By using this website or engaging our services, you agree to these
            terms. Trip itineraries, pricing, and inclusions are confirmed in
            writing before departure and may vary based on season, road
            conditions, and group size.
          </p>
          <p>
            Mountain travel carries inherent risks including altitude, weather,
            and road closures. Clients are responsible for appropriate travel
            insurance, valid identification, and any permits required for their
            itinerary.
          </p>
          <p>
            Cancellation and refund policies are provided at the time of booking.
            For questions, contact{" "}
            <a
              href="mailto:hello@vistagbtours.pk"
              className="text-apricot hover:underline"
            >
              hello@vistagbtours.pk
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
