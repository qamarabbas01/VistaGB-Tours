import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — VistaGB Tours",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Plan Your Trip
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            Tell us where you want to go and when — we&apos;ll reply with a
            route, timeline, and price.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-4">Office</p>
              <p className="text-glacier">VistaGB Tours</p>
              <p className="mt-1 text-sm text-ice">
                Yadgar Chowk, Skardu, Gilgit-Baltistan, Pakistan
              </p>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-4">Contact</p>
              <p className="text-sm text-ice">
                Email:{" "}
                <a href="mailto:qamrabbas629@gmail.com" className="text-apricot hover:underline">
                  qamrabbas629@gmail.com
                </a>
              </p>
              <p className="mt-2 text-sm text-ice">
                Phone:{" "}
                <a href="tel:+923554646853" className="text-apricot hover:underline">
                  +92 3554646853
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-4">Response Time</p>
              <p className="text-sm leading-relaxed text-ice">
                We typically reply within 24 hours. During peak season
                (May–September), please allow up to 48 hours as our guides
                are often on the road.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
