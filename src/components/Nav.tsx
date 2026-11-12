"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Emblem } from "./Emblem";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav__mark" aria-label="Serene Heights Group — back to top">
          <Emblem className="w-[13px]" />
        </a>
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="nav__link" aria-current={active === n.href.slice(1) ? "true" : undefined}>
            {n.label}
          </a>
        ))}
        <button className="nav__menu" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
        <a href="#contact" className="btn btn--ink nav__cta">
          Enquire
        </a>
      </nav>
      {open && (
        <div id="nav-sheet" className="nav__sheet" onClick={() => setOpen(false)}>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href="#contact">Enquire</a>
        </div>
      )}
    </>
  );
}
