import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import TripPlanner from "@/components/TripPlanner";
import { regions } from "@/data";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Trip planner",
  description:
    "Build a Gilgit-Baltistan itinerary from VistaGB suggested routes, add notes, and save a PDF.",
  path: "/plan",
});

type Props = {
  searchParams?: { region?: string | string[] };
};

export default function PlanPage({ searchParams }: Props) {
  const raw = searchParams?.region;
  const initialSlug = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const options = regions
    .filter((region) => (region.guide?.suggestedItinerary?.length ?? 0) > 0)
    .map((region) => ({
      slug: region.slug,
      name: region.name,
      itinerary: region.guide!.suggestedItinerary!,
      duration: region.guide?.travelDuration,
    }));

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Trip planner", path: "/plan" },
          ]),
          webPageJsonLd({
            name: "Trip planner",
            description: "Day-by-day Gilgit-Baltistan itinerary planner.",
            path: "/plan",
          }),
        ])}
      />
      <PageHeader
        label="Days on the road"
        title="Trip planner"
        intro="Start from a suggested itinerary, drop days you do not need, add notes, then print or save as PDF. Booking is a request — we confirm lodges and jeeps with you."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <TripPlanner regions={options} initialSlug={initialSlug} />
        </div>
      </section>
    </div>
  );
}
