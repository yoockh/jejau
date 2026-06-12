"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Leaf, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";
import {
  LEAF_CIRCUITRY,
  photoSrc,
  photoCreditUrl,
  photographerUrl,
} from "@/lib/unsplash";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

// Circuit traces that branch like leaf veins, ending in glowing nodes.
const traces = [
  "M50 96 L50 60 L30 44 L30 26",
  "M50 60 L70 44 L70 22",
  "M50 72 L34 62 L18 64",
  "M50 72 L66 62 L82 60",
  "M50 48 L50 30 L62 18",
];
const nodes: Array<[number, number]> = [
  [30, 26],
  [70, 22],
  [18, 64],
  [82, 60],
  [62, 18],
  [50, 30],
];

const points = [
  {
    Icon: Leaf,
    title: "It reads a living thing",
    text: "Leaf colour, lesion shape, vein patterns — the signals a trained eye looks for, captured from one photo.",
  },
  {
    Icon: Cpu,
    title: "A model makes sense of it",
    text: "Vision intelligence turns those signals into a named diagnosis, a severity, and a treatment — in seconds.",
  },
  {
    Icon: Sparkles,
    title: "And it keeps learning",
    text: "Every outcome you log sharpens the next prediction. The longer you use Jejau, the more it knows your plants.",
  },
];

export function IntelligenceShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal-deep py-24 text-ivory sm:py-32">
      <div className="bio-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="orb-glow absolute -left-40 top-1/3 h-[32rem] w-[32rem]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <SectionLabel tone="light">Where tech meets nature</SectionLabel>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              A living thing,{" "}
              <span className="text-glow bg-gradient-to-r from-mint to-forest-bright bg-clip-text text-transparent">
                read by a learning machine.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg leading-relaxed text-ivory/65">
              Jejau is where botany and computation grow together — circuitry
              threaded through chlorophyll. The same intelligence that powers
              your diagnoses is what turns a scattered set of photos into
              foresight.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-6">
            {points.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={0.2 + i * 0.12}>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint/20 bg-mint/5 text-mint">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/60">
                      {text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* the glass-polymer leaf: real photo + glowing circuitry overlay */}
        <Reveal x={40} y={0} className="order-1 lg:order-2">
          <figure className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-mint/20 shadow-[0_30px_90px_rgba(11,23,18,0.6)]">
            <Image
              src={photoSrc(LEAF_CIRCUITRY, { w: 1200 })}
              alt={LEAF_CIRCUITRY.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 28rem"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* dark-green cohesion overlay */}
            <div
              className="absolute inset-0 bg-[linear-gradient(150deg,rgba(11,23,18,0.35),rgba(14,58,43,0.55)_60%,rgba(11,23,18,0.8))]"
              aria-hidden="true"
            />
            {/* glass sheen */}
            <div
              className="absolute inset-0 bg-[linear-gradient(115deg,rgba(174,247,211,0.18),transparent_40%)]"
              aria-hidden="true"
            />

            {/* glowing green circuitry */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <g
                stroke="#aef7d3"
                strokeWidth="0.5"
                fill="none"
                style={{ filter: "drop-shadow(0 0 2px rgba(143,227,188,0.9))" }}
              >
                {traces.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={
                      reduce ? undefined : { pathLength: 1, opacity: 0.85 }
                    }
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3 + i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </g>
              {/* central core */}
              <circle cx="50" cy="96" r="2" fill="#aef7d3" />
              {nodes.map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="1.6"
                  fill="#aef7d3"
                  style={{ filter: "drop-shadow(0 0 3px rgba(143,227,188,1))" }}
                  initial={reduce ? false : { opacity: 0.3, scale: 0.8 }}
                  animate={
                    reduce
                      ? undefined
                      : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2.6,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            <figcaption className="absolute bottom-3 right-3 text-[10px] text-ivory/55">
              Photo:{" "}
              <a
                href={photographerUrl(LEAF_CIRCUITRY.username)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-ivory hover:underline"
              >
                {LEAF_CIRCUITRY.photographer}
              </a>{" "}
              /{" "}
              <a
                href={photoCreditUrl(LEAF_CIRCUITRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-ivory hover:underline"
              >
                Unsplash
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
