export const metadata = {
  title: "News — VistaGB Tours",
};

const news = [
  {
    title: "Shandur Polo Festival 2026 Opens at the World's Highest Polo Ground",
    summary:
      "The three-day Shandur Polo Festival has kicked off at Shandur Top, drawing polo teams, travelers, and officials from across the region for one of Gilgit-Baltistan's most iconic events.",
    date: "11 June 2026",
    url: "https://visitgilgitbaltistan.gov.pk/pages/news/85",
  },
  {
    title: "Athlete Sets World Record Walking 808km from Peshawar to Skardu",
    summary:
      "Pakistani athlete Masood Khan completed an 808-kilometre walk from Peshawar to Skardu in nine days, setting a new world record and drawing attention to the region's mountain routes.",
    date: "24 May 2026",
    url: "https://visitgilgitbaltistan.gov.pk/pages/news/84",
  },
  {
    title: "Officials Review Preparations for Shandur Polo Festival 2026",
    summary:
      "A high-level meeting chaired by the Secretary of Tourism, Sports & Culture reviewed arrangements ahead of this year's Shandur Polo Festival, covering logistics and visitor facilities.",
    date: "16 May 2026",
    url: "https://visitgilgitbaltistan.gov.pk/pages/news/83",
  },
  {
    title: "Inter-Departmental Spring Sports Gala Opens Across Gilgit-Baltistan",
    summary:
      "A colourful opening ceremony marked the start of the 'Jashn-e-Baharan' inter-departmental sports gala, with wide participation from departments across the region.",
    date: "13 May 2026",
    url: "https://visitgilgitbaltistan.gov.pk/pages/news/82",
  },
  {
    title: "Tourism Department and EvK2CNR Honor High-Altitude Guides",
    summary:
      "A certificate distribution ceremony recognized local guides who completed high-altitude training in partnership with the EvK2CNR mountaineering organisation.",
    date: "12 May 2026",
    url: "https://visitgilgitbaltistan.gov.pk/pages/news/81",
  },
  {
    title: "Maarka-e-Haq Polo Tournament Concludes with Thrilling Final",
    summary:
      "The Maarka-e-Haq Polo Tournament wrapped up with a closely contested final at Wahab Shaheed Polo Ground, watched by a large crowd of local polo fans.",
    date: "11 May 2026",
    url: "https://visitgilgitbaltistan.gov.pk/pages/news/80",
  },
];

export default function NewsPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Regional Updates</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            News from Gilgit-Baltistan
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            Festivals, events, and developments from across the region,
            sourced from the Gilgit-Baltistan Tourism, Sports, Culture,
            Archaeology &amp; Museums Department.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="flex flex-col gap-6">
            {news.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-teal/20 bg-slate p-6 transition-colors hover:border-apricot/50 md:p-8"
              >
                <p className="coord-label mb-3">{item.date}</p>
                <h2 className="font-display text-xl font-semibold leading-snug text-glacier transition-colors group-hover:text-apricot md:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {item.summary}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-apricot">
                  Read full story →
                </span>
              </a>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-ice">
            Source:{" "}
            <a
              href="https://visitgilgitbaltistan.gov.pk/pages/news"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apricot hover:underline"
            >
              Gilgit-Baltistan Tourism Department — Official News
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
