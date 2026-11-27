# Serene Heights Group

The group website for Serene Heights (DM Consortium): **Serene Heights Nathia Gali**, Pakistan's first winter
resort at 7,906 ft, and **Serene Heights Lahore** on Gulberg Main Boulevard. One site serves two audiences, each
with its own header and menus:

- **Investing side** (green): projects, buying a hotel apartment or a share, payment plans, documents, buyers abroad.
- **Hotel side** (orange, under `/hotels`): accommodation, dining, experiences, offers and stay requests.

The site follows the client's Figma **"Serene Heights Group: Site Plan v1"** page for page, including its
templates, menus, topic links and visitor journeys.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4 and plain CSS split by section |
| **Motion and 3D** | GSAP ScrollTrigger, Lenis smooth scroll, Three.js with React Three Fiber |
| **Forms** | React Hook Form and Zod; every enquiry opens WhatsApp with the message ready to send |
| **Hosting** | Vercel, with Serene Booking and Serene Investors served on the same domain (Multi-Zones) |

---

## Getting started

Requires Node.js 20.9 or later.

```bash
cd client
npm install
npm run dev          # http://localhost:3010
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server on port 3010 |
| `npm run build` | Production build (every page is pre-rendered) |
| `npm run start` | Serves the production build on port 3010 |
| `npm run typecheck` | TypeScript check without building |
| `npm run check` | The project's 14 rule checks (see [Quality checks](#quality-checks)) |
| `npm run check -- --pending` | The same, plus every fact or file the client still has to supply, page by page |

> The scripts call `node node_modules/next/...` directly because the `&` in the local folder name
> (`WEBS & APPS`) breaks the Windows `.cmd` shims.

---

## Project structure

```
client/
  app/
    page.tsx                 Home page (HomeView)
    [...slug]/page.tsx       Every other page, pre-rendered from the page registry
    sitemap.ts  robots.ts    Search engine files
    opengraph-image.tsx      Share cards
    globals.css              Entry stylesheet: Tailwind, then one import per file in _styles (order matters)
    _styles/                 tokens, base, ui, header, footer, home sections, site (inner pages), inner (inner page design)
    _components/             Home sections (Intro, Stays, Projects, Reveal, Investors, Latest, Finale),
                             PageView and Blocks (inner pages), EnquiryForm, Calculator, GalleryGrid, TerrainMap
      three/                 WebGL scenes: the Galiyat terrain and the chrome emblem
    _lib/                    Enquiry fields and WhatsApp messages, share card
  global/
    site/                    The client's site plan as data
      types.ts               Page, block and template types, and the parts each template must contain
      pages/*.ts             Every page, grouped by section (group, investing, overseas, nathiagali, lahore, hotels, insights, utility)
      menus.ts               Both headers and both footers
      clusters.ts            Topic links and journey steps between pages
      index.ts               Page lookup, sections and breadcrumbs
    components/              Shared UI: SiteHeader, SiteFooter, Emblem, Link, SmoothScroll
    constants/site.ts        Group-level facts: one source of truth
    lib/  hooks/             Helpers and hooks with no UI (formatting, links, scroll memory, terrain data)
  public/                    Media, terrain elevation data, icons
  scripts/check.mjs          `npm run check`
```

---

## How pages are built

Every page except the home page is **data**. A page in `global/site/pages/*.ts` names its address, section,
template, opening (title, intro, picture, buttons) and a list of blocks:

```ts
{
  path: "/nathiagali/payment-plan",
  side: "invest",
  template: "payment",
  name: "Payment plan",
  title: "Payment plan for Serene Heights Nathia Gali",
  intro: "You pay 30% at booking and the balance in 36 monthly instalments.",
  blocks: [
    { id: "plan", kind: "table", h: "The plan", head: [...], rows: [...] },
    { id: "calculator", kind: "calculator", h: "Work out your payments" },
    ...
  ],
  pending: ["Two- and three-bedroom plans"],   // what the client still owes
}
```

- **Templates.** The plan draws 19 templates. `TEMPLATE_PARTS` in `types.ts` lists the parts each one must
  contain, in order, and `npm run check` fails if a page leaves one out.
- **Blocks.** Pages are made from 16 block kinds: cards, facts, table, text, questions, panels, media, timeline,
  pictures, gallery, map, calculator, booking bar, listing, band and form. `Blocks.tsx` renders them.
- **Links between pages.** `clusters.ts` holds the plan's "How pages link" board (each topic main page and its
  pages link both ways) and the journey steps that no main page covers. Any of these links a page doesn't
  already carry appear in its "See also" row.
- **Adding a page.** Add it to the right file in `pages/`, link it from a menu or main page, then run
  `npm run check`.

### Journeys

The six journey boards in the plan are covered link by link. Each step's pages link on to the next step's pages.
The "Thank you" pages are reached by sending a form.

- Where visitors come in
- Investor in Pakistan
- Investor abroad
- Hotel guest
- Owner
- Guest to owner, investor to guest

---

## Design

- **Home page:** one cinematic scroll covering a hero card ring, the "Own or stay" doors, the projects gallery,
  a 3D model of the real Galiyat terrain, the investors section, the latest news and the closing enquiry card
  with a 3D chrome emblem.
- **Inner pages:** these use the home page's language:
  - a framed picture opening with a two-tone heading and an "On this page" panel
  - night-green sections with a soft glow
  - numbered section labels
  - key facts as large figures
  - card sets led by a dark tile
  - questions laid out beside their heading
- **Colours, radii and easing** are tokens on `:root` in `app/_styles/tokens.css`.
- **Motion respects `prefers-reduced-motion`.** Links are plain anchors, so the Back button returns to the same
  scroll position.

---

## Enquiries

Forms collect the minimum: name, phone and the question, or dates for a stay. They are validated with Zod and
open WhatsApp with the message written out, then go to the matching thank-you page. There is no server or
database. Form fields and messages live in `app/_lib/enquiry.ts`.

---

## Search and sharing

- `sitemap.xml` lists every public page, plus the booking and investor sites. The thank-you and 404 pages are left out.
- `robots.txt` and each page's robots tag keep search engines out of the client preview. They open only when
  `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- Inner pages carry structured data: breadcrumbs, and FAQ and Article markup where they apply.
- Share cards (`opengraph-image`, `twitter-image`) are sized for WhatsApp, LinkedIn and X previews.
- Addresses from the earlier Nathia Gali and Lahore sites (`/serene-heights-nathiagali/...`,
  `/serene-heights-lahore/...`) redirect page by page to their new place (`next.config.ts`).

---

## Serene Booking and Serene Investors on the same domain

Both apps are separate repositories and Vercel projects. This site serves them under their own paths using
Next.js Multi-Zones, rewritten in `next.config.ts`:

| Path | App | Set |
|---|---|---|
| `/booking` | Serene Booking (built with `basePath: "/booking"`) | `BOOKING_ORIGIN` |
| `/serene-investors` | Serene Investors (built with `basePath: "/serene-investors"`) | `INVESTORS_ORIGIN` |

`npm run check` confirms that both rewrites exist and, when the sibling repositories sit alongside this one,
that each app's base path matches.

**Running all three locally:**

1. Start Serene Booking: API on port 4000, website on port 3000.
2. Start Serene Investors: `next dev -p 3030`.
3. Add these lines to `client/.env.local`:

   ```
   BOOKING_ORIGIN=http://localhost:3000
   INVESTORS_ORIGIN=http://localhost:3030
   ```

4. Start this site and open `localhost:3010/booking` and `localhost:3010/serene-investors`.

---

## Environment variables

All are optional; see `client/.env.example`. Never commit `.env` files.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, once a custom domain is attached. On Vercel the production URL is used automatically. |
| `BOOKING_ORIGIN` | Serene Booking deployment served at `/booking`. If it is empty, booking buttons open WhatsApp. |
| `INVESTORS_ORIGIN` | Serene Investors deployment served at `/serene-investors`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` only on the real domain once the client signs off the facts. |

---

## Deployment (Vercel)

1. Import the repository and set **Root Directory** to `client`. The framework and build settings are detected automatically.
2. Add the environment variables above as needed.
3. Each push to `main` deploys to production. Other branches get preview deployments.

---

## Quality checks

`npm run check` runs before each release and fails the run if any of these break:

1. Every referenced image and data file exists in `public/`.
2. There is no `fetch()` inside components or hooks.
3. Payment plans add up: 30% down plus 36 instalments equals the total.
4. Every page in the client's plan exists (74 pages, plus articles and the author page).
5. Every page image exists.
6. Every page contains its template's parts, in order.
7. Topic links name real pages.
8. No internal link is broken.
9. Every stylesheet in `_styles` is imported, with no imports pointing at missing files.
10. No `localhost` links in shipped code.
11. Share titles and descriptions fit link previews.
12. The Booking zone is wired at `/booking` and matches Booking's base path.
13. The Investors zone is wired at `/serene-investors` and matches Investors' base path.
14. No `.env` files are committed.

---

## Before launch

Run `npm run check -- --pending` for the full list. In short:

- **From the client:**
  - Lahore prices, documents and approvals, two- and three-bedroom layouts, and the payment plan PDF
  - which WhatsApp number to use, and the group's Instagram
  - the overseas contact person and accepted payment routes for each region
- **Legal:** a lawyer reviews the privacy policy, terms, cookies notice, investment disclaimer and the overseas pages.
- **Domains:** redirect the earlier Nathia Gali and Lahore domains to this site.
- **Go live:** set `NEXT_PUBLIC_ALLOW_INDEXING=true` on the real domain.
