export const experiences = [
    {
      slug: "attabad-lake",
      name: "Attabad Lake",
      tagline: "Turquoise water on the Karakoram Highway",
      region: "Hunza · Gojal",
      image:
        "https://hunzaguidespakistan.com/wp-content/uploads/2023/12/Attabad-Lake.jpg",
    },
    {
      slug: "fairy-meadows",
      name: "Fairy Meadows",
      tagline: "Pine meadows beneath Nanga Parbat",
      region: "Diamer",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
    },
    {
      slug: "eagle-nest",
      name: "Eagle's Nest",
      tagline: "Sunset ridge above Hunza Valley",
      region: "Hunza",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
    },
    {
      slug: "deosai-plains",
      name: "Deosai Plains",
      tagline: "The Land of Giants at 4,000 metres",
      region: "Skardu",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
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
      image:
        "https://gulmitcontinentalhotel.com/wp-content/uploads/2022/10/passu-8.jpg",
    },
  ] as const;
  
  export const activities = [
    {
      title: "Trekking",
      detail:
        "Day hikes to multi-week Baltoro and Rakaposhi base-camp routes, with guides and porters arranged.",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop",
      mark: "01",
    },
    {
      title: "Jeep Safaris",
      detail:
        "4x4 journeys along the Karakoram Highway, Deosai plateau tracks, and high valley roads.",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
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
      image:
        "https://res.cloudinary.com/jerrick/image/upload/c_scale,f_jpg,q_auto/643599b38d0197001d05f18f.jpg",
    },
    {
      name: "Skardu & Deosai",
      days: "6 Days",
      price: "From PKR 110,000",
      summary:
        "Shangrila, cold deserts, Shigar Fort, and a full day on the Deosai Plains when the plateau is open.",
      includes: ["4x4 transport", "Lodges", "Permits"],
      image:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1600&auto=format&fit=crop",
    },
    {
      name: "Fairy Meadows Escape",
      days: "4 Days",
      price: "From PKR 70,000",
      summary:
        "Jeep to Tato, forest hike to pine meadows, and nights facing the Rupal Face of Nanga Parbat.",
      includes: ["Jeep & hike support", "Mountain lodge", "Meals"],
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
    },
    {
      name: "Karakoram Grand Circuit",
      days: "12 Days",
      price: "From PKR 220,000",
      summary:
        "Gilgit to Hunza, Nagar, Skardu, and Ghizer — a full arc of valleys for travellers with time.",
      includes: ["Custom itinerary", "Drivers & guides", "All stays"],
      image:
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
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
    { name: "Hunza", slug: "hunza-valley", top: "22%", left: "58%", alt: "2,438M" },
    { name: "Nagar", slug: "nagar", top: "30%", left: "52%", alt: "2,700M" },
    { name: "Gilgit", slug: "gilgit", top: "42%", left: "48%", alt: "1,500M" },
    { name: "Skardu", slug: "skardu", top: "48%", left: "68%", alt: "2,228M" },
    { name: "Astore", slug: "astore-valley", top: "58%", left: "55%", alt: "2,600M" },
    { name: "Fairy Meadows", slug: "fairy-meadows", top: "62%", left: "42%", alt: "3,300M" },
    { name: "Ghizer", slug: "ghizer", top: "38%", left: "32%", alt: "2,200M" },
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
      src: "/images/commons/3c2d7908aa0f7960.jpg",
      alt: "Mountain valley light",
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
      src: "/images/commons/bc57aaad67839099.jpg",
      alt: "Road through the Karakoram",
    },
    {
      src: "/images/commons/c79f4f12881921ba.jpg",
      alt: "Valley orchards and ridges",
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