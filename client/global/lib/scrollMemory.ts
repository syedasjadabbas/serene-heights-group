// Remember where the visitor was on a page so the browser Back button returns them there
// (e.g. Stays → /booking → Back lands on Stays again). A fresh visit or a refresh still starts at the top.

const key = () => `serene:scroll:${location.pathname}`;

type NavType = "navigate" | "reload" | "back_forward" | "prerender";

/** How this page load happened: a link/typed URL, a refresh, or the Back/Forward buttons. */
export function navigationType(): NavType {
  const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return (entry?.type as NavType) ?? "navigate";
}

/** The scroll position saved when the visitor last left this page, if any. */
export function savedScroll(): number | null {
  try {
    const v = sessionStorage.getItem(key());
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

/** True when the visitor came back with Back/Forward and we know where they were. */
export function isReturning(): boolean {
  return navigationType() === "back_forward" && savedScroll() !== null;
}

/** Save the current position (called as the page is left). */
export function rememberScroll() {
  try {
    sessionStorage.setItem(key(), String(Math.round(window.scrollY)));
  } catch {
    /* storage unavailable (private mode) — Back simply starts at the top */
  }
}
