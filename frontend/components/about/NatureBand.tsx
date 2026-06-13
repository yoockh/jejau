"use client";

import { motion } from "framer-motion";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { WipeReveal } from "@/components/ui/TextReveal";
import { FOREST_CANOPY } from "@/lib/unsplash";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * A full-bleed forest-canopy photograph on the About page — a warm, living
 * breather between the story and the team, with a reflective statement.
 */
export function NatureBand() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal-deep py-28 text-ivory sm:py-32">
      <PhotoBackdrop photo={FOREST_CANOPY} />

      <div className="relative z-[2] mx-auto max-w-3xl px-5 text-center sm:px-8">
        <WipeReveal>
          <blockquote className="text-glow font-display text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
            “Technology should feel as alive as the things it cares for.”
          </blockquote>
        </WipeReveal>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-xl leading-relaxed text-ivory/75"
        >
          We build Jejau the way a gardener tends a bed — patiently, in service
          of growth. Nature sets the pace; the technology simply keeps up.
        </motion.p>
      </div>
    </section>
  );
}
