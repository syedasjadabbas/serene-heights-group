# Serene Heights Group

The group website for Serene Heights (DM Consortium): **Serene Heights Nathia Gali**, Pakistan's first winter
resort at 7,906 ft, and **Serene Heights Lahore** on Gulberg Main Boulevard. One site serves two audiences, each
with its own header and menus:

- **Investing side** (green): projects, buying a hotel apartment or a share, payment plans, documents, buyers abroad.
- **Hotel side** (orange, under `/hotels`): accommodation, dining, experiences, offers and stay requests.

The site follows the client's Figma **"Serene Heights Group: Site Plan v1"** page for page, including its
templates, menus, topic links and visitor journeys. Two of its pages are served by sister apps in their own design:
- the Investing page (`/invest`) by **Serene Investors**
- the hotel home (`/hotels/nathia-gali`) by **Serene Booking**

**Live:** https://serene-heights-group.vercel.app (branch `main`; work happens on `structure-v2` and is merged by
pull request).

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
| `npm run check` | The project's 17 rule checks (see [Quality checks](#quality-checks)) |
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
database on this site. Online booking is the one exception: it lives in Serene Booking, which has its own API and
database. Form fields and messages live in `app/_lib/enquiry.ts`.

---

## Search and sharing

- `sitemap.xml` lists every public page in the plan. The thank-you and 404 pages are left out.
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
| `/hotels/nathia-gali` | Serene Booking (built with `basePath: "/hotels/nathia-gali"`) | `BOOKING_ORIGIN` |
| `/invest` | Serene Investors (built with `basePath: "/invest"`) | `INVESTORS_ORIGIN` |

**`/hotels/nathia-gali` is the plan's hotel home, served by Serene Booking** in its own design:
- Its front page follows the Hotel home board: A hotel in the highlands, Apartments, Time at the hotel, Nathia
  Gali, Where Serene Heights takes guests, Why book with the hotel directly, Own a unit on the same site, and
  Guest questions. Booking's search sits in the opening.
- It carries the client's hotel menu and footer.
- The plan's hotel pages under that address stay in this site (`HOTEL_PAGES` in `next.config.ts`):
  accommodation, dining, experiences, events, offers, gallery, location, faq, book (Reservations), policies,
  contact and things-to-do.
- Booking's own pages live under it: `/rooms`, `/checkout`, `/manage` (Find a booking), `/booking/<ref>`,
  `/login` and `/account`. The hotel pages' **Book online** buttons open `/hotels/nathia-gali/rooms`.
- Old `/booking` addresses redirect there.

**`/invest` is the plan's Investing page, served by Serene Investors** in its own design:
- Its front page follows the Hub page board: Start here, Key facts, What you can check, Questions buyers ask,
  the price-list form, and the plan's onward links.
- It carries the client's investing menu and footer.
- The plan's five guides under `/invest` stay in this site: how-it-works, earnings, buying-steps,
  risks-and-exit and compare. The rewrite skips them.
- Serene Investors' own pages that repeat a plan page (FAQ, progress, smart property, calculator and others)
  redirect to the plan page.
- Its sign-in and dashboard live at `/invest/login` and `/invest/dashboard`.
- Old `/serene-investors` addresses redirect to `/invest`.
- The group site's `/invest` entry in `pages/investing.ts` stays as the source of the wording.

`npm run check` confirms:
- both rewrites exist;
- when the sibling repositories sit alongside this one, each app's base path matches;
- every plan page under `/invest` or `/hotels/nathia-gali` stays with this site;
- Serene Investors' Investing page and Serene Booking's hotel home, with each app's menu and footer, still
  match this site's wording, figures and links.

**Running all three locally:**

1. Start Serene Booking: API on port 4000, website on port 3000.
2. Start Serene Investors: `next dev -p 3030`.
3. Add these lines to `client/.env.local`:

   ```
   BOOKING_ORIGIN=http://localhost:3000
   INVESTORS_ORIGIN=http://localhost:3030
   ```

4. Start this site and open `localhost:3010/hotels/nathia-gali` and `localhost:3010/invest`.

