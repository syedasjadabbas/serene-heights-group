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
      if (!p.includes("${") && !existsSync(join(ROOT, "public", p))) missing.push(`${p} (${rel(f)})`);
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

// 4. The client's site plan: every address exists once, with its template's parts in order.
const { TEMPLATE_PARTS } = await import("../global/site/types.ts");
const { menus, footers } = await import("../global/site/menus.ts");
const all = [];
for (const f of readdirSync(join(ROOT, "global/site/pages")))
  all.push(...Object.values(await import(`../global/site/pages/${f}`)).filter(Array.isArray).flat());
const paths = new Set(all.map((p) => p.path));
{
  const H = "/hotels/nathia-gali";
  const PLAN = [
    "/ /about /about/leadership /about/track-record /documents /projects /contact /faq /owners /press /partners",
    "/invest /invest/how-it-works /invest/earnings /invest/buying-steps /invest/risks-and-exit /invest/compare /site-visit",
    "/overseas /overseas/steps /overseas/paying-from-abroad /overseas/documents /overseas/gulf /overseas/uk /overseas/usa-canada /overseas/australia-new-zealand",
    "/nathiagali " + "co-ownership apartments floor-plans payment-plan progress location amenities documents faq gallery".split(" ").map((x) => "/nathiagali/" + x).join(" "),
    `/hotels ${H} ` + "accommodation accommodation/one-bedroom accommodation/two-bedroom accommodation/three-bedroom dining experiences offers gallery location things-to-do events policies faq contact book".split(" ").map((x) => `${H}/${x}`).join(" "),
    "/lahore /lahore/the-project /lahore/invest /lahore/amenities /lahore/location /lahore/progress /lahore/contact",
    "/insights /insights/investing /insights/nathia-gali /insights/updates",
    "/thank-you/enquiry /thank-you/site-visit /thank-you/stay /404 /privacy-policy /terms /cookies /sitemap /disclaimer",
  ].join(" ").split(" ");
  const missing = PLAN.filter((p) => !paths.has(p));
  const extra = [...paths].filter((p) => !PLAN.includes(p) && !/^\/insights\/[a-z0-9-]+$|^\/insights\/authors\/[a-z0-9-]+$/.test(p));
  check("Every page in the client's plan exists", !missing.length && !extra.length && paths.size === all.length, [...missing.map((m) => "missing " + m), ...extra.map((m) => "extra " + m), paths.size !== all.length ? "duplicate addresses" : ""].filter(Boolean).join(", ") || `${PLAN.length} pages + ${all.length - PLAN.length} articles/authors`);

  const bad = [];
  for (const p of all) {
    const ids = p.blocks.map((b) => b.id);
    let at = -1;
    for (const part of TEMPLATE_PARTS[p.template]) {
      const i = ids.indexOf(part, at + 1);
      if (i < 0) bad.push(`${p.path} lacks "${part}" in order`);
      else at = i;
    }
    if (p.description.length > 160) bad.push(`${p.path} description ${p.description.length}`);
  }
  const imgs = [...JSON.stringify(all).matchAll(/"src":"([^"]+)"/g)].map((m) => m[1]);
  const gone = [...new Set(imgs)].filter((p) => !existsSync(join(ROOT, "public", p)));
  check("Every page image exists", !gone.length, gone.join(", "));
  check("Pages follow their templates", !bad.length, bad.join("; "));
}

// The client's "How pages link" board only names pages that exist.
{
  const { clusters, steps } = await import("../global/site/clusters.ts");
  const bad = [...Object.entries(clusters), ...Object.entries(steps)].flatMap(([h, m]) => [h, ...m]).filter((p) => !paths.has(p));
  check("Topic links name real pages", !bad.length, bad.join(", "));
}

// 5. Every internal link (menus, footers, pages) goes to a page that exists.
{
  const dead = new Set();
  const visit = (v, from) => {
    if (Array.isArray(v)) v.forEach((x) => visit(x, from));
    else if (v && typeof v === "object") {
      if (typeof v.href === "string" && v.href.startsWith("/") && !paths.has(v.href.split("#")[0])) dead.add(`${v.href} (from ${from})`);
      Object.values(v).forEach((x) => visit(x, from));
    }
  };
  visit([menus, footers], "menus");
  all.forEach((p) => visit([p.blocks, p.actions ?? []], p.path));
  check("No dead internal links", !dead.size, [...dead].join(", "));
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

// 9. Share metadata fits where it is shown: title ≤ 60 and description ≤ 160 characters (Google/WhatsApp
//    truncate beyond), and the share card's background photo exists.
{
  const problems = [];
  if (site.site.title.length > 60) problems.push(`title is ${site.site.title.length} chars`);
  if (site.site.description.length > 160) problems.push(`description is ${site.site.description.length} chars`);
  if (!existsSync(join(ROOT, "public/media/og/background.jpg"))) problems.push("share card background missing");
  check("Share metadata fits previews", problems.length === 0, problems.join(", "));
}

// 10. Zones (Next.js Multi-Zones): each path is rewritten (page + sub-paths) and matches the other app's
//     base path when its repo sits alongside this one.
{
  const cfg = read(join(ROOT, "next.config.ts"));
  const zones = [
    { name: "Booking", constant: "BOOKING_PATH", repo: "../../Serene Booking/client/next.config.mjs" },
    { name: "Investors", constant: "INVESTORS_PATH", repo: "../../stake-clone/next.config.mjs" },
  ];
  for (const z of zones) {
    const path = (cfg.match(new RegExp(`${z.constant} = "([^"]+)"`)) || [])[1];
    const problems = [];
    if (!path) problems.push(`${z.constant} missing in next.config.ts`);
    if (!cfg.includes(`zone(${z.constant},`)) problems.push(`no rewrite for ${z.constant}`);
    let note = "";
    const sibling = join(ROOT, z.repo);
    if (existsSync(sibling)) {
      // NEXT_PUBLIC_BASE_PATH ?? "/x" (Next.js apps) or VITE_BASE_PATH ?? '/x' (Vite)
      const bp = (read(sibling).match(/BASE_PATH \?\? ["']([^"']*)["']/) || [])[1];
      if (bp !== path) problems.push(`${z.name} basePath is "${bp}", group site expects "${path}"`);
      else note = `matches ${z.name} basePath "${bp}"`;
    } else note = `${z.name} repo not alongside — base path not compared`;
    check(`${z.name} zone wired at ${path || "?"}`, problems.length === 0, problems.length ? problems.join(", ") : note);
  }
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

const pending = all.filter((p) => p.pending?.length);
if (process.argv.includes("--pending")) for (const p of pending) console.log(`${p.path}\n  - ${p.pending.join("\n  - ")}`);
else console.log(`  ${pending.reduce((n, p) => n + p.pending.length, 0)} items still needed from the client (npm run check -- --pending)\n`);

for (const p of passes) console.log(`  ✓ ${p}`);
for (const f of failures) console.log(`  ✗ ${f}`);
console.log(`\n${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
