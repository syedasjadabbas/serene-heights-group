"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Card, Img, LinkTo } from "@/global/site/types";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  abroad: { h: string; d?: string; link: LinkTo };
  latest: { h: string; image: Img; t: string; text: string; link: LinkTo };
  guides: { h: string; cards: Card[] };
};

/** Buying from abroad, the latest from the site, and the newest guides. */
export function Latest({ abroad, latest, guides }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".upcoming .section-head > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".teaser", {
          y: 80,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".teasers", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="upcoming dark" data-nav="dark" aria-labelledby="guides-title">
      <div className="teasers teasers--two">
        <div className="teaser teaser--cta">
          <span className="eyebrow">Overseas buyers</span>
          <div>
            <h3>{abroad.h}</h3>
            <p>{abroad.d}</p>
            <a href={abroad.link.href} className="btn btn--white">
              {abroad.link.label} <span className="arr">→</span>
            </a>
          </div>
        </div>
        <div className="teaser teaser--clear">
          <img src={latest.image.src} alt={latest.image.alt} loading="lazy" />
          <span className="teaser__num">{latest.h}</span>
          <div className="teaser__body">
            <h3>{latest.t}</h3>
            <p>{latest.text}</p>
            <a href={latest.link.href} className="btn btn--ghost">
              {latest.link.label} <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="section-head section-head--next">
        <div>
          <span className="eyebrow">Insights</span>
          <h2 id="guides-title" className="display">
            {guides.h}
          </h2>
        </div>
        <a href="/insights" className="btn btn--ghost">
          All insights <span className="arr">→</span>
        </a>
      </div>
      <div className="teasers teasers--three">
        {guides.cards.map((c) => (
          <a className="teaser teaser--clear" key={c.t} href={c.href}>
            {c.image && <img src={c.image.src} alt="" loading="lazy" />}
            <span className="teaser__num">{c.meta}</span>
            <div className="teaser__body">
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
