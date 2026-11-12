// Number and money formatting shared across the site.

/** Exact rupee amount: PKR 2,250,000. */
export const pkr = (n: number) => `PKR ${Math.round(n).toLocaleString("en-US")}`;

/** Amounts the way people here say them: 2.25 lakh, 2.67 crore. Under a lakh stays exact. */
export const spoken = (n: number) => {
  const two = (x: number) => String(Number(x.toFixed(2)));
  if (n >= 1e7) return `${two(n / 1e7)} crore`;
  if (n >= 1e5) return `${two(n / 1e5)} lakh`;
  return Math.round(n).toLocaleString("en-US");
};
