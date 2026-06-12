"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroGlobe } from "@/components/globe/HeroGlobe";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Gentle parallax: globe drifts up and the green glow shifts as you scroll.
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const globeStyle = reduce ? undefined : { y: globeY };
  const glowStyle = reduce ? undefined : { y: glowY };

  return (
    <section
      ref={ref}
      className="relative min-h-svh overflow-hidden bg-charcoal-deep text-ivory"
    >
      {/* base wash + a soft dark vignette that seats the globe */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,rgba(31,111,84,0.4),transparent_58%),radial-gradient(ellipse_at_8%_92%,rgba(20,80,60,0.28),transparent_52%)]"
        aria-hidden="true"
      />
      {/* readability scrim anchored bottom-left, under the copy */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_5%_85%,rgba(11,23,18,0.72),transparent_55%)]"
        aria-hidden="true"
      />

      {/* living grid — masked OUT of the globe region so lines never slice it */}
      <div
        className="bio-grid absolute inset-0 [mask-image:radial-gradient(circle_at_74%_30%,transparent_0,transparent_24%,black_58%)]"
        aria-hidden="true"
      />

      {/* GLOBE centerpiece: large, upper-center/right, cropped off the edge,
          rendered above the grid and feathered so it blends into the scene */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.15, ease }}
        style={globeStyle}
        className="pointer-events-none absolute left-1/2 top-[-16%] z-[5] w-[150%] max-w-none -translate-x-[42%] sm:left-auto sm:right-[-16%] sm:top-[-12%] sm:w-[80%] sm:translate-x-0 lg:right-[-8%] lg:top-[-8%] lg:w-[62%]"
      >
        {/* the green "sun" — unmasked so its glow bleeds across the hero */}
        <motion.div
          style={glowStyle}
          className="orb-glow absolute -inset-[22%]"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,166,120,0.55),transparent_70%)] blur-2xl"
          aria-hidden="true"
        />
        <HeroGlobe
          className="aspect-square w-full [mask-image:radial-gradient(circle_at_center,black_48%,transparent_73%)]"
          glowClassName="hidden"
        />
      </motion.div>

      {/* CONTENT — overlaps the globe, lit from behind by its glow */}
      <div className="relative z-20 mx-auto flex min-h-svh max-w-7xl flex-col px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-3xl text-center lg:text-left">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-charcoal-deep/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mint backdrop-blur-sm"
            >
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              A medical record for plants
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="font-display text-5xl font-bold leading-[1.02] tracking-tight [text-shadow:0_2px_40px_rgba(11,23,18,0.6)] sm:text-6xl xl:text-[5rem]"
            >
              Give every plant{" "}
              <span className="text-glow bg-gradient-to-r from-mint via-forest-bright to-mint bg-clip-text text-transparent">
                a memory.
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/75 [text-shadow:0_1px_20px_rgba(11,23,18,0.7)] lg:mx-0"
            >
              Snap a photo and Jejau&apos;s AI diagnoses disease in seconds — then
              logs it to your plant&apos;s lifelong health record, learning what
              works and adapting its care schedule over time.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button href="/register" size="lg">
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                See how it works
              </Button>
            </motion.div>
          </div>
        </div>

        {/* stats pinned to the bottom of the scene */}
        <motion.dl
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-mint/10 pt-8 text-center lg:text-left"
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
              <dd className="mt-1 text-xs uppercase tracking-wider text-ivory/55">
                {label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* bottom fade into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-ivory"
        aria-hidden="true"
      />

      {/* scroll cue */}
      <motion.a
        href="#how-it-works"
        aria-label="Scroll to how it works"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.8 },
          y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 text-mint/60 hover:text-mint md:block"
      >
        <ChevronDown className="h-6 w-6" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
