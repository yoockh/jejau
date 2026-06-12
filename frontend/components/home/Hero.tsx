"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroGlobe } from "@/components/globe/HeroGlobe";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep text-ivory">
      {/* layered background: gradient + living grid + glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(31,111,84,0.35),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(20,80,60,0.3),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="bio-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-10 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-24">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mint"
          >
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            A medical record for plants
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Give every plant{" "}
            <span className="text-glow bg-gradient-to-r from-mint via-forest-bright to-mint bg-clip-text text-transparent">
              a memory.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/70 lg:mx-0"
          >
            Snap a photo and Jejau&apos;s AI diagnoses disease in seconds — then
            logs it to your plant&apos;s lifelong health record, learning what
            works and adapting its care schedule over time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center"
          >
            <Button href="/register" size="lg">
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="outline" size="lg">
              See how it works
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-mint/10 pt-8 text-center lg:text-left"
          >
            {[
              ["30+", "diseases recognized"],
              ["1 photo", "to start a record"],
              ["24/7", "care guidance"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold text-mint sm:text-3xl">
                  {value}
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-ivory/50">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative"
        >
          <HeroGlobe />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#how-it-works"
        aria-label="Scroll to how it works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.8 },
          y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-mint/60 hover:text-mint md:block"
      >
        <ChevronDown className="h-6 w-6" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
