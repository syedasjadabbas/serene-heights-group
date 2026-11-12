"use client";

import { useEffect, useState } from "react";
import { loadDem } from "@/global/lib/galiyat";

/** The Galiyat elevation grid, or null while it loads (or if it is unavailable). */
export function useDem() {
  const [dem, setDem] = useState<Int16Array | null>(null);
  useEffect(() => {
    let live = true;
    loadDem()
      .then((d) => live && setDem(d))
      .catch((e) => console.warn("Galiyat elevation data unavailable", e));
    return () => {
      live = false;
    };
  }, []);
  return dem;
}
