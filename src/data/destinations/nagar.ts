import type { RegionDestination } from "../types";
import { nagarGuide } from "../guides/nagar";
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
      src: "https://visitgilgitbaltistan.gov.pk/storage/images/amF3lOQaNWavgTlumgn9lgeW8FdoL1-metacmFrYXBvc2hpX3ZpZXdfcG9pbnRfcGFraXN0YW4uanBn-.jpg",
      title: "Rakaposhi south face",
      caption: "Nagar's signature peak",
      category: "mountains",
    },
    {
      src: "/images/commons/9df8326eb5be0e2f.jpg",
      title: "Hopper Valley",
      caption: "Glacier and orchard country",
      category: "mountains",
    },
    {
      src: "/images/commons/6d10e280381dc28e.jpg",
      title: "High alpine water",
      caption: "Rush Lake trek country",
      category: "lakes",
    },
    {
      src: "/images/commons/bd7ddfea0e6ee033.jpg",
      title: "Minapin and Nagar Khas",
      caption: "Stone villages beneath Rakaposhi",
      category: "villages",
    },
    {
      src: "/images/commons/24a764cb8976da0d.jpg",
      title: "Cherry and apricot orchards",
      caption: "Harvest tables and homestay kitchens",
      category: "food",
    },
    {
      src: "/images/commons/5c94f723e71aac65.jpg",
      title: "Blossom season across the river",
      caption: "April cherry and apricot festivals",
      category: "festivals",
    },
    {
      src: "/images/commons/9ffbf7caa77b300f.jpg",
      title: "Nagar royal fort architecture",
      caption: "Timber balconies of the old mirs",
      category: "culture",
    },
    {
      src: "/images/commons/92ff9643469e41ed.jpg",
      title: "Valley guesthouses",
      caption: "Hopper and Minapin lodges",
      category: "hotels",
    },
    {
      src: "/images/commons/ba4b0d53d291cba4.jpg",
      title: "Rakaposhi base camp trail",
      caption: "From Minapin into the alpine",
      category: "trekking",
    },
    {
      src: "/images/commons/a79dc6d69e979ba6.jpg",
      title: "Rush Lake expedition country",
      caption: "Multi-day glacier trek from Hopper",
      category: "trekking",
    },
  ],
  videos: [
    {
      youtubeId: "h_T_xd2OFhU",
      title: "Cherry harvest in Nagar",
      caption: "Orchard camping in Minapin at peak cherry season.",
      theme: "blossom",
      poster: "/images/commons/9df8326eb5be0e2f.jpg",
    },
    {
      youtubeId: "wNhfipFghlA",
      title: "Glacier trekking next door",
      caption: "The style of ice travel that leads to Rakaposhi and Rush Lake.",
      theme: "trekking",
      poster: "/images/commons/ba4b0d53d291cba4.jpg",
    },
    {
      youtubeId: "T5g1zK-bs-E",
      title: "Hunza–Nagar from above",
      caption: "The paired valleys across the Hunza River.",
      theme: "drone",
      poster: "/images/commons/bd7ddfea0e6ee033.jpg",
    },
    {
      youtubeId: "cW2NAlwhaDk",
      title: "Orchard gold",
      caption: "Autumn colour on the Nagar and Hunza terraces.",
      theme: "autumn",
      poster: "/images/commons/5c94f723e71aac65.jpg",
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
  guide: nagarGuide,
};
