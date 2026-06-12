"use client";

import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { AGRICULTURE } from "@/lib/unsplash";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Full-bleed agriculture photograph that grounds the brand in real, living
 * fields. Dark-green overlay keeps the statement legible and on-palette.
 */
export function AgricultureBand() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-charcoal-deep py-28 text-ivory sm:py-36">
      <PhotoBackdrop photo={AGRICULTURE} priority={false} />

      {/* edge fades blend the photo into the light sections above and below */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-ivory to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-ivory-dim to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto max-w-4xl px-5 text-center sm:px-8">
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

        <motion.h2
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="text-glow mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Built for everything
          <br className="hidden sm:block" /> that grows.
        </motion.h2>

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
      </div>
    </section>
  );
}
