"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while the element is near the viewport — used to pause WebGL when off-screen. */
export function useInView(ref: RefObject<Element | null>, margin = "200px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
