"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BOOKING_URL, rooms, stayImages } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// Hand-placed so the centre stays clear for the booking panel.
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
];

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function Stays() {
  const root = useRef<HTMLElement>(null);
  const [dates, setDates] = useState({ min: "", inD: "", outD: "" });

  useEffect(() => {
    const now = new Date();
    const a = new Date(now);
    a.setDate(a.getDate() + 14);
    const b = new Date(a);
    b.setDate(b.getDate() + 2);
    setDates({ min: iso(now), inD: iso(a), outD: iso(b) });
  }, []);

  useGSAP(
    () => {
      const el = root.current!;
      const imgs = gsap.utils.toArray<HTMLElement>(".stays__img", el);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.dataset.motion = "on";
        const span = 3200; // total depth of the corridor, px
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
            end: "+=240%",
            scrub: 1.2,
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
          scrollTrigger: { trigger: ".rooms", start: "top 85%" },
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
    <section ref={root} id="stays" className="stays dark" data-motion="off" aria-labelledby="stays-title">
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
          <form className="booker" action={`${BOOKING_URL}/rooms`} method="get" target="_blank">
            <label>
              Check in
              <input type="date" name="checkIn" required min={dates.min} defaultValue={dates.inD} key={`in-${dates.inD}`} />
            </label>
            <label>
              Check out
              <input type="date" name="checkOut" required min={dates.min} defaultValue={dates.outD} key={`out-${dates.outD}`} />
            </label>
            <label>
              Guests
              <select name="adults" defaultValue="2">
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} adult{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
            <input type="hidden" name="children" value="0" />
            <input type="hidden" name="rooms" value="1" />
            <button type="submit" className="btn btn--white">
              Check availability <span className="arr">→</span>
            </button>
          </form>
        </div>
      </div>

      <div className="rooms" aria-label="Room types">
        {rooms.map((r, i) => (
          <a key={r.slug} className="room" href={`${BOOKING_URL}/rooms/${r.slug}`} target="_blank" rel="noopener">
            <i>0{i + 1}</i>
            <div>
              <b>{r.name}</b>
              <span>{r.note}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
