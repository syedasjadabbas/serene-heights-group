// Project rule checks — run with `npm run check`. Exits non-zero if any rule is broken.
// One check per non-trivial rule in the coding structure / site content.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = await import("../global/constants/site.ts");

const failures = [];
const passes = [];
const check = (name, ok, detail = "") => (ok ? passes : failures).push(detail ? `${name} — ${detail}` : name);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (f === "node_modules" || f.startsWith(".next")) return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const sources = [...walk(join(ROOT, "app")), ...walk(join(ROOT, "global"))].filter((f) => /\.(tsx?|css)$/.test(f));
const read = (f) => readFileSync(f, "utf8");
const rel = (f) => relative(ROOT, f).replaceAll("\\", "/");

// 1. Every /media or /data path referenced in code exists in public/.
{
  const missing = [];
  // Ignore comments (block comments and whole-line // comments) so examples in docs don't count.
  const code = (f) => read(f).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  for (const f of sources) {
    for (const [, p] of code(f).matchAll(/["'`(](\/(?:media|data)\/[^"'`)\s]+)/g)) {
      if (!existsSync(join(ROOT, "public", p))) missing.push(`${p} (${rel(f)})`);
    }
  }
  check("Every referenced asset exists in public/", missing.length === 0, missing.join(", "));
}

// 2. No fetch() in components or hooks — data loading lives in global/lib (or global/api once it exists).
{
  const offenders = sources
    .filter((f) => !/global[\\/](lib|api)[\\/]/.test(f) && /\.tsx?$/.test(f))
    .filter((f) => /\bfetch\s*\(/.test(read(f)))
    .map(rel);
  check("No fetch() inside components or hooks", offenders.length === 0, offenders.join(", "));
}

// 3. Payment plans add up: down payment is 30% and down + 36 instalments ≈ total.
{
  const bad = site.plans.filter(
    (p) => Math.abs(p.down - p.total * 0.3) > p.total * 0.001 || Math.abs(p.down + p.monthly * 36 - p.total) > 36,
  );
  check("Payment plans: 30% down + 36 instalments = total", bad.length === 0, bad.map((p) => p.id).join(", "));
}

// 4. Room inventory matches Serene Booking (130 one-bedroom apartments).
{
  const total = site.rooms.reduce((n, r) => n + r.units, 0);
  check("Room units total 130 (Serene Booking inventory)", total === 130, `got ${total}`);
}

// 5. Every fly-through image has a hand-placed position in Stays.
{
  const stays = read(join(ROOT, "app/_components/Stays.tsx"));
  const spots = (stays.slice(stays.indexOf("const SPOTS"), stays.indexOf("];", stays.indexOf("const SPOTS"))).match(/\{ x:/g) || []).length - 1;
  check("Stays: one position per image", spots === site.stayImages.length, `${site.stayImages.length} images, ${spots} positions`);
}

// 6. Every section stylesheet is imported by globals.css, and every import exists.
{
  const globals = read(join(ROOT, "app/globals.css"));
  const imported = [...globals.matchAll(/@import "\.\/_styles\/([^"]+)"/g)].map((m) => m[1]);
  const files = readdirSync(join(ROOT, "app/_styles"));
  const notImported = files.filter((f) => !imported.includes(f));
  const dangling = imported.filter((f) => !files.includes(f));
  check("All _styles files imported, no dangling imports", !notImported.length && !dangling.length, [...notImported, ...dangling].join(", "));
}

// 7. Nothing shipped points at a local dev server.
{
  const offenders = sources.filter((f) => /localhost|127\.0\.0\.1/.test(read(f))).map(rel);
  check("No localhost links in shipped code", offenders.length === 0, offenders.join(", "));
}

// 8. Booking links only go through global/lib/booking (so they fall back to WhatsApp until booking is live).
{
  const offenders = sources
    .filter((f) => !/global[\\/](lib[\\/]booking|constants[\\/]site)\.ts$/.test(f))
    .filter((f) => /\bBOOKING_URL\b/.test(read(f)))
    .map(rel);
  check("Booking links use global/lib/booking", offenders.length === 0, offenders.join(", "));
}

// 9. Share metadata fits where it is shown: title ≤ 60 and description ≤ 160 characters (Google/WhatsApp
//    truncate beyond), and the share card's background photo exists.
{
  const problems = [];
  if (site.site.title.length > 60) problems.push(`title is ${site.site.title.length} chars`);
  if (site.site.description.length > 160) problems.push(`description is ${site.site.description.length} chars`);
  if (!existsSync(join(ROOT, "public/media/og/background.jpg"))) problems.push("share card background missing");
  check("Share metadata fits previews", problems.length === 0, problems.join(", "));
}

// 10. Booking zone: /booking is rewritten (page + sub-paths) and matches Serene Booking's base path.
{
  const cfg = read(join(ROOT, "next.config.ts"));
  const path = (cfg.match(/BOOKING_PATH = "([^"]+)"/) || [])[1];
  const problems = [];
  if (!path) problems.push("BOOKING_PATH missing in next.config.ts");
  if (!/source: BOOKING_PATH,/.test(cfg) || !/source: `\$\{BOOKING_PATH\}\/:path\*`/.test(cfg)) problems.push("rewrites must cover /booking and /booking/:path*");
  // When the Serene Booking repo sits next to this one (local dev), compare base paths directly.
  const sibling = join(ROOT, "../../Serene Booking/client/next.config.mjs");
  let note = "";
  if (existsSync(sibling)) {
    const bp = (read(sibling).match(/NEXT_PUBLIC_BASE_PATH \?\? "([^"]*)"/) || [])[1];
    if (bp !== path) problems.push(`Serene Booking basePath is "${bp}", group site expects "${path}"`);
    else note = `matches Serene Booking basePath "${bp}"`;
  } else note = "Serene Booking repo not alongside — base path not compared";
  check("Booking zone wired at " + (path || "?"), problems.length === 0, problems.length ? problems.join(", ") : note);
}

// 11. No secrets or .env files tracked by git (only .env.example).
{
  let tracked = [];
  try {
    tracked = execSync("git ls-files", { cwd: ROOT, encoding: "utf8" })
      .split("\n")
      .filter((f) => /(^|\/)\.env(\.|$)/.test(f) && !f.endsWith(".env.example"));
  } catch {
    /* not a git checkout — nothing to check */
  }
  check("No .env files committed", tracked.length === 0, tracked.join(", "));
}

for (const p of passes) console.log(`  ✓ ${p}`);
for (const f of failures) console.log(`  ✗ ${f}`);
console.log(`\n${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
