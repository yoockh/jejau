"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ScanLine, XCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { Reveal, staggerChild } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const recordEntries = [
  {
    date: "Mar 02",
    title: "Leaf spot detected",
    detail: "Early-stage fungal infection on lower leaves",
    status: "alert" as const,
  },
  {
    date: "Mar 09",
    title: "Treatment logged",
    detail: "Neem application · watering reduced to 2×/week",
    status: "action" as const,
  },
  {
    date: "Mar 21",
    title: "Recovery confirmed",
    detail: "No new lesions · new growth healthy",
    status: "good" as const,
  },
  {
    date: "Apr 04",
    title: "Schedule adapted",
    detail: "Preventive check moved earlier for humid weeks",
    status: "smart" as const,
  },
];

const statusStyles = {
  alert: "border-l-amber bg-amber/5",
  action: "border-l-forest bg-forest/5",
  good: "border-l-forest-bright bg-forest-bright/5",
  smart: "border-l-mint bg-mint/10",
};

const statusIcon = {
  alert: <XCircle className="h-4 w-4 text-amber" aria-hidden="true" />,
  action: <ScanLine className="h-4 w-4 text-forest" aria-hidden="true" />,
  good: (
    <CheckCircle2 className="h-4 w-4 text-forest-bright" aria-hidden="true" />
  ),
  smart: <TrendingUp className="h-4 w-4 text-forest" aria-hidden="true" />,
};

export function ProblemSolution() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // the record card drifts at its own pace — layered parallax against the copy
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div className="bio-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* The problem — slides in from the left as the section enters */}
        <div>
          <Reveal x={-44} y={0}>
            <SectionLabel>The problem</SectionLabel>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl">
              Most plant apps{" "}
              <span className="relative inline-block text-charcoal/40">
                scan once
                <motion.span
                  className="absolute left-0 top-1/2 h-[3px] w-full origin-left -rotate-2 rounded bg-amber"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                />
              </span>{" "}
              and forget.
            </h2>
          </Reveal>
          <Reveal x={-44} y={0} delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70">
              A diagnosis without history is a guess. Diseases develop over
              weeks, treatments take time to work, and seasons change what your
              plant needs. One snapshot can&apos;t see any of that.
            </p>
          </Reveal>
          <Reveal x={-44} y={0} delay={0.3}>
            <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-forest">
              Jejau keeps the whole story — every photo becomes an entry in a
              living health record, so each diagnosis learns from the last.
            </p>
          </Reveal>
        </div>

        {/* The solution — the record drifts in from the right, straightening
            as it lands, then its entries cascade */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 56, rotate: 2 },
            show: {
              opacity: 1,
              x: 0,
              rotate: 0,
              transition: {
                duration: 0.9,
                ease: [0.21, 0.47, 0.32, 0.98],
                staggerChildren: 0.12,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={reduce ? undefined : { y: cardY }}
          className="relative"
          aria-label="Example plant health record"
        >
          <div
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-forest/10 via-transparent to-amber/10 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative rounded-3xl border border-forest/15 bg-white/80 p-6 shadow-[0_24px_80px_rgba(19,36,29,0.12)] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-bold text-charcoal">
                  Monstera “Mio”
                </p>
                <p className="text-xs uppercase tracking-wider text-charcoal/50">
                  Health record · 14 entries
                </p>
              </div>
              <span className="rounded-full bg-forest-bright/15 px-3 py-1 text-xs font-semibold text-forest">
                Thriving
              </span>
            </div>

            <ol className="space-y-3">
              {recordEntries.map((entry, i) => (
                <motion.li
                  key={entry.date}
                  variants={staggerChild}
                  className={`flex items-start gap-4 rounded-xl border-l-4 p-4 transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_8px_28px_rgba(31,111,84,0.14)] ${statusStyles[entry.status]} ${
                    i % 2 === 1 ? "sm:ml-8" : ""
                  }`}
                >
                  <span className="mt-0.5">{statusIcon[entry.status]}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal">
                      <time className="mr-2 font-mono text-xs text-charcoal/50">
                        {entry.date}
                      </time>
                      {entry.title}
                    </p>
                    <p className="mt-0.5 text-xs text-charcoal/60">
                      {entry.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
