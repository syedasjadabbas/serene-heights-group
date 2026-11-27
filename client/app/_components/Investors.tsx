"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { investorReasons } from "@/global/constants/site";
import { Calculator } from "./Calculator";

gsap.registerPlugin(ScrollTrigger);

export function Investors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".investors .section-head > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".calc, .reason", {
          y: 60,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".inv", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="investors" className="investors light" data-nav="light" aria-labelledby="investors-title">
      <div className="section-head">
        <div>
          <span className="eyebrow">How owning works</span>
          <h2 id="investors-title" className="display">
            Own a share
            <br />
            <span className="soft">of the heights.</span>
          </h2>
        </div>
        <div className="section-head__aside">
          <p>
            Smart Property Units let you own part of a working hotel — fully managed, with profit shared every
            quarter. Or own a whole apartment, with nights reserved for you each year.
          </p>
          <a className="btn btn--ink" href="/invest/how-it-works">
            How a hotel apartment investment works <span className="arr">→</span>
          </a>
        </div>
      </div>

      <div className="inv">
        <Calculator />
        <div className="reasons">
          {investorReasons.map((r, i) => (
            <div className="reason" key={r.t}>
              <i>0{i + 1}</i>
              <div>
                <b>{r.t}</b>
                <p>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
