# CoEstate

Fractional ownership of luxury holiday homes — co-own a fully managed luxury home from a small fraction of the cost, earn returns, and enjoy free stays.

- **Repository:** https://github.com/devsarvesh92/coestate
- **Hosting (Vercel):** https://vercel.com/sarveshdev92-2642s-projects/coestate
- **Status:** Interactive design prototype (static HTML/CSS/JS). Migrating to a Next.js + Supabase app.

## What this is

CoEstate lets several people co-own one luxury holiday home together. You buy a **share**, become a legally registered co-owner (the home is held in its own company), and enjoy the home plus its rental earnings in proportion to your share.

The immediate business goal is to **capture real interested-user leads** (a fundraising signal), so lead capture is a first-class feature.

## Tech stack

| Layer | Current (prototype) | Planned (product) |
|---|---|---|
| Markup/UI | Hand-written HTML | Next.js (App Router) + React + TypeScript |
| Styling | `mockup/styles.css` (CSS variables) | Tailwind CSS (same design tokens) |
| Interactivity | Vanilla JS (`mockup/app.js`) | React components + Server Actions |
| Data | `localStorage` (demo only) | Supabase (Postgres) |
| Hosting | Open the HTML file | Vercel (auto-deploy on push) |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the system design and [`docs/SETUP.md`](docs/SETUP.md) for environment setup.

## Repository structure

```
coestate/
├─ mockup/              # Static, fully-interactive design prototype
│  ├─ index.html        # Homepage (hero, how-it-works, featured homes, testimonials)
│  ├─ properties.html   # Listings with search + price filter
│  ├─ property.html     # Property detail + reservation card
│  ├─ contact.html      # Lead-capture (enquiry) form
│  ├─ styles.css        # Design system (Airbnb-inspired tokens)
│  └─ app.js            # Interactions: search, filters, calendar, lead capture
├─ docs/                # Architecture & setup documentation
└─ README.md
```

## Running the prototype

No build step. Open the file directly:

```bash
open mockup/index.html
```

Forms currently save leads to the browser's `localStorage` (inspect via `JSON.parse(localStorage.coestate_leads)` in the console). This becomes a real Supabase write in the product build.

## Roadmap

1. Push to GitHub + connect Vercel (in progress)
2. Scaffold Next.js + Tailwind
3. Port the design system into Tailwind theme + React components
4. Build pages (home, listings, detail) with mock data
5. Connect Supabase (`properties` + `leads` tables)
6. Lead forms → Supabase via Server Actions
7. Deploy to Vercel

## Design system

Airbnb-inspired: white canvas, single accent **Rausch `#ff385c`**, **Manrope** typeface, soft radii, one subtle shadow tier, generous whitespace. Tokens live as CSS variables in `mockup/styles.css` and will map onto the Tailwind theme.
