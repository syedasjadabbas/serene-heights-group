"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Emblem } from "./Emblem";
import { useInView } from "./useInView";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const Bloom = dynamic(() => import("./three/Bloom"), { ssr: false });

const STATS = [
  { n: 2017, label: "DM Consortium founded", pad: "" },
  { n: 7906, label: "ft — Nathia Gali altitude", pad: "," },
  { n: 21, label: "storeys on Gulberg Boulevard", pad: "" },
  { n: 150, label: "hotel apartments in the pines", pad: "+" },
];

/** About the group: a capsule window opens onto a field of mist. */
export function Reveal() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(1);
  const active = useInView(root);

  useGSAP(
    () => {
      const el = root.current!;
      const dark = el.querySelector<HTMLElement>(".reveal__dark")!;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
        const proxy = { m: 0 };
        progress.current = 0;
        dark.style.setProperty("--mask", "0vmax");
        // The window starts opening while the section rises into view, then pins to finish.
        ScrollTrigger.create({
          trigger: ".reveal__stage",
          start: "top top",
          end: "+=220%",
          pin: true,
          anticipatePin: 1,
        });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".reveal__stage",
            start: "top bottom",
            end: () => `+=${window.innerHeight * 3.2}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (st) => (progress.current = st.progress),
          },
        });
        tl.to(proxy, {
          m: 440,
          duration: 1,
          ease: "power3.in",
          onUpdate: () => dark.style.setProperty("--mask", `${proxy.m}vmax`),
        })
          .from(".reveal__mark", { scale: 2.6, duration: 0.8, ease: "power2.out" }, 0)
          .from(".reveal__label, .reveal__copy > *", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.4 }, 0.85)
          .from(".stat", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.4 }, 0.95);

        el.querySelectorAll<HTMLElement>(".stat b").forEach((b) => {
          const target = Number(b.dataset.n);
          const pad = b.dataset.pad ?? "";
          const o = { v: target === 2017 ? 1990 : 0 };
          tl.to(
            o,
            {
              v: target,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: () => {
                const v = Math.round(o.v);
                b.textContent = pad === "," ? v.toLocaleString("en-US") : `${v}${pad}`;
              },
            },
            0.95,
          );
        });
        tl.to({}, { duration: 0.5 });
        return () => {
          dark.style.removeProperty("--mask");
          progress.current = 1;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="reveal" aria-labelledby="about-title">
      <div className="reveal__stage">
        <div className="reveal__dark">
          <div className="reveal__glow" />
          <div className="reveal__canvas" aria-hidden>
            <Bloom progress={progress} active={active} />
          </div>
          <Emblem className="reveal__mark" />
          <span className="reveal__label eyebrow">About the group</span>

          <div className="reveal__copy">
            <h2 id="about-title" className="sr-only">
              About Serene Heights Group
            </h2>
            <p>
              <strong>Serene Heights Group</strong> is home to the developments of {site.developer} — hotels, resorts
              and city addresses that are planned, built, sold and then managed by the same team.
            </p>
            <p>
              Led by Chief Executive {site.ceo}, the group started in the Galiyat with Pakistan&apos;s first winter
              resort, and now rises on Gulberg Main Boulevard. Before both came Serene Farms on Barki Road, Lahore.
            </p>
          </div>

          <div className="reveal__stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <b data-n={s.n} data-pad={s.pad}>
                  {s.pad === "," ? s.n.toLocaleString("en-US") : `${s.n}${s.pad}`}
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
