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
    'https://res.cloudinary.com/jerrick/image/upload/c_scale,f_jpg,q_auto/643599b38d0197001d05f18f.jpg',
  gallery: [
    {
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/1f/02/35/baltit-fort-hunza-gilgit.jpg?w=800&h=-1&s=1",
      title: "Karimabad panorama",
      caption: "Hunza · ALT 2,438M",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Baltit_fort%2C_Hunza_Valley.jpg",
      title: "Baltit Fort",
      caption: "Central Hunza",
    },
    {
      src: "https://hunzaguidespakistan.com/wp-content/uploads/2023/12/Attabad-Lake.jpg",
      title: "Attabad Lake",
      caption: "Gojal",
    },
    {
      src: "https://gulmitcontinentalhotel.com/wp-content/uploads/2022/10/passu-8.jpg",
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
