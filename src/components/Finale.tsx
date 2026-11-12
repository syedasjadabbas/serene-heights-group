"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useInView } from "./useInView";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const ChromeEmblem = dynamic(() => import("./three/ChromeEmblem"), { ssr: false });

export function Finale() {
  const root = useRef<HTMLElement>(null);
  const active = useInView(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".finale__card", {
          scale: 0.92,
          borderRadius: 48,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 20%", scrub: true },
        });
        gsap.from(".finale__canvas", {
          xPercent: 18,
          rotate: 12,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: true },
        });
        gsap.from(".finale__copy > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 55%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="finale" aria-labelledby="finale-title">
      <div className="finale__card" data-nav="dark">
        <div className="finale__canvas" aria-hidden>
          <ChromeEmblem active={active} />
        </div>
        <div className="finale__copy">
          <h2 id="finale-title" className="display">
            Rise above
            <br />
            <span className="soft">the ordinary</span>
          </h2>
          <p>
            Talk to the Serene Heights team about a project, a stay or an investment. We reply on WhatsApp and by phone,
            seven days a week.
          </p>
          <div className="hero__actions">
            <a className="btn btn--white" href={site.contact.whatsappHref} target="_blank" rel="noopener">
              Enquire on WhatsApp <span className="arr">→</span>
            </a>
            <a className="btn btn--ghost" href={site.contact.uanHref}>
              Call {site.contact.uan}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
