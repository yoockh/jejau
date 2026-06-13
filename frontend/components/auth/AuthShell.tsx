"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { GlassLeaf } from "@/components/plant/GlassLeaf";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

type AuthShellProps = {
  asideTitle: ReactNode;
  asideText: string;
  children: ReactNode;
};

/**
 * Split-screen frame for the auth pages: a living-green visual panel on the
 * left, the form on the right, all over the site's dark gradient.
 */
export function AuthShell({ asideTitle, asideText, children }: AuthShellProps) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-charcoal-deep text-ivory">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(31,111,84,0.4),transparent_55%),radial-gradient(ellipse_at_90%_90%,rgba(20,80,60,0.3),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="bio-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-svh max-w-7xl lg:grid-cols-[1.1fr_1fr]">
        {/* Visual panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden px-14 pb-14 pt-36 lg:flex">
          {/* animated network arcs */}
          <svg
            className="absolute inset-0 h-full w-full opacity-50"
            viewBox="0 0 600 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            {[
              "M -40 620 C 120 560, 260 660, 420 580 C 540 520, 600 570, 660 540",
              "M -40 700 C 140 660, 300 740, 460 660 C 560 610, 620 650, 660 630",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke={i === 0 ? "#2FA678" : "#E8B23A"}
                strokeWidth={i === 0 ? 1.5 : 1}
                strokeOpacity={0.5 - i * 0.15}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.4 + i * 0.3, ease: "easeInOut" }}
              />
            ))}
          </svg>
          {/* floating leaves */}
          <div aria-hidden="true">
            {[
              ["12%", "24%", 0],
              ["78%", "16%", 1.4],
              ["60%", "44%", 0.7],
            ].map(([left, top, delay], i) => (
              <motion.span
                key={i}
                className="absolute text-forest-bright/25"
                style={{ left: left as string, top: top as string }}
                animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 8 + i,
                  delay: delay as number,
                  ease: "easeInOut",
                }}
              >
                <Leaf className="h-6 w-6" />
              </motion.span>
            ))}
          </div>

          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="max-w-md font-display text-4xl font-bold leading-tight tracking-tight xl:text-5xl"
            >
              {asideTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-6 max-w-sm text-lg leading-relaxed text-ivory/60"
            >
              {asideText}
            </motion.p>
          </div>

          {/* glass-polymer leaf motif — calm, premium, natural */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="relative flex justify-center"
          >
            <GlassLeaf className="h-[clamp(18rem,44vh,27rem)] w-auto aspect-[240/330]" />
          </motion.div>
        </aside>

        {/* Form panel */}
        <div className="flex items-center justify-center px-5 pb-16 pt-28 sm:px-8 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
