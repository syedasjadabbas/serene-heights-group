"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <header className={`head${hotel ? " head--hotel" : ""}`}>
      <div className="head__bar">
        <Link href={menu.home} className="head__logo" aria-label={hotel ? "Serene Heights Hotels and Resorts" : "Serene Heights Group"}>
          <Emblem className="w-[17px]" />
          <span>
            Serene Heights
            <small>{hotel ? "Hotels and Resorts" : "Group"}</small>
          </span>
        </Link>

        <nav className="head__nav" aria-label="Main">
          {menu.items.map((m) => (
            <div
              key={m.label}
              className="head__item"
              data-open={drop === m.label || undefined}
              onMouseEnter={() => setDrop(m.items ? m.label : null)}
              onMouseLeave={() => setDrop(null)}
              onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDrop(null)}
            >
              <Link href={m.href} aria-current={inside(path, m.href) ? "true" : undefined} onFocus={() => setDrop(m.items ? m.label : null)}>
                {m.label}
              </Link>
              {m.items && (
                <ul className="head__drop">
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
        </nav>

        <Link href={menu.cross.href} className="head__cross">
          {menu.cross.label}
        </Link>
        <Link href={menu.cta.href} className="btn btn--main head__cta">
          {menu.cta.label}
        </Link>
        <button className="head__toggle" aria-expanded={open} aria-controls="phone-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          <i />
          <i />
        </button>
      </div>

      {open && (
        <nav id="phone-menu" className="sheet" aria-label="Main">
          {menu.items.map((m) =>
            m.items ? (
              <div key={m.label} className="sheet__group">
                <button aria-expanded={section === m.label} onClick={() => setSection(section === m.label ? null : m.label)}>
                  {m.label} <span aria-hidden>{section === m.label ? "−" : "+"}</span>
                </button>
                {section === m.label && (
                  <ul>
                    <li>
                      <Link href={m.href} onClick={() => setOpen(false)}>
                        All of {m.label.toLowerCase()}
                      </Link>
                    </li>
                    {m.items.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={() => setOpen(false)}>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={m.label} href={m.href} onClick={() => setOpen(false)}>
                {m.label}
              </Link>
            ),
          )}
          <Link href={menu.cross.href} onClick={() => setOpen(false)}>
            {menu.cross.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
