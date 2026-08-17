import type { RegionDestination } from "../types";
import { skarduGuide } from "../guides/skardu";
import { skarduPlaceSlugs } from "../places/skardu";

export const skarduDestination: RegionDestination = {
  kind: "region",
  slug: "skardu",
  name: "Skardu",
  region: "Baltistan",
  tagline: "Gateway to K2 and the Karakoram giants",
  description:
    "Turquoise lakes, cold desert dunes, and the launchpad for expeditions into the world's highest mountains.",
  image:
    "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
  gallery: [
    {
      src: "/images/commons/1a2b77e8ff37f557.jpg",
      title: "Karakoram from Kharpocho",
      caption: "Skardu basin",
      category: "mountains",
    },
    {
      src: "/images/commons/a4e211a59b3e995d.jpg",
      title: "Deosai plateau",
      caption: "Land of Giants",
      category: "mountains",
    },
    {
      src: "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
      title: "Lower Kachura Lake",
      caption: "Shangrila",
      category: "lakes",
    },
    {
      src: "https://www.shutterstock.com/image-photo/fascinating-view-sheosar-lake-deosai-260nw-1354546721.jpg",
      title: "Sheosar Lake",
      caption: "Deosai · ALT 4,142M",
      category: "lakes",
    },
    {
      src: "/images/commons/feb717273e82a627.jpg",
      title: "Shigar village orchards",
      caption: "Shigar Valley",
      category: "villages",
    },
    {
      src: "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
      title: "Katpana Cold Desert",
      caption: "Dunes beneath snow peaks",
      category: "mountains",
    },
    {
      src: "/images/commons/4e0000c8d4bbe492.jpg",
      title: "Roadside Balti stalls",
      caption: "Dried fruit, stones, and tea",
      category: "food",
    },
    {
      src: "/images/commons/e6db600e9067679f.jpg",
      title: "Kharpocho Fort",
      caption: "Balti heritage above the Indus",
      category: "culture",
    },
    {
      src: "/images/commons/3eee7ecb9b6c95a3.jpg",
      title: "High-country gathering season",
      caption: "Summer festivals on the plateau",
      category: "festivals",
    },
    {
      src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAyNjY2NjI3MTY1MDcwNDA0/basho-valley-the-hidden-gem-of-pakistan.jpg",
      title: "Basho pine lodges",
      caption: "Forest camps above Skardu",
      category: "hotels",
    },
    {
      src: "/images/commons/ba4b0d53d291cba4.jpg",
      title: "Baltoro approach",
      caption: "Trekking toward Askole and Concordia",
      category: "trekking",
    },
    {
      src: "/images/commons/b1292e3b1646570c.jpg",
      title: "Deosai crossing",
      caption: "Jeep tracks across the plateau",
      category: "trekking",
    },
  ],
  videos: [
    {
      youtubeId: "nwVim-eGDk4",
      title: "Jeep tracks of Gilgit-Baltistan",
      caption: "4x4 approaches toward high meadows and Nanga Parbat country.",
      theme: "jeep",
      poster: "/images/commons/a4e211a59b3e995d.jpg",
    },
    {
      youtubeId: "wNhfipFghlA",
      title: "High Karakoram trekking",
      caption: "Glacier travel of the kind that starts from Skardu and Askole.",
      theme: "trekking",
      poster: "/images/commons/ba4b0d53d291cba4.jpg",
    },
    {
      youtubeId: "hVhoz7LIGb0",
      title: "Winter on the Karakoram Highway",
      caption: "Snowbound road travel into Baltistan's approach valleys.",
      theme: "snowfall",
      poster: "/images/commons/1a2b77e8ff37f557.jpg",
    },
    {
      youtubeId: "cW2NAlwhaDk",
      title: "Northern Pakistan in colour",
      caption: "Lakes and orchard gold of the kind Skardu shares with Hunza.",
      theme: "autumn",
      poster: "/images/commons/feb717273e82a627.jpg",
    },
  ],
  overview:
    "Skardu is the hub of Baltistan — expeditions stock up here before K2 and Concordia. Surrounding valleys offer Shangrila and Kachura lakes, Katpana Desert, Deosai plateau, Shigar Fort, and the jeep track to Askole.",
  highlights: [
    "Shangrila and Kachura lakes",
    "Katpana Cold Desert sunsets",
    "Kharpocho Fort above town",
    "Shigar Valley and Askole route",
    "Deosai and Sheosar Lake crossings",
  ],
  bestTime: "May–October for road access; July–August for high passes",
  gettingThere:
    "Daily flights from Islamabad (weather permitting) or a 2-day drive via the Karakoram Highway and Gilgit.",
  altitude: "2,228M",
  majorValleys: ["Skardu town", "Shigar", "Basho", "Deosai plateau", "Baltoro approach"],
  placeSlugs: skarduPlaceSlugs,
  guide: skarduGuide,
};
