"use client";

import { motion, useReducedMotion } from "framer-motion";

const veinGlow = "drop-shadow(0 0 1.6px rgba(174,247,211,0.95))";
const amberGlow = "drop-shadow(0 0 3px rgba(232,178,58,0.95))";

// Branch points down the midrib — each a circuitry node with a pair of veins.
const junctions = [
  { y: 78, lx: 72, ly: 58, rx: 148, ry: 58 },
  { y: 108, lx: 58, ly: 86, rx: 162, ry: 86 },
  { y: 138, lx: 50, ly: 114, rx: 170, ry: 114 },
  { y: 168, lx: 58, ly: 146, rx: 162, ry: 146 },
  { y: 198, lx: 74, ly: 178, rx: 146, ry: 178 },
];

/**
 * An elegant translucent "glass-polymer" leaf: glassy body, luminous
 * circuitry veins, amber branch nodes and a soft bioluminescent bloom.
 * Calm, premium, on-palette — used as the auth pages' visual motif.
 */
export function GlassLeaf({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* soft bloom behind the leaf */}
      <div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,166,120,0.3),transparent_65%)] blur-2xl"
      />

      <motion.svg
        viewBox="0 0 220 280"
        className="relative h-full w-full overflow-visible"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="gl-glass" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#aef7d3" stopOpacity="0.42" />
            <stop offset="0.55" stopColor="#2fa678" stopOpacity="0.26" />
            <stop offset="1" stopColor="#0e3a2b" stopOpacity="0.34" />
          </linearGradient>
          <linearGradient id="gl-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* glassy body */}
        <path
          d="M110 22 C 172 70, 182 176, 110 258 C 38 176, 48 70, 110 22 Z"
          fill="url(#gl-glass)"
          stroke="#8fe3bc"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* glass sheen highlight */}
        <path
          d="M110 30 C 150 72, 158 150, 116 220 C 96 150, 92 78, 110 30 Z"
          fill="url(#gl-sheen)"
        />

        {/* circuitry venation */}
        <g style={{ filter: veinGlow }}>
          <path
            d="M110 30 Q 113 150, 110 250"
            fill="none"
            stroke="#aef7d3"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {junctions.map((j, i) => (
            <g key={i}>
              <path
                d={`M110 ${j.y} Q ${110 - 22} ${j.y - 8}, ${j.lx} ${j.ly}`}
                fill="none"
                stroke="#aef7d3"
                strokeOpacity="0.85"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d={`M110 ${j.y} Q ${110 + 22} ${j.y - 8}, ${j.rx} ${j.ry}`}
                fill="none"
                stroke="#aef7d3"
                strokeOpacity="0.85"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* amber branch nodes — twinkle like data flowing up the leaf */}
        {junctions.map((j, i) => (
          <motion.circle
            key={i}
            cx="110"
            cy={j.y}
            r="2.6"
            fill="#e8b23a"
            style={{ filter: amberGlow }}
            animate={
              reduce ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.85, 1.25, 0.85] }
            }
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* glowing tip + base nodes */}
        <circle cx="110" cy="28" r="3.4" fill="#aef7d3" style={{ filter: veinGlow }} />
        <circle cx="110" cy="252" r="2.4" fill="#aef7d3" style={{ filter: veinGlow }} />
      </motion.svg>
    </div>
  );
}
