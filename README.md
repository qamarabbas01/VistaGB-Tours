# VistaGB Tours

A Next.js (App Router + TypeScript + Tailwind) website for **VistaGB Tours**,
a travel operator in Gilgit-Baltistan, Pakistan.

## Pages

- `/` — Home (hero, Why Choose VistaGB, Trending Destinations, Our Services)
- `/destinations` — Region hubs and place detail pages
- `/blog` — Travel guides and field notes (excerpts)
- `/news` — Latest news from the GB Tourism Department (scraped + cached)
- `/contact` — Inquiry form (Resend email)
- `/about`, `/privacy`, `/terms` — Company / legal

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
yarn install
cp .env.example .env.local
# fill in RESEND_API_KEY and RESEND_FROM_EMAIL
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

See `.env.example`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap / OG |
| `RESEND_API_KEY` | Resend API key for contact emails |
| `RESEND_FROM_EMAIL` | Verified from address |
| `CONTACT_EMAIL_TO` | Optional inbox override |

## Notes

- Destination and marketing images are hosted under `public/images/commons/` —
  Wikimedia Commons photos mirrored locally to avoid hotlink/`429` failures.
- Prefer replacing Commons placeholders over time with your own photography,
  official tourism images (with permission), or other properly licensed content
  you control (CDN or `/public`). High-quality owned shots make the biggest
  difference for production.
- Contact form includes a honeypot field and per-IP rate limiting.
- News is fetched from https://visitgilgitbaltistan.gov.pk and revalidated hourly.
