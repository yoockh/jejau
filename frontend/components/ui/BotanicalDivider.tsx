"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Botanical line-art divider — a slender sprig of leaves drawn in a single
 * stroke, used to separate light sections with a living, hand-drawn feel.
 * The stroke draws itself in as it enters the viewport.
 */
export function BotanicalDivider({
  className = "",
  tone = "forest",
}: {
  className?: string;
  tone?: "forest" | "mint";
}) {
  const reduce = useReducedMotion();
  const stroke = tone === "forest" ? "#1f6f54" : "#8fe3bc";

  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <span
        className="h-px w-16 sm:w-28"
        style={{
          background: `linear-gradient(90deg, transparent, ${stroke}80)`,
        }}
      />
      <motion.svg
        width="120"
        height="36"
        viewBox="0 0 120 36"
        fill="none"
        className="shrink-0"
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* central stem */}
        <motion.path
          d="M6 18 H114"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 0.7,
              transition: { duration: 1.1, ease: "easeInOut" },
            },
          }}
        />
        {/* paired leaves along the stem */}
        {[
          "M40 18 q6 -11 18 -8 q-6 11 -18 8 Z",
          "M40 18 q6 11 18 8 q-6 -11 -18 -8 Z",
          "M62 18 q6 -11 18 -8 q-6 11 -18 8 Z",
          "M62 18 q6 11 18 8 q-6 -11 -18 -8 Z",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill={`${stroke}26`}
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 0.8,
                transition: { duration: 0.7, delay: 0.5 + i * 0.12 },
              },
            }}
          />
        ))}
        {/* seed tip */}
        <motion.circle
          cx="114"
          cy="18"
          r="2.4"
          fill={stroke}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 0.9,
              transition: { duration: 0.4, delay: 1.1 },
            },
          }}
        />
      </motion.svg>
      <span
        className="h-px w-16 sm:w-28"
        style={{
          background: `linear-gradient(90deg, ${stroke}80, transparent)`,
        }}
      />
    </div>
  );
}
