"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReturning, rememberScroll, savedScroll } from "@/global/lib/scrollMemory";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    // A fresh visit or a refresh starts the story from the top (no browser-restored scroll, no #section
    // jump). Coming back with the Back button returns to where the visitor left, e.g. after /booking.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const back = isReturning();
    const target = back ? (savedScroll() ?? 0) : 0;
    if (!back && location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.addEventListener("pagehide", rememberScroll);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.scrollTo(0, target);
      return () => window.removeEventListener("pagehide", rememberScroll);
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });
    // Pins add their spacing on refresh, so the saved position only exists after it. Restore right away
    // (a timer, not rAF, so it also runs in background tabs), then once more after images finish loading
    // in case the layout grew — unless the visitor has already started scrolling themselves.
    let userMoved = false;
    const markMoved = () => (userMoved = true);
    const restore = () => {
      ScrollTrigger.refresh();
      if (back && !userMoved) {
        lenis.scrollTo(target, { immediate: true, force: true });
        ScrollTrigger.update();
      }
    };
    const t = window.setTimeout(restore, 0);
    if (back) {
      ["wheel", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, markMoved, { once: true, passive: true }));
      if (document.readyState !== "complete") window.addEventListener("load", restore, { once: true });
    }
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#top" ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", restore);
      ["wheel", "touchstart", "keydown"].forEach((ev) => window.removeEventListener(ev, markMoved));
      window.removeEventListener("pagehide", rememberScroll);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
