// The Serene Heights window emblem: a capsule frame with the snow ridge cut through it.
// Coordinates live in a 100 × 136 box so the same numbers drive the 3D version.

export const CAPSULE = { x: 8, y: 8, w: 84, h: 120, r: 42 };

// Snow ridge polygon (kept inside the inner capsule so it can be used as a 3D hole).
export const RIDGE: [number, number][] = [
  [12, 74], [30, 64], [50, 47], [61, 57], [71, 53], [88, 66],
  [88, 71], [71, 59], [65, 63], [74, 71], [60, 65], [50, 55],
  [55, 67], [60, 78], [31, 68], [12, 79],
];

const ridgePath = "M" + RIDGE.map(([x, y]) => `${x} ${y}`).join(" L") + " Z";
const innerPath = "M50 8 A42 42 0 0 1 92 50 V86 A42 42 0 0 1 8 86 V50 A42 42 0 0 1 50 8 Z";

export function Emblem({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 136"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="3" y="3" width="94" height="130" rx="47" stroke="currentColor" strokeWidth="3.2" />
      <path d={innerPath + " " + ridgePath} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
