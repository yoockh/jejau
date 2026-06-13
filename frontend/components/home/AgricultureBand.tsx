"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sprout } from "lucide-react";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { WipeReveal } from "@/components/ui/TextReveal";
import { AGRICULTURE } from "@/lib/unsplash";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Full-bleed agriculture photograph that grounds the brand in real, living
 * fields. Dark-green overlay keeps the statement legible and on-palette.
 * Multi-layer parallax: the photo drifts, the statement scales gently the
 * other way — depth without haze.
 */
export function AgricultureBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.03]);
  const contentY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78vh] items-center overflow-hidden bg-charcoal-deep py-28 text-ivory sm:py-36"
    >
      <PhotoBackdrop photo={AGRICULTURE} priority={false} />

      <motion.div
        style={reduce ? undefined : { scale: contentScale, y: contentY }}
        className="relative z-[2] mx-auto max-w-4xl px-5 text-center sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-charcoal-deep/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-mint backdrop-blur-sm"
        >
          <Sprout className="h-3.5 w-3.5" aria-hidden="true" />
          Rooted in the real world
        </motion.p>

        <WipeReveal delay={0.15} className="mt-7">
          <h2 className="text-glow font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Built for everything
            <br className="hidden sm:block" /> that grows.
          </h2>
        </WipeReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ivory/80"
        >
          From a single windowsill seedling to fields that feed cities — Jejau
          gives every growing thing the same gift: a memory of its own health,
          and the foresight that comes with it.
        </motion.p>
      </motion.div>
    </section>
  );
}
