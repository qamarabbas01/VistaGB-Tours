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
      src: "/images/commons/5b4d6e89dc2760ac.jpg",
      title: "Peaks above the Gilgit basin",
      caption: "Gateway ranges",
      category: "mountains",
    },
    {
      src: "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
      title: "Naltar lakes",
      caption: "Alpine colour near Gilgit",
      category: "lakes",
    },
    {
      src: "https://northbackend.northonwheels.com/storage/uploads/Gargo-Meadows-Bagrote-valley-5.jpg",
      title: "Bagrote orchards",
      caption: "Village fields south of Gilgit",
      category: "villages",
    },
    {
      src: "https://i.brecorder.com/primary/2024/07/20172202193b7b7.jpg",
      title: "Gilgit bazaar and food street",
      caption: "Chapli, momos, and tea",
      category: "food",
    },
    {
      src: "/images/commons/4e0000c8d4bbe492.jpg",
      title: "Highway market day",
      caption: "Stalls along the Karakoram Highway",
      category: "festivals",
    },
    {
      src: "/images/commons/9ffbf7caa77b300f.jpg",
      title: "Silk Road timber architecture",
      caption: "Heritage of the Gilgit basin",
      category: "culture",
    },
    {
      src: "/images/commons/112aa7ad11d28437.jpg",
      title: "City and valley lodges",
      caption: "Overnight before the KKH",
      category: "hotels",
    },
    {
      src: "/images/commons/ba4b0d53d291cba4.jpg",
      title: "Naltar and Bagrote trails",
      caption: "Day hikes from Gilgit",
      category: "trekking",
    },
  ],
  videos: [
    {
      youtubeId: "T5g1zK-bs-E",
      title: "North from Gilgit",
      caption: "The valleys travellers reach after landing or driving into Gilgit.",
      theme: "drone",
      poster: "/images/commons/5b4d6e89dc2760ac.jpg",
    },
    {
      youtubeId: "hVhoz7LIGb0",
      title: "Winter on the Karakoram Highway",
      caption: "The Chilas–Gilgit–Hunza winter road.",
      theme: "snowfall",
      poster: "/images/commons/112aa7ad11d28437.jpg",
    },
    {
      youtubeId: "nwVim-eGDk4",
      title: "Jeep country west and south",
      caption: "4x4 tracks of the kind that leave Gilgit for Naltar and beyond.",
      theme: "jeep",
      poster: "/images/commons/4e0000c8d4bbe492.jpg",
    },
    {
      youtubeId: "h_T_xd2OFhU",
      title: "Cherry season on the KKH",
      caption: "Orchard harvest between Gilgit, Nagar, and Hunza.",
      theme: "blossom",
      poster: "/images/commons/bd7ddfea0e6ee033.jpg",
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
