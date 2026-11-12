"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HAS_BOOKING, rooms, stayImages } from "@/global/constants/site";
import { isInternal, linkTarget, roomUrl, searchUrl } from "@/global/lib/booking";
import { BookingForm } from "./BookingForm";

gsap.registerPlugin(ScrollTrigger);

// Hand-placed around the edges (vw, vh) so the centre stays clear for the booking panel;
// order alternates sides so the corridor feels balanced as images fly past.
const SPOTS: { x: number; y: number; w: number; r: number }[] = [
  { x: -38, y: -26, w: 15, r: 0.75 },
  { x: 30, y: -30, w: 13, r: 1.25 },
  { x: -30, y: 28, w: 17, r: 0.8 },
  { x: 36, y: 22, w: 19, r: 0.72 },
  { x: -10, y: -38, w: 11, r: 1.3 },
  { x: 14, y: 36, w: 13, r: 1 },
  { x: -42, y: 2, w: 12, r: 1.2 },
  { x: 42, y: -4, w: 14, r: 0.8 },
  { x: -24, y: -34, w: 16, r: 1.4 },
  { x: 24, y: 34, w: 15, r: 1.3 },
  { x: -40, y: -12, w: 13, r: 0.85 },
  { x: 40, y: 10, w: 12, r: 1.2 },
  { x: 8, y: -40, w: 14, r: 1.35 },
  { x: -16, y: 38, w: 12, r: 1.1 },
  { x: 30, y: -16, w: 11, r: 0.75 },
  { x: -32, y: 14, w: 12, r: 1.25 },
  { x: 44, y: 30, w: 13, r: 1 },
];

export function Stays() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = root.current!;
      const imgs = gsap.utils.toArray<HTMLElement>(".stays__img", el);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.dataset.motion = "on";
        // Corridor depth grows with the image count (~300 px between images).
        const span = imgs.length * 300;
        const SPEED = 1.05; // px of depth travelled per px scrolled (was ~1.75) — calmer fly-through
        // Spread along the corridor so a few images are already in view when the pin starts.
        const base = imgs.map((_, i) => -span * 0.72 + (i / imgs.length) * span * 0.95);
        const place = (p: number) => {
          const travel = p * (span + 600);
          imgs.forEach((img, i) => {
            const z = base[i] + travel;
            const fadeIn = gsap.utils.clamp(0, 1, (z + span) / 700);
            const fadeOut = gsap.utils.clamp(0, 1, (760 - z) / 260);
            img.style.transform = `translate(-50%, -50%) translate3d(${SPOTS[i].x}vw, ${SPOTS[i].y}vh, ${z}px)`;
            img.style.opacity = String(fadeIn * fadeOut);
          });
        };
        place(0);
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => place(state.p),
          scrollTrigger: {
            trigger: ".stays__stage",
            start: "top top",
            end: () => `+=${Math.round((span + 600) / SPEED)}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            pin: true,
            anticipatePin: 1,
          },
        });
        gsap.from(".stays__panel > *", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".stays__stage", start: "top 60%" },
        });
        gsap.from(".room", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".rooms", start: "top 88%" },
        });
        return () => {
          el.dataset.motion = "off";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stays" className="stays dark" data-nav="dark" data-motion="off" aria-labelledby="stays-title">
      <div className="stays__stage">
        <div className="stays__world" aria-hidden>
          {stayImages.map((img, i) => (
            <div
              key={img.src}
              className="stays__img"
              style={{ width: `calc(${SPOTS[i].w}vw * var(--k, 1))`, aspectRatio: String(SPOTS[i].r), opacity: 0 }}
            >
              <img src={img.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="stays__panel">
          <span className="eyebrow">Serene Booking</span>
          <h2 id="stays-title" className="display">
            Stay at <span className="soft">7,906 ft</span>
          </h2>
          <p>
            Book a fully furnished hotel apartment at Serene Heights Nathia Gali — heated glass-roof pool, rooftop
            dining, ski slope and trails through the pines, two hours from Islamabad.
          </p>
          <BookingForm />
        </div>
      </div>

      <div className="rooms-head">
        <div>
          <span className="eyebrow">Room types</span>
          <h3 className="display">
            Five ways <span className="soft">to stay</span>
          </h3>
        </div>
        <a className="btn btn--ghost" href={searchUrl()} {...linkTarget(searchUrl())}>
          {HAS_BOOKING ? "Browse all rooms" : "Ask about availability"}{" "}
          <span className="arr">{isInternal(searchUrl()) ? "→" : "↗"}</span>
        </a>
      </div>
      <div className="rooms" aria-label="Room types">
        {rooms.map((r, i) => (
          <a key={r.slug} className="room" href={roomUrl(r)} {...linkTarget(roomUrl(r))}>
            <img src={r.image} alt="" loading="lazy" />
            <div className="room__top">
              <i>0{i + 1}</i>
              <span className="room__count">{r.units} apartments</span>
            </div>
            <div className="room__body">
              <b>{r.name}</b>
              <p>{r.tagline}</p>
              <div className="room__specs">
                <span>{r.size}</span>
                <span>{r.guests}</span>
              </div>
            </div>
            <span className="room__go" aria-hidden>
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
