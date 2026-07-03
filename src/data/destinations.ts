export type GalleryImage = {
  src: string;
  title: string;
  caption?: string;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  altitude: string;
  tagline: string;
  description: string;
  image: string;
  gallery: GalleryImage[];
  overview: string;
  highlights: string[];
  bestTime: string;
  gettingThere: string;
};

export const destinations: Destination[] = [
  {
    slug: "hunza-valley",
    name: "Hunza Valley",
    region: "Hunza",
    altitude: "2,438M",
    tagline: "Terraced orchards beneath Rakaposhi",
    description: "Apricot blossoms, glacial peaks, and centuries-old forts overlooking the Karakoram Highway.",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Hunza · ALT 2,438M",
      },
      {
        src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1600&auto=format&fit=crop",
        title: "Rakaposhi from Karimabad",
        caption: "Hunza · ALT 2,438M",
      },
      {
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Highway Vista",
        caption: "Hunza · ALT 2,438M",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow Trail",
        caption: "Hunza · ALT 2,438M",
      },
      {
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
        title: "Valley Orchard Season",
        caption: "Hunza · ALT 2,438M",
      },
    ],
    overview:
      "Hunza Valley sits along the Karakoram Highway...",
    highlights: [
      "Baltit and Altit forts overlooking Karimabad",
      "Eagle's Nest sunset viewpoint above the valley",
      "Apricot and cherry blossom season (March–April)",
      "Passu Cones and Hussaini suspension bridge",
      "Local walnut cake, apricot jam, and Hunza cuisine",
    ],
    bestTime:
      "April–October; blossom in spring, harvest colours in autumn",
    gettingThere:
      "Drive north from Gilgit (~2.5 hours) or fly to Gilgit and continue by road.",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Baltistan · ALT 2,228M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 2,228M",
      },
      {
        src: "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
        title: "Katpana Cold Desert",
        caption: "Baltistan · ALT 2,228M",
      },
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Shigar Fort",
        caption: "Baltistan · ALT 2,228M",
      },
    ],
    overview:
      "Skardu is the administrative and logistical hub of Baltistan — a town on the Indus where expeditions stock up before heading toward K2, Broad Peak, and the Gasherbrum massif. Beyond mountaineering, the surrounding valleys offer Shangrila Resort at Lower Kachura, the cold desert of Katpana, and the historic Kharpocho Fort rising above the river. Skardu works well as a base for three to seven days of lake visits, desert sunsets, and jeep transfers deeper into Baltistan.",
    highlights: [
      "Shangrila Resort and Lower Kachura Lake",
      "Katpana Cold Desert dunes at sunset",
      "Kharpocho Fort views over the Indus",
      "Gateway for K2 and Concordia treks",
      "Satpara Lake and Manthal Buddha rock",
    ],
    bestTime: "May–October for road access; July–August for high passes",
    gettingThere:
      "Daily flights from Islamabad (weather permitting) or a 2-day drive via the Karakoram Highway and Gilgit. Jeep transfers connect Skardu to surrounding valleys.",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
        title: "High Plateau Wildflowers",
        caption: "Baltistan · ALT 4,114M",
      },
      {
        src: "https://www.shutterstock.com/image-photo/fascinating-view-sheosar-lake-deosai-260nw-1354546721.jpg",
        title: "Sheosar Lake",
        caption: "Baltistan · ALT 4,114M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Baltistan · ALT 4,114M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Baltistan · ALT 4,114M",
      },
    ],
    overview:
      "Deosai National Park is one of the highest plateaus on earth — a treeless expanse of rolling grassland between Skardu and Astore. In summer, wildflowers cover the meadows and shepherds move their flocks across the passes. The park is a refuge for the Himalayan brown bear, though sightings require patience and an early start. Most visits are day trips or overnight camps from Skardu, crossing the Sadpara side or the Chilim Valley route from Astore.",
    highlights: [
      "Wildflower meadows from June through August",
      "Himalayan brown bear habitat (rare sightings)",
      "Sheosar Lake at the plateau's western edge",
      "Stargazing on clear high-altitude nights",
      "Bara Pani and Kala Pani river crossings",
    ],
    bestTime: "Late June–September when the park road is open",
    gettingThere:
      "Jeep from Skardu via Sadpara (~4 hours) or from Astore via Chilim (~3 hours). The plateau is snowbound outside summer; check road status before travelling.",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Diamer · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Diamer · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Diamer · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow Trail",
        caption: "Diamer · ALT 3,300M",
      },
    ],
    overview:
      "Fairy Meadows is a high alpine pasture at the foot of Nanga Parbat, the world's ninth-highest peak. The journey begins with a jeep ride on one of Pakistan's most dramatic roads, followed by a two- to three-hour hike through pine forest. Simple lodges and camps sit on the meadow's edge, facing the sheer Rupal Face — a wall of rock and ice that dominates the skyline. Most visitors stay one or two nights, with optional hikes toward Beyal Camp or Nanga Parbat base camp.",
    highlights: [
      "Unobstructed views of Nanga Parbat's Rupal Face",
      "Pine-forest hike from the jeep track end",
      "Beyal Camp and base camp extension treks",
      "Starry nights far from light pollution",
      "One of the most photographed vistas in Pakistan",
    ],
    bestTime: "May–October; clear mornings for peak views",
    gettingThere:
      "Drive from Chilas to Tato Village (~1.5 hours), then jeep to the trailhead (~30 min). Hike 2–3 hours to the meadows. Porters available at the trailhead.",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 2,560M",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Machlu_Village%2C_Khaplu_Ghizer_GB_%28Pakistan%29.jpg",
        title: "Machlu Village",
        caption: "Baltistan · ALT 2,560M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Baltistan · ALT 2,560M",
      },
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Heritage Fort",
        caption: "Baltistan · ALT 2,560M",
      },
    ],
    overview:
      "Khaplu is a riverside town in eastern Baltistan, quieter than Skardu but rich in heritage. The restored Khaplu Palace — now a heritage hotel — anchors the old bazaar, where apricot orchards and timber houses line narrow lanes. The town is the staging point for treks into Hushe Valley toward Masherbrum and the Saltoro range. Travellers seeking culture over crowds often base themselves here for two to four days.",
    highlights: [
      "Khaplu Palace and heritage bazaar",
      "Chaqchan Mosque — one of the oldest in the region",
      "Apricot orchards and riverside walks",
      "Trailhead for Hushe and Masherbrum treks",
      "Authentic Balti homestays and cuisine",
    ],
    bestTime: "April–October; harvest season in late summer",
    gettingThere:
      "Drive east from Skardu along the Shyok River (~3 hours). The road is scenic but narrow in places; allow a full morning for the transfer.",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
        title: "Turquoise Lake Waters",
        caption: "Hunza · ALT 2,560M",
      },
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Hunza · ALT 2,560M",
      },
      {
        src: "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
        title: "Kachura Lake",
        caption: "Hunza · ALT 2,560M",
      },
      {
        src: "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
        title: "High-Altitude Lake",
        caption: "Hunza · ALT 2,560M",
      },
    ],
    overview:
      "Attabad Lake appeared overnight in January 2010 when a massive landslide dammed the Hunza River, displacing communities and burying a stretch of the Karakoram Highway. Today the lake is a striking turquoise corridor between sheer rock walls — boat trips connect the north and south shores while a tunnel bypasses the submerged road. Cafes and viewpoints line the southern end near Karimabad, making it an easy half-day stop or a scenic transit point through upper Hunza.",
    highlights: [
      "Boat rides across turquoise glacial water",
      "Dramatic canyon walls rising from the lake",
      "Lakeside cafes and photo viewpoints",
      "Part of the Karakoram Highway scenic route",
      "Gateway to Passu and upper Hunza valleys",
    ],
    bestTime: "May–October when boats operate and roads are clear",
    gettingThere:
      "On the Karakoram Highway ~30 minutes north of Karimabad. Boats run from the southern shore; the Attabad Tunnel connects both ends of the lake.",
  },
  {
    slug: "passu",
    name: "Passu",
    region: "Upper Hunza",
    altitude: "2,500M",
    tagline: "Cathedrals of the North",
    description:
      "Dramatic serrated peaks, glacier walks, and iconic suspension bridges in the upper Hunza Valley.",
    image:
      "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Upper Hunza · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Upper Hunza · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Upper Hunza · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Highway Vista",
        caption: "Upper Hunza · ALT 2,500M",
      },
    ],
    overview:
      "Passu is famed for its saw-toothed Passu Cones (or Passu Cathedral) and its proximity to glaciers and pristine villages in Gojal, Upper Hunza. The town sits beneath towering peaks and beside the Hunza River, with the Batura and Passu glaciers within hiking range. Walk across the adrenaline-pumping Hussaini suspension bridge, visit Gulmit, and stay at family guesthouses for immersive cultural experiences.",
    highlights: [
      "Passu Cones at golden hour",
      "Hussaini suspension bridge crossing",
      "Day hikes to Passu and Batura Glaciers",
      "Explore nearby Ghulkin and Gulmit villages",
      "Local apricot and almond orchards",
    ],
    bestTime: "May–October; late spring and early autumn are ideal",
    gettingThere:
      "90-minute drive north of Karimabad on the Karakoram Highway. Public minibuses and private cars are available from Hunza town.",
  },
  {
    slug: "ghanche",
    name: "Ghanche",
    region: "Baltistan",
    altitude: "2,620M",
    tagline: "Gateway to Siachen and Saltoro",
    description:
      "Remote villages, sparkling rivers, and ancient mosques at the edge of the Karakoram.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
        title: "Remote Karakoram Valley",
        caption: "Baltistan · ALT 2,620M",
      },
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Baltistan · ALT 2,620M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 2,620M",
      },
      {
        src: "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
        title: "Base for Siachen Glacier expeditions (with sp…",
        caption: "Baltistan · ALT 2,620M",
      },
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Heritage Fort",
        caption: "Baltistan · ALT 2,620M",
      },
    ],
    overview:
      "Ghanche, also known as Ghangche or Gharipo, is one of the easternmost districts of Pakistan, bordering Ladakh and Siachen. It’s a land of dramatic topography, with glacial rivers flowing through deep valleys and vibrant villages clinging to mountain slopes. Explore the Chaqchan Mosque in Khaplu, freshwater springs, and trails into the Saltoro Mountains.",
    highlights: [
      "Saltoro Range trekking routes",
      "Chaqchan Mosque (14th-century heritage)",
      "Clear glacial rivers and springs",
      "Base for Siachen Glacier expeditions (with special permit)",
      "Traditional Balti culture and food",
    ],
    bestTime: "June–September; best for trekking and river views",
    gettingThere:
      "4-5 hours via Skardu by road. Private jeeps and local transport available from Skardu.",
  },
  {
    slug: "phander-valley",
    name: "Phander Valley",
    region: "Ghizer",
    altitude: "2,850M",
    tagline: "Emerald riverbanks and tranquil trout lakes",
    description:
      "Gentle slopes, crystal-clear lakes, and traditional wooden homes in the Gilgit region's most enchanting valley.",
    image:
      "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Ghizer · ALT 2,850M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Ghizer · ALT 2,850M",
      },
      {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
        title: "Remote Karakoram Valley",
        caption: "Ghizer · ALT 2,850M",
      },
      {
        src: "https://guidetourismpakistan.com/wp-content/uploads/2021/05/Shandur-pass-1.jpg",
        title: "Shandur Top",
        caption: "Ghizer · ALT 2,850M",
      },
    ],
    overview:
      "Phander is a tranquil valley in the Gilgit region, hemmed in by pine-covered hills and known for its mirror-like trout lakes. The Phander River splits and rejoins throughout the valley, with poplar and willow trees lining its green shores. It’s an idyllic escape for anglers, hikers, and anyone seeking village hospitality away from the main tourist routes.",
    highlights: [
      "Phander Lake's emerald waters and rainbow trout",
      "Village homestays and tea gardens",
      "Hikes through meadows and riverbanks",
      "Boat rides in serene surroundings",
      "Scenic road trip through the Ghizer valley",
    ],
    bestTime: "May–September; lushest in June and July",
    gettingThere:
      "6-7 hour drive over scenic mountain roads from Gilgit, passing through Gahkuch and the Ghizer valleys.",
  },
  {
    slug: "nagarkhas",
    name: "Nagar Khas",
    region: "Nagar",
    altitude: "2,700M",
    tagline: "Orchards, glaciers and Rakaposhi views",
    description:
      "Gateway to Rakaposhi Base Camp and a tapestry of flowering orchards, pastoral life, and ancient forts.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Nagar · ALT 2,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Nagar · ALT 2,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Nagar · ALT 2,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Nagar · ALT 2,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Highway Vista",
        caption: "Nagar · ALT 2,700M",
      },
    ],
    overview:
      "Nagar lies on the opposite side of the Hunza River from Karimabad, offering spectacular reciprocal views of the valley and direct access to treks up Rakaposhi and Diran. Spring is a riot of blossom and autumn brings vibrant harvests, while daily life revolves around farming, herding, and the local bazaar.",
    highlights: [
      "Rakaposhi base camp trek",
      "Hopper Glacier day hikes",
      "Viewpoints over both Nagar and Hunza valleys",
      "Royal fort and traditional stone homes",
      "Peach, apricot and apple orchards",
    ],
    bestTime: "April–October; blossom in April, harvest in September",
    gettingThere:
      "Cross the bridge from Karimabad to Nagar Khas, accessible by car or jeep in around 15 minutes from central Hunza.",
  },
  {
    slug: "rama-meadow",
    name: "Rama Meadow",
    region: "Astore",
    altitude: "3,300M",
    tagline: "Alpine meadows below Nanga Parbat",
    description:
      "Lush green pastures, towering pines, and crisp air at the doorstep to Nanga Parbat’s southern face.",
    image:
      "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Astore · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Astore · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Astore · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow Trail",
        caption: "Astore · ALT 3,300M",
      },
    ],
    overview:
      "Rama Meadow is an alpine oasis in the Astore Valley, known for its grassy glades and wood cabins. Surrounded by snowcapped peaks, it's the preferred launching point for trekkers heading to Nanga Parbat’s south face or nearby Rama Lake. The alpine setting turns lush green from May onwards, with wildflowers carpeting the slopes and yaks grazing at leisure.",
    highlights: [
      "Rama Lake reflections at sunrise",
      "Camping and bonfires in the meadow",
      "Trek to Nanga Parbat base camp (south side)",
      "Dense pine forests and wildlife viewing",
      "Authentic Astore hospitality",
    ],
    bestTime: "May–September; best for greenery and flower blooms",
    gettingThere:
      "Jeep or 4WD ride from Astore town, about 1 hour up a progressively rough road. Astore is 4-5 hours from Gilgit by road.",
  },
  {
    slug: "minapin",
    name: "Minapin",
    region: "Nagar",
    altitude: "2,036M",
    tagline: "Base for Rakaposhi and Diran Glacier treks",
    description:
      "A tranquil settlement in Nagar, gateway to multi-day treks and authentic village life.",
    image:
      "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Nagar · ALT 2,036M",
      },
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Nagar · ALT 2,036M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Nagar · ALT 2,036M",
      },
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Nagar · ALT 2,036M",
      },
      {
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Highway Vista",
        caption: "Nagar · ALT 2,036M",
      },
    ],
    overview:
      "Minapin is synonymous with adventure, being the favored starting point for the Rakaposhi and Diran base camp treks. Guesthouses line the irrigated fields, and the village offers a close-up of Nagar’s pastoral rhythms, traditional stone architecture, and spectacular valley views.",
    highlights: [
      "Rakaposhi base camp trekking route",
      "Panoramic views from Taghaphari",
      "Nagar stone homes and fruit orchards",
      "Sunset over the Hunza River",
      "Home-cooked Nagar food",
    ],
    bestTime: "May–October; snow-free trails in late spring and summer",
    gettingThere:
      "30 minutes by jeep from the Hunza-Nagar bridge, or public transport from Gilgit (about 3-4 hours total).",
  },
  {
    slug: "shigar-valley",
    name: "Shigar Valley",
    region: "Baltistan",
    altitude: "2,230M",
    tagline: "Gateway to the mountains beyond Skardu",
    description:
      "A wide, green valley with apricot orchards, 400-year-old mosques, and the famed Shigar Fort.",
    image:
      "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Heritage Fort",
        caption: "Baltistan · ALT 2,230M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 2,230M",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Machlu_Village%2C_Khaplu_Ghizer_GB_%28Pakistan%29.jpg",
        title: "Machlu Village",
        caption: "Baltistan · ALT 2,230M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Baltistan · ALT 2,230M",
      },
    ],
    overview:
      "Shigar is the launchpad for K2 expeditions and home to the beautifully restored Shigar Fort. The meandering river cradles villages rich in heritage, fruit-laden gardens, and sand dunes unique to the Karakoram’s lower reaches.",
    highlights: [
      "Shigar Fort (Sarfa Khar) heritage hotel",
      "Amburiq Mosque (UNESCO award-winning)",
      "Apricot and apple blossom in spring",
      "Gateway to Askole and Baltoro Glacier",
      "Stunning desert-oasis scenery",
    ],
    bestTime: "April–September; bloom in April, best weather in summer",
    gettingThere:
      "An hour’s drive (road paved) from Skardu along the Shigar River. Local taxis and private jeeps available.",
  },
  {
    slug: "gilgit",
    name: "Gilgit",
    region: "Gilgit",
    altitude: "1,500M",
    tagline: "Historic capital on the Silk Road",
    description:
      "Bazaar life, ancient carvings, and the meeting point of mountains and cultures at the region’s hub.",
    image:
      "https://i.brecorder.com/primary/2024/07/20172202193b7b7.jpg",
    gallery: [
      {
        src: "https://i.brecorder.com/primary/2024/07/20172202193b7b7.jpg",
        title: "Gilgit City",
        caption: "Gilgit · ALT 1,500M",
      },
      {
        src: "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
        title: "Naltar Valley",
        caption: "Gilgit · ALT 1,500M",
      },
      {
        src: "https://northbackend.northonwheels.com/storage/uploads/Gargo-Meadows-Bagrote-valley-5.jpg",
        title: "Bagrote Meadows",
        caption: "Gilgit · ALT 1,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Gilgit · ALT 1,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Gilgit · ALT 1,500M",
      },
    ],
    overview:
      "Gilgit is the principal city and historic crossroads of Gilgit-Baltistan, boasting a lively bazaar, tantalizing local cuisine, and easy trips to the Kargah Buddha or Naltar Valley. The city makes a convenient base for trips north to Hunza or west towards Chitral via the Shandur Pass.",
    highlights: [
      "Kargah Buddha rock carving",
      "Gilgit bazaar and food street",
      "Suspension bridge over the Gilgit River",
      "Nearby Nomal and Naltar Valley excursions",
      "Gateway to all of Gilgit-Baltistan",
    ],
    bestTime: "March–October; peak bloom in spring, mild autumn days",
    gettingThere:
      "Daily flights (weather permitting) from Islamabad or a 14-16 hour drive up the Karakoram Highway.",
  },
  {
    slug: "naltar-valley",
    name: "Naltar Valley",
    region: "Gilgit",
    altitude: "3,048M",
    tagline: "Pine forests, lakes, and ski slopes",
    description:
      "Home to vibrant alpine lakes, lush forests, a ski resort, and local villages tucked deep in the mountains.",
    image:
      "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
    gallery: [
      {
        src: "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
        title: "Naltar Valley",
        caption: "Gilgit · ALT 3,048M",
      },
      {
        src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAyNjY2NjI3MTY1MDcwNDA0/basho-valley-the-hidden-gem-of-pakistan.jpg",
        title: "Basho Valley",
        caption: "Gilgit · ALT 3,048M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Gilgit · ALT 3,048M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Gilgit · ALT 3,048M",
      },
    ],
    overview:
      "Naltar Valley is famed for its three dazzling lakes (known as the Bashkiri Lakes), dense pine forests, and a crisp alpine climate. The valley turns into a winter sports destination in January and February and is equally stunning in summer, with wildflowers and hiking trails. The bumpy jeep road from Gilgit is an adventure, but the payoff is pure tranquillity and natural splendour.",
    highlights: [
      "Naltar Lakes’ surreal blues and greens",
      "Alpine skiing at Pakistan’s oldest ski resort",
      "Wildflowers and forest walks in summer",
      "Starry skies and peaceful nights",
      "Mountain jeep rides from Gilgit",
    ],
    bestTime: "May–October for hiking and lakes; January–February for skiing",
    gettingThere:
      "45 km (2 hours) by jeep from Gilgit; private jeeps and local arrangements required beyond Nomal village. Road is rough but spectacular.",
  },
  {
    slug: "bagrote-valley",
    name: "Bagrote Valley",
    region: "Gilgit",
    altitude: "2,500M",
    tagline: "Gateway to glaciers and glacier-fed rivers",
    description:
      "A narrow valley south of Gilgit rimmed with glaciers, crystal streams, and vibrant villages famed for their apples and apricots.",
    image:
      "https://northbackend.northonwheels.com/storage/uploads/Gargo-Meadows-Bagrote-valley-5.jpg",
    gallery: [
      {
        src: "https://northbackend.northonwheels.com/storage/uploads/Gargo-Meadows-Bagrote-valley-5.jpg",
        title: "Bagrote Meadows",
        caption: "Gilgit · ALT 2,500M",
      },
      {
        src: "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
        title: "Naltar Valley",
        caption: "Gilgit · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Gilgit · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Gilgit · ALT 2,500M",
      },
    ],
    overview:
      "Bagrote is an agricultural valley set beneath immense peaks such as Rakaposhi and Diran. Turquoise rivers, traditional wooden homes, and scenic footpaths attract photographers and hikers. The valley is less developed for tourism, making it an offbeat alternative for immersion in mountain life and nature.",
    highlights: [
      "Footpaths lined with fruit orchards",
      "Danyor Glacier and Harcho village",
      "Views of Rakaposhi and Diran peaks",
      "Local Bagrote culture and food",
      "Pristine glacier-melt streams",
    ],
    bestTime: "April–October; bloom in spring, fruit in summer",
    gettingThere:
      "1-hour drive from Gilgit via Danyor town. Road suitable for cars and adventurous travelers; jeeps advised for off-road travel within the valley.",
  },
  {
    slug: "hoper-valley",
    name: "Hoper Valley",
    region: "Nagar",
    altitude: "2,800M",
    tagline: "Glaciers, peaks, and blossom orchards",
    description:
      "An emerald valley facing sweeping white glaciers and surrounded by barley fields, apple orchards, and historic stone houses.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hopar_Valley.jpg",
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hopar_Valley.jpg",
        title: "Hopar Glacier View",
        caption: "Nagar · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Nagar · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
        title: "High-Altitude Lake",
        caption: "Nagar · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Nagar · ALT 2,800M",
      },
    ],
    overview:
      "Hoper Valley is the heart of Nagar’s orchard culture and the base for treks onto the Hoper Glacier and toward the Barpu Glacier campsite. In blossom season, the fertile valley is alight with pinks and whites—a welcoming contrast to the wild, snowy terrain beyond. Watch local women tilling the fields and taste fresh apricots and apples right from the trees.",
    highlights: [
      "Panorama of Hoper Glacier and Miar Peak",
      "Blossom season in April–May",
      "Barpu Glacier trek and camping",
      "Stone village architecture and channels",
      "Farm-to-table fruit experience",
    ],
    bestTime: "April–September; spring bloom and late-summer harvest",
    gettingThere:
      "About 50 minutes’ drive from Karimabad or Nagar Khas on paved and rough village roads. Local taxis and jeeps available.",
  },
  {
    slug: "rush-lake",
    name: "Rush Lake",
    region: "Nagar",
    altitude: "4,694M",
    tagline: "One of the world's highest alpine lakes",
    description:
      "A glittering turquoise tarn, reached via multi-day trek, offering panoramic views of K2, Spantik, and Hunza peaks.",
    image:
      "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
        title: "High-Altitude Lake",
        caption: "Nagar · ALT 4,694M",
      },
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Nagar · ALT 4,694M",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hopar_Valley.jpg",
        title: "Hopar Glacier View",
        caption: "Nagar · ALT 4,694M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Nagar · ALT 4,694M",
      },
    ],
    overview:
      "The Rush Lake trek is for serious adventurers seeking extreme beauty. Starting from Hoper Valley, trekkers pass glaciers and meadows before reaching the mirror-like high-altitude lake. From the summit of Rush Peak nearby, there are unmatched views of the Karakoram, including peaks like Ultar Sar and Spantik. Camping and guides are essential.",
    highlights: [
      "Jaw-dropping Karakoram panoramas",
      "Reflections of snowy peaks in Rush Lake",
      "Wild camping and star-watching at altitude",
      "Trek through ablation valleys and summer pastures",
      "Descent to Hoper via glaciers",
    ],
    bestTime: "July–September for safe trekking conditions",
    gettingThere:
      "Drive to Hoper Valley (Nagar), then 3–4 day trek up to Rush Lake; hiring local porters/guides advised.",
  },
  {
    slug: "shandur-top",
    name: "Shandur Top",
    region: "Ghizer",
    altitude: "3,700M",
    tagline: "The Roof of the World and Polo Festival",
    description:
      "A high-altitude plateau famed for its wild beauty and the enigmatic annual Shandur Polo Festival, set between Chitral and Gilgit–Baltistan.",
    image:
      "https://guidetourismpakistan.com/wp-content/uploads/2021/05/Shandur-pass-1.jpg",
    gallery: [
      {
        src: "https://guidetourismpakistan.com/wp-content/uploads/2021/05/Shandur-pass-1.jpg",
        title: "Shandur Top",
        caption: "Ghizer · ALT 3,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Ghizer · ALT 3,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Ghizer · ALT 3,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
        title: "Remote Karakoram Valley",
        caption: "Ghizer · ALT 3,700M",
      },
    ],
    overview:
      "Shandur Top is often called 'The Roof of the World.' Each July, teams play polo in a rugged open-air stadium surrounded by lakes and wildflowers. The plateau separates the valleys of Gilgit and Chitral and is accessible only in summer. Off-festival, it’s a paradise for wild camping, trout fishing, and serious solitude.",
    highlights: [
      "Shandur Polo Festival in July",
      "Lakes, alpine meadows, and wildflowers",
      "Stunning road trips from Gupis/Phander or Mastuj",
      "Camping under immense skies",
      "Sweeping vistas toward Hindukush and Karakoram",
    ],
    bestTime: "Late June–August (road open, festival in July)",
    gettingThere:
      "Full-day drive from Gilgit via Gupis and Phander valleys. 4x4 required. Only accessible in summer due to snow.",
  },
  {
    slug: "sheosar-lake",
    name: "Sheosar Lake",
    region: "Deosai/Baltistan",
    altitude: "4,142M",
    tagline: "Mirror lake of Deosai",
    description:
      "A pristine alpine lake in the heart of Deosai National Park, reflecting snow peaks, wildflowers, and blue sky.",
    image:
      "https://www.shutterstock.com/image-photo/fascinating-view-sheosar-lake-deosai-260nw-1354546721.jpg",
    gallery: [
      {
        src: "https://www.shutterstock.com/image-photo/fascinating-view-sheosar-lake-deosai-260nw-1354546721.jpg",
        title: "Sheosar Lake",
        caption: "Deosai/Baltistan · ALT 4,142M",
      },
      {
        src: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
        title: "High Plateau Wildflowers",
        caption: "Deosai/Baltistan · ALT 4,142M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Deosai/Baltistan · ALT 4,142M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Deosai/Baltistan · ALT 4,142M",
      },
    ],
    overview:
      "Sheosar Lake is the gleaming heart of Deosai National Park, surrounded by the rolling grasslands of the high plateau. Panoramic views of Nanga Parbat on clear days, carpets of summer flowers, and silence broken only by marmots and fluttering cranes. Reached by jeep via Astore or Skardu.",
    highlights: [
      "Glass-like reflections of clouds and peaks",
      "Wildflowers and birdlife in summer",
      "Breathtaking views of Nanga Parbat",
      "Lakeside picnics and photography",
      "Part of the Deosai adventure circuit",
    ],
    bestTime: "July–September; snowbound the rest of year",
    gettingThere:
      "By jeep from Skardu via Deosai (rough, requires permit) or Astore via Chilim. The road may be impassable before July.",
  },
  {
    slug: "katpana-desert",
    name: "Katpana Desert",
    region: "Skardu",
    altitude: "2,226M",
    tagline: "Cold Desert of Skardu",
    description:
      "Golden dunes, blue sky, and snow-capped peaks flank one of the world’s highest cold deserts, minutes from Skardu town.",
    image:
      "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
    gallery: [
      {
        src: "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
        title: "Katpana Desert Overview",
        caption: "Skardu · ALT 2,226M",
      },
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Skardu · ALT 2,226M",
      },
      {
        src: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
        title: "High Plateau Wildflowers",
        caption: "Skardu · ALT 2,226M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Skardu · ALT 2,226M",
      },
    ],
    overview:
      "The Katpana Desert’s dreamlike dunes shimmer with sunlight during the day and beneath the Milky Way at night. Just outside Skardu, it’s a unique place to ride horses or just stroll and photograph the contrast of desert, river, and mountains.",
    highlights: [
      "Sunset photography across dunes",
      "Stargazing in clear, unpolluted skies",
      "Camel and horse rides by the Indus",
      "Snow-capped Himalayan horizon",
      "Easy access from Skardu town",
    ],
    bestTime: "April–October; best light in spring or early autumn",
    gettingThere:
      "10-minute drive from Skardu toward the airport; accessible by any vehicle.",
  },
  {
    slug: "machlu-village",
    name: "Machlu Village",
    region: "Baltistan",
    altitude: "2,900M",
    tagline: "Terraced village with panoramic Karakoram views",
    description:
      "A lesser-known gem near Khaplu, Machlu is a tranquil Balti village set among walnut orchards and snow peaks, with views toward the Masherbrum range.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Machlu_Village%2C_Khaplu_Ghizer_GB_%28Pakistan%29.jpg",
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Machlu_Village%2C_Khaplu_Ghizer_GB_%28Pakistan%29.jpg",
        title: "Machlu Village",
        caption: "Baltistan · ALT 2,900M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 2,900M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Baltistan · ALT 2,900M",
      },
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Heritage Fort",
        caption: "Baltistan · ALT 2,900M",
      },
    ],
    overview:
      "Machlu offers a window onto traditional Balti life and hospitality, with walking paths through orchards, stone houses clustered on sunlit terraces, and breathtaking mountain vistas. Stay in a homestay or mid-level lodge for a true escape from the rush.",
    highlights: [
      "Views of Masherbrum from the village",
      "Village walks among walnut and apricot trees",
      "Authentic Balti home cooking",
      "Spring blossom and autumn foliage",
      "Base for treks into Saltoro or Hushe valley",
    ],
    bestTime: "May–October; magical in spring or autumn",
    gettingThere:
      "About 40 minutes by jeep or taxi from Khaplu through rural roads.",
  },
  {
    slug: "basho-valley",
    name: "Basho Valley",
    region: "Skardu",
    altitude: "3,400M",
    tagline: "Abode of cedars and glaciers",
    description:
      "A pine-fringed valley beyond Skardu, famed for tall trees, glacier rivers, and campsites under a skyful of stars.",
    image:
      "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAyNjY2NjI3MTY1MDcwNDA0/basho-valley-the-hidden-gem-of-pakistan.jpg",
    gallery: [
      {
        src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAyNjY2NjI3MTY1MDcwNDA0/basho-valley-the-hidden-gem-of-pakistan.jpg",
        title: "Basho Valley",
        caption: "Skardu · ALT 3,400M",
      },
      {
        src: "https://www.ajktours.com/wp-content/uploads/2020/08/Naltar-Valley-Gilgit_Baltistan_122.jpg",
        title: "Naltar Valley",
        caption: "Skardu · ALT 3,400M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Skardu · ALT 3,400M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Skardu · ALT 3,400M",
      },
    ],
    overview:
      "Basho Valley offers a break from the dry, rocky terrain of lower Baltistan. The valley floor is laced with pines and dotted with wild campgrounds, with cool river breezes and views to Basho Peak. Ideal for families, trekkers, or anyone needing a cooling escape in summer.",
    highlights: [
      "Majestic pine forest and glacier creek picnics",
      "Easy hiking and nature observation",
      "Camping under the Milky Way",
      "Traditional wooden footbridges",
      "Wild berries and flowers in season",
    ],
    bestTime: "June–September (snow in winter, best in July/August)",
    gettingThere:
      "About one hour by jeep from Skardu toward Basho village. Last stretch is rough and requires a 4x4.",
  },
  {
    slug: "upper-kachura-lake",
    name: "Upper Kachura Lake",
    region: "Skardu",
    altitude: "2,500M",
    tagline: "Serene alpine lake hidden by forest",
    description:
      "Crystal-clear, deep blue waters surrounded by apricot orchards and forested slopes, near Skardu.",
    image:
      "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
    gallery: [
      {
        src: "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
        title: "Kachura Lake",
        caption: "Skardu · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
        title: "Turquoise Lake Waters",
        caption: "Skardu · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Skardu · ALT 2,500M",
      },
      {
        src: "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
        title: "High-Altitude Lake",
        caption: "Skardu · ALT 2,500M",
      },
    ],
    overview:
      "Upper Kachura Lake, far quieter than the resort-laden lower lake, is perfect for serene boat rides, trout fishing, or simply soaking up mountain silence. In spring and summer, the surrounding valleys are full of wildflowers and butterflies.",
    highlights: [
      "Peaceful boat rides and fishing",
      "Wildflowers and forested paths",
      "Views of the Karakoram reflected in the lake",
      "Picnics under fruit trees",
      "Less-crowded than Lower Kachura (Shangrila)",
    ],
    bestTime: "May–September; spring flowers, autumn foliage",
    gettingThere:
      "25–30 min drive from Skardu; walk about 10–15 minutes from the parking to the lake’s edge.",
  },
  {
    slug: "khunjerab-pass",
    name: "Khunjerab Pass",
    region: "Hunza",
    altitude: "4,693M",
    tagline: "Pakistan-China border in the clouds",
    description:
      "The highest paved international border crossing in the world—where the Karakoram Highway crests the Pakistan–China frontier.",
    image:
      "https://visitsilkroad.org/wp-content/uploads/2023/06/Khunjerab-Pass-featured_image.jpg.jpg",
    gallery: [
      {
        src: "https://visitsilkroad.org/wp-content/uploads/2023/06/Khunjerab-Pass-featured_image.jpg.jpg",
        title: "Khunjerab Pass",
        caption: "Hunza · ALT 4,693M",
      },
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Hunza · ALT 4,693M",
      },
      {
        src: "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
        title: "Turquoise Lake Waters",
        caption: "Hunza · ALT 4,693M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Hunza · ALT 4,693M",
      },
    ],
    overview:
      "Khunjerab Pass marks the end of the legendary Karakoram Highway. Windblown plateaus, grazing yaks, and border-marking arches attract visitors for dramatic photography and a taste of China-Pakistan crossroad culture. At nearly 4,700m, the air is thin, the scenery stark, and the experience unique.",
    highlights: [
      "Border gate and milestone photo ops",
      "Chance to spot Himalayan wildlife (ibex, marmots, yaks)",
      "Snow even in summer",
      "Sweeping scenes over Karakoram peaks",
      "Visit to Khunjerab National Park",
    ],
    bestTime: "June–September; closed in winter due to snow",
    gettingThere:
      "Drive from Sost, Hunza (about 2–3 hours); check KKH road status and border formalities before visiting.",
  },
  {
    slug: "gojal-valley",
    name: "Gojal Valley",
    region: "Upper Hunza",
    altitude: "2,800M",
    tagline: "Silk Road villages to the China border",
    description:
      "The upper Hunza corridor — glacier-fed rivers, Wakhi culture, and the last settlements before Khunjerab Pass.",
    image:
      "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Upper Hunza · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Upper Hunza · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Upper Hunza · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Highway Vista",
        caption: "Upper Hunza · ALT 2,800M",
      },
    ],
    overview:
      "Gojal stretches from Attabad Lake north to the Pakistan–China border, encompassing Gulmit, Passu, Sost, and a string of Wakhi-speaking villages along the Hunza River. It is the most international stretch of the Karakoram Highway — traders, trekkers, and border traffic pass through Sost before the climb to Khunjerab. The valley offers glacier walks, Borith Lake, and a distinct cultural rhythm from lower Hunza, with homestays in Gulmit and Ghulkin ideal for two to four nights.",
    highlights: [
      "Sost — last major town before the China border",
      "Gulmit and Ghulkin village walks",
      "Borith Lake and Batura Glacier day hikes",
      "Wakhi heritage, music, and apricot harvests",
      "Gateway to Khunjerab Pass and Khunjerab National Park",
    ],
    bestTime: "May–October; border road open June–September",
    gettingThere:
      "Drive north from Karimabad on the Karakoram Highway (~2–3 hours to Sost). Public transport and private jeeps run daily in season.",
  },
  {
    slug: "astore-valley",
    name: "Astore Valley",
    region: "Astore",
    altitude: "2,600M",
    tagline: "Gateway to Rama, Deosai, and Nanga Parbat",
    description:
      "A broad green valley south of the Karakoram — meadows, pine forests, and the road to Fairy Meadows and Deosai.",
    image:
      "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Astore · ALT 2,600M",
      },
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Astore · ALT 2,600M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Astore · ALT 2,600M",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow Trail",
        caption: "Astore · ALT 2,600M",
      },
    ],
    overview:
      "Astore is a fertile valley descending from the southern flanks of Nanga Parbat toward the Indus. The district town of Astore serves as a hub for trips to Rama Meadow, Sheosar Lake via Deosai, and the Fairy Meadows jeep track from Tato Village near Raikot Bridge. Less crowded than Hunza or Skardu, Astore rewards travelers who want forest walks, trout streams, and a slower pace — plan two to four days as a base for plateau and meadow excursions.",
    highlights: [
      "Rama Meadow and Rama Lake access",
      "Southern approach to Deosai National Park",
      "Tato Village trailhead for Fairy Meadows",
      "Pine forests and trout-filled rivers",
      "Traditional wooden villages and walnut orchards",
    ],
    bestTime: "May–October; Deosai access from late June",
    gettingThere:
      "4–5 hours by road from Gilgit over the Astore Valley road. Jeeps connect Astore town to Rama, Deosai, and Raikot Bridge.",
  },
  {
    slug: "hushe-valley",
    name: "Hushe Valley",
    region: "Baltistan",
    altitude: "3,050M",
    tagline: "Trailhead to Masherbrum and the Saltoro",
    description:
      "A remote Balti valley of stone villages and glacier rivers — the launchpad for treks toward Masherbrum and the Gondogoro La.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Baltistan · ALT 3,050M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 3,050M",
      },
      {
        src: "https://visitgilgitbaltistan.gov.pk/storage/images/dl0P1Wbj1i5mKshe2rIjYfkLtHL24W-metaZGVzZXJ0LmpwZw==-.jpg",
        title: "Authentic Balti villages",
        caption: "Baltistan · ALT 3,050M",
      },
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Heritage Fort",
        caption: "Baltistan · ALT 3,050M",
      },
    ],
    overview:
      "Hushe Valley branches east from Khaplu into some of the Karakoram's most dramatic trekking country. The village of Hushe sits beneath Masherbrum — the 'Queen of Peaks' — and marks the start of routes toward Gondogoro La, Masherbrum base camp, and the southern approaches to the Baltoro. Few tourists make it this far, so expect genuine Balti hospitality, irrigated barley terraces, and clear views of peaks above 7,000 metres.",
    highlights: [
      "Masherbrum base camp and Gondogoro La treks",
      "Views of Masherbrum, Laila Peak, and K6",
      "Authentic Balti villages — Hushe, Khurumal, Saicho",
      "Glacier-fed streams and summer pastures",
      "Less-travelled alternative to the Baltoro Highway",
    ],
    bestTime: "June–September for trekking; road open May–October",
    gettingThere:
      "Drive from Khaplu east along the Hushe River (~2 hours). The road is rough; 4x4 recommended. Porters and guides arrange at Hushe village.",
  },
  {
    slug: "askole",
    name: "Askole",
    region: "Baltistan",
    altitude: "3,048M",
    tagline: "Last village before K2",
    description:
      "The final settlement on the road to Concordia — where expeditions begin the trek along the Baltoro Glacier toward K2.",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Baltistan · ALT 3,048M",
      },
      {
        src: "https://images.unsplash.com/photo-1632133915653-8ded5c72e329?q=80&w=1600&auto=format&fit=crop",
        title: "Passu Cones",
        caption: "Baltistan · ALT 3,048M",
      },
      {
        src: "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
        title: "High-Altitude Lake",
        caption: "Baltistan · ALT 3,048M",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hopar_Valley.jpg",
        title: "Hopar Glacier View",
        caption: "Baltistan · ALT 3,048M",
      },
      {
        src: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?q=80&w=1600&auto=format&fit=crop",
        title: "Glacier Trail",
        caption: "Baltistan · ALT 3,048M",
      },
    ],
    overview:
      "Askole is the highest permanently inhabited village on the approach to the Baltoro Glacier and the legendary amphitheatre of Concordia — where K2, Broad Peak, and the Gasherbrums crowd the skyline. Reached by a rugged jeep track from Skardu via Shigar and Thongal, Askole is where porters are hired, loads are sorted, and trekkers take their first steps onto the glacier. Even if you are not climbing, the jeep journey and village stay offer a rare glimpse of expedition life at the edge of the Karakoram.",
    highlights: [
      "Starting point for K2 and Concordia treks",
      "Dramatic jeep ride through the Braldu Gorge",
      "Views toward the Baltoro and Muztagh Tower",
      "Expedition culture and Balti porter community",
      "Gateway to Paiju, Urdukas, and Goro camps",
    ],
    bestTime: "June–September; glacier trek season only",
    gettingThere:
      "Jeep from Skardu via Shigar and Thongal (~7–8 hours, often split over two days). Road is rough and seasonal; 4x4 essential.",
  },
  {
    slug: "yasin-valley",
    name: "Yasin Valley",
    region: "Ghizer",
    altitude: "2,700M",
    tagline: "Emerald valleys west of Gilgit",
    description:
      "Terraced fields, walnut forests, and Khowar-speaking villages in one of Ghizer's most beautiful and least-visited valleys.",
    image:
      "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Ghizer · ALT 2,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Ghizer · ALT 2,700M",
      },
      {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
        title: "Remote Karakoram Valley",
        caption: "Ghizer · ALT 2,700M",
      },
      {
        src: "https://guidetourismpakistan.com/wp-content/uploads/2021/05/Shandur-pass-1.jpg",
        title: "Shandur Top",
        caption: "Ghizer · ALT 2,700M",
      },
    ],
    overview:
      "Yasin Valley lies in western Ghizer District, reached over the scenic Gupis road from Gilgit. The valley is known for its green terraces, clear rivers, and the historic Darkut and Gupis connections toward Broghil and Chitral. Khalanga village is the main settlement; from here, day walks lead through walnut groves and summer pastures. Yasin suits travelers who have already seen Hunza and want a quieter, more pastoral side of Gilgit-Baltistan.",
    highlights: [
      "Terraced agriculture and walnut forests",
      "Khowar culture and traditional wooden architecture",
      "Scenic drive from Gupis through the Ghizer highlands",
      "Trout fishing in clear mountain streams",
      "Access toward Darkut and Broghil (permit required)",
    ],
    bestTime: "May–September; lush in June and July",
    gettingThere:
      "6–7 hours from Gilgit via Gupis and the Yasin road. 4x4 advised for side valleys; public transport reaches Khalanga in season.",
  },
  {
    slug: "borith-lake",
    name: "Borith Lake",
    region: "Upper Hunza",
    altitude: "2,600M",
    tagline: "High pasture lake beneath Passu peaks",
    description:
      "A quiet glacial lake on a yak pasture above Gulmit — turquoise water, tundra flowers, and views of the Passu Cones.",
    image:
      "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
        title: "Turquoise Lake Waters",
        caption: "Upper Hunza · ALT 2,600M",
      },
      {
        src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        title: "Indus Valley & Peaks",
        caption: "Upper Hunza · ALT 2,600M",
      },
      {
        src: "https://vepakistan.com/wp-content/uploads/2014/12/shangrila-fall.jpg",
        title: "Kachura Lake",
        caption: "Upper Hunza · ALT 2,600M",
      },
      {
        src: "https://images.unsplash.com/photo-1759027684392-0eecdf15da6e?q=80&w=1600&auto=format&fit=crop",
        title: "High-Altitude Lake",
        caption: "Upper Hunza · ALT 2,600M",
      },
    ],
    overview:
      "Borith Lake sits on a high meadow above Gulmit in Gojal, reached by a short hike or jeep track from the Karakoram Highway. The lake is a seasonal wetland fed by glacial melt — in summer, migratory birds rest here and the surrounding pasture blooms with wildflowers. On clear days, the Passu Cones and Batura Glacier dominate the horizon. A simple lodge near the shore makes this an easy overnight stop on an upper Hunza itinerary.",
    highlights: [
      "Reflective lake views with Passu Cones backdrop",
      "Birdwatching — ducks, geese, and migratory species",
      "Short hikes to Ghulkin Glacier viewpoint",
      "Summer wildflowers on the surrounding pasture",
      "Peaceful alternative to busier Attabad Lake",
    ],
    bestTime: "May–October; wildflowers in July and August",
    gettingThere:
      "Turn off the KKH near Gulmit; 15–20 minutes by jeep or a 45-minute hike from the road. Often combined with a Passu or Gojal stay.",
  },
  {
    slug: "satpara-lake",
    name: "Satpara Lake",
    region: "Skardu",
    altitude: "2,636M",
    tagline: "Skardu's alpine lake and dam",
    description:
      "A broad turquoise lake fed by Deosai meltwater — boating, trout fishing, and the gateway road to the plateau.",
    image:
      "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
        title: "High Plateau Wildflowers",
        caption: "Skardu · ALT 2,636M",
      },
      {
        src: "https://www.shutterstock.com/image-photo/fascinating-view-sheosar-lake-deosai-260nw-1354546721.jpg",
        title: "Sheosar Lake",
        caption: "Skardu · ALT 2,636M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Skardu · ALT 2,636M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Skardu · ALT 2,636M",
      },
    ],
    overview:
      "Satpara Lake lies a short drive south of Skardu, enclosed by barren hills and fed by the Deosai plateau's snowmelt. A dam has raised the water level, but the lake remains a popular half-day escape for boating, trout fishing, and picnics with views toward the Karakoram. The road continuing south from Satpara is the main route onto Deosai National Park, making the lake a natural stop before or after a plateau crossing.",
    highlights: [
      "Boat rides and trout fishing on the lake",
      "Views toward the Karakoram from the shoreline",
      "Gateway road to Deosai National Park",
      "Manthal Buddha rock carving nearby",
      "Easy half-day trip from Skardu town",
    ],
    bestTime: "May–October; combine with Deosai from late June",
    gettingThere:
      "20–30 minutes by car or jeep from Skardu. The Deosai road branches south from the lake; check plateau access before planning a crossing.",
  },
  {
    slug: "manthoka-waterfall",
    name: "Manthoka Waterfall",
    region: "Kharmang",
    altitude: "2,400M",
    tagline: "Baltistan's tallest cascade",
    description:
      "A 180-foot waterfall plunging into a green gorge — one of the most dramatic day trips from Skardu.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
        title: "Nanga Parbat Views",
        caption: "Kharmang · ALT 2,400M",
      },
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Kharmang · ALT 2,400M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Kharmang · ALT 2,400M",
      },
      {
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Highway Vista",
        caption: "Kharmang · ALT 2,400M",
      },
    ],
    overview:
      "Manthoka Waterfall is in Kharmang District, southeast of Skardu along the Indus River. The cascade drops roughly 180 feet into a mossy gorge surrounded by apricot orchards and terraced fields. A short walk from the parking area reaches viewpoints at the base, where the spray and roar of the falls make for a refreshing stop on a warm summer day. The area is developing basic visitor facilities while retaining its rural Balti character.",
    highlights: [
      "One of the highest waterfalls in Gilgit-Baltistan",
      "Short walk to the base through apricot orchards",
      "Scenic drive along the Indus from Skardu",
      "Nearby Blind Lake for a combined day trip",
      "Photography and picnic spots in the gorge",
    ],
    bestTime: "April–October; fullest flow in late spring and summer",
    gettingThere:
      "1.5–2 hours by jeep from Skardu toward Kharmang. Road is paved in sections; allow a half-day for the round trip.",
  },
  {
    slug: "gupis",
    name: "Gupis",
    region: "Ghizer",
    altitude: "2,900M",
    tagline: "Lakes and passes in western Ghizer",
    description:
      "A high valley town between Gilgit and Yasin — trout lakes, polo grounds, and the road toward Shandur.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Ghizer · ALT 2,900M",
      },
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Ghizer · ALT 2,900M",
      },
      {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
        title: "Remote Karakoram Valley",
        caption: "Ghizer · ALT 2,900M",
      },
      {
        src: "https://guidetourismpakistan.com/wp-content/uploads/2021/05/Shandur-pass-1.jpg",
        title: "Shandur Top",
        caption: "Ghizer · ALT 2,900M",
      },
    ],
    overview:
      "Gupis is the principal settlement of western Ghizer, set among rolling hills and glacial lakes. Khalti Lake, just outside town, mirrors the surrounding peaks and is stocked with trout. Gupis sits on the route between Gilgit and Phander, and the road east connects toward Yasin and eventually Shandur Top. The town makes a practical overnight stop on a westward Gilgit-Baltistan loop — less famous than Hunza, but equally photogenic in summer.",
    highlights: [
      "Khalti Lake trout fishing and boating",
      "Scenic position on the Gilgit–Phander–Shandur route",
      "Local polo and cultural events in summer",
      "Gateway to Yasin and Darkut valleys",
      "Rolling meadows and poplar-lined rivers",
    ],
    bestTime: "May–September; Shandur road open late June onward",
    gettingThere:
      "4–5 hours from Gilgit via the Ghizer Valley road. Connects west to Phander and north toward Shandur Top in summer.",
  },
  {
    slug: "ishkoman-valley",
    name: "Ishkoman Valley",
    region: "Ghizer",
    altitude: "2,800M",
    tagline: "Remote valleys toward the Pamir",
    description:
      "A northern Ghizer district of deep gorges, shepherd trails, and valleys that reach toward the Afghan Wakhan corridor.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
        title: "Remote Karakoram Valley",
        caption: "Ghizer · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
        title: "Ghizer Valley",
        caption: "Ghizer · ALT 2,800M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Ghizer · ALT 2,800M",
      },
      {
        src: "https://guidetourismpakistan.com/wp-content/uploads/2021/05/Shandur-pass-1.jpg",
        title: "Shandur Top",
        caption: "Ghizer · ALT 2,800M",
      },
    ],
    overview:
      "Ishkoman Valley branches north from Gahkuch in Ghizer District, following the Ishkoman River toward some of the most remote settled terrain in Gilgit-Baltistan. The valley is home to Wakhi and Domaaki-speaking communities, summer pastures, and trekking routes toward the Pamir Knot. Few organized tours reach Ishkoman, making it ideal for experienced travelers seeking homestays, multi-day hikes, and landscapes that feel far from the Karakoram Highway crowds.",
    highlights: [
      "Remote Wakhi villages and summer pastures",
      "Trekking routes toward the Pamir and Afghan border zone",
      "Deep gorges and glacial rivers",
      "Authentic homestay experiences",
      "Off-the-beaten-path complement to Phander and Yasin",
    ],
    bestTime: "June–September; snowbound in winter",
    gettingThere:
      "Turn north from Gahkuch on the Ishkoman road (~2–3 hours to central villages). 4x4 recommended; check local conditions before trekking toward border areas.",
  },
  {
    slug: "ganish-village",
    name: "Ganish Village",
    region: "Hunza",
    altitude: "2,420M",
    tagline: "Ancient settlement on the Silk Road",
    description:
      "One of Hunza's oldest villages — carved wooden mosques, narrow lanes, and 1,000 years of Karakoram trade history.",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        title: "Karakoram Panorama",
        caption: "Hunza · ALT 2,420M",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
        title: "Balti Heritage",
        caption: "Hunza · ALT 2,420M",
      },
      {
        src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1600&auto=format&fit=crop",
        title: "Rakaposhi from Karimabad",
        caption: "Hunza · ALT 2,420M",
      },
      {
        src: "https://images.unsplash.com/photo-1677103036843-df9e5ad74eea?q=80&w=1600&auto=format&fit=crop",
        title: "Heritage Fort",
        caption: "Hunza · ALT 2,420M",
      },
    ],
    overview:
      "Ganish sits on the Karakoram Highway just south of Karimabad, yet feels centuries apart from the tourist bustle above. Narrow stone lanes wind between mosques with carved wooden pillars, ancient watchtowers, and communal water channels fed by glacier melt. The village won a UNESCO Asia-Pacific Heritage Award for its restoration work, and guided walks reveal inscriptions, shrines, and stories from the Silk Road era. Allow a half-day from Karimabad to explore properly.",
    highlights: [
      "UNESCO-recognised heritage restoration",
      "Carved wooden mosques and watchtowers",
      "Silk Road history and ancient inscriptions",
      "Guided heritage walks with local historians",
      "Easy access from Karimabad on the KKH",
    ],
    bestTime: "April–October; blossom season in spring",
    gettingThere:
      "5 minutes south of Karimabad on the Karakoram Highway, or a short walk from central Hunza. Heritage guides available through local community organisations.",
  },
  {
    slug: "broghil-valley",
    name: "Broghil Valley",
    region: "Upper Chitral / GB",
    altitude: "3,300M",
    tagline: "Meadows at the edge of the Wakhan",
    description:
      "High pastures, turquoise lakes, and yurt camps where Gilgit-Baltistan meets the Afghan Pamir — accessible only in summer.",
    image:
      "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
        title: "High Plateau Wildflowers",
        caption: "Upper Chitral / GB · ALT 3,300M",
      },
      {
        src: "https://www.shutterstock.com/image-photo/fascinating-view-sheosar-lake-deosai-260nw-1354546721.jpg",
        title: "Sheosar Lake",
        caption: "Upper Chitral / GB · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1663076255844-899903badedc?q=80&w=1600&auto=format&fit=crop",
        title: "Alpine Meadow",
        caption: "Upper Chitral / GB · ALT 3,300M",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        title: "River Valley Panorama",
        caption: "Upper Chitral / GB · ALT 3,300M",
      },
    ],
    overview:
      "Broghil Valley is one of the most remote destinations in northern Pakistan — a high bowl of meadows and lakes at the junction of the Hindu Kush, Pamir, and Karakoram. Reached from Laspur in Upper Chitral or via Darkut in Yasin (with permits), Broghil is known for Karambar Lake, polo on horseback, and views toward the Wakhan Corridor. The journey is demanding, but the reward is solitude, wildflowers, and a landscape unlike anywhere else in Gilgit-Baltistan.",
    highlights: [
      "Karambar Lake — one of the highest biologically active lakes",
      "Summer yurt camps and Wakhi shepherd culture",
      "Wildflowers and snow leopards in surrounding peaks",
      "Polo on horseback — a Broghil tradition",
      "Junction of Hindu Kush, Pamir, and Karakoram ranges",
    ],
    bestTime: "July–August only; snowbound and inaccessible otherwise",
    gettingThere:
      "Multi-day approach via Laspur (Chitral) or Darkut (Yasin) with 4x4 and trekking. NOC and local permits required; plan with an experienced operator.",
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((dest) => dest.slug === slug);
}
