// The client's "How pages link" board: each topic has a hub, and its pages link to the hub and back.
// The last two entries come from the Owner and Hotel guest journeys.
const N = "/nathiagali";
const I = "/invest";
const O = "/overseas";
const H = "/hotels/nathia-gali";

export const clusters: Record<string, string[]> = {
  [N]: [`${N}/apartments`, `${N}/floor-plans`, `${N}/location`, `${N}/amenities`, `${I}/compare`],
  [`${I}/how-it-works`]: [`${N}/co-ownership`, `${N}/apartments`, I, `${I}/compare`, "/insights/how-hotel-apartment-ownership-works"],
  [`${N}/payment-plan`]: [`${N}/co-ownership`, `${N}/apartments`, `${I}/buying-steps`, "/lahore/invest", "/insights/how-to-compare-payment-plans"],
  [`${I}/earnings`]: [`${I}/risks-and-exit`, `${N}/co-ownership`, `${N}/payment-plan`],
  "/documents": [
    `${N}/documents`, `${N}/progress`, "/about/track-record", `${I}/buying-steps`, `${I}/risks-and-exit`,
    "/faq", `${N}/faq`, "/lahore/progress", `${O}/documents`, "/insights/updates",
  ],
  [O]: ["steps", "paying-from-abroad", "documents", "gulf", "uk", "usa-canada", "australia-new-zealand"].map((p) => `${O}/${p}`),
  "/insights/investing": [N, I],
  [H]: [
    "accommodation", "accommodation/one-bedroom", "accommodation/two-bedroom", "accommodation/three-bedroom", "dining",
    "experiences", "offers", "gallery", "location", "faq", "book",
  ].map((p) => `${H}/${p}`),
  [`${H}/things-to-do`]: [`${H}/location`, "/insights/nathia-gali"],
  "/lahore": ["the-project", "invest", "amenities", "location", "progress", "contact"].map((p) => `/lahore/${p}`),
};

/** One-way steps in the journeys that no hub covers. */
export const steps: Record<string, string[]> = {
  "/owners": ["/insights/updates", "/documents", `${N}/payment-plan`, H, `${H}/book`, `${I}/earnings`, `${I}/risks-and-exit`, I],
  [I]: ["/site-visit", "/contact", `${N}/location`],
  "/site-visit": [`${N}/documents`],
  [`${H}/book`]: [`${H}/location`, `${H}/policies`],
  // Investor abroad: after the papers, the apartments; after talking to someone, the place.
  "/documents": [`${N}/apartments`],
  [`${O}/steps`]: [`${N}/location`],
};

/** Addresses the plan connects to this page, nearest first. */
export function related(path: string): string[] {
  const hubs = Object.keys(clusters).filter((h) => clusters[h].includes(path));
  return [...new Set([...hubs, ...(clusters[path] ?? []), ...(steps[path] ?? [])])];
}
