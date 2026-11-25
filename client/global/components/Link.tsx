import type { AnchorHTMLAttributes } from "react";

/** Plain link. Pages are static, and a full load keeps the Back button's remembered position working. */
export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props} />;
}
