import Image from "next/image";

export const metadata = {
  title: "Blog — VistaGB Tours",
};

const posts = [
  {
    title: "Photographing Eagle's Nest at Sunset",
    excerpt:
      "Camera settings, timing, and the best viewpoints on Duikar ridge for Rakaposhi and Hunza Valley golden hour.",
    date: "July 2026",
    tag: "Photography",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Shandur Polo Festival: A Visitor's Guide",
    excerpt:
      "How to reach the world's highest polo ground, what to expect over three days, and where to camp at Shandur Top.",
    date: "June 2026",
    tag: "Culture",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "A Day Trip to Khunjerab Pass",
    excerpt:
      "Permits, border formalities, wildlife sightings, and how to plan a round trip from Hunza to the China border.",
    date: "June 2026",
    tag: "Road Trips",
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Phander Lake: The Hidden Gem of Ghizer",
    excerpt:
      "Turquoise water, trout fishing, and quiet Khowar villages — why Phander deserves more than a quick stop.",
    date: "May 2026",
    tag: "Nature",
    image:
      "https://images.unsplash.com/photo-1679951124125-50cc4029d727?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Katpana Desert: Where Sand Meets Snow",
    excerpt:
      "Skardu's cold desert at dusk — how the dunes glow against snowy peaks and when to visit for the best light.",
    date: "May 2026",
    tag: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b8f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Altitude Sickness in the Karakoram",
    excerpt:
      "Recognizing symptoms above 3,000 metres, acclimatization schedules, and when to descend on a GB itinerary.",
    date: "April 2026",
    tag: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1454496521418-7a8ce86f4361?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Five Dishes You Must Try in Hunza",
    excerpt:
      "From chapshuro and diram fitti to apricot soup — a food lover's shortlist for Karimabad and beyond.",
    date: "March 2026",
    tag: "Food",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "K2 Base Camp: Is the Trek Right for You?",
    excerpt:
      "Distance, difficulty, costs, and what a typical 14-day Baltoro Glacier trek demands from first-time trekkers.",
    date: "February 2026",
    tag: "Trekking",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Best Time to Visit Hunza Valley",
    excerpt:
      "Cherry and apricot blossoms in spring, golden harvest colors in autumn — here's how to pick your season in Hunza.",
    date: "May 2026",
    tag: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "A First-Timer's Guide to the Karakoram Highway",
    excerpt:
      "What to expect on the world's highest paved international road — road conditions, stops, and altitude tips.",
    date: "April 2026",
    tag: "Road Trips",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Trekking to Fairy Meadows: What to Pack",
    excerpt:
      "A practical packing list for the jeep ride and hike up to Nanga Parbat base camp views.",
    date: "March 2026",
    tag: "Trekking",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Homestays vs Hotels in Baltistan",
    excerpt:
      "Why staying with a local family in Khaplu or Shigar might be the highlight of your trip — and how to book one.",
    date: "February 2026",
    tag: "Culture",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Deosai Plains: When the Wildflowers Bloom",
    excerpt:
      "Visiting the 'Land of Giants' between June and September, when the plateau turns into a sea of color.",
    date: "January 2026",
    tag: "Nature",
    image:
      "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Attabad Lake: The Story Behind the Color",
    excerpt:
      "How a 2010 landslide created one of the most photographed lakes in Pakistan — and how to visit responsibly.",
    date: "December 2025",
    tag: "Stories",
    image:
      "https://images.unsplash.com/photo-1722082933604-288a1c130475?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Field Notes</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            The VistaGB Blog
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            Stories, guides, and notes from the road across Gilgit-Baltistan —
            written by our guides and travelers.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="coord-label mb-2">
                    {post.tag} · {post.date}
                  </p>
                  <h2 className="font-display text-xl font-semibold leading-snug text-glacier">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-apricot">
                    Read more →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
