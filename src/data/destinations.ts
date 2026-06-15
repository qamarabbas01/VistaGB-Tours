export type Destination = {
  slug: string;
  name: string;
  region: string;
  altitude: string;
  tagline: string;
  description: string;
  image: string;
};

export const destinations: Destination[] = [
  {
    slug: "hunza-valley",
    name: "Hunza Valley",
    region: "Hunza",
    altitude: "2,438M",
    tagline: "Terraced orchards beneath Rakaposhi",
    description:
      "Apricot blossoms, glacial peaks, and centuries-old forts overlooking the Karakoram Highway.",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "skardu",
    name: "Skardu",
    region: "Baltistan",
    altitude: "2,228M",
    tagline: "Gateway to K2 and the Karakoram giants",
    description:
      "Turquoise lakes, cold desert dunes, and the launchpad for expeditions into the world's highest mountains.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "deosai-plains",
    name: "Deosai Plains",
    region: "Baltistan",
    altitude: "4,114M",
    tagline: "The Land of Giants",
    description:
      "Vast alpine plateau carpeted in wildflowers each summer, home to the Himalayan brown bear.",
    image:
      "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer",
    altitude: "3,300M",
    tagline: "Base camp views of Nanga Parbat",
    description:
      "Pine-fringed meadows facing the sheer Rupal Face — one of the most iconic views in the Himalaya.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "khaplu",
    name: "Khaplu",
    region: "Baltistan",
    altitude: "2,560M",
    tagline: "Royal palaces and silk-road heritage",
    description:
      "A restored 19th-century palace, apricot orchards, and trailheads into the Hushe and Saltoro valleys.",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "attabad-lake",
    name: "Attabad Lake",
    region: "Hunza",
    altitude: "2,560M",
    tagline: "Turquoise water born from a landslide",
    description:
      "A surreal blue lake formed in 2010, framed by sheer rock walls — boating and lakeside cafes.",
    image:
      "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
  },
];
