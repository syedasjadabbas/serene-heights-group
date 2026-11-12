// Branded share card used for Open Graph and Twitter previews (and the Apple touch icon mark).
// Rendered at build time with next/og from the site's own data, photo and font.
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CAPSULE, RIDGE } from "@/global/components/Emblem";
import { site } from "@/global/constants/site";

export const SHARE_SIZE = { width: 1200, height: 630 };
export const SHARE_ALT = `${site.name} — Serene Heights Nathia Gali and Serene Heights Lahore`;

// Fixed paths so the build only traces these three files. `npm run build` / Vercel run inside
// client/; the root launch config (`next dev client`) runs from the repo root — try both.
const first = (a: string, b: string) => readFile(existsSync(a) ? a : b);

async function assets() {
  const [bg, w500, w600] = await Promise.all([
    first(
      join(process.cwd(), "public/media/og/background.jpg"),
      join(process.cwd(), "client/public/media/og/background.jpg"),
    ),
    first(
      join(process.cwd(), "node_modules/@fontsource/inter-tight/files/inter-tight-latin-500-normal.woff"),
      join(process.cwd(), "client/node_modules/@fontsource/inter-tight/files/inter-tight-latin-500-normal.woff"),
    ),
    first(
      join(process.cwd(), "node_modules/@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff"),
      join(process.cwd(), "client/node_modules/@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff"),
    ),
  ]);
  return {
    bg: `data:image/jpeg;base64,${bg.toString("base64")}`,
    fonts: [
      { name: "Inter Tight", data: w500, weight: 500 as const, style: "normal" as const },
      { name: "Inter Tight", data: w600, weight: 600 as const, style: "normal" as const },
    ],
  };
}

const ridge = "M" + RIDGE.map(([x, y]) => `${x} ${y}`).join(" L") + " Z";
const inner = `M50 ${CAPSULE.y} A42 42 0 0 1 92 50 V86 A42 42 0 0 1 8 86 V50 A42 42 0 0 1 50 ${CAPSULE.y} Z`;

/** The Serene Heights window emblem as plain SVG for the image renderer. */
export function Mark({ size, color = "#ffffff" }: { size: number; color?: string }) {
  return (
    <svg width={size} height={(size * 136) / 100} viewBox="0 0 100 136" fill="none">
      <rect x="3" y="3" width="94" height="130" rx="47" stroke={color} strokeWidth="3.2" />
      <path d={`${inner} ${ridge}`} fill={color} fillRule="evenodd" />
    </svg>
  );
}

export async function shareCard() {
  const { bg, fonts } = await assets();
  const chips = ["Nathia Gali · 7,906 ft", "Lahore · Gulberg Main Boulevard", "Book · Own · Invest"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "Inter Tight",
          background: "#0f241e",
        }}
      >
        {/* Photo on the right, blended into a solid pine panel that carries the text.
            (The renderer has no `inset`, so every layer is placed with top/left/width/height.) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          width={760}
          height={630}
          alt=""
          style={{ position: "absolute", top: 0, left: 440, width: 760, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background:
              "linear-gradient(90deg, #0f241e 0%, #0f241e 38%, rgba(15,36,30,0.75) 48%, rgba(15,36,30,0.15) 66%, rgba(15,36,30,0) 80%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 430,
            left: 0,
            width: 1200,
            height: 200,
            background: "linear-gradient(0deg, rgba(15,36,30,0.85) 0%, rgba(15,36,30,0) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Mark size={40} />
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#a9c7b8",
              }}
            >
              {`${site.developer} · since ${site.founded}`}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 600, color: "#ffffff", letterSpacing: -3, lineHeight: 1 }}>
              Serene Heights
            </div>
            <div style={{ fontSize: 84, fontWeight: 600, color: "#a9c7b8", letterSpacing: -3, lineHeight: 1.05 }}>
              Group
            </div>
            <div style={{ marginTop: 22, fontSize: 30, fontWeight: 500, color: "rgba(244,247,245,0.86)", maxWidth: 640 }}>
              Pakistan&apos;s first winter resort and a 21-storey address on Gulberg Boulevard.
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  background: "rgba(15,36,30,0.72)",
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...SHARE_SIZE, fonts },
  );
}

/** The share card as an optimised JPEG (~150 KB instead of ~950 KB PNG) — WhatsApp drops large previews. */
export async function shareCardJpeg() {
  const { default: sharp } = await import("sharp");
  const png = Buffer.from(await (await shareCard()).arrayBuffer());
  const jpg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
  });
}
