"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Pin-and-stack scroll choreography: `back` pins to the viewport and
 * recedes — scaling down and dimming — while `front` slides up and over
 * it like the next card in a deck. Falls back to plain stacked sections
 * when reduced motion is requested.
 */
export function StackPair({
  back,
  front,
}: {
  back: ReactNode;
  front: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0.3, 1], [1, 0.92]);
  const dim = useTransform(scrollYProgress, [0.3, 1], [0, 0.45]);

  if (reduce) {
    return (
      <>
        {back}
        {front}
      </>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* pinned, receding card */}
      <div className="sticky top-0 overflow-hidden">
        <motion.div style={{ scale }} className="origin-center">
          {back}
        </motion.div>
        {/* darkening veil as it recedes */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-charcoal-deep"
          style={{ opacity: dim }}
        />
      </div>
      {/* incoming section slides over — a clean straight edge with a
          luminous hairline marking the boundary */}
      <div className="relative z-10 shadow-[0_-24px_80px_rgba(11,23,18,0.7)]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-forest-bright/50 to-transparent"
        />
        {front}
      </div>
    </div>
  );
}
