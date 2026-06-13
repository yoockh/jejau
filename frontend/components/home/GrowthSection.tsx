"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/Section";
import { GlassPlant } from "@/components/plant/GlassPlant";

/** Bioluminescent spores that drift upward once the plant is thriving. */
function Spores({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [0.45, 0.8], [0, 1]);
  if (reduce) return null;

  const spores = [
    { left: "32%", bottom: "14%", size: 4, delay: 0, duration: 9 },
    { left: "44%", bottom: "10%", size: 3, delay: 2.2, duration: 11 },
    { left: "55%", bottom: "16%", size: 5, delay: 1.1, duration: 8 },
    { left: "63%", bottom: "9%", size: 3, delay: 3.6, duration: 10 },
    { left: "38%", bottom: "26%", size: 2.5, delay: 4.4, duration: 12 },
    { left: "68%", bottom: "22%", size: 2.5, delay: 5.2, duration: 9.5 },
  ];

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      {spores.map((s, i) => (
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
    </motion.div>
  );
}

/**
 * Dedicated scroll-grown plant: a complete glass-polymer sprout on arrival
 * that matures — leaf pair by leaf pair, veins lighting up — into the full
 * seedling as the section scrolls toward centre.
 */
export function GrowthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // When reduced motion is requested, pin progress at the fully grown state.
  const fallback = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? fallback : scrollYProgress;
  // the bloom behind the plant breathes brighter as it grows
  const bloomOpacity = useTransform(progress, [0, 1], [0.3, 1]);
  // the heading rises and brightens in step with the plant itself
  const headY = useTransform(progress, [0, 0.4], [28, 0]);
  const headOpacity = useTransform(progress, [0, 0.4], [0.25, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ivory py-24 text-center sm:py-32"
      aria-label="A plant growing as you scroll"
    >
      <div
        className="bio-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto max-w-2xl px-5">
        <motion.div style={reduce ? undefined : { y: headY, opacity: headOpacity }}>
          <SectionLabel>Watch it grow</SectionLabel>
          <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            A plant&apos;s whole life, captured as you go.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-charcoal/65">
            Scroll, and watch it grow — every photo you take adds another leaf to
            a record that only gets richer with time.
          </p>
        </motion.div>
      </div>

      {/* the plant, haloed by a bloom that brightens as it grows */}
      <div className="relative z-[2] mt-6 flex items-center justify-center">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,166,120,0.28),transparent_66%)]"
          style={reduce ? undefined : { opacity: bloomOpacity }}
          aria-hidden="true"
        />
        <Spores progress={progress} reduce={!!reduce} />
        <GlassPlant
          progress={progress}
          reduce={!!reduce}
          className="h-[clamp(22rem,52vh,32rem)] w-auto"
        />
      </div>
    </section>
  );
}
