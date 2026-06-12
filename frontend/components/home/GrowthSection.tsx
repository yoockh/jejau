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
const veinGlow = "drop-shadow(0 0 1.4px rgba(174,247,211,0.95))";
const amberGlow = "drop-shadow(0 0 2px rgba(232,178,58,0.9))";

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

function leafBody({ sx, sy, dir: d }: LeafConfig) {
  return `M${sx} ${sy} C ${sx + d * 14} ${sy - 22}, ${sx + d * 44} ${sy - 26}, ${sx + d * 56} ${sy - 14} C ${sx + d * 44} ${sy - 2}, ${sx + d * 20} ${sy + 4}, ${sx} ${sy} Z`;
}
function leafMidrib({ sx, sy, dir: d }: LeafConfig) {
  return `M${sx} ${sy} Q ${sx + d * 28} ${sy - 16}, ${sx + d * 52} ${sy - 13}`;
}
function leafSideVeins({ sx, sy, dir: d }: LeafConfig) {
  return [
    `M${sx + d * 18} ${sy - 9} L ${sx + d * 26} ${sy - 18}`,
    `M${sx + d * 34} ${sy - 13} L ${sx + d * 40} ${sy - 21}`,
  ];
}

/** A translucent, glowing-vein leaf that scales in from its stem node. */
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
    <motion.g
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
    >
      {/* glassy translucent body */}
      <path
        d={leafBody(config)}
        fill="url(#gp-glass)"
        stroke="#8fe3bc"
        strokeOpacity="0.55"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* circuitry veins */}
      <g style={{ filter: veinGlow }}>
        <path
          d={leafMidrib(config)}
          fill="none"
          stroke="#aef7d3"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {leafSideVeins(config).map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#aef7d3"
            strokeOpacity="0.8"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* amber node where the leaf joins the stem */}
      <circle
        cx={config.sx}
        cy={config.sy}
        r="2"
        fill="#e8b23a"
        style={{ filter: amberGlow }}
      />
    </motion.g>
  );
}

function GrowingPlant({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const budScale = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <svg
      viewBox="0 0 200 300"
      className="h-[clamp(20rem,46vh,30rem)] w-auto overflow-visible"
      role="img"
      aria-label="A glowing translucent plant growing from a sprout into a full plant"
    >
      <defs>
        <linearGradient id="gp-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aef7d3" stopOpacity="0.5" />
          <stop offset="1" stopColor="#1f6f54" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="gp-stem" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f6f54" />
          <stop offset="1" stopColor="#2fa678" />
        </linearGradient>
        <radialGradient id="gp-soil" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#2fa678" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2fa678" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft glowing soil */}
      <ellipse cx="100" cy="288" rx="78" ry="16" fill="url(#gp-soil)" />
      <path
        d="M46 288 Q100 274 154 288"
        stroke="#2fa678"
        strokeWidth="2"
        strokeOpacity="0.5"
        fill="none"
        strokeLinecap="round"
        style={{ filter: veinGlow }}
      />

      {/* main stem — structural body + luminous vein that lights up as it grows */}
      <motion.path
        d="M100 288 C 96 230, 104 170, 100 120 C 97 96, 100 84, 100 74"
        stroke="url(#gp-stem)"
        strokeWidth="4.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        fill="none"
        style={reduce ? undefined : { pathLength: progress }}
      />
      <motion.path
        d="M100 288 C 96 230, 104 170, 100 120 C 97 96, 100 84, 100 74"
        stroke="#aef7d3"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        style={{
          filter: veinGlow,
          ...(reduce ? {} : { pathLength: progress }),
        }}
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
          d="M100 74 C 90 58, 90 46, 100 38 C 110 46, 110 58, 100 74 Z"
          fill="url(#gp-glass)"
          stroke="#8fe3bc"
          strokeOpacity="0.6"
          strokeWidth="1.1"
        />
        <path
          d="M100 72 L100 44"
          stroke="#aef7d3"
          strokeWidth="0.9"
          strokeLinecap="round"
          style={{ filter: veinGlow }}
        />
        <circle cx="100" cy="42" r="3.2" fill="#aef7d3" style={{ filter: veinGlow }} />
        <circle cx="100" cy="74" r="2" fill="#e8b23a" style={{ filter: amberGlow }} />
      </motion.g>
    </svg>
  );
}

/**
 * Dedicated scroll-grown plant: as the section scrolls toward centre, the
 * sprout climbs into a full, bioluminescent plant — fully grown when centred.
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
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
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

      {/* the plant, haloed by a soft bioluminescent bloom */}
      <div className="relative z-[2] mt-6 flex items-center justify-center">
        <div
          className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,166,120,0.22),transparent_68%)]"
          aria-hidden="true"
        />
        <GrowingPlant progress={progress} reduce={!!reduce} />
      </div>
    </section>
  );
}
