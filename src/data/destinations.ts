export type Destination = {
  slug: string;
  name: string;
  region: string;
  altitude: string;
  tagline: string;
  description: string;
  image: string;
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
    description:
      "Apricot blossoms, glacial peaks, and centuries-old forts overlooking the Karakoram Highway.",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
    overview:
      "Hunza Valley sits along the Karakoram Highway where terraced apricot orchards climb toward glaciers and 7,000-metre peaks. Karimabad and Altit anchor the valley with restored forts, local bazaars, and viewpoints over Rakaposhi and Ultar Sar. Spring brings pink and white blossom; autumn turns the hills gold. Most travelers spend three to five days here, pairing village walks with day trips to Passu, Attabad Lake, and the Khunjerab corridor.",
    highlights: [
      "Baltit and Altit forts overlooking Karimabad",
      "Eagle's Nest sunset viewpoint above the valley",
      "Apricot and cherry blossom season (March–April)",
      "Passu Cones and Hussaini suspension bridge",
      "Local walnut cake, apricot jam, and Hunza cuisine",
    ],
    bestTime: "April–October; blossom in spring, harvest colours in autumn",
    gettingThere:
      "Drive north from Gilgit (~2.5 hours) or fly to Gilgit and continue by road. The Karakoram Highway from Islamabad takes 2–3 days with overnight stops.",
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
    slug: "gharipo",
    name: "Ghanche",
    region: "Baltistan",
    altitude: "2,620M",
    tagline: "Gateway to Siachen and Saltoro",
    description:
      "Remote villages, sparkling rivers, and ancient mosques at the edge of the Karakoram.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1463592177119-dc1ca6f7b696?q=80&w=1600&auto=format&fit=crop",
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
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((dest) => dest.slug === slug);
}
