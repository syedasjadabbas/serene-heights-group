"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/global/constants/site";

gsap.registerPlugin(ScrollTrigger);

// No upcoming project has been announced yet — tiles stay deliberately unnamed until the client confirms them.
const TEASERS = [
  { n: "03", img: "/media/ng/aerial-clouds.webp", title: "Announcing soon", note: "Our next destination is in planning." },
  { n: "04", img: "/media/ng/snow-aerial-sunset.webp", title: "In planning", note: "Details will be shared with registered investors first." },
];

const interest = encodeURIComponent("Hello Serene Heights, I'd like early updates on your upcoming projects.");

export function Upcoming() {
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
    <section ref={root} id="upcoming" className="upcoming dark" data-nav="dark" aria-labelledby="upcoming-title">
      <div className="section-head">
        <div>
          <span className="eyebrow">Upcoming projects</span>
          <h2 id="upcoming-title" className="display">
            Beyond mountains
            <br />
            <span className="soft">and borders.</span>
          </h2>
        </div>
        <p>
          The next Serene Heights addresses are being planned now. Register your interest and hear about them before
          they are announced.
        </p>
      </div>

      <div className="teasers">
        <div className="teaser teaser--cta">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.75)" }}>
            Early access
          </span>
          <div>
            <h3>Be first in line.</h3>
            <p>
              Investors and owners in existing Serene Heights projects hear about new launches first — with launch
              pricing.
            </p>
            <a
              href={`${site.contact.whatsappHref}?text=${interest}`}
              target="_blank"
              rel="noopener"
              className="btn btn--white"
              style={{ marginTop: 20 }}
            >
              Register interest <span className="arr">→</span>
            </a>
          </div>
        </div>
        {TEASERS.map((t) => (
          <div className="teaser" key={t.n}>
            <img src={t.img} alt="" loading="lazy" />
            <span className="teaser__num">Project {t.n}</span>
            <span className="teaser__lock">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
                <rect x="1" y="5" width="8" height="6" rx="1.5" stroke="currentColor" />
                <path d="M3 5V3.5a2 2 0 1 1 4 0V5" stroke="currentColor" />
              </svg>
              Coming soon
            </span>
            <div className="teaser__body">
              <h3>{t.title}</h3>
              <p>{t.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
