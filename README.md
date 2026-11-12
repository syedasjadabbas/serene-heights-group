# Serene Heights Group

Parent website for Serene Heights Group (DM Consortium). One cinematic scroll that links out to every Serene venture.

**Stack:** Next.js 16 · React 19 · Tailwind v4 · GSAP ScrollTrigger · Lenis · Three.js (React Three Fiber)

```bash
cd client
npm install
npm run dev        # http://localhost:3010
npm run build
npm run check      # project rule checks (assets, no fetch in components, plan maths, …)
```

Scripts call `node node_modules/next/...` directly because the `&` in the folder path breaks Windows `.cmd` shims.

## Layout
Follows the same structure as the other Serene apps (Serene Booking, Serene Management):

```
client/                      # Next.js App Router + TypeScript + Tailwind
  app/
    layout.tsx  page.tsx
    globals.css              # entry: Tailwind + one import per section stylesheet
    _styles/                 # tokens, base, ui, then one file per section (order matters)
    _components/             # home-page sections (Intro, Reveal, Projects, Stays, …)
      three/                 # WebGL scenes (Galiyat terrain, chrome emblem)
  global/
    components/              # shared UI (SiteHeader, SiteFooter, Emblem, SmoothScroll)
    hooks/                   # shared hooks (useInView, useDem)
    lib/                     # shared helpers, no UI (format, galiyat elevation loader)
    constants/site.ts        # group facts, projects, rooms, plans — single source of truth
  public/                    # media, elevation data, icon
  scripts/check.mjs          # `npm run check`
server/                      # (added when the first API feature lands: Express + Prisma)
```

## Sections
| Anchor | Section | Notes |
|---|---|---|
| `#top` | Hero → card ring | Hero card tilts away into a marquee + rotating project cards |
| `#about` | About the group | Capsule-emblem window opens onto a 3D model of the real Galiyat terrain (`public/data/galiyat-dem.bin`) with the resort marked |
| `#projects` | Ongoing projects | Horizontal pinned gallery → Nathia Gali, Lahore sites |
| `#stays` | Serene Booking | Fly-through gallery + availability form → Booking app `/rooms` |
| `#upcoming` | Upcoming projects | Unnamed teasers + WhatsApp interest |
| `#investors` | Serene Investors | Published payment plans calculator + reasons |
| `#contact` | Enquire | 3D chrome emblem |

## Config
- All facts live in `client/global/constants/site.ts` (items marked `CONFIRM` need client sign-off).
- `NEXT_PUBLIC_BOOKING_URL` — where the Serene Booking app is deployed (see `client/.env.example`).
- Colour tokens are on `:root` in `client/app/_styles/tokens.css`.

## Rules checked by `npm run check`
- Every `/media` and `/data` path referenced in code exists in `public/`.
- No `fetch()` inside components or hooks — data loading lives in `global/lib` (or `global/api`).
- Payment plans add up (30% down + 36 instalments = total).
- Room units total 130, matching the Serene Booking inventory.
- Every fly-through image in Stays has a placed position.
- Every `_styles` file is imported by `globals.css`, with no dangling imports.
- No `.env` files are committed (only `.env.example`).

## Deploying to Vercel
1. Import `syedasjadabbas/serene-heights-group` in Vercel and set **Root Directory** to `client`
   (framework, build command and output are detected automatically).
2. Environment variables (all optional — see `client/.env.example`):
   - `BOOKING_ORIGIN` — the Serene Booking website's Vercel URL (e.g. `https://serene-booking.vercel.app`).
     When set, this site serves Booking at **`/booking`** and every booking button opens it in the same tab.
     Leave empty and booking buttons open a pre-filled WhatsApp enquiry instead.
   - `INVESTORS_ORIGIN` — the Serene Investors Vercel URL. When set, this site serves it at
     **`/serene-investors`** and the Investors section shows an "Open Serene Investors" button.
   - `NEXT_PUBLIC_SITE_URL` — only needed once a custom domain is attached.
   - `NEXT_PUBLIC_ALLOW_INDEXING=true` — only on the real public domain after facts are signed off
     (pages are `noindex` otherwise, so a client preview never shows up in Google).
3. Every push to `main` redeploys.

## Serene Booking at `/booking` and Serene Investors at `/serene-investors` (Multi-Zones)
Serene Booking stays its own repo and Vercel project but appears inside this site at `/booking`.
`client/next.config.ts` rewrites `/booking` and `/booking/:path*` to `BOOKING_ORIGIN`; Booking is built with
`basePath: "/booking"` and sets its login cookie on `/booking/api/v1/auth`. Moving between the two apps is a
normal page load. `npm run check` confirms the rewrite exists and (when the Booking repo sits alongside)
that both apps agree on the path.

Serene Investors (repo `serene-investors`, local folder `stake-clone`) works the same way at `/serene-investors`
(`INVESTORS_ORIGIN`); its images, plain links and API calls go through `withBase()`.

**Run locally:** start Serene Booking (API on 4000, website on 3000) and Serene Investors (`next dev -p 3030`),
then put `BOOKING_ORIGIN=http://localhost:3000` and `INVESTORS_ORIGIN=http://localhost:3030` in
`client/.env.local` and start this site — `localhost:3010/booking` and `localhost:3010/serene-investors`.
