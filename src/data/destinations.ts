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
    description: "Apricot blossoms, glacial peaks, and centuries-old forts overlooking the Karakoram Highway.",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
    overview: "Hunza Valley sits along the Karakoram Highway where terraced apricot orchards climb toward glaciers and 7,000-metre peaks. Karimabad and Altit anchor the valley with restored forts, local bazaars, and viewpoints over Rakaposhi and Ultar Sar. Spring brings pink and white blossom; autumn turns the hills gold. Most travelers spend three to five days here, pairing village walks with day trips to Passu, Attabad Lake, and the Khunjerab corridor.",
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
    slug: "ghanche",
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
      "https://i.brecorder.com/primary/2024/07/20172202193b7b7.jpg",
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
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((dest) => dest.slug === slug);
}
