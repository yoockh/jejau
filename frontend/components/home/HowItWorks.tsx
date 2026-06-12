"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, BrainCircuit, History } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    Icon: Camera,
    title: "Snap a photo",
    text: "Point your camera at a leaf, stem, or fruit. That's it — no forms, no plant encyclopedias to dig through.",
  },
  {
    number: "02",
    Icon: BrainCircuit,
    title: "AI detects disease",
    text: "Jejau's vision model identifies the condition, its severity, and a recommended treatment in seconds.",
  },
  {
    number: "03",
    Icon: History,
    title: "Logged to the timeline",
    text: "The diagnosis joins your plant's health record, timestamped — so progress, relapses, and recoveries are never lost.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-ivory-dim py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            From photo to foresight, in three steps.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20">
          {/* Connecting path — drawn as you scroll (desktop) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1000 420"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 80 120 C 280 120, 280 260, 500 260 C 720 260, 720 120, 920 120"
              stroke="url(#how-grad)"
              strokeWidth="2"
              strokeDasharray="8 8"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="how-grad" x1="0" y1="0" x2="1000" y2="0">
                <stop stopColor="#1F6F54" />
                <stop offset="0.5" stopColor="#2FA678" />
                <stop offset="1" stopColor="#E8B23A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Mobile connecting line */}
          <div
            className="absolute left-7 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-forest via-forest-bright to-amber lg:hidden"
            aria-hidden="true"
          />

          <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map(({ number, Icon, title, text }, i) => (
              <Reveal
                key={number}
                delay={i * 0.18}
                className={i === 1 ? "lg:mt-36" : ""}
              >
                <li className="group relative pl-20 lg:pl-0">
                  <div className="absolute left-0 top-0 lg:relative lg:mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-forest/20 bg-white shadow-[0_8px_30px_rgba(31,111,84,0.15)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-forest-bright/50 group-hover:shadow-[0_12px_40px_rgba(47,166,120,0.3)]">
                      <Icon className="h-6 w-6 text-forest" aria-hidden="true" />
                    </div>
                  </div>
                  <p
                    className="font-display text-sm font-bold tracking-[0.3em] text-forest/50"
                    aria-hidden="true"
                  >
                    {number}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-charcoal">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-charcoal/65">
                    {text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
