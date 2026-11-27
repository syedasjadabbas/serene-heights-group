"use client";

import { useState } from "react";
import type { Img } from "@/global/site/types";

/** Picture grid with the client's "By subject" filter. */
export function GalleryGrid({ images }: { images: (Img & { subject: string })[] }) {
  const subjects = ["All", ...new Set(images.map((i) => i.subject))];
  const [on, setOn] = useState("All");
  return (
    <>
      <div className="filters" role="group" aria-label="Filter by subject">
        {subjects.map((s) => (
          <button key={s} type="button" aria-pressed={s === on} onClick={() => setOn(s)}>
            {s}
          </button>
        ))}
      </div>
      <ul className="gallery">
        {images
          .filter((i) => on === "All" || i.subject === on)
          .map((i) => (
            <li key={i.src + i.subject}>
              <a href={i.src} target="_blank" rel="noopener">
                <img src={i.src} alt={i.alt} loading="lazy" />
              </a>
              <span>{i.alt}</span>
            </li>
          ))}
      </ul>
    </>
  );
}
