"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ScanSearch, History, CalendarClock, CloudSun } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";
import { LitGrid } from "@/components/ui/LitGrid";

/** Corner vine that draws itself in while a card is hovered. */
function VineCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute h-24 w-24 ${className}`}
    >
      <path
        d="M118 2 C 70 6, 30 18, 14 54 C 6 74, 4 96, 2 118"
        stroke="#8fe3bc"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1}
        className="vine-draw"
        style={{ filter: "drop-shadow(0 0 4px rgba(143,227,188,0.7))" }}
      />
      <path
        d="M58 22 q 10 -12 24 -10 q -8 12 -24 10 Z"
        fill="#8fe3bc"
        fillOpacity="0"
        stroke="#8fe3bc"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        pathLength={1}
        className="vine-draw"
      />
    </svg>
  );
}

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // glow orbs counter-drift as the section scrolls — depth behind the grid
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="features"
      className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32"
    >
      {/* grid lines illuminate along the cursor's path */}
      <LitGrid />
      <motion.div
        className="orb-glow absolute -right-40 top-0 h-[36rem] w-[36rem]"
        style={reduce ? undefined : { y: orbY }}
        aria-hidden="true"
      />
      <motion.div
        className="orb-glow absolute -left-52 bottom-0 h-[30rem] w-[30rem]"
        style={reduce ? undefined : { y: orbY2 }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <SectionLabel tone="light">Features</SectionLabel>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything a plant&apos;s health record should be.
          </h2>
        </Reveal>

        {/* Bento grid: deliberately uneven sizes */}
        <div className="mt-16 grid gap-5 md:grid-cols-6 lg:grid-rows-[auto_auto]">
          {/* Disease detection — the big one, sliding in from the left */}
          <Reveal x={-48} y={0} className="md:col-span-4">
            <article className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-mint/40 hover:shadow-[0_0_60px_rgba(47,166,120,0.2)] sm:p-10">
              <VineCorner className="right-2 top-2 rotate-0" />
              <div
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-forest-bright/10 blur-3xl transition-opacity duration-500 group-hover:opacity-150"
                aria-hidden="true"
              />
              <ScanSearch
                className="h-10 w-10 text-mint transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              />
              <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
                Disease detection
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-ivory/65">
                A computer-vision model trained on real crop and houseplant
                pathology. It names the disease, estimates severity, and
                suggests treatment — from one photo, in seconds.
              </p>
              {/* mock scan readout */}
              <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-amber-soft">
                  Detected: early blight
                </span>
                <span className="rounded-full border border-mint/30 bg-mint/5 px-3 py-1.5 text-mint">
                  confidence 96%
                </span>
                <span className="rounded-full border border-mint/30 bg-mint/5 px-3 py-1.5 text-mint">
                  severity: mild
                </span>
              </div>
            </article>
          </Reveal>

          {/* Health timeline — tall accent card, sliding in from the right */}
          <Reveal x={48} y={0} delay={0.12} className="md:col-span-2 md:row-span-2">
            <article className="group relative h-full overflow-hidden rounded-3xl border border-forest-bright/25 bg-gradient-to-b from-forest-deep/60 to-charcoal-deep p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(47,166,120,0.25)]">
              <VineCorner className="right-2 top-2" />
              <History className="h-10 w-10 text-mint" aria-hidden="true" />
              <h3 className="mt-6 font-display text-2xl font-bold">
                Health timeline
              </h3>
              <p className="mt-3 leading-relaxed text-ivory/65">
                Every scan is a timestamped entry. Scroll back through a
                plant&apos;s whole life — what it caught, what cured it, how
                long recovery took.
              </p>
              {/* vertical mini-timeline */}
              <div
                className="mt-8 space-y-0 border-l border-mint/20 pl-5"
                aria-hidden="true"
              >
                {["Healthy", "Leaf spot", "Treated", "Recovered"].map(
                  (label, i) => (
                    <div key={label} className="relative pb-6 last:pb-0">
                      <span
                        className={`absolute -left-[1.42rem] top-1 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
                          i === 1 ? "bg-amber" : "bg-forest-bright"
                        }`}
                      />
                      <p className="text-sm text-ivory/70">{label}</p>
                    </div>
                  )
                )}
              </div>
            </article>
          </Reveal>

          {/* Adaptive care schedule */}
          <Reveal delay={0.18} className="md:col-span-2">
            <article className="glass group h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_0_50px_rgba(232,178,58,0.15)]">
              <CalendarClock
                className="h-9 w-9 text-amber transition-transform duration-500 group-hover:rotate-6"
                aria-hidden="true"
              />
              <h3 className="mt-5 font-display text-xl font-bold">
                Adaptive care schedule
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                Jejau correlates your care actions with outcomes and reshapes
                the schedule — watering, feeding, checkups — around what
                actually worked.
              </p>
            </article>
          </Reveal>

          {/* Climate-aware advice */}
          <Reveal delay={0.24} className="md:col-span-2">
            <article className="group h-full rounded-3xl border border-mint/15 bg-charcoal-deep/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-mint/40 hover:shadow-[0_0_50px_rgba(47,166,120,0.18)]">
              <CloudSun
                className="h-9 w-9 text-mint transition-transform duration-500 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <h3 className="mt-5 font-display text-xl font-bold">
                Climate-aware advice
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                Humidity spikes invite fungus; heatwaves change watering needs.
                Recommendations shift with your local weather, before problems
                start.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
