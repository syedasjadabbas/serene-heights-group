"use client";

import { useEffect, useState } from "react";
import Link from "@/global/components/Link";
import { usePathname } from "next/navigation";
import { menus } from "@/global/site/menus";
import { Emblem } from "./Emblem";

const inside = (path: string, href: string) => path === href || (href !== "/" && path.startsWith(href + "/"));

/** The client's two headers: investing (green) and hotel (orange), each with its own menus and phone menu. */
export function SiteHeader({ hotel }: { hotel: boolean }) {
  const menu = hotel ? menus.hotel : menus.invest;
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [drop, setDrop] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const [dark, setDark] = useState(false);

  // On the home page the bar stays out of the way on the hero and slides in once the hero has gone.
  // Over a dark section it turns transparent glass with white text.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const card = document.querySelector<HTMLElement>(".hero__card");
      setShown(!card || getComputedStyle(card).visibility === "hidden" || card.getBoundingClientRect().bottom < 140);
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((n) => !n.closest(".nav") && n.closest("[data-nav]"));
      setDark(under?.closest<HTMLElement>("[data-nav]")?.dataset.nav === "dark");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setDrop(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="nav" aria-label="Main" data-hidden={!shown && !open ? "true" : undefined} data-theme={dark && !open ? "dark" : undefined}>
        <Link href={menu.home} className="nav__mark" aria-label={hotel ? "Serene Heights Hotels and Resorts" : "Serene Heights Group"}>
          <Emblem className="w-[13px]" />
        </Link>
        {menu.items.map((m) => (
          <div
            key={m.label}
            className="nav__item"
            data-open={drop === m.label || undefined}
            onMouseEnter={() => setDrop(m.items ? m.label : null)}
            onMouseLeave={() => setDrop(null)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDrop(null)}
          >
            <Link href={m.href} className="nav__link" aria-current={inside(path, m.href) ? "true" : undefined} onFocus={() => setDrop(m.items ? m.label : null)}>
              {m.label}
            </Link>
            {m.items && (
              <ul className="nav__drop">
                {m.items.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} aria-current={path === s.href ? "page" : undefined}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <Link href={menu.cross.href} className="nav__link nav__cross">
          {menu.cross.label}
        </Link>
        <button className="nav__menu" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
        <Link href={menu.cta.href} className="btn btn--ink nav__cta">
          {menu.cta.label}
        </Link>
      </nav>
      {open && (
        <div id="nav-sheet" className="nav__sheet" data-lenis-prevent>
          {menu.items.map((m) =>
            m.items ? (
              <div key={m.label} className="nav__group">
                <div className="nav__row">
                  <Link href={m.href}>{m.label}</Link>
                  <button aria-label={`${m.label} menu`} aria-expanded={section === m.label} onClick={() => setSection(section === m.label ? null : m.label)}>
                    {section === m.label ? "−" : "+"}
                  </button>
                </div>
                {section === m.label && (
                  <div className="nav__list">
                    {m.items.map((s) => (
                      <Link key={s.href} href={s.href}>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={m.label} href={m.href}>
                {m.label}
              </Link>
            ),
          )}
          <Link href={menu.cross.href}>{menu.cross.label}</Link>
          <Link href={menu.cta.href}>{menu.cta.label}</Link>
        </div>
      )}
    </>
  );
}
