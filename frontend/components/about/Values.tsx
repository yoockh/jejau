"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Recycle, Accessibility, Crosshair } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const values = [
  {
    Icon: Recycle,
    title: "Sustainability",
    text: "Healthier plants mean fewer wasted crops, less chemical guesswork, and greener cities. Good records are quietly good for the planet.",
  },
  {
    Icon: Accessibility,
    title: "Accessibility",
    text: "Plant pathology shouldn't require a degree. If you can take a photo, you can give your plant expert-grade care.",
  },
  {
    Icon: Crosshair,
    title: "Precision",
    text: "Advice grounded in your plant's own history and your local climate — not generic tips copied from a care sheet.",
  },
];

export function Values() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
          <Reveal>
            <SectionLabel>What we stand for</SectionLabel>
            <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal">
              Values that grow with us.
            </h2>
            <p className="mt-5 leading-relaxed text-charcoal/65">
              Three principles shape every feature we ship — and every one we
              decide not to.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {values.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                className={i === 1 ? "sm:mt-10" : ""}
                initial={reduce ? false : { opacity: 0, y: 36, scale: 0.9 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 22,
                  delay: 0.1 + i * 0.14,
                }}
              >
                <article className="group h-full rounded-3xl border border-forest/10 bg-white p-7 shadow-[0_12px_40px_rgba(19,36,29,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-forest/30 hover:shadow-[0_20px_60px_rgba(31,111,84,0.15)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 transition-colors duration-300 group-hover:bg-forest group-hover:[&>svg]:text-ivory">
                    <Icon
                      className="h-6 w-6 text-forest transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-charcoal">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                    {text}
                  </p>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
