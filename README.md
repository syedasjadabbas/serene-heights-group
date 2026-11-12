# Serene Heights Group

Parent website for Serene Heights Group (DM Consortium). One cinematic scroll that links out to every Serene venture.

**Stack:** Next.js 16 · React 19 · Tailwind v4 · GSAP ScrollTrigger · Lenis · Three.js (React Three Fiber)

```bash
npm install
npm run dev        # http://localhost:3010
npm run build
```

Scripts call `node node_modules/next/...` directly because the `&` in the folder path breaks Windows `.cmd` shims.

## Sections
| Anchor | Section | Notes |
|---|---|---|
| `#top` | Hero → card ring | Hero card tilts away into a marquee + rotating project cards |
| `#about` | About the group | Capsule-emblem window opens onto a WebGL particle bloom |
| `#projects` | Ongoing projects | Horizontal pinned gallery → Nathia Gali, Lahore sites |
| `#stays` | Serene Booking | Fly-through gallery + availability form → Booking app `/rooms` |
| `#upcoming` | Upcoming projects | Unnamed teasers + WhatsApp interest |
| `#investors` | Serene Investors | Published payment plans calculator + reasons |
| `#contact` | Enquire | 3D chrome emblem |

## Config
- All facts live in `src/lib/site.ts` (items marked `CONFIRM` need client sign-off).
- `NEXT_PUBLIC_BOOKING_URL` — where the Serene Booking app is deployed (see `.env.example`).
- Colour tokens are on `:root` in `src/app/globals.css`.
