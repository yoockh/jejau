"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Camera, CloudSun, FileHeart, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

/** A polaroid snapshot settling into the plant's journal — warm, human. */
function PolaroidMemory() {
  return (
    <div className="flex items-center gap-5" aria-hidden="true">
      <div className="relative w-28 shrink-0 -rotate-[5deg] rounded-md bg-white p-2 pb-7 shadow-[0_12px_32px_rgba(19,36,29,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:scale-105">
        {/* washi tape */}
        <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 rounded-sm bg-amber/30 backdrop-blur-[1px]" />
        <div className="flex aspect-square items-center justify-center rounded-sm bg-gradient-to-br from-ivory-dim via-mint/25 to-forest/20">
          <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
            <path
              d="M24 40 C 12 36, 8 24, 10 12 C 24 14, 36 20, 38 32 C 39 38, 32 42, 24 40 Z"
              fill="#2fa678"
              fillOpacity="0.5"
              stroke="#1f6f54"
              strokeWidth="1.4"
            />
            <path
              d="M16 34 C 20 28, 26 23, 33 20"
              stroke="#14503c"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="absolute inset-x-0 bottom-1.5 text-center font-display text-[10px] italic text-charcoal/55">
          April 4 · new leaf
        </p>
      </div>
      {/* a gentle hand-drawn arrow into the journal */}
      <svg viewBox="0 0 40 24" className="h-6 w-10 shrink-0 text-forest/50" fill="none">
        <path
          d="M2 12 C 12 4, 26 20, 36 12 M30 8 L 37 12 L 30 16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="min-w-0 rounded-2xl border border-forest/15 bg-gradient-to-br from-white to-mint/15 px-4 py-3 shadow-sm">
        <p className="font-display text-sm italic leading-snug text-charcoal/75">
          “A new leaf unfurled today — fourteen moments remembered.”
        </p>
        <p className="mt-1.5 text-xs text-forest">Mio&apos;s journal</p>
      </div>
    </div>
  );
}

