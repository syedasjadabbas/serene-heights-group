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
        if (reduce) return;
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero__card", { scale: 0.94, borderRadius: 40, duration: 1.6 })
          .from(".hero__title .line > span", { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.1)
          .from(".hero__media", { y: 80, autoAlpha: 0, rotate: 4, duration: 1.4 }, 0.25)
          .from(".hero__media img", { scale: 1.5, duration: 2 }, 0.25)
          .from(".hero__bottom > *", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.45);
      };
      let entered = false;
      const onReady = () => {
        if (entered) return;
        entered = true;
        enter();
      };
      window.addEventListener("serene:ready", onReady, { once: true });
      const fallback = window.setTimeout(onReady, 4800);

      // Pointer parallax on the floating image.
      const qx = gsap.quickTo(".hero__media", "x", { duration: 1.2, ease: "power3" });
      const qy = gsap.quickTo(".hero__media", "y", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        if (reduce) return;
        qx((e.clientX / window.innerWidth - 0.5) * 30);
        qy((e.clientY / window.innerHeight - 0.5) * 24);
      };
      el.querySelector(".hero__card")?.addEventListener("pointermove", onMove as EventListener);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.motion = "on";
        const cards = gsap.utils.toArray<HTMLElement>(".ring__card", el);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".intro__stage",
            start: "top top",
            end: "+=260%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.to(".hero__card", { transformPerspective: 1400, rotateX: 42, rotateZ: -24, scale: 0.5, yPercent: -6, duration: 1, ease: "power1.in" }, 0)
          .to(".hero__title, .hero__bottom", { autoAlpha: 0, duration: 0.5 }, 0.1)
          .to(".hero__card", { autoAlpha: 0, scale: 0.28, duration: 0.45 }, 0.85)
          .fromTo(".marquee", { xPercent: 4 }, { xPercent: -46, duration: 3.2 }, 0)
          .fromTo(".marquee", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0.25)
          .fromTo(".orbit", { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out" }, 0.75)
          .fromTo(
            ".ring__spin",
            { rotateY: 40 },
            {
              rotateY: -320,
              duration: 2.6,
              // Hide cards turned away from the viewer — backface-visibility alone leaves edge seams.
              onUpdate: () => {
                const spin = Number(gsap.getProperty(".ring__spin", "rotateY"));
                cards.forEach((c, i) => {
                  const facing = Math.cos(((spin + i * 60) * Math.PI) / 180);
                  c.style.visibility = facing > -0.05 ? "visible" : "hidden";
                });
              },
            },
            0.6,
          )
          .fromTo(".showcase__cta", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.2);
        return () => {
          delete el.dataset.motion;
        };
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
              <img src="/media/stay/tower-snow-night.jpg" alt="Serene Heights Nathia Gali in winter" fetchPriority="high" />
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
