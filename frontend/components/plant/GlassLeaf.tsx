"use client";

import { useReducedMotion, useMotionValue } from "framer-motion";
import { GlassPlant } from "./GlassPlant";

/**
 * Auth pages' visual centrepiece: the fully grown glass-polymer plant,
 * idling — floating gently, amber nodes pulsing, light running up the
 * stem — over a layered bioluminescent bloom.
 */
export function GlassLeaf({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  // fully grown, always
  const progress = useMotionValue(1);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* layered bloom behind the plant */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,166,120,0.32),transparent_62%)] blur-2xl" />
      <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(143,227,188,0.18),transparent_60%)] blur-xl" />

      {/* drifting spores */}
      {!reduce &&
        [
          { left: "16%", bottom: "8%", size: 4, delay: 0, duration: 10 },
          { left: "78%", bottom: "14%", size: 3, delay: 2.5, duration: 9 },
          { left: "30%", bottom: "20%", size: 2.5, delay: 4.8, duration: 12 },
          { left: "64%", bottom: "4%", size: 3.5, delay: 1.4, duration: 11 },
        ].map((s, i) => (
          <span
            key={i}
            className="animate-spore absolute rounded-full bg-mint-bright"
            style={{
              left: s.left,
              bottom: s.bottom,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 8px rgba(174,247,211,0.9)",
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

      <GlassPlant
        progress={progress}
        reduce={!!reduce}
        idle
        className="relative h-full w-full"
      />
    </div>
  );
}
