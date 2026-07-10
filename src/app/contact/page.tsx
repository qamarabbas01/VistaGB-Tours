import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/config/contact";
import { getPlacesForRegion, regions } from "@/data";

export const metadata = {
  title: "Contact — VistaGB Tours",
  description:
    "Plan your Gilgit-Baltistan trip with VistaGB Tours. Send an inquiry and we'll reply with a custom route, timeline, and quote.",
};

const steps = [
  {
    step: "01",
    title: "Share your plans",
    detail:
      "Tell us your dates, group size, and the valleys or treks you're curious about.",
  },
  {
    step: "02",
    title: "Get a custom route",
    detail:
      "We reply within 24 hours with a day-by-day itinerary, logistics, and a clear price.",
  },
  {
    step: "03",
    title: "Hit the road",
    detail:
      "Once you're happy with the plan, we handle drivers, lodges, permits, and local guides.",
  },
];

const regionOptions = [
  ...regions.map((region) => ({
    slug: region.slug,
    name: region.name,
    places: getPlacesForRegion(region.slug).map((place) => place.name),
  })),
  {
    slug: "not-sure",
    name: "Not sure yet — help me decide",
    places: [],
  },
];

const heroImage =
  regions.find((region) => region.slug === "skardu")?.image ?? regions[0].image;

export default function ContactPage() {
  return (
    <div>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Image
          src={heroImage}
          alt="Karakoram peaks above Skardu valley"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:px-10 md:pb-20">
          <p className="coord-label mb-3">{contact.location.coords}</p>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl">
            Plan Your Trip
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            Tell us where you want to go and when — we&apos;ll reply with a
            route, timeline, and price built around the Karakoram.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 md:px-10">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-teal/20 bg-slate p-8 md:p-10">
              <p className="coord-label mb-3">Inquiry Form</p>
              <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
                Send us a message
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ice">
                Pick your region, choose specific spots, and tell us when and
                how long you want to travel — we&apos;ll build a route from there.
              </p>
              <div className="mt-8">
                <ContactForm regionOptions={regionOptions} />
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-5">Reach Us Directly</p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-4 rounded-xl border border-teal/20 bg-night/50 px-4 py-3 transition-colors hover:border-apricot/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apricot/10 text-apricot">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs text-ice">Email</span>
                    <span className="text-sm text-glacier group-hover:text-apricot">
                      {contact.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${contact.phone.tel}`}
                  className="group flex items-center gap-4 rounded-xl border border-teal/20 bg-night/50 px-4 py-3 transition-colors hover:border-apricot/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apricot/10 text-apricot">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs text-ice">Phone</span>
                    <span className="text-sm text-glacier group-hover:text-apricot">
                      {contact.phone.display}
                    </span>
                  </span>
                </a>

                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-teal/20 bg-night/50 px-4 py-3 transition-colors hover:border-apricot/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apricot/10 text-apricot">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs text-ice">WhatsApp</span>
                    <span className="text-sm text-glacier group-hover:text-apricot">
                      Message us on WhatsApp
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-4">Office</p>
              <p className="font-display text-lg font-semibold text-glacier">
                VistaGB Tours
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ice">
                {contact.address}
              </p>
              <p className="coord-label mt-4">{contact.location.coords}</p>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-4">Response Time</p>
              <p className="text-sm leading-relaxed text-ice">
                We typically reply within 24 hours. During peak season
                (May–September), please allow up to 48 hours — our guides are
                often on the road.
              </p>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-slate p-8">
              <p className="coord-label mb-4">Helpful to Include</p>
              <ul className="flex flex-col gap-2 text-sm text-ice">
                <li className="flex gap-2">
                  <span className="text-apricot">·</span>
                  Specific places — e.g. Attabad Lake, Passu, Baltit Fort
                </li>
                <li className="flex gap-2">
                  <span className="text-apricot">·</span>
                  Start date or flexible month
                </li>
                <li className="flex gap-2">
                  <span className="text-apricot">·</span>
                  Trip length and number of travelers
                </li>
                <li className="flex gap-2">
                  <span className="text-apricot">·</span>
                  Any mobility or dietary requirements
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">What Happens Next</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-glacier md:text-4xl">
            From first message to the open road
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-teal/20 bg-night/40 p-8 transition-colors hover:border-apricot/40"
              >
                <p className="coord-label mb-4">STEP {item.step}</p>
                <h3 className="font-display text-xl font-semibold text-glacier">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
