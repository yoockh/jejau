"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flower2, Sprout, Wheat } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WordCascade } from "@/components/ui/TextReveal";

const scales = [
  {
    Icon: Flower2,
    title: "A windowsill",
    text: "One monstera, fully remembered — every scan, every recovery, from cutting to canopy.",
    note: "1 plant · 1 living record",
  },
  {
    Icon: Sprout,
    title: "A garden",
    text: "Beds and greenhouses tracked through the seasons, so last year's lessons shape this year's care.",
    note: "Dozens of plants · shared patterns",
  },
  {
    Icon: Wheat,
    title: "A field",
    text: "Whole crops read at once — outbreaks caught at the first leaf, not the hundredth.",
    note: "Acres of crops · foresight at scale",
  },
];

/**
 * "Future of farming": the thesis, grounded by the three scales Jejau
 * grows across — from a single pot to whole fields.
 */
export function FutureBand() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal-deep py-24 text-ivory sm:py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(31,111,84,0.3),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-mint/70">
              The future of farming
            </p>
          </Reveal>
          <h2 className="text-glow mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            <WordCascade
              text="When every plant has a history, agriculture has a future."
              delay={0.15}
            />
          </h2>
        </div>

        {/* the three scales — rising one after another */}
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {scales.map(({ Icon, title, text, note }, i) => (
            <motion.article
              key={title}
              initial={reduce ? false : { opacity: 0, y: 44 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 24,
                delay: 0.3 + i * 0.15,
              }}
              className="group relative overflow-hidden rounded-3xl border border-mint/15 bg-gradient-to-b from-forest-deep/40 to-charcoal-deep p-7 transition-all duration-500 hover:-translate-y-1 hover:border-mint/40 hover:shadow-[0_0_50px_rgba(47,166,120,0.2)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-mint/20 bg-mint/5 text-mint transition-transform duration-500 group-hover:scale-110">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                {text}
              </p>
              <p className="mt-5 border-t border-mint/10 pt-4 text-xs font-medium uppercase tracking-wider text-mint/60">
                {note}
              </p>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.35}>
          <p className="mx-auto mt-14 max-w-2xl text-center leading-relaxed text-ivory/60">
            Health records turn reactive care into prediction. Jejau is
            building the connected memory that growing things have always
            deserved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
