import { contact } from "@/config/contact";

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
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-sm leading-relaxed text-ice md:px-10">
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
              href={`mailto:${contact.email}`}
              className="text-apricot hover:underline"
            >
              {contact.email}
            </a>
            .
          </p>
          <h2 className="mt-10 font-display text-base font-semibold text-glacier">
            Booking & Payment
          </h2>
          <p>
            Bookings are only confirmed upon receipt of a deposit, as stated in your trip proposal.
            Final payment schedules and methods will be detailed in your booking confirmation. Failure to pay
            remaining balances by the specified deadline may result in cancellation of your trip and forfeiture of your deposit.
          </p>
          <h2 className="mt-8 font-display text-base font-semibold text-glacier">
            Changes & Cancellations by VistaGB Tours
          </h2>
          <p>
            In rare cases, we may have to modify itineraries due to operational requirements,
            weather, road conditions, government travel advisories, or circumstances beyond our control.
            We will do our utmost to offer a comparable experience or alternative dates. If we cancel your trip due to unforeseen events
            (e.g. natural disasters, political unrest), you will be entitled to a refund of recoverable costs, minus incurred expenses.
          </p>
          <h2 className="mt-8 font-display text-base font-semibold text-glacier">
            Client Responsibilities
          </h2>
          <p>
            Clients must provide accurate information on health, dietary needs, and personal circumstances that may impact travel.
            You are responsible for complying with local laws, customs, and respecting the environment and communities visited.
            Any disruption caused by failure to follow local or guide instructions may result in removal from the tour without refund.
          </p>
          <h2 className="mt-8 font-display text-base font-semibold text-glacier">
            Liability Waiver
          </h2>
          <p>
            By travelling with us, you acknowledge that adventure travel involves potential hazards.
            VistaGB Tours, its staff, and partners are not liable for injuries, illness, loss, damage to property, delays, or expenses arising
            from circumstances beyond our reasonable control. We strongly advise comprehensive
            travel insurance covering medical emergencies, evacuations, cancellations, and personal belongings.
          </p>
          <h2 className="mt-8 font-display text-base font-semibold text-glacier">
            Privacy & Data Protection
          </h2>
          <p>
            Personal information collected for bookings will only be used for service delivery, permits,
            and emergency contact as required by law. We do not sell or share your data with third parties
            except as needed to provide travel arrangements.
          </p>
          <h2 className="mt-8 font-display text-base font-semibold text-glacier">
            Governing Law
          </h2>
          <p>
            These terms are governed by the laws of Gilgit-Baltistan, Pakistan. Any disputes arising from travel services or website use shall
            be subject to the exclusive jurisdiction of the courts in Gilgit-Baltistan.
          </p>
          <p>
            VistaGB Tours reserves the right to update these terms at any time. Continued use of our website or services constitutes acceptance of the
            latest terms.
          </p>
        </div>
      </section>
    </div>
  );
}
