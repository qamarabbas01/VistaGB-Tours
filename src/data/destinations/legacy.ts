import type { RegionDestination } from "../types";
import {
  astoreGuide,
  broghilGuide,
  fairyMeadowsGuide,
  ghizerGuide,
  khapluGuide,
} from "../guides/legacy";

/** Standalone regions not yet split into place files — still appear on the map */
export const legacyDestinations: RegionDestination[] = [
  {
    kind: "region",
    slug: "astore-valley",
    name: "Astore Valley",
    region: "Astore",
    tagline: "Gateway to Rama, Deosai, and Nanga Parbat",
    description:
      "A broad green valley south of the Karakoram — meadows, pine forests, and the road to Fairy Meadows.",
    image: "/images/commons/f3d428b69be1ff4c.jpg",
    gallery: [
      {
        src: "/images/commons/f3d428b69be1ff4c.jpg",
        title: "Astore Valley",
        caption: "Astore · ALT 2,600M",
      },
      {
        src: "/images/commons/6d10e280381dc28e.jpg",
        title: "Rama Lake",
        caption: "Astore · ALT 3,500M",
      },
    ],
    overview:
      "Astore descends from Nanga Parbat toward the Indus — hub for Rama Meadow, Deosai via Chilim, and the Fairy Meadows jeep track from Tato Village.",
    highlights: [
      "Rama Meadow and Rama Lake",
      "Southern Deosai access",
      "Fairy Meadows trailhead at Tato",
      "Pine forests and trout streams",
    ],
    bestTime: "May–October",
    gettingThere: "4–5 hours by road from Gilgit over the Astore Valley road.",
    altitude: "2,600M",
    placeSlugs: [],
    guide: astoreGuide,
  },
  {
    kind: "region",
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer",
    tagline: "Base camp views of Nanga Parbat",
    description:
      "Pine-fringed meadows facing the sheer Rupal Face — one of the most iconic views in the Himalaya.",
    image: "/images/commons/bf2171654d99937a.jpg",
    gallery: [
      {
        src: "/images/commons/bf2171654d99937a.jpg",
        title: "Nanga Parbat from Fairy Meadows",
        caption: "Fairy Meadows · ALT 3,300M",
      },
      {
        src: "/images/commons/4f5d8c42e41eb43e.jpg",
        title: "Reflection lake trail",
        caption: "Fairy Meadows · ALT 3,300M",
      },
    ],
    overview:
      "Fairy Meadows is a high alpine pasture at the foot of Nanga Parbat. Jeep to the trailhead, then a 2–3 hour hike through pine forest to lodges facing the Rupal Face.",
    highlights: [
      "Unobstructed Nanga Parbat views",
      "Pine-forest hike",
      "Beyal Camp extension",
      "Starry nights",
    ],
    bestTime: "May–October",
    gettingThere:
      "Drive from Chilas to Tato Village, jeep to trailhead, hike 2–3 hours.",
    altitude: "3,300M",
    placeSlugs: [],
    guide: fairyMeadowsGuide,
  },
  {
    kind: "region",
    slug: "ghizer",
    name: "Ghizer",
    region: "Ghizer",
    tagline: "Emerald valleys west of Gilgit",
    description:
      "Phander, Yasin, Gupis, and Ishkoman — trout lakes and Khowar villages in western Gilgit-Baltistan.",
    image: "/images/commons/0f9b73f6df21d8d7.jpg",
    gallery: [
      {
        src: "/images/commons/0f9b73f6df21d8d7.jpg",
        title: "Phander Lake",
        caption: "Ghizer",
      },
    ],
    overview:
      "Ghizer District stretches west from Gilgit through Phander, Gupis, Yasin, and Ishkoman toward Shandur and Chitral — pastoral valleys, trout lakes, and the Shandur polo festival.",
    highlights: [
      "Phander Lake",
      "Yasin and Gupis valleys",
      "Shandur Top polo festival",
      "Ishkoman remote treks",
    ],
    bestTime: "May–September",
    gettingThere: "6–7 hours from Gilgit via Gahkuch and the Ghizer road.",
    altitude: "2,850M",
    majorValleys: ["Phander", "Yasin", "Gupis", "Ishkoman", "Shandur"],
    placeSlugs: [],
    guide: ghizerGuide,
  },
  {
    kind: "region",
    slug: "khaplu",
    name: "Khaplu",
    region: "Baltistan",
    searchTags: ["fort", "khaplu fort", "palace"],
    tagline: "Royal palaces and silk-road heritage",
    description:
      "Restored palace, apricot orchards, and trailheads into Hushe and the Saltoro.",
    image: "/images/commons/3c2d7908aa0f7960.jpg",
    gallery: [
      {
        src: "/images/commons/3c2d7908aa0f7960.jpg",
        title: "Khaplu region",
        caption: "Baltistan · ALT 2,560M",
      },
    ],
    overview:
      "Khaplu is eastern Baltistan's heritage centre — Khaplu Palace, Chaqchan Mosque, and staging for Hushe and Masherbrum treks.",
    highlights: [
      "Khaplu Palace",
      "Chaqchan Mosque",
      "Hushe Valley access",
      "Balti homestays",
    ],
    bestTime: "April–October",
    gettingThere: "3 hours east from Skardu along the Shyok River.",
    altitude: "2,560M",
    placeSlugs: [],
    guide: khapluGuide,
  },
  {
    kind: "region",
    slug: "broghil-valley",
    name: "Broghil Valley",
    region: "Upper Chitral / GB",
    tagline: "Meadows at the edge of the Wakhan",
    description:
      "High pastures and Karambar Lake where the Hindu Kush, Pamir, and Karakoram meet.",
    image: "/images/commons/c75f51bdff0ce7b1.jpg",
    gallery: [
      {
        src: "/images/commons/c75f51bdff0ce7b1.jpg",
        title: "Broghil high country",
        caption: "Broghil · ALT 3,300M",
      },
      {
        src: "/images/commons/38e4771870c40695.jpg",
        title: "Karambar Lake",
        caption: "Broghil · ALT 4,200M",
      },
    ],
    overview:
      "Broghil is among the most remote destinations in northern Pakistan — Karambar Lake, yurt camps, and permits via Laspur or Darkut.",
    highlights: [
      "Karambar Lake",
      "Wakhi shepherd culture",
      "Polo on horseback",
      "Range junction views",
    ],
    bestTime: "July–August only",
    gettingThere: "Multi-day approach via Laspur or Darkut with permits.",
    altitude: "3,300M",
    placeSlugs: [],
    guide: broghilGuide,
  },
];
