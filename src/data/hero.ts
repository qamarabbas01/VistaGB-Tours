export const experiences = [
    {
      slug: "attabad-lake",
      name: "Attabad Lake",
      tagline: "Turquoise water on the Karakoram Highway",
      region: "Hunza · Gojal",
      image: "/images/commons/4680a3d14ca1af46.jpg",
    },
    {
      slug: "fairy-meadows",
      name: "Fairy Meadows",
      tagline: "Pine meadows beneath Nanga Parbat",
      region: "Diamer",
      image: "/images/commons/bf2171654d99937a.jpg",
    },
    {
      slug: "eagle-nest",
      name: "Eagle's Nest",
      tagline: "Sunset ridge above Hunza Valley",
      region: "Hunza",
      image: "/images/commons/24a764cb8976da0d.jpg",
    },
    {
      slug: "deosai-plains",
      name: "Deosai Plains",
      tagline: "The Land of Giants at 4,000 metres",
      region: "Skardu",
      image: "/images/commons/b1292e3b1646570c.jpg",
    },
    {
      slug: "baltit-fort",
      name: "Baltit Fort",
      tagline: "700 years of Hunza heritage",
      region: "Karimabad",
      image: "/images/commons/92ff9643469e41ed.jpg",
    },
    {
      slug: "passu-cones",
      name: "Passu Cones",
      tagline: "Cathedral peaks of Upper Hunza",
      region: "Gojal",
      image: "/images/commons/988e06319b75f6d9.jpg",
    },
  ] as const;
  
  export const activities = [
    {
      title: "Trekking",
      detail:
        "Day hikes to multi-week Baltoro and Rakaposhi base-camp routes, with guides and porters arranged.",
      image: "/images/commons/ba4b0d53d291cba4.jpg",
      mark: "01",
    },
    {
      title: "Jeep Safaris",
      detail:
        "4x4 journeys along the Karakoram Highway, Deosai plateau tracks, and high valley roads.",
      image: "/images/commons/4e0000c8d4bbe492.jpg",
      mark: "02",
    },
    {
      title: "Cultural Heritage",
      detail:
        "Forts, polo grounds, apricot harvests, and village stays with families across Hunza and Baltistan.",
      image: "/images/commons/9ffbf7caa77b300f.jpg",
      mark: "03",
    },
    {
      title: "Photography Tours",
      detail:
        "Golden-hour ridges, glacial lakes, and night skies planned around light and season.",
      image: "/images/commons/4f5d8c42e41eb43e.jpg",
      mark: "04",
    },
  ] as const;
  
  export const packages = [
    {
      name: "Hunza Highlights",
      days: "5 Days",
      price: "From PKR 85,000",
      summary:
        "Karimabad forts, Attabad Lake, Passu Cones, and Eagle's Nest sunset — the classic first trip north.",
      includes: ["Private jeep", "Homestays", "Local guide"],
      image: "/images/commons/bd7ddfea0e6ee033.jpg",
    },
    {
      name: "Skardu & Deosai",
      days: "6 Days",
      price: "From PKR 110,000",
      summary:
        "Shangrila, cold deserts, Shigar Fort, and a full day on the Deosai Plains when the plateau is open.",
      includes: ["4x4 transport", "Lodges", "Permits"],
      image: "/images/commons/a4e211a59b3e995d.jpg",
    },
    {
      name: "Fairy Meadows Escape",
      days: "4 Days",
      price: "From PKR 70,000",
      summary:
        "Jeep to Tato, forest hike to pine meadows, and nights facing the Rupal Face of Nanga Parbat.",
      includes: ["Jeep & hike support", "Mountain lodge", "Meals"],
      image: "/images/commons/bf2171654d99937a.jpg",
    },
    {
      name: "Karakoram Grand Circuit",
      days: "12 Days",
      price: "From PKR 220,000",
      summary:
        "Gilgit to Hunza, Nagar, Skardu, and Ghizer — a full arc of valleys for travellers with time.",
      includes: ["Custom itinerary", "Drivers & guides", "All stays"],
      image: "/images/commons/5b4d6e89dc2760ac.jpg",
    },
  ] as const;
  
  export const reviews = [
    {
      quote:
        "Our Hunza trip felt completely personal — no rushed bus stops, just the valleys we asked for and guides who knew every turn.",
      name: "Sara K.",
      from: "Lahore",
      trip: "Hunza Highlights",
    },
    {
      quote:
        "Deosai in July was unforgettable. VistaGB handled the jeeps, weather calls, and a quiet overnight we wouldn't have found alone.",
      name: "James & Priya",
      from: "London",
      trip: "Skardu & Deosai",
    },
    {
      quote:
        "Fairy Meadows was the highlight of our Pakistan journey. Safe drivers, honest advice on altitude, and lodges that felt like home.",
      name: "Ahmed R.",
      from: "Karachi",
      trip: "Fairy Meadows Escape",
    },
  ] as const;
  
  export const statistics = [
    { value: "12+", label: "Valleys covered", detail: "Across Gilgit-Baltistan" },
    { value: "500+", label: "Trips guided", detail: "Since we started on the road" },
    { value: "8K+", label: "Metres of altitude", detail: "From Indus to Khunjerab" },
    { value: "98%", label: "Return interest", detail: "Travellers who plan a second trip" },
  ] as const;
  
  export const mapPins = [
    { name: "Hunza", slug: "hunza-valley", lat: 36.3167, lng: 74.65, alt: "2,438M" },
    { name: "Nagar", slug: "nagar", lat: 36.2667, lng: 74.7833, alt: "2,700M" },
    { name: "Skardu", slug: "skardu", lat: 35.2971, lng: 75.6335, alt: "2,228M" },
    { name: "Shigar", slug: "shigar-valley", lat: 35.4222, lng: 75.7333, alt: "2,300M" },
    { name: "Khaplu", slug: "khaplu", lat: 35.1547, lng: 76.3375, alt: "2,600M" },
    { name: "Deosai", slug: "deosai-plains", lat: 34.9833, lng: 75.4, alt: "4,114M" },
    { name: "Astore", slug: "astore-valley", lat: 35.3583, lng: 74.8556, alt: "2,600M" },
    { name: "Fairy Meadows", slug: "fairy-meadows", lat: 35.3889, lng: 74.5856, alt: "3,300M" },
  ] as const;
  
  export const galleryImages = [
    {
      src: "/images/commons/92ff9643469e41ed.jpg",
      alt: "Baltit Fort above Karimabad",
    },
    {
      src: "/images/commons/9ffbf7caa77b300f.jpg",
      alt: "Fort exterior in Hunza",
    },
    {
      src: "/images/commons/bd7ddfea0e6ee033.jpg",
      alt: "View over Karimabad",
    },
    {
      src: "/images/commons/bf2171654d99937a.jpg",
      alt: "Nanga Parbat from Fairy Meadows",
    },
    {
      src: "/images/commons/4f5d8c42e41eb43e.jpg",
      alt: "Reflection lake trail",
    },
    {
      src: "/images/commons/0f9b73f6df21d8d7.jpg",
      alt: "Phander Lake",
    },
    {
      src: "/images/commons/c75f51bdff0ce7b1.jpg",
      alt: "Broghil Valley",
    },
    {
      src: "/images/commons/9df8326eb5be0e2f.jpg",
      alt: "High peaks of Gilgit-Baltistan",
    },
    {
      src: "/images/commons/a79dc6d69e979ba6.jpg",
      alt: "Glacial landscape",
    },
    {
      src: "/images/commons/0f9b73f6df21d8d7.jpg",
      alt: "Phander Lake in Ghizer",
    },
    {
      src: "/images/commons/b1292e3b1646570c.jpg",
      alt: "Deosai Plains",
    },
    {
      src: "/images/commons/9ffbf7caa77b300f.jpg",
      alt: "Fort exterior in Hunza",
    },
    {
      src: "/images/commons/bd7ddfea0e6ee033.jpg",
      alt: "View over Karimabad",
    },
    {
      src: "/images/commons/bf2171654d99937a.jpg",
      alt: "Nanga Parbat from Fairy Meadows",
    },

  ] as const;
  
  export const faqs = [
    {
      question: "When is the best time to visit Gilgit-Baltistan?",
      answer:
        "April to October covers most routes. Spring brings apricot blossom in Hunza; July–September opens Deosai and high passes; autumn is clear and golden. Winter trips are possible around lower valleys but many high roads close.",
    },
    {
      question: "Do you run fixed group tours?",
      answer:
        "We specialise in private, tailored itineraries. We can join small private groups of friends or families, but we don't run large coach-style fixed departures.",
    },
    {
      question: "How do we get to Skardu or Gilgit?",
      answer:
        "Most travellers fly into Skardu or Gilgit from Islamabad when weather allows, or drive the Karakoram Highway over 1–3 days. We arrange airport pickups and road transfers either way.",
    },
    {
      question: "Is altitude a concern?",
      answer:
        "Yes — many stops sit above 2,500 metres, and Deosai or Khunjerab go higher. We build acclimatization into itineraries, monitor symptoms, and adjust pace when needed.",
    },
    {
      question: "What's included in a typical package?",
      answer:
        "Private transport, licensed drivers or guides, stays (hotels or homestays), and trip planning. Flights, personal gear, and some meals can be included or left flexible — we confirm everything before you pay.",
    },
    {
      question: "How far in advance should we book?",
      answer:
        "Four to eight weeks is ideal in peak season (May–September). Last-minute trips are sometimes possible outside festivals and long weekends — message us with dates and we'll check.",
    },
  ] as const;