---

## Environment variables

All are optional; see `client/.env.example`. Never commit `.env` files.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, once a custom domain is attached. On Vercel the production URL is used automatically. |
| `BOOKING_ORIGIN` | Serene Booking deployment, which serves the hotel home at `/hotels/nathia-gali`. |
| `INVESTORS_ORIGIN` | Serene Investors deployment, which serves the Investing page at `/invest`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` only on the real domain once the client signs off the facts. |

---

## Deployment (Vercel)

Four Vercel projects make up the live site. All of them deploy when their repository's `main` branch changes.

| Project | Repository and root | Serves |
|---|---|---|
| `serene-heights-group` | this repo, `client` | everything not listed below |
| `serene-investors` | `serene-investors`, `.` | `/invest` (through this site) |
| `serene-booking-web` | `serene-booking`, `client` | `/hotels/nathia-gali` (through this site) |
| `serene-booking-api` | `serene-booking`, `server` | Booking's API, with its Neon database |

1. **This site:** import the repository, set **Root Directory** to `client`, and add the environment variables
   above. Each push to `main` deploys to production; other branches get preview deployments.
2. **Order of deploys:** when an app's base path or its pages change, deploy the app first and this site
   second. Otherwise this site briefly sends the address to an app that doesn't serve it yet.
3. **Git connection:** every project must be connected to its repository (**Settings → Git**). A project uploaded
   with the Vercel CLI (deployments marked `>_`) doesn't redeploy on push, and **Redeploy** only rebuilds the old
   upload.
4. **Apps' own settings:** each app's README lists them.
   - Booking: `SITE_URL` must be the hotel home's public address, and the API's `CLIENT_ORIGIN` must include
     this site.
   - Investors: `OTP_DEMO_CODES` and `RESEND_API_KEY`.

---

## Where the site differs from the Figma

These were agreed with the developer. The client should confirm them, ideally by updating the plan.

- **`/invest` and `/hotels/nathia-gali`** are served by Serene Investors and Serene Booking:
  - **What matches the plan:** their sections, wording, menus, footers and onward links (checked by `npm run check`).
  - **What differs:** they keep the apps' own design, and their menu opens from a **Menu** button instead of
    the bar with dropdowns.
- **The apps add working pages the plan doesn't draw:** booking search, checkout and Find a booking; investor
  sign-in and dashboard. They don't replace any plan page.
- **The hotel pages carry Book online buttons** beside Request your dates. These lead to live booking.

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
12. The Booking zone is wired at `/hotels/nathia-gali` and matches Booking's base path.
13. The Investors zone is wired at `/invest` and matches Investors' base path.
14. Plan pages under those two addresses stay with this site.
15. The Investing page in Serene Investors matches this site's wording, figures, links, menu and footer.
16. The hotel home in Serene Booking matches this site's wording, links, menu and footer.
17. No `.env` files are committed.

---

## Before launch

Run `npm run check -- --pending` for the full list. In short:

- **From the client:**
  - Lahore prices, documents and approvals, two- and three-bedroom layouts, and the payment plan PDF
  - which WhatsApp number to use, and the group's Instagram
  - the overseas contact person and accepted payment routes for each region
  - the hotel's opening date, real nightly rates and policies, and approval to take online bookings: the
    hotel pages still say the hotel is not open
  - approval of the two app pages (see above)
- **Legal:** a lawyer reviews the privacy policy, terms, cookies notice, investment disclaimer and the overseas pages.
- **Serene Investors:** turn off the demo sign-in codes and add the Resend email key.
- **Testing:** make one live booking on the hotel home, then cancel it with Find a booking.
- **Domains:**
  - Attach the real domain to this project, and redirect the earlier Nathia Gali and Lahore domains to it.
  - Update Booking's `SITE_URL` and `CLIENT_ORIGIN` to the new domain.
- **Go live:**
  - Set `NEXT_PUBLIC_ALLOW_INDEXING=true` on the real domain.
  - Online payment stays off until a payment gateway is connected.
