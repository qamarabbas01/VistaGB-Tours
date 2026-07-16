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
      src: "/images/commons/bd7ddfea0e6ee033.jpg",
      title: "Karimabad panorama",
      caption: "Hunza · ALT 2,438M",
    },
    {
      src: "/images/commons/92ff9643469e41ed.jpg",
      title: "Baltit Fort",
      caption: "Central Hunza",
    },
    {
      src: "/images/commons/4680a3d14ca1af46.jpg",
      title: "Attabad Lake",
      caption: "Gojal",
    },
    {
      src: "/images/commons/5c94f723e71aac65.jpg",
      title: "Passu Cones",
      caption: "Upper Hunza",
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