/** Seasons accumulating like tree growth rings. */
function GrowthRings({ reduce }: { reduce: boolean }) {
  const rings = [
    { r: 12, tone: "#2fa678", w: 1.3 },
    { r: 22, tone: "#1f6f54", w: 1.2 },
    { r: 32, tone: "#2fa678", w: 1.2 },
    { r: 43, tone: "#1f6f54", w: 1.3 },
    { r: 55, tone: "#e8b23a", w: 1.6 },
  ];
  return (
    <div className="flex flex-col items-center gap-3" aria-hidden="true">
      <svg viewBox="0 0 140 140" className="h-36 w-36">
        <circle cx="70" cy="70" r="3.2" fill="#2fa678" />
        {rings.map(({ r, tone, w }, i) => (
          <motion.ellipse
            key={r}
            cx="70"
            cy="70"
            rx={r + (i % 2 === 0 ? 1.5 : -1)}
            ry={r - (i % 2 === 0 ? 1 : -1.5)}
            transform={`rotate(${i * 9} 70 70)`}
            fill="none"
            stroke={tone}
            strokeOpacity={0.3 + i * 0.12}
            strokeWidth={w}
            initial={reduce ? false : { scale: 0.55, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.18,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
      <p className="font-display text-xs italic text-charcoal/55">
        one season at a time
      </p>
    </div>
  );
}

/** Foresight as a warm note from a gardener, not a system alert. */
function ForesightNote() {
  return (
    <div
      className="max-w-[17rem] rounded-2xl border border-amber/30 bg-gradient-to-br from-white via-white to-amber/15 p-5 shadow-[0_10px_32px_rgba(19,36,29,0.1)]"
      aria-hidden="true"
    >
      <CloudSun className="h-6 w-6 text-amber" />
      <p className="mt-3 font-display text-sm italic leading-relaxed text-charcoal/75">
        “A humid week is on its way — let&apos;s look in on the leaves come
        Tuesday.”
      </p>
      <p className="mt-2 text-xs font-medium text-forest">
        — Jejau, planning ahead
      </p>
    </div>
  );
}

const acts = [
  {
    Icon: Camera,
    title: "A photo becomes a memory",
    text: "Each picture you take is more than a diagnosis — it's a timestamped observation of your plant at one moment of its life. Jejau never throws that moment away.",
    visual: <PolaroidMemory />,
  },
  {
    Icon: FileHeart,
    title: "Memories become a record",
    text: "Entries accumulate into a health timeline: diseases caught, treatments applied, recoveries confirmed. Patterns emerge that no single scan could ever reveal.",
    visual: null, // rendered as <GrowthRings /> below (needs reduced-motion flag)
  },
  {
    Icon: Lightbulb,
    title: "Records become foresight",
    text: "Jejau correlates care with outcomes and reads your local climate, adapting each plant's schedule — so you act before disease does, not after.",
    visual: <ForesightNote />,
  },
];

const vineVeinGlow = "drop-shadow(0 0 1.4px rgba(174,227,188,0.95))";
const vineAmberGlow = "drop-shadow(0 0 2px rgba(232,178,58,0.9))";

/** A translucent, glowing-vein leaf that sprouts from a timeline node. */
function VineLeaf({
  progress,
  index,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  reduce: boolean;
}) {
  // Each act sits roughly a third down the spine; sprout just before it.
  const start = 0.12 + index * 0.3;
  const scale = useTransform(progress, [start, start + 0.18], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const dir = index % 2 === 0 ? 1 : -1;

  return (
    <svg
      viewBox="0 0 64 44"
      className="absolute left-6 top-4 hidden h-9 w-12 overflow-visible sm:block"
      style={{ transform: `translateX(-50%) scaleX(${dir})` }}
      aria-hidden="true"
    >
      <motion.g
        style={
          reduce
            ? { opacity: 1 }
            : { scale, opacity, transformBox: "fill-box", originX: 0, originY: 0.5 }
        }
      >
        {/* glassy translucent body */}
        <path
          d="M4 22 C 20 10, 46 8, 60 20 C 46 24, 22 30, 4 22 Z"
          fill="url(#vine-glass)"
          stroke="#8fe3bc"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* circuitry midrib */}
        <path
          d="M4 22 Q 30 16, 56 19"
          fill="none"
          stroke="#aef7d3"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ filter: vineVeinGlow }}
        />
        {/* amber node at the stem junction */}
        <circle
          cx="4"
          cy="22"
          r="2.4"
          fill="#e8b23a"
          style={{ filter: vineAmberGlow }}
        />
      </motion.g>
    </svg>
  );
}

export function StoryFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const drawn = reduce ? 1 : lineScale;

  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div
        className="bio-grid-light absolute inset-0 [mask-image:linear-gradient(black,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <SectionLabel>What Jejau is</SectionLabel>
          <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            The story of every plant, in three acts.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20">
          {/* growing vine spine — draws downward as you scroll the acts */}
          <svg
            className="absolute left-6 top-0 hidden h-full w-8 -translate-x-1/2 sm:block"
            viewBox="0 0 32 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="vine-grad"
                x1="0"
                y1="0"
                x2="0"
                y2="1000"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2fa678" />
                <stop offset="0.6" stopColor="#1f6f54" />
                <stop offset="1" stopColor="#e8b23a" />
              </linearGradient>
              <linearGradient id="vine-glass" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#aef7d3" stopOpacity="0.5" />
                <stop offset="1" stopColor="#1f6f54" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            {/* structural vine */}
            <motion.path
              d="M16 0 C 4 150, 28 320, 16 500 C 4 680, 28 850, 16 1000"
              stroke="url(#vine-grad)"
              strokeWidth="3.5"
              strokeOpacity="0.55"
              strokeLinecap="round"
              style={{ pathLength: drawn }}
            />
            {/* luminous circuitry overlay that lights up as it draws */}
            <motion.path
              d="M16 0 C 4 150, 28 320, 16 500 C 4 680, 28 850, 16 1000"
              stroke="#aef7d3"
              strokeWidth="1.1"
              strokeOpacity="0.85"
              strokeLinecap="round"
              style={{
                pathLength: drawn,
                filter: "drop-shadow(0 0 1.6px rgba(174,227,188,0.9))",
              }}
            />
          </svg>

          <ol className="space-y-20">
            {acts.map(({ Icon, title, text, visual }, i) => (
              <li key={title} className="relative sm:pl-24">
                <VineLeaf progress={scrollYProgress} index={i} reduce={!!reduce} />
                <Reveal x={i % 2 === 0 ? -40 : 40} y={0}>
                  <div
                    className="absolute left-0 top-0 hidden h-12 w-12 items-center justify-center rounded-full border border-forest/20 bg-white shadow-[0_8px_24px_rgba(31,111,84,0.15)] sm:flex"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-forest" />
                  </div>
                  <div
                    className={`grid items-center gap-8 md:grid-cols-2 ${
                      i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div>
                      <h3 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-charcoal/65">
                        {text}
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded-2xl border border-forest/10 bg-white/70 p-8 backdrop-blur-sm">
                      {i === 1 ? <GrowthRings reduce={!!reduce} /> : visual}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
