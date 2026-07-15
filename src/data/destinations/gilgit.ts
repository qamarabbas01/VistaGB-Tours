import type { RegionDestination } from "../types";
import { gilgitGuide } from "../guides/gilgit";
import { gilgitPlaceSlugs } from "../places/gilgit";

export const gilgitDestination: RegionDestination = {
  kind: "region",
  slug: "gilgit",
  name: "Gilgit",
  region: "Gilgit",
  tagline: "Historic capital on the Silk Road",
  description:
    "Bazaar life, ancient carvings, and the meeting point of mountains and cultures at the region's hub.",
  image: "https://i.brecorder.com/primary/2024/07/20172202193b7b7.jpg",
  gallery: [
    {
      src: "https://i.brecorder.com/primary/2024/07/20172202193b7b7.jpg",
      title: "Gilgit city",
      caption: "Gilgit · ALT 1,500M",
    },
    {
      src: "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
      title: "Naltar Valley",
      caption: "Near Gilgit",
    },
  ],
  overview:
    "Gilgit is the principal city of Gilgit-Baltistan — bazaar, cuisine, and trips to Naltar, Bagrote, and the Kargah Buddha. The city is the junction for routes north to Hunza, east to Skardu, and west toward Ghizer and Chitral.",
  highlights: [
    "Gilgit bazaar and food street",
    "Kargah Buddha rock carving",
    "Naltar Valley lakes and skiing",
    "Bagrote Valley orchards",
    "Gateway to all of Gilgit-Baltistan",
  ],
  bestTime: "March–October",
  gettingThere:
    "Daily flights from Islamabad or 14–16 hour drive up the Karakoram Highway.",
  altitude: "1,500M",
  majorValleys: ["Gilgit town", "Naltar", "Bagrote", "Danyor"],
  placeSlugs: gilgitPlaceSlugs,
  guide: gilgitGuide,
};
