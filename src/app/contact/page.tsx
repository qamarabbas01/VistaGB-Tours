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
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="coord-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="coord-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="destination" className="coord-label">
                Interested In
              </label>
              <select
                id="destination"
                name="destination"
                className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
              >
                <option>Hunza Valley</option>
                <option>Skardu</option>
                <option>Deosai Plains</option>
                <option>Fairy Meadows</option>
                <option>Khaplu</option>
                <option>Attabad Lake</option>
                <option>Not sure yet — help me decide</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="coord-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
                placeholder="Travel dates, group size, what you'd like to see..."
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>

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
                <a href="mailto:hello@vistagbtours.pk" className="text-apricot hover:underline">
                  hello@vistagbtours.pk
                </a>
              </p>
              <p className="mt-2 text-sm text-ice">
                Phone:{" "}
                <a href="tel:+923000000000" className="text-apricot hover:underline">
                  +92 300 000 0000
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
