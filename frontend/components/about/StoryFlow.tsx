"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Camera, FileHeart, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const acts = [
  {
    Icon: Camera,
    title: "A photo becomes a memory",
    text: "Each picture you take is more than a diagnosis — it's a timestamped observation of your plant at one moment of its life. Jejau never throws that moment away.",
    visual: (
      <div className="flex items-center gap-3 font-mono text-xs text-forest">
        <span className="rounded-lg border border-forest/20 bg-white px-3 py-2 shadow-sm">
          IMG_0142.jpg
        </span>
        <span aria-hidden="true">→</span>
        <span className="rounded-lg border border-forest/20 bg-forest/5 px-3 py-2">
          Entry #14 · Apr 04, 09:12
        </span>
      </div>
    ),
  },
  {
    Icon: FileHeart,
    title: "Memories become a record",
    text: "Entries accumulate into a health timeline: diseases caught, treatments applied, recoveries confirmed. Patterns emerge that no single scan could ever reveal.",
    visual: (
      <div className="flex gap-1.5" aria-hidden="true">
        {[40, 65, 35, 80, 55, 90, 70, 95].map((h, i) => (
          <div
            key={i}
            className="w-5 rounded-t bg-gradient-to-t from-forest to-forest-bright"
            style={{ height: `${h * 0.7}px`, opacity: 0.4 + (i / 8) * 0.6 }}
          />
        ))}
      </div>
    ),
  },
  {
    Icon: Lightbulb,
    title: "Records become foresight",
    text: "Jejau correlates care with outcomes and reads your local climate, adapting each plant's schedule — so you act before disease does, not after.",
    visual: (
      <div className="space-y-2 font-mono text-xs" aria-hidden="true">
        <p className="rounded-lg border border-amber/30 bg-amber/10 px-3 py-2 text-amber">
          Humid week ahead → fungal risk ↑
        </p>
        <p className="rounded-lg border border-forest/20 bg-forest/5 px-3 py-2 text-forest">
          Suggested: inspect leaves Tuesday
        </p>
      </div>
    ),
  },
];

/** A leaf that sprouts from a timeline node as the vine reaches it. */
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
      viewBox="0 0 60 40"
      className="absolute left-6 top-5 hidden h-7 w-10 -translate-x-1/2 sm:block"
      style={{ transform: `translateX(-50%) scaleX(${dir})` }}
      aria-hidden="true"
    >
      <motion.path
        d="M2 20 C 16 10, 40 8, 56 18 C 40 22, 18 26, 2 20 Z"
        fill="url(#vine-leaf-grad)"
        stroke="#2fa678"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={
          reduce
            ? { opacity: 1 }
            : { scale, opacity, transformBox: "fill-box", originX: 0, originY: 0.5 }
        }
      />
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
              <linearGradient
                id="vine-leaf-grad"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop stopColor="#8fe3bc" />
                <stop offset="1" stopColor="#2fa678" />
              </linearGradient>
            </defs>
            <motion.path
              d="M16 0 C 4 150, 28 320, 16 500 C 4 680, 28 850, 16 1000"
              stroke="url(#vine-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: drawn }}
            />
          </svg>

          <ol className="space-y-20">
            {acts.map(({ Icon, title, text, visual }, i) => (
              <li key={title} className="relative sm:pl-24">
                <VineLeaf progress={scrollYProgress} index={i} reduce={!!reduce} />
                <Reveal>
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
                    <div className="flex items-end justify-center rounded-2xl border border-forest/10 bg-white/70 p-8 backdrop-blur-sm">
                      {visual}
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
