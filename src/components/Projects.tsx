"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { completed, projects } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const track = el.querySelector<HTMLElement>(".projects__track")!;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.motion = "on";
        // Slide until the last card's right edge sits one gutter inside the visible area
        // (clientWidth excludes the scrollbar; scrollWidth ignores the track's end padding).
        const dist = () => {
          const last = track.lastElementChild as HTMLElement | null;
          if (!last) return 0;
          const gutter = parseFloat(getComputedStyle(track).paddingRight) || 0;
          return Math.max(0, last.offsetLeft + last.offsetWidth + gutter - document.documentElement.clientWidth);
        };
        // One pinned, scrubbed timeline: settle on the first card, slide across, brief rest.
        // Durations are in scroll pixels so the slide maps 1:1 to the track width.
        const HOLD = Math.round(window.innerHeight * 0.35);
        const TAIL = Math.round(window.innerHeight * 0.12);
        const MOVE = Math.max(1, dist());
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${HOLD + dist() + TAIL}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to({}, { duration: HOLD })
          .to(track, { x: () => -dist(), duration: MOVE }, HOLD)
          // Images drift against the slide for depth.
          .fromTo(".pcard img", { xPercent: -6 }, { xPercent: 6, duration: MOVE }, HOLD)
          .to({}, { duration: TAIL });
        return () => {
          delete el.dataset.motion;
        };
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".projects .section-head > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" className="projects dark" data-nav="dark" aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <span className="eyebrow">Ongoing projects</span>
          <h2 id="projects-title" className="display">
            Two addresses.
            <br />
            <span className="soft">One standard.</span>
          </h2>
        </div>
        <p>
          Every Serene Heights project is designed, delivered and run by the same in-house team — so what you see at
          launch is what you live with for decades.
        </p>
      </div>

      <div className="projects__track">
        {projects.map((p) => (
          <a key={p.slug} href={p.url} target="_blank" rel="noopener" className="pcard">
            <img src={p.image} alt={`Serene Heights ${p.name}`} loading="lazy" />
            <div className="pcard__meta">
              <span>Serene Heights</span>
              <span>{p.since}</span>
              <span>{p.kind}</span>
              <span className="pcard__status">{p.status}</span>
            </div>
            <div className="pcard__body">
              <h3 className="pcard__name">
                <small>{p.place}</small>
                {p.name}
              </h3>
              <div className="pcard__side">
                <p>{p.summary}</p>
                <div className="chips">
                  {p.facts.map((f) => (
                    <span className="chip" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
                <span className="btn btn--white" style={{ justifySelf: "start" }}>
                  Visit project site <span className="arr">↗</span>
                </span>
              </div>
            </div>
          </a>
        ))}

        <div className="pcard pcard--note">
          <span className="eyebrow">Completed</span>
          <div>
            {completed.map((c) => (
              <div key={c.name}>
                <h3>{c.name}</h3>
                <p>
                  {c.place} — {c.note}.
                </p>
              </div>
            ))}
            <p style={{ marginTop: 28 }}>Next on the map: see what we are preparing beyond the mountains.</p>
            <a href="#upcoming" className="btn btn--ghost" style={{ marginTop: 16 }}>
              Upcoming projects <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
