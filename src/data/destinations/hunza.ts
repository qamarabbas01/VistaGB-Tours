import type { RegionDestination } from "../types";
import { hunzaGuide } from "../guides/hunza";
import { hunzaPlaceSlugs } from "../places/hunza";

export const hunzaDestination: RegionDestination = {
  kind: "region",
  slug: "hunza-valley",
  name: "Hunza Valley",
  region: "Hunza",
  tagline: "Terraced orchards beneath Rakaposhi",
  description:
    "Apricot blossoms, glacial peaks, and centuries-old forts overlooking the Karakoram Highway.",
  image: "/images/commons/bd7ddfea0e6ee033.jpg",
  gallery: [
    {
      src: "/images/commons/5c94f723e71aac65.jpg",
      title: "Passu Cones",
      caption: "Upper Hunza",
      category: "mountains",
    },
    {
      src: "/images/commons/67c2efc2a2cbcdef.jpg",
      title: "Khunjerab high country",
      caption: "ALT 4,693M",
      category: "mountains",
    },
    {
      src: "/images/commons/4680a3d14ca1af46.jpg",
      title: "Attabad Lake",
      caption: "Gojal",
      category: "lakes",
    },
    {
      src: "/images/commons/1eb0d327a11a7ac6.jpg",
      title: "Boats on glacial water",
      caption: "Attabad",
      category: "lakes",
    },
    {
      src: "/images/commons/988e06319b75f6d9.jpg",
      title: "Passu village",
      caption: "Gojal",
      category: "villages",
    },
    {
      src: "/images/commons/48f585baebd979ab.jpg",
      title: "Gulmit",
      caption: "Historic capital of Gojal",
      category: "villages",
    },
    {
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/1f/02/35/baltit-fort-hunza-gilgit.jpg?w=800&h=-1&s=1",
      title: "Karimabad bazaar lanes",
      caption: "Apricots, chapshuro, and tea houses",
      category: "food",
    },
    {
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b7/ce/b3/ghulkin-village-in-upper.jpg?w=1400&h=-1&s=1",
      title: "Orchard terraces",
      caption: "Ghulkin · dried fruit and harvest",
      category: "food",
    },
    {
      src: "/images/commons/bd7ddfea0e6ee033.jpg",
      title: "Apricot blossom over Karimabad",
      caption: "Spring festival season",
      category: "festivals",
    },
    {
      src: "/images/commons/92ff9643469e41ed.jpg",
      title: "Baltit Fort",
      caption: "Central Hunza",
      category: "culture",
    },
    {
      src: "/images/commons/bcd5d7dbff73c3f1.jpg",
      title: "Ganish heritage lanes",
      caption: "Silk Road village",
      category: "culture",
    },
    {
      src: "/images/commons/24a764cb8976da0d.jpg",
      title: "Eagle's Nest ridge lodges",
      caption: "Duikar sunset stays",
      category: "hotels",
    },
    {
      src: "https://media-cdn.tripadvisor.com/media/photo-o/02/c0/8f/a3/the-newly-built-section.jpg",
      title: "Hilltop lodge at Eagle's Nest",
      caption: "Karimabad · ALT 2,850M",
      category: "hotels",
    },
    {
      src: "/images/commons/aa5a3051e0bf5851.jpg",
      title: "Shimshal approach",
      caption: "Remote trekking valley",
      category: "trekking",
    },
    {
      src: "/images/commons/a79dc6d69e979ba6.jpg",
      title: "High pasture trails",
      caption: "Chipursan and glacier country",
      category: "trekking",
    },
  ],
  videos: [
    {
      youtubeId: "T5g1zK-bs-E",
      title: "Hunza from the air and the highway",
      caption: "Attabad Lake, Karimabad, and the Gojal corridor.",
      theme: "drone",
      poster: "/images/commons/4680a3d14ca1af46.jpg",
    },
    {
      youtubeId: "wNhfipFghlA",
      title: "Passu Glacier to Patundas",
      caption: "Ice, pasture, and Wakhi villages above Passu.",
      theme: "trekking",
      poster: "/images/commons/ba4b0d53d291cba4.jpg",
    },
    {
      youtubeId: "FryCzL17YRs",
      title: "Karakoram Highway jeep travel",
      caption: "The high road through Hunza's canyon country.",
      theme: "jeep",
      poster: "/images/commons/4e0000c8d4bbe492.jpg",
    },
    {
      youtubeId: "h_T_xd2OFhU",
      title: "Cherry harvest in Hunza and Nagar",
      caption: "Orchard camping in peak blossom and harvest season.",
      theme: "blossom",
      poster: "/images/commons/bd7ddfea0e6ee033.jpg",
    },
    {
      youtubeId: "hVhoz7LIGb0",
      title: "Winter on the Karakoram Highway",
      caption: "Snowbound travel toward Hunza.",
      theme: "snowfall",
      poster: "/images/commons/67c2efc2a2cbcdef.jpg",
    },
    {
      youtubeId: "cW2NAlwhaDk",
      title: "Hunza in colour",
      caption: "Forts, lakes, and orchard gold through the seasons.",
      theme: "autumn",
      poster: "/images/commons/5c94f723e71aac65.jpg",
    },
  ],
  overview:
    "Hunza Valley sits along the Karakoram Highway where terraced apricot orchards climb toward glaciers and 7,000-metre peaks. Karimabad anchors central Hunza with Baltit and Altit forts; north lies Gojal — Attabad Lake, Passu, Gulmit, and the road to Khunjerab. Most travellers spend four to seven days here.",
  highlights: [
    "Karimabad, Baltit Fort, and Altit Fort",
    "Eagle's Nest sunset and Duikar ridge",
    "Attabad Lake boating",
    "Passu Cones and Hussaini Bridge",
    "Khunjerab Pass day trip",
    "Shimshal, Chipursan, and Misgar for adventurers",
  ],
  bestTime: "April–October; blossom in spring, harvest colours in autumn",
  gettingThere:
    "Drive north from Gilgit (~2.5 hours) or fly to Gilgit and continue by road. The Karakoram Highway from Islamabad takes 2–3 days with overnight stops.",
  altitude: "2,438M",
  majorValleys: [
    "Central Hunza (Karimabad)",
    "Upper Hunza / Gojal",
    "Shimshal",
    "Chipursan",
    "Misgar",
  ],
  placeSlugs: hunzaPlaceSlugs,
  guide: hunzaGuide,
};
