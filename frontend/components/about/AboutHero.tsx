"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep pb-24 pt-40 text-ivory sm:pb-32 sm:pt-48">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(31,111,84,0.4),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="bio-grid absolute inset-0" aria-hidden="true" />
      {/* floating leaf particles */}
      <div aria-hidden="true">
        {[
          ["12%", "30%", 0],
          ["85%", "22%", 1.2],
          ["70%", "65%", 0.6],
          ["20%", "75%", 1.8],
        ].map(([left, top, delay], i) => (
          <motion.span
            key={i}
            className="absolute text-forest-bright/30"
            style={{ left: left as string, top: top as string }}
            animate={{ y: [0, -16, 0], rotate: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 7 + i,
              delay: delay as number,
              ease: "easeInOut",
            }}
          >
            <Leaf className="h-6 w-6" />
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-mint/70"
        >
          Our mission
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
        >
          Bringing plant care{" "}
          <span className="text-glow bg-gradient-to-r from-mint to-forest-bright bg-clip-text text-transparent">
            into the future.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ivory/65"
        >
          Jejau fuses living nature with intelligent technology. We believe
          every plant — on a windowsill or across a field — deserves the same
          thing every patient gets: a medical record that remembers.
        </motion.p>
      </div>
    </section>
  );
}
