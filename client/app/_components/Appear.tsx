"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Inner pages: the opening settles in, then each section rises as it arrives (as on the home page). */
export function Appear() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".phero__card", { scale: 1.03, duration: 1.4, ease: "expo.out" });
      gsap.from(".phero__text > *", { y: 34, autoAlpha: 0, stagger: 0.08, duration: 1.1, ease: "expo.out", delay: 0.1 });
      gsap.to(".phero__img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".phero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".sec, .band__card").forEach((el) => {
        gsap.from(el.classList.contains("sec") ? el.children : el, {
          y: 46, opacity: 0, stagger: 0.08, duration: 1.1, ease: "expo.out", clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 84%" },
        });
      });
    });
    return () => mm.revert();
  });
  return null;
}
