import type { RegionDestination } from "../types";
import { nagarPlaceSlugs } from "../places/nagar";

export const nagarDestination: RegionDestination = {
  kind: "region",
  slug: "nagar",
  name: "Nagar",
  region: "Nagar",
  tagline: "Orchards, glaciers, and Rakaposhi",
  description:
    "The valley across the river from Hunza — forts, glaciers, and treks to Rakaposhi and Rush Lake.",
  image: "/images/commons/9df8326eb5be0e2f.jpg",
  gallery: [
    {
      src: "/images/commons/9df8326eb5be0e2f.jpg",
      title: "Hopper Valley",
      caption: "Nagar · ALT 2,800M",
    },
  ],
  overview:
    "Nagar lies north of the Hunza River, offering reciprocal valley views and access to Hopper Glacier, Minapin, and the Rakaposhi base camp trek. Rush Lake — one of the highest alpine lakes — is reached from Hopper Valley.",
  highlights: [
    "Nagar Khas and royal fort",
    "Hopper Valley and glacier",
    "Minapin trek base",
    "Rakaposhi base camp route",
    "Rush Lake expedition",
  ],
  bestTime: "April–October; blossom in April",
  gettingThere:
    "Bridge from Karimabad (~15 min) or drive from Gilgit via the KKH.",
  altitude: "2,700M",
  majorValleys: ["Nagar Khas", "Hopper", "Minapin", "Rush Lake trek"],
  placeSlugs: nagarPlaceSlugs,
};
