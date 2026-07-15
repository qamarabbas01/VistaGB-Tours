import type { RegionGuide } from "../types";

export const nagarGuide: RegionGuide = {
  history:
    "Nagar was historically Hunza's sibling principality across the river — rivals and neighbours for centuries, with its own mir and fort traditions around Nagar Khas. The valleys of Hopper and Minapin opened highland pasture and glacier approaches that still define adventure travel here. Today Nagar is quieter than Karimabad but just as scenic, with Rakaposhi rising directly above orchard villages.",
  culture:
    "Burusho-speaking communities with Ismaili traditions similar to central Hunza. Village hospitality, apricot harvests, and glacier lore shape daily life. Hopper remains a classic base for glacier walks and the demanding trek toward Rush Lake.",
  weather:
    "Similar to Hunza: pleasant summers, blossom in spring, golden autumns. Hopper and Rush Lake routes are high and cold — summer to early autumn only for the lake trek.",
  population: "Tens of thousands across Nagar District villages; smaller and less tourist-dense than Hunza.",
  languages: ["Burushaski", "Shina", "Urdu", "English (tourism)"],
  famousFoods: [
    {
      name: "Apricot harvest dishes",
      detail: "Fresh and dried fruit from valley orchards.",
    },
    {
      name: "Home-cooked chapshuro & breads",
      detail: "Best in village guesthouses around Hopper and Minapin.",
    },
  ],
  hotels: [
    {
      name: "Hopper Valley lodges",
      detail: "Closest beds to the glacier viewpoints and Rush Lake trailhead.",
      placeSlug: "hopper-valley",
    },
    {
      name: "Minapin guesthouses",
      detail: "Quiet base for Rakaposhi approaches.",
      placeSlug: "minapin",
    },
    {
      name: "Nagar Khas stays",
      detail: "Near the historic fort area with valley panoramas.",
      placeSlug: "nagar-khas",
    },
  ],
  restaurants: [
    {
      name: "Village guesthouse kitchens",
      detail: "Most meals are lodge-based — expect generous home cooking.",
    },
    {
      name: "Karimabad (across the river)",
      detail: "Easy evening option when staying near the bridges.",
      placeSlug: "karimabad",
    },
  ],
  trekkingRoutes: [
    {
      name: "Hopper Glacier viewpoints",
      detail: "Short walks to dramatic icefall vistas above Hopper Valley.",
      placeSlug: "hopper-valley",
    },
    {
      name: "Rakaposhi base camp",
      detail: "Classic multi-day trek from Minapin with towering north-face views.",
      placeSlug: "rakaposhi-base-camp",
    },
    {
      name: "Rush Lake",
      detail:
        "One of the world's highest alpine lakes — serious trekking fitness and season required.",
      placeSlug: "rush-lake",
    },
  ],
  activities: [
    "Hopper Glacier photography",
    "Nagar Khas fort and village walk",
    "Minapin orchard strolls",
    "Rakaposhi base camp trek",
    "Rush Lake expedition",
    "Combine with Hunza day trips",
  ],
  localTips: [
    "Stay at least one night in Hopper — day-tripping from Karimabad misses the evening light.",
    "Rush Lake is not a casual hike; hire an experienced local guide.",
    "Rakaposhi views from Nagar often rival (or beat) those from Hunza viewpoints.",
  ],
  nearbyDestinations: [
    {
      name: "Hunza Valley / Karimabad",
      detail: "Minutes across the bridges — forts, bazaar, and Eagle's Nest.",
      placeSlug: "hunza-valley",
    },
    {
      name: "Gilgit",
      detail: "South on the KKH for flights and bazaar logistics.",
      placeSlug: "gilgit",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Nagar+Valley,+Gilgit-Baltistan&z=11&output=embed",
  travelDuration:
    "Ideal add-on 1–3 days beside a Hunza trip. Hopper is ~30–45 minutes from Karimabad. Rush Lake treks need several dedicated days.",
  suggestedItinerary: [
    {
      day: "Day 1",
      title: "Nagar Khas & Hopper",
      summary: "Cross from Hunza, visit Nagar Khas, continue to Hopper for glacier light.",
      stops: ["Nagar Khas", "Hopper Valley"],
    },
    {
      day: "Day 2",
      title: "Glacier & viewpoints",
      summary: "Hopper Glacier walks; optional evening return to Hunza or night in Minapin.",
      stops: ["Hopper Glacier", "Minapin"],
    },
    {
      day: "Day 3+",
      title: "Trekking extension",
      summary: "Rakaposhi base camp or begin the Rush Lake approach with a guide.",
      stops: ["Rakaposhi base camp", "Rush Lake"],
    },
  ],
  faqs: [
    {
      question: "Is Hopper in Hunza?",
      answer:
        "Hopper is in Nagar, across the river from Hunza. It is often visited on the same trip and appears in many 'Hunza circuit' itineraries.",
    },
    {
      question: "How hard is Rush Lake?",
      answer:
        "It is a high-altitude trek requiring fitness, acclimatization, and usually a guide. It is not a short day hike from Hopper.",
    },
  ],
};
