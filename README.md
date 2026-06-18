# VistaGB Tours

A Next.js (App Router + TypeScript + Tailwind) website for **VistaGB Tours**,
a travel operator in Gilgit-Baltistan, Pakistan.

## Pages

- `/` — Home (hero, Why Choose VistaGB, Trending Destinations, Our Services)
- `/destinations` — Famous places in Gilgit-Baltistan
- `/blog` — Travel guides and stories
- `/news` — Latest news, sourced from the GB Tourism Department
- `/contact` — Contact form & info

## Design

- **Palette**: near-black night (`#0B0F14`), alpine slate (`#16202B`),
  glacier white (`#E8ECEF`), ice blue (`#9FB3C2`), apricot accent (`#D98E4A`),
  slate-teal (`#5C7A8A`).
- **Type**: Fraunces (display/serif), Inter (body), JetBrains Mono
  (coordinate-style labels/eyebrows).
- **Signature element**: the "altitude line" — a topographic-style gradient
  divider with tick marks, used between major sections.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
Preview [https://vista-gb-tours.vercel.app/](VistaGb Tours).

## Notes

- Hero and destination images currently use Unsplash URLs as placeholders.
  Replace with your own photography in `src/data/destinations.ts` and
  `src/app/page.tsx` for production.
- The contact form is static (no submit handler yet) — wire it up to your
  preferred backend (e.g. an API route, Formspree, or email service).
- The `/news` page content is paraphrased from the official GB Tourism
  Department news feed (https://visitgilgitbaltistan.gov.pk/pages/news).
  For live data, build a small scraper or API route that fetches and
  caches this feed server-side.
