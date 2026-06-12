"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { createPointerState } from "./pointerState";
import { StaticGlobe } from "./StaticGlobe";

// Client-only: the module itself decides between WebGL and the static fallback.
const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => <StaticGlobe />,
});

type HeroGlobeProps = {
  /** Sizing/position classes for the globe container. */
  className?: string;
  /** Glow classes behind the globe (the "green sun"). */
  glowClassName?: string;
};

/**
 * Hero globe wrapper: owns the cursor state and lazy-loads the three.js
 * scene off the critical path.
 */
export function HeroGlobe({
  className = "mx-auto aspect-square w-full max-w-[36rem]",
  glowClassName = "orb-glow absolute -inset-20",
}: HeroGlobeProps = {}) {
  // Mutable cursor state shared with the R3F render loop — a ref, not React
  // state, since it updates on every pointer move and shouldn't re-render.
  const pointer = useRef(createPointerState());

  return (
    <div
      role="img"
      aria-label="A glowing green globe showing plants connected around the world"
      className={`relative cursor-grab ${className}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        pointer.current.hovering = true;
      }}
      onPointerLeave={() => {
        pointer.current.hovering = false;
      }}
    >
      <div className={glowClassName} aria-hidden="true" />
      <GlobeScene pointer={pointer} />
    </div>
  );
}
