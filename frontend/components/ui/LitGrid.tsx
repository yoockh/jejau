"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive living grid for dark sections: a faint base grid plus a
 * brighter layer revealed through a radial mask that follows the cursor,
 * so the lines appear to light up along the pointer's path. Pure CSS-var
 * tracking — no re-renders, no work at all until the pointer moves.
 */
export function LitGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--lit-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--lit-y", `${e.clientY - rect.top}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--lit-x", "-400px");
      el.style.setProperty("--lit-y", "-400px");
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <div className="bio-grid absolute inset-0" />
      <div ref={ref} className="lit-grid absolute inset-0" />
    </div>
  );
}
