import type { RegionDestination } from "../types";
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
      src: "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
      title: "Lower Kachura Lake",
      caption: "Skardu · ALT 2,228M",
    },
    {
      src: "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
      title: "Katpana Cold Desert",
      caption: "Skardu",
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/%22Jarbaso%22.jpg/1280px-%22Jarbaso%22.jpg',
      title: "Shigar Fort",
      caption: "Shigar Valley",
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
};
