import type { RegionGuide } from "../types";

export const astoreGuide: RegionGuide = {
  history:
    "Astore has long been a corridor between the Indus and the high pastures beneath Nanga Parbat. It linked Baltistan routes with Diamer and provided seasonal pastures and timber. Today it is the gateway for Rama Meadow and one approach toward Deosai and Fairy Meadows trailheads.",
  culture:
    "Predominantly Shina-speaking mountain communities with strong pastoral traditions. Hospitality is straightforward and village-based; tourism infrastructure is lighter than Hunza or Skardu.",
  weather:
    "Best May–October. High meadows stay cool; monsoon influence can bring afternoon storms. Winters close many upper roads.",
  population: "Scattered valley settlements; far less dense than Gilgit or Skardu towns.",
  languages: ["Shina", "Urdu", "English (limited)"],
  famousFoods: [
    {
      name: "Trout & simple valley cooking",
      detail: "Fresh fish and home meals in Astore and Rama guesthouses.",
    },
  ],
  hotels: [
    {
      name: "Astore town lodges",
      detail: "Staging overnight before Rama or Fairy Meadows approaches.",
    },
    {
      name: "Rama Meadow camps & huts",
      detail: "Seasonal stays among pines with Nanga Parbat views.",
    },
  ],
  restaurants: [
    {
      name: "Roadside & guesthouse meals",
      detail: "Expect simple menus — plan snacks for long jeep days.",
    },
  ],
  trekkingRoutes: [
    {
      name: "Rama Meadow & Rama Lake",
      detail: "Classic meadow walks with optional lake approaches.",
    },
    {
      name: "Southern Deosai via Chilim",
      detail: "Seasonal jeep link toward the plateau.",
    },
    {
      name: "Fairy Meadows via Tato",
      detail: "Jeep and hike to the iconic Nanga Parbat pasture.",
      placeSlug: "fairy-meadows",
    },
  ],
  activities: [
    "Rama Meadow day trips",
    "Pine-forest walks",
    "Deosai approach routes",
    "Fairy Meadows staging",
  ],
  localTips: [
    "Confirm jeep availability for Rama and Tato in advance during peak months.",
    "Combine with Fairy Meadows for a focused Nanga Parbat itinerary.",
  ],
  nearbyDestinations: [
    {
      name: "Fairy Meadows",
      detail: "The signature Nanga Parbat meadow experience.",
      placeSlug: "fairy-meadows",
    },
    {
      name: "Gilgit",
      detail: "4–5 hours for flights and supplies.",
      placeSlug: "gilgit",
    },
    {
      name: "Skardu / Deosai",
      detail: "Seasonal plateau connections.",
      placeSlug: "deosai-plains",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Astore+Valley,+Gilgit-Baltistan&z=10&output=embed",
  travelDuration:
    "2–4 days including Rama; add 2–3 days if combining Fairy Meadows. Drive ~4–5 hours from Gilgit.",
  suggestedItinerary: [
    {
      day: "Day 1",
      title: "Gilgit to Astore",
      summary: "Drive in, overnight in Astore or continue toward Rama if daylight allows.",
      stops: ["Astore"],
    },
    {
      day: "Day 2",
      title: "Rama Meadow",
      summary: "Full day among pines and meadows; optional lake walk.",
      stops: ["Rama Meadow"],
    },
    {
      day: "Day 3+",
      title: "Fairy Meadows or Deosai",
      summary: "Branch to Tato/Fairy Meadows or seasonal Deosai link.",
      stops: ["Fairy Meadows", "Deosai"],
    },
  ],
  faqs: [
    {
      question: "Is Astore the same as Fairy Meadows?",
      answer:
        "No. Astore is the valley hub; Fairy Meadows is a high pasture reached via a separate jeep-and-hike approach from Tato, often combined on the same trip.",
    },
  ],
};

export const fairyMeadowsGuide: RegionGuide = {
  history:
    "Fairy Meadows (locally associated with Beyal and the Tato trail) became famous in the modern era as the most accessible viewpoint for Nanga Parbat's immense faces. Climbers and photographers popularised the pine meadow camps facing the mountain.",
  culture:
    "Seasonal lodge culture run by local Diamer families. Life revolves around hospitality for trekkers — evenings by lantern light under the Rupal/Diamir massif.",
  weather:
    "Open roughly May–October. Nights are cold even in summer (~3,300 m). Storms can close the trail; always check conditions.",
  population: "No permanent large settlement — seasonal camps and lodges.",
  languages: ["Shina", "Urdu", "English (lodge staff)"],
  famousFoods: [
    {
      name: "Lodge dal, rice & chai",
      detail: "Hearty, simple meals after the hike in — vegetarian options usual.",
    },
  ],
  hotels: [
    {
      name: "Fairy Meadows wooden lodges",
      detail: "Basic but atmospheric rooms facing Nanga Parbat.",
    },
    {
      name: "Beyal Camp extension",
      detail: "Higher and quieter overnight for strong hikers.",
    },
  ],
  restaurants: [
    {
      name: "Lodge dining halls",
      detail: "All meals are typically lodge-provided; limited independent restaurants.",
    },
  ],
  trekkingRoutes: [
    {
      name: "Tato to Fairy Meadows",
      detail: "Jeep to trailhead, then 2–3 hour forest hike.",
    },
    {
      name: "Beyal Camp",
      detail: "Further alpine pasture toward closer mountain views.",
    },
  ],
  activities: [
    "Nanga Parbat sunrise and sunset",
    "Pine-forest photography",
    "Beyal Camp day hike",
    "Stargazing",
  ],
  localTips: [
    "Book lodges in peak summer; carry a headlamp and warm sleeping layers.",
    "The jeep track to Tato can be rough — agree prices clearly beforehand.",
    "One night is minimum; two nights reward better light and a Beyal push.",
  ],
  nearbyDestinations: [
    {
      name: "Astore Valley",
      detail: "Regional approach and Rama Meadow alternative.",
      placeSlug: "astore-valley",
    },
    {
      name: "Gilgit",
      detail: "Main road hub for onward travel.",
      placeSlug: "gilgit",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Fairy+Meadows,+Nanga+Parbat&z=12&output=embed",
  travelDuration:
    "Ideal 2 nights at the meadows. Full trip from Gilgit/Chilas typically 3–4 days including travel.",
  suggestedItinerary: [
    {
      day: "Day 1",
      title: "Drive & hike in",
      summary: "Reach Tato by jeep, hike to Fairy Meadows, sunset on Nanga Parbat.",
      stops: ["Tato", "Fairy Meadows"],
    },
    {
      day: "Day 2",
      title: "Beyal or viewpoint day",
      summary: "Optional Beyal Camp hike; photography and rest.",
      stops: ["Beyal Camp"],
    },
    {
      day: "Day 3",
      title: "Descend",
      summary: "Hike out and drive toward Chilas/Gilgit or Astore.",
      stops: ["Tato"],
    },
  ],
  faqs: [
    {
      question: "How difficult is the hike?",
      answer:
        "Moderate: 2–3 hours uphill through forest with some steep sections. Porters/mules are often available for bags.",
    },
    {
      question: "Can children visit?",
      answer:
        "Able older children manage it; toddlers need carrying support. There is no road directly to the meadows.",
    },
  ],
};

export const ghizerGuide: RegionGuide = {
  history:
    "Ghizer's valleys — Phander, Gupis, Yasin, Ishkoman — formed western approaches toward Shandur and Chitral. Pastoral Wakhi and Khowar-linked communities shaped a quieter alternative to the KKH tourism belt.",
  culture:
    "Trout fishing, polo (especially toward Shandur), and highland farming define local life. Villages are welcoming but less geared to mass tourism than Hunza.",
  weather:
    "May–September is prime. High pastures open mid-summer; Shandur is best around festival season (often July).",
  population: "Spread across long valley corridors; small town hubs at Gahkuch and along the Ghizer road.",
  languages: ["Khowar", "Shina", "Wakhi (upper)", "Urdu"],
  famousFoods: [
    {
      name: "Phander trout",
      detail: "Fresh lake and river fish — a regional highlight.",
    },
  ],
  hotels: [
    {
      name: "Phander lakeside lodges",
      detail: "Quiet stays beside emerald waters.",
    },
    {
      name: "Gupis & Yasin guesthouses",
      detail: "Simple village bases for exploring side valleys.",
    },
  ],
  restaurants: [
    {
      name: "Lodge restaurants",
      detail: "Trout and home-style meals; few independent restaurants outside hubs.",
    },
  ],
  trekkingRoutes: [
    {
      name: "Ishkoman remote treks",
      detail: "Less-travelled highland routes — guide recommended.",
    },
    {
      name: "Shandur approach",
      detail: "High pass toward Chitral with panoramic pasture country.",
    },
  ],
  activities: [
    "Phander Lake photography",
    "Trout fishing (where permitted)",
    "Yasin and Gupis valley drives",
    "Shandur polo festival (seasonal)",
  ],
  localTips: [
    "Allow slow driving days — distances look short on the map but roads wind.",
    "Combine with Gilgit as start/end logistics hub.",
  ],
  nearbyDestinations: [
    {
      name: "Gilgit",
      detail: "6–7 hours to Phander depending on stops.",
      placeSlug: "gilgit",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Phander+Lake,+Ghizer&z=10&output=embed",
  travelDuration:
    "3–5 days to sample Phander and one side valley. Longer for Shandur or Ishkoman treks.",
  suggestedItinerary: [
    {
      day: "Day 1",
      title: "Gilgit to Gupis / Phander",
      summary: "Scenic drive west; overnight by the lake if timing allows.",
      stops: ["Gahkuch", "Phander"],
    },
    {
      day: "Day 2",
      title: "Phander Lake",
      summary: "Photography, short walks, optional fishing.",
      stops: ["Phander Lake"],
    },
    {
      day: "Day 3+",
      title: "Yasin, Ishkoman, or Shandur",
      summary: "Pick a side valley or push toward the pass.",
      stops: ["Yasin", "Ishkoman", "Shandur"],
    },
  ],
  faqs: [
    {
      question: "Is Ghizer as developed for tourism as Hunza?",
      answer:
        "No — that is part of the appeal. Expect simpler lodges, fewer cafés, and more self-contained itineraries.",
    },
  ],
};

export const khapluGuide: RegionGuide = {
  history:
    "Khaplu was a Balti royal centre; the restored Khaplu Palace and Chaqchan Mosque embody Silk Road–era craftsmanship. The town remains the gateway to Hushe and high peaks including Masherbrum approaches.",
  culture:
    "Balti heritage with strong architectural pride — carved wood, stone forts, and orchard villages. Homestays and the palace hotel make culture the main draw alongside trekking.",
  weather:
    "April–October for comfortable travel. High Hushe routes need peak summer windows.",
  population: "Town and surrounding Ghanche villages; quieter than Skardu.",
  languages: ["Balti", "Urdu", "English (heritage tourism)"],
  famousFoods: [
    {
      name: "Balti homestay cooking",
      detail: "Apricots, mamtu-style dishes, and butter tea.",
    },
  ],
  hotels: [
    {
      name: "Khaplu Palace Residence",
      detail: "Flagship heritage stay in the restored palace.",
    },
    {
      name: "Town guesthouses",
      detail: "Budget-friendly bases for Hushe departures.",
    },
  ],
  restaurants: [
    {
      name: "Palace and guesthouse dining",
      detail: "Most memorable meals are tied to your stay.",
    },
  ],
  trekkingRoutes: [
    {
      name: "Hushe Valley approaches",
      detail: "Trailhead region for Masherbrum and surrounding peaks.",
    },
  ],
  activities: [
    "Khaplu Palace tour",
    "Chaqchan Mosque visit",
    "Orchard village walks",
    "Hushe trek staging",
  ],
  localTips: [
    "Easy 3-hour add-on from Skardu for culture-focused travellers.",
    "Pair with Skardu lakes for a balanced Baltistan week.",
  ],
  nearbyDestinations: [
    {
      name: "Skardu",
      detail: "Regional hub ~3 hours west.",
      placeSlug: "skardu",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Khaplu,+Gilgit-Baltistan&z=12&output=embed",
  travelDuration:
    "1–2 nights for palace and town; multi-day for Hushe treks. ~3 hours from Skardu.",
  suggestedItinerary: [
    {
      day: "Day 1",
      title: "Skardu to Khaplu",
      summary: "Drive along the Shyok, palace check-in, sunset in town.",
      stops: ["Khaplu Palace"],
    },
    {
      day: "Day 2",
      title: "Heritage & orchards",
      summary: "Chaqchan Mosque and village walks; optional Hushe start.",
      stops: ["Chaqchan Mosque", "Hushe"],
    },
  ],
  faqs: [
    {
      question: "Is Khaplu worth it without trekking?",
      answer:
        "Yes — the palace and mosque alone justify an overnight for architecture and Balti culture lovers.",
    },
  ],
};

export const broghilGuide: RegionGuide = {
  history:
    "Broghil sits at a remote meeting of ranges near the Wakhan corridor — historically a pasture and passageway for Wakhi shepherds rather than a tourist circuit. Access remains expedition-style.",
  culture:
    "Wakhi shepherd culture, yurts/seasonal camps, and horseback traditions. Expect genuine highland life more than hotels and cafés.",
  weather:
    "Only reliably open July–August. Snow and swollen rivers close the window quickly.",
  population: "Seasonal herding communities; no large towns.",
  languages: ["Wakhi", "Khowar", "Urdu"],
  famousFoods: [
    {
      name: "Camp cooking & dairy",
      detail: "Simple highland meals; self-sufficient expedition food is wise.",
    },
  ],
  hotels: [
    {
      name: "Seasonal camps / yurts",
      detail: "Basic shelter — book through experienced local operators.",
    },
  ],
  restaurants: [
    {
      name: "Camp kitchens only",
      detail: "No restaurant scene — plan all meals with your operator.",
    },
  ],
  trekkingRoutes: [
    {
      name: "Karambar Lake approaches",
      detail: "High alpine lake objectives with serious logistics.",
    },
    {
      name: "Laspur / Darkut approaches",
      detail: "Multi-day access routes requiring permits and guidance.",
    },
  ],
  activities: [
    "Karambar Lake visits",
    "Horseback travel",
    "High pasture camping",
    "Wakhan-edge photography",
  ],
  localTips: [
    "This is not a spontaneous add-on — arrange permits, guides, and contingency days.",
    "Travel only in peak summer with experienced operators.",
  ],
  nearbyDestinations: [
    {
      name: "Ghizer",
      detail: "More accessible western GB valleys for most travellers.",
      placeSlug: "ghizer",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Broghil+Valley,+Pakistan&z=10&output=embed",
  travelDuration:
    "Expedition of a week or more including approach. Peak window July–August only.",
  suggestedItinerary: [
    {
      day: "Days 1–3",
      title: "Approach",
      summary: "Permit checks and multi-day travel via Laspur or Darkut.",
      stops: ["Approach valleys"],
    },
    {
      day: "Days 4–6",
      title: "Broghil pastures",
      summary: "Camp near high meadows; Karambar Lake if conditions allow.",
      stops: ["Karambar Lake"],
    },
    {
      day: "Days 7+",
      title: "Exit buffer",
      summary: "Weather contingency and return.",
      stops: [],
    },
  ],
  faqs: [
    {
      question: "Can first-time GB visitors do Broghil?",
      answer:
        "Better to experience Hunza, Skardu, or Ghizer first. Broghil suits travellers already comfortable with remote mountain logistics.",
    },
  ],
};
