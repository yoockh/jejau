"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export function StoryFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
          {/* progress spine */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-forest/10 sm:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-forest-bright to-amber"
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol className="space-y-20">
            {acts.map(({ Icon, title, text, visual }, i) => (
              <li key={title} className="relative sm:pl-24">
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
