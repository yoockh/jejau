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

const ease = [0.21, 0.47, 0.32, 0.98] as const;

type LeafConfig = {
  sx: number;
  sy: number;
  dir: 1 | -1;
  range: [number, number];
};

// Leaves sprout in sequence from the base upward as the stem climbs.
const LEAVES: LeafConfig[] = [
  { sx: 100, sy: 232, dir: 1, range: [0.14, 0.34] },
  { sx: 100, sy: 200, dir: -1, range: [0.26, 0.46] },
  { sx: 100, sy: 168, dir: 1, range: [0.4, 0.6] },
  { sx: 100, sy: 138, dir: -1, range: [0.52, 0.72] },
  { sx: 100, sy: 110, dir: 1, range: [0.64, 0.84] },
];

function leafPath({ sx, sy, dir }: LeafConfig) {
  const d = dir;
  return `M${sx} ${sy} C ${sx + d * 14} ${sy - 22}, ${sx + d * 44} ${sy - 26}, ${sx + d * 54} ${sy - 14} C ${sx + d * 44} ${sy - 2}, ${sx + d * 20} ${sy + 4}, ${sx} ${sy} Z`;
}

/** A leaf that scales in from its stem attachment as scroll progress passes. */
function GrowLeaf({
  config,
  progress,
  reduce,
}: {
  config: LeafConfig;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const [start, end] = config.range;
  const scale = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, (start + end) / 2], [0, 1]);

  return (
    <motion.path
      d={leafPath(config)}
      fill="url(#leaf-grad)"
      stroke="#2fa678"
      strokeWidth="1.4"
      strokeLinejoin="round"
      style={
        reduce
          ? { opacity: 1 }
          : {
              scale,
              opacity,
              transformBox: "fill-box",
              originX: config.dir === 1 ? 0 : 1,
              originY: 0.5,
            }
      }
    />
  );
}

function GrowingPlant({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Stem draws from the soil up; bud blooms at the very end.
  const budScale = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <svg
      viewBox="0 0 200 300"
      className="h-[60vh] max-h-[34rem] w-auto"
      role="img"
      aria-label="An illustration of a plant growing from a sprout into a full plant"
    >
      <defs>
        <linearGradient id="leaf-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fe3bc" />
          <stop offset="1" stopColor="#2fa678" />
        </linearGradient>
        <linearGradient id="stem-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f6f54" />
          <stop offset="1" stopColor="#2fa678" />
        </linearGradient>
        <radialGradient id="soil-grad" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#1f6f54" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1f6f54" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft soil mound */}
      <ellipse cx="100" cy="288" rx="74" ry="16" fill="url(#soil-grad)" />
      <path
        d="M44 288 Q100 274 156 288"
        stroke="#1f6f54"
        strokeWidth="2"
        strokeOpacity="0.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* main stem */}
      <motion.path
        d="M100 288 C 96 230, 104 170, 100 120 C 97 96, 100 84, 100 74"
        stroke="url(#stem-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        style={reduce ? undefined : { pathLength: progress }}
      />

      {/* leaves */}
      {LEAVES.map((cfg, i) => (
        <GrowLeaf key={i} config={cfg} progress={progress} reduce={reduce} />
      ))}

      {/* crowning bud */}
      <motion.g
        style={
          reduce
            ? undefined
            : {
                scale: budScale,
                opacity: budScale,
                transformBox: "fill-box",
                originX: 0.5,
                originY: 1,
              }
        }
      >
        <path
          d="M100 74 C 92 60, 92 48, 100 40 C 108 48, 108 60, 100 74 Z"
          fill="url(#leaf-grad)"
          stroke="#2fa678"
          strokeWidth="1.4"
        />
        <circle cx="100" cy="44" r="3.4" fill="#aef7d3" />
      </motion.g>
    </svg>
  );
}

/**
 * Dedicated scroll-grown plant: as the section scrolls toward centre, the
 * sprout climbs into a full plant — fully grown when the section is centred.
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

  const stageOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [0.4, 0.7, 1, 1]
  );

  return (
    <section
      ref={ref}
      className="relative bg-ivory"
      aria-label="A plant growing as you scroll"
    >
      {/* fade in from the dark section above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-charcoal to-transparent"
        aria-hidden="true"
      />
      <div
        className="bio-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="min-h-[170vh]">
        {/* sticky stage keeps the plant centred while it grows */}
        <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-5 text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionLabel>Watch it grow</SectionLabel>
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              A plant&apos;s whole life, captured as you go.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-charcoal/65">
              Scroll, and watch it grow — every photo you take adds another leaf
              to a record that only gets richer with time.
            </p>
          </motion.div>

          <motion.div
            className="mt-2 flex items-center justify-center"
            style={reduce ? undefined : { opacity: stageOpacity }}
          >
            <GrowingPlant progress={progress} reduce={!!reduce} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
