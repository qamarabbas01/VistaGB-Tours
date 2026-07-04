import type { RegionDestination } from "../types";
import { hunzaPlaceSlugs } from "../places/hunza";

export const hunzaDestination: RegionDestination = {
  kind: "region",
  slug: "hunza-valley",
  name: "Hunza Valley",
  region: "Hunza",
  tagline: "Terraced orchards beneath Rakaposhi",
  description:
    "Apricot blossoms, glacial peaks, and centuries-old forts overlooking the Karakoram Highway.",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/e/e3/Karimabad_Hunza_Valley.jpg",
  gallery: [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Karimabad_Hunza_Valley.jpg",
      title: "Karimabad panorama",
      caption: "Hunza · ALT 2,438M",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Baltit_Fort_Hunza.jpg",
      title: "Baltit Fort",
      caption: "Central Hunza",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Attabad_Lake_Gojal_Hunza_Gilgit_Baltistan.jpg",
      title: "Attabad Lake",
      caption: "Gojal",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Passu_cones_Pakistan.jpg",
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
};
