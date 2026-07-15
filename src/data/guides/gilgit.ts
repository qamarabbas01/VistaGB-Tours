import type { RegionGuide } from "../types";

export const gilgitGuide: RegionGuide = {
  history:
    "Gilgit sits at a historic Silk Road junction where routes from Kashgar, Chitral, Skardu, and the Indus plains met. The Kargah Buddha rock carving hints at a Buddhist past before Islam took hold. As the modern administrative capital of Gilgit-Baltistan, it remains the transport and market hub for the entire north.",
  culture:
    "Gilgit is culturally mixed — Shina-speaking communities alongside traders and travellers from across GB. The bazaar is the region's liveliest: dried fruit, handicrafts, and food streets. It is the practical place to restock, hire transport, and connect to Hunza, Naltar, Ghizer, or Skardu.",
  weather:
    "Lower altitude (~1,500 m) means hotter summers than Hunza or Skardu. Spring and autumn are pleasant. Winters are cold but usually milder than high valleys. Naltar nearby holds snow for skiing in season.",
  population: "Gilgit city and surrounds form one of GB's largest urban populations (city proper roughly 200,000+ in the wider urban area).",
  languages: ["Shina", "Urdu", "Brushaski (visitors)", "Wakhi (through traffic)", "English"],
  famousFoods: [
    {
      name: "Gilgit food street & BBQ",
      detail: "The go-to stop for travellers between long KKH drives.",
    },
    {
      name: "Chapshuro & mountain breads",
      detail: "Regional pastries and breads shared with Hunza–Nagar cuisine.",
    },
    {
      name: "Dried apricots & nuts",
      detail: "Bazaar staples for the onward journey.",
    },
  ],
  hotels: [
    {
      name: "Gilgit city hotels",
      detail: "Convenient overnight before or after flights and KKH legs.",
    },
    {
      name: "Naltar valley lodges",
      detail: "Base for lakes and winter skiing when the jeep road allows.",
      placeSlug: "naltar-valley",
    },
    {
      name: "Bagrote / Danyor guesthouses",
      detail: "Quieter orchard stays outside the city bustle.",
      placeSlug: "bagrote-valley",
    },
  ],
  restaurants: [
    {
      name: "Jama bazaar & food streets",
      detail: "Best variety of local and Pakistani dishes in northern Pakistan.",
    },
    {
      name: "Hotel restaurants along Airport Road",
      detail: "Reliable meals for early flights and late arrivals.",
    },
  ],
  trekkingRoutes: [
    {
      name: "Naltar Valley lakes",
      detail: "Jeep access with short walks among pine forests and coloured lakes.",
      placeSlug: "naltar-valley",
    },
    {
      name: "Bagrote Valley orchards",
      detail: "Day hikes and village walks in a classic side valley.",
      placeSlug: "bagrote-valley",
    },
    {
      name: "Kargah Buddha trail",
      detail: "Short walk to the ancient rock carving west of town.",
      placeSlug: "kargah-buddha",
    },
  ],
  activities: [
    "Bazaar and food street evenings",
    "Kargah Buddha visit",
    "Naltar lakes (and skiing in winter)",
    "Bagrote Valley day trip",
    "Gateway staging to Hunza or Ghizer",
  ],
  localTips: [
    "Use Gilgit as a logistics night — fly in, overnight, then drive to Hunza next morning.",
    "Confirm jeep status for Naltar after rain or snow.",
    "ATMs and SIM top-ups are easiest here before heading to smaller valleys.",
  ],
  nearbyDestinations: [
    {
      name: "Hunza Valley",
      detail: "About 2.5 hours north on the KKH.",
      placeSlug: "hunza-valley",
    },
    {
      name: "Nagar",
      detail: "Often combined with Hunza on the same road trip.",
      placeSlug: "nagar",
    },
    {
      name: "Ghizer",
      detail: "West toward Phander, Yasin, and Shandur.",
      placeSlug: "ghizer",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Gilgit,+Gilgit-Baltistan&z=11&output=embed",
  travelDuration:
    "1–2 nights is typical as a hub; add 1–2 days for Naltar or Bagrote. Islamabad flight ~1 hour; KKH drive 14–16 hours.",
  suggestedItinerary: [
    {
      day: "Day 1",
      title: "Arrive & explore",
      summary: "Bazaar, food street, and optional Kargah Buddha in the afternoon.",
      stops: ["Gilgit bazaar", "Kargah Buddha"],
    },
    {
      day: "Day 2",
      title: "Naltar or Bagrote",
      summary: "Full day in a side valley, return to Gilgit or continue toward Hunza.",
      stops: ["Naltar Valley", "Bagrote Valley"],
    },
    {
      day: "Day 3",
      title: "Continue north or west",
      summary: "Drive to Hunza/Nagar or begin the Ghizer route toward Phander.",
      stops: ["Hunza Valley", "Ghizer"],
    },
  ],
  faqs: [
    {
      question: "Is Gilgit worth more than an overnight?",
      answer:
        "Yes if you want Naltar or Bagrote. Otherwise it shines as a convenient hub between flights and the KKH.",
    },
    {
      question: "How do I get from Gilgit Airport to Hunza?",
      answer:
        "Hire a car or join a shared jeep — typically about 2.5 hours to Karimabad depending on stops and traffic.",
    },
  ],
};
