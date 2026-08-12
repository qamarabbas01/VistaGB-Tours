import TravelAssistant from "@/components/TravelAssistant";
import { getLocationBySlug } from "@/data";

export const metadata = {
  title: "AI Travel Assistant",
  description:
    "Ask VistaGB’s travel assistant about Hunza, Skardu, itineraries, hotels, food, weather, roads, packing, and budgets for Gilgit-Baltistan.",
};

type Props = {
  searchParams?: {
    destination?: string | string[];
  };
};

export default function AssistantPage({ searchParams }: Props) {
  const raw = searchParams?.destination;
  const slug = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const location = slug ? getLocationBySlug(slug) : undefined;

  return (
    <div>
      <section className="border-b border-teal/20 bg-gradient-to-b from-slate via-night to-night py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Trip designer</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl">
            AI Travel Assistant
          </h1>
          <p className="mt-4 max-w-2xl text-ice">
            Instant answers from VistaGB destination guides — itineraries,
            lodges, food, seasons, live weather, roads, packing, and budgets —
            then hand off to our team when you&apos;re ready to book.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <TravelAssistant
            destinationSlug={location?.slug}
            destinationName={location?.name}
          />
        </div>
      </section>
    </div>
  );
}
