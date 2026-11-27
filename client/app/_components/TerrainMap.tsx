"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "@/global/hooks/useInView";

const Galiyat = dynamic(() => import("./three/Galiyat"), { ssr: false });

/** The 3D relief of the Galiyat, at rest, for the Nathia Gali location pages. */
export function TerrainMap() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(1);
  const active = useInView(root);
  return (
    <div ref={root} className="terrain" role="img" aria-label="Relief map of the Galiyat showing Serene Heights Nathia Gali">
      {active && <Galiyat progress={progress} active={active} />}
    </div>
  );
}
