export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vista-gb-tours.vercel.app"
).replace(/\/$/, "");

export const site = {
  name: "VistaGB Tours",
  shortName: "VistaGB",
  title: "VistaGB Tours — Gilgit-Baltistan",
  description:
    "Discover the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan with VistaGB Tours — curated journeys, treks and stays across northern Pakistan.",
  ogDescription:
    "Curated journeys through the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan.",
  locale: "en_PK",
  defaultOgImage: "/images/commons/bd7ddfea0e6ee033.jpg",
  defaultOgAlt:
    "Snow-capped peaks of the Karakoram range above Hunza Valley",
} as const;
