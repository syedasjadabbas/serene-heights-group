"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Emblem } from "./Emblem";

gsap.registerPlugin(ScrollTrigger);

const PHRASES = ["Pakistan's first winter resort", "21 storeys on Gulberg Boulevard", "Places that hold their value"];

type Card =
  | { kind: "image"; src: string; tag: string; top: string; bottom: string }
  | { kind: "violet"; tag: string; top: string; bottom: string };

const CARDS: Card[] = [
  { kind: "image", src: "/media/ng/tower-sky.webp", tag: "Nathia Gali", top: "A haven in", bottom: "the highlands" },
  { kind: "violet", tag: "Serene Investors", top: "Own a share", bottom: "from PKR 2M" },
  { kind: "image", src: "/media/lhr/dusk.jpg", tag: "Lahore", top: "Own the", bottom: "address" },
  { kind: "image", src: "/media/stay/glass-roof-pool.jpg", tag: "Serene Booking", top: "Stay at", bottom: "7,906 ft" },
  { kind: "image", src: "/media/ng/aerial-clouds.webp", tag: "Upcoming", top: "Beyond", bottom: "the mountains" },
  { kind: "image", src: "/media/ng/night-facade.webp", tag: "Hotels & Resorts", top: "Managed as", bottom: "one hotel" },
];

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Entrance once the loader hands over.
      const enter = () => {
        if (reduce || !el.isConnected) return;
        const q = gsap.utils.selector(el);
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q(".hero__card"), { scale: 1.06, duration: 1.8 })
          .from(q(".hero__title .line > span"), { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.1)
          .from(q(".hero__media"), { y: 80, autoAlpha: 0, rotate: 4, duration: 1.4 }, 0.25)
          .from(q(".hero__media video"), { scale: 1.5, duration: 2 }, 0.25)
          .from(q(".hero__bottom > *"), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.45);
      };
      let entered = false;
      const onReady = () => {
        if (entered) return;
        entered = true;
        enter();
      };
      window.addEventListener("serene:ready", onReady, { once: true });
      const fallback = window.setTimeout(onReady, 4300);

      if (reduce) el.querySelector<HTMLVideoElement>(".hero__video")?.pause();

      // Pointer parallax on the floating image.
      const qx = gsap.quickTo(".hero__media", "x", { duration: 1.2, ease: "power3" });
      const qy = gsap.quickTo(".hero__media", "y", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        if (reduce) return;
        qx((e.clientX / window.innerWidth - 0.5) * 30);
        qy((e.clientY / window.innerHeight - 0.5) * 24);
      };
      el.querySelector(".hero__card")?.addEventListener("pointermove", onMove as EventListener);

      // ── Hero framing ─────────────────────────────────────────────────────────────
      // On load the hero is edge to edge. Over the first FRAME_PX of scroll it stays pinned and
      // shrinks into a rounded card; it then holds for HOLD_PX before the page moves on.
      // Only GPU-cheap work per frame: the card is scaled (one composited layer) and a separate
      // light overlay paints the white frame + rounded corners, so the big card never repaints.
      const FRAME_PX = 260;
      const HOLD_PX = 200;
      const frame = () => (window.innerWidth < 768 ? 8 : 12);
      const radius = () => (window.innerWidth < 768 ? 28 : 32);
      // Scale by the longer side so the card always fills the frame's window on both axes
      // (the overlay trims the few extra px on the shorter side).
      const fitScale = () => 1 - (2 * frame()) / Math.max(window.innerWidth, window.innerHeight);

      const framing = () =>
        gsap
          .timeline({
            defaults: { ease: "power2.out" }, // frame appears quickly, then settles
            scrollTrigger: { start: 0, end: FRAME_PX, scrub: true, invalidateOnRefresh: true },
          })
          .fromTo(".hero__card", { scale: 1 }, { scale: fitScale }, 0)
          .fromTo(
            ".hero__frame",
            { "--f": "0px", "--r": "0px" },
            { "--f": () => `${frame()}px`, "--r": () => `${radius()}px` },
            0,
          );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.motion = "on";
        const cards = gsap.utils.toArray<HTMLElement>(".ring__card", el);
        const spinEl = el.querySelector<HTMLElement>(".ring__spin")!;
        // Timeline units → scroll: the whole fold + ring sequence spans SHOW px of pinned scroll.
        const CARD_GONE = 1.3; // hero card fully faded at this point
        const RING_IN = CARD_GONE + 0.05; // ring only starts once the hero card has gone
        const STEP = 0.5; // turn to the next card
        const READ = 0.45; // pause on each card so it can be read
        const STEPS = cards.length - 1; // show every card once
        const END = RING_IN + 0.5 + READ + STEPS * (STEP + READ) + 0.2;
        const SHOW = () => window.innerHeight * 0.8 * END;

        ScrollTrigger.create({
          trigger: ".intro__stage",
          start: "top top",
          end: () => `+=${FRAME_PX + HOLD_PX + SHOW()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
        framing();

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            start: FRAME_PX + HOLD_PX,
            end: () => `+=${SHOW()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // Fold-away: one continuous transform tween for the card (no two tweens sharing a property),
        // with the fade, the content and the frame hand-off on their own non-overlapping tracks.
        tl.set(".hero__card", { borderRadius: () => radius() / fitScale() }, 0.001)
          .to(".hero__frame", { autoAlpha: 0, duration: 0.2 }, 0.001)
          .fromTo(
            ".hero__card",
            { transformPerspective: 1600, scale: fitScale, rotateX: 0, rotateZ: 0, yPercent: 0 },
            {
              transformPerspective: 1600,
              scale: 0.32,
              rotateX: 50,
              rotateZ: -22,
              yPercent: -8,
              duration: 1.3,
              ease: "power2.inOut",
              immediateRender: false,
            },
            0.001,
          )
          .to(".hero__title, .hero__bottom", { autoAlpha: 0, yPercent: -12, duration: 0.45, ease: "power1.out" }, 0.04)
          .to(".hero__media", { yPercent: -10, rotate: -3, duration: 1, ease: "sine.inOut" }, 0.001)
          .to(".hero__card", { autoAlpha: 0, duration: 0.5, ease: "power1.in" }, 0.8)
          .fromTo(".marquee", { xPercent: 4 }, { xPercent: -46, duration: END }, 0)
          .fromTo(".marquee", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0.25)
          .fromTo(".orbit", { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, RING_IN)
          .fromTo(".showcase__cta", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, RING_IN + 0.3);

        // Card ring: turn one card at a time and pause on each, so every card can be read.
        // Hide cards turned away from the viewer — backface-visibility alone leaves edge seams.
        const face = () => {
          const spin = Number(gsap.getProperty(spinEl, "rotateY"));
          cards.forEach((c, i) => {
            const facing = Math.cos(((spin + i * 60) * Math.PI) / 180);
            c.style.visibility = facing > -0.05 ? "visible" : "hidden";
          });
        };
        gsap.set(spinEl, { rotateY: 0 });
        face();
        let at = RING_IN + 0.5 + READ;
        for (let i = 1; i <= STEPS; i++) {
          tl.fromTo(
            spinEl,
            { rotateY: -(i - 1) * 60 },
            { rotateY: -i * 60, duration: STEP, ease: "power2.inOut", onUpdate: face, immediateRender: false },
            at,
          );
          at += STEP + READ;
        }
        return () => {
          delete el.dataset.motion;
        };
      });

      // Phones and narrow screens: same pinned framing and hold, then the page scrolls on normally.
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: `+=${FRAME_PX + HOLD_PX}`,
          pin: true,
          anticipatePin: 1,
        });
        framing();
      });

      return () => {
        window.clearTimeout(fallback);
        window.removeEventListener("serene:ready", onReady);
        el.querySelector(".hero__card")?.removeEventListener("pointermove", onMove as EventListener);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="intro" aria-label="Serene Heights Group">
      <div className="intro__stage">
        <div className="hero">
          <div className="hero__card">
            <div className="hero__grain" />
            <h1 className="hero__title display">
              <span className="line">
                <span>Built for the</span>
              </span>
              <span className="line soft">
                <span>heights ahead</span>
              </span>
            </h1>

            <figure className="hero__media" style={{ margin: 0 }}>
              {/* Drone loop over the resort, cut from the Nathia Gali walkthrough (11 s, seamless). */}
              <video
                className="hero__video"
                src="/media/video/hero-loop.mp4"
                poster="/media/video/hero-loop.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Aerial flight over Serene Heights Nathia Gali in winter"
              />
              <figcaption>
                <span>Nathia Gali</span>
                <span>7,906 ft</span>
              </figcaption>
            </figure>

            <div className="hero__bottom">
              <div className="hero__copy">
                <p className="lede">
                  One group, from the pines of the Galiyat to Gulberg Main Boulevard. Explore our projects, book a stay,
                  or own a share of what we build.
                </p>
                <div className="hero__actions">
                  <a href="#projects" className="btn btn--ghost">
                    Our projects
                  </a>
                  <a href="#stays" className="btn btn--white">
                    Book a stay <span className="arr">→</span>
                  </a>
                </div>
              </div>
              <div className="hero__foot">
                <span className="trust">
                  <span className="trust__faces">
                    <img src="/media/ng/snow-tower.webp" alt="" />
                    <img src="/media/lhr/aerial.jpg" alt="" />
                    <img src="/media/stay/ski-slope.jpg" alt="" />
                  </span>
                  Developed by DM Consortium · since 2017
                </span>
                <p className="hero__note">
                  Serene Heights is the umbrella for our hotel, resort and city developments — each one built, sold and
                  managed in-house.
                </p>
              </div>
            </div>
          </div>
          <div className="hero__frame" aria-hidden />
        </div>

        <div className="showcase" aria-label="Highlights">
          <div className="marquee" aria-hidden>
            {[0, 1].map((k) =>
              PHRASES.map((p) => (
                <span className="marquee__item" key={`${k}-${p}`}>
                  {p}
                  <span className="marquee__dot" />
                </span>
              )),
            )}
          </div>

          <div className="orbit" style={{ ["--rz" as string]: "clamp(232px, 20vw, 316px)" }}>
            <div className="ring__spin">
              {CARDS.map((c, i) => (
                <div
                  key={c.tag}
                  className={`ring__card${c.kind === "violet" ? " ring__card--violet" : ""}`}
                  style={{ transform: `rotateY(${i * 60}deg) translateZ(var(--rz))` }}
                >
                  {c.kind === "image" ? <img src={c.src} alt="" loading="lazy" /> : <Emblem />}
                  <span className="tag">{c.tag}</span>
                  <span className="cap">
                    {c.top}
                    <b>{c.bottom}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a href="#projects" className="btn btn--ink showcase__cta">
            Explore the portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
