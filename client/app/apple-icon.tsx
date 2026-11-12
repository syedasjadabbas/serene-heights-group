import { ImageResponse } from "next/og";
import { Mark } from "./_lib/shareCard";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the white Serene emblem on pine green. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#18332a" }}>
        <Mark size={84} />
      </div>
    ),
    size,
  );
}
