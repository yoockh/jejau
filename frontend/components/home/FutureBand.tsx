"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

/** Full-bleed "future of farming" band: glowing statement over animated network lines. */
export function FutureBand() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep py-28 text-ivory sm:py-36">
      {/* animated living-network lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {[
          "M -50 380 C 200 320, 350 430, 620 360 C 850 300, 1000 380, 1250 330",
          "M -50 300 C 250 260, 420 350, 700 280 C 920 230, 1080 300, 1250 250",
          "M -50 440 C 180 410, 400 480, 650 430 C 900 380, 1050 450, 1250 410",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={i === 1 ? "#E8B23A" : "#2FA678"}
            strokeWidth={i === 1 ? 1 : 1.5}
            strokeOpacity={0.5 - i * 0.1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
        {/* node pulses along the lines */}
        {[
          [180, 348], [620, 360], [980, 352], [420, 312], [820, 262],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="#8FE3BC"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <div
        className="orb-glow absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-mint/70">
            The future of farming
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="text-glow mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            When every plant has a history,
            <br className="hidden sm:block" /> agriculture has a future.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ivory/60">
            From a single balcony monstera to whole fields of crops — health
            records turn reactive care into prediction. Jejau is building the
            connected memory that growing things have always deserved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
