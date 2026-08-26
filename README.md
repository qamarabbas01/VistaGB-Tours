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
# fill in public contact details plus RESEND_API_KEY and RESEND_FROM_EMAIL
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

See `.env.example`. Copy it to `.env.local` (gitignored). Public business
contact details (`NEXT_PUBLIC_CONTACT_*`) are shown on the site and must not
be committed as personal email or phone numbers. **Mail and LLM keys are
server-only** — never prefix them with `NEXT_PUBLIC_`. They are read from API
routes through `src/lib/server-env.ts` (`import "server-only"`), so a client
import fails the Next.js build. CI also runs `npm run check:secrets`.

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL for sitemap / OG |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public | Business email shown on the site |
| `NEXT_PUBLIC_CONTACT_PHONE` | Public | Business phone shown on the site |
| `NEXT_PUBLIC_CONTACT_PHONE_TEL` | Public | Optional E.164 `tel:` value (derived if omitted) |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_URL` | Public | Optional WhatsApp link (derived if omitted) |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | Public | Office address shown on `/contact` |
| `NEXT_PUBLIC_CONTACT_STREET` | Public | Optional street for JSON-LD |
| `NEXT_PUBLIC_CONTACT_CITY` | Public | City for JSON-LD |
| `NEXT_PUBLIC_CONTACT_REGION` | Public | Region for JSON-LD |
| `NEXT_PUBLIC_CONTACT_COUNTRY` | Public | ISO country code (default `PK`) |
| `NEXT_PUBLIC_CONTACT_LOCATION_LABEL` | Public | Footer / contact location label |
| `NEXT_PUBLIC_CONTACT_LOCATION_COORDS` | Public | Coordinate-style caption |
| `RESEND_API_KEY` | Server | Resend API key for contact emails |
| `RESEND_FROM_EMAIL` | Server | Verified from address |
| `CONTACT_EMAIL_TO` | Server | Optional inbox override |
| `OPENAI_API_KEY` | Server | Optional AI assistant key |
| `OPENAI_MODEL` | Server | Optional model override |

## Notes

- Destination and marketing images are hosted under `public/images/commons/` —
  Wikimedia Commons photos mirrored locally to avoid hotlink/`429` failures.
- Prefer replacing Commons placeholders over time with your own photography,
  official tourism images (with permission), or other properly licensed content
  you control (CDN or `/public`). High-quality owned shots make the biggest
  difference for production.
- Contact form includes a honeypot field and per-IP rate limiting.
- News is fetched from https://visitgilgitbaltistan.gov.pk and revalidated hourly.
- Dependencies: Dependabot opens weekly npm and GitHub Actions update PRs.
  `npm run audit` (and CI) fail on **critical** vulnerabilities.
