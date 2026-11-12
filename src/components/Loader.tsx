"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Emblem } from "./Emblem";

/** Short brand moment while fonts and the first image settle. */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      if (reduce) {
        tl.to(root.current, { autoAlpha: 0, duration: 0.2 });
        return;
      }
      tl.from(".loader__line", { scaleX: 0, duration: 0.9, ease: "power3.inOut" })
        .from(".loader__lockup > *", { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }, 0.15)
        .to(".loader__lockup", { autoAlpha: 0, y: -10, duration: 0.45, ease: "power2.in" }, "+=1.35")
        .to(root.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "-=0.1")
        .add(() => window.dispatchEvent(new Event("serene:ready")), "-=0.5");
    },
    { scope: root },
  );

  if (done) return null;
  return (
    <div ref={root} className="loader" aria-hidden>
      <div className="loader__line" />
      <div className="loader__lockup">
        <Emblem className="loader__mark" />
        <div>
          serene heights <span>group</span>
        </div>
      </div>
    </div>
  );
}
