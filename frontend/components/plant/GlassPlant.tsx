"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * The Jejau glass-polymer plant (after reference/glass-plant.jpg): a young
 * seedling rendered as edge-lit translucent glass — near-invisible fills,
 * luminous mint outlines, dense circuitry venation, a braided stem with
 * amber energy at its core, and roots flaring into glowing tips.
 *
 * Driven by a `progress` MotionValue in [0, 1]. The plant is a *complete*
 * sprout at progress 0 (stem + first leaf pair) and matures from there —
 * it never reads as a bare stick. Pass a constant 1 for the grown, idle
 * state (auth pages).
 */

const edgeGlow = "drop-shadow(0 0 3px rgba(143,227,188,0.9))";
const veinGlow = "drop-shadow(0 0 1.5px rgba(174,247,211,0.8))";
const amberGlow = "drop-shadow(0 0 4px rgba(232,178,58,0.95))";

/* Stem: a main strand with two companions braided around it. */
const STEM_MAIN = "M120 300 C 116 252, 124 192, 120 132 C 118 106, 120 88, 120 70";
const STEM_LEFT = "M116 300 C 111 254, 127 202, 117 152 C 113 122, 123 96, 119 73";
const STEM_RIGHT = "M124 300 C 129 256, 113 206, 123 156 C 127 126, 117 98, 121 75";

/* Roots flaring from the base, per the reference. */
const ROOTS = [
  "M120 300 C 112 308, 94 312, 74 318",
  "M120 300 C 128 308, 146 312, 166 318",
  "M120 300 C 114 310, 104 318, 98 324",
  "M120 300 C 126 310, 136 318, 144 324",
];
const ROOT_TIPS: Array<[number, number]> = [
  [74, 318],
  [166, 318],
  [98, 324],
  [144, 324],
];

/* Amber energy nodes braided into the stem core. */
const STEM_NODES: Array<{ y: number; r: number }> = [
  { y: 282, r: 2.2 },
  { y: 232, r: 2.4 },
  { y: 186, r: 2.2 },
  { y: 140, r: 2 },
  { y: 96, r: 1.8 },
];

/* ------------------------------------------------------------------ */
/* Leaf art in local coordinates: attachment at (0,0), blade extending  */
/* toward +x with the tip near (100, -14). Mirrored/rotated per leaf.   */
/* ------------------------------------------------------------------ */

const LEAF_BODY = "M0 0 C 16 -34, 60 -46, 100 -14 C 64 14, 20 12, 0 0 Z";
const LEAF_MIDRIB = "M2 -1 C 34 -18, 68 -22, 97 -13";
const LEAF_VEINS = [
  // upper laterals
  "M18 -10 C 24 -20, 30 -28, 38 -33",
  "M34 -15 C 42 -24, 50 -30, 58 -34",
  "M52 -18 C 60 -24, 68 -27, 76 -29",
  "M68 -18 C 74 -21, 82 -23, 88 -21",
  // lower laterals
  "M22 -8 C 28 -2, 36 4, 46 7",
  "M42 -13 C 50 -6, 58 0, 68 3",
  "M62 -16 C 70 -10, 78 -6, 84 -4",
];

type LeafSpec = {
  x: number;
  y: number;
  angle: number; // degrees; negative tilts the blade upward
  scale: number;
  dir: 1 | -1;
  range: [number, number]; // progress window over which it matures
};

const LEAVES: LeafSpec[] = [
  // first pair — range ends at 0, so it is fully formed on arrival and the
  // sprout always reads complete, never a bare stick
  { x: 119, y: 258, angle: -28, scale: 0.92, dir: 1, range: [-0.3, 0] },
  { x: 118, y: 264, angle: -24, scale: 0.85, dir: -1, range: [-0.3, 0] },
  // second pair — the largest, like the reference's mid leaves
  { x: 119, y: 212, angle: -36, scale: 1.08, dir: -1, range: [0.16, 0.36] },
  { x: 120, y: 204, angle: -40, scale: 1.0, dir: 1, range: [0.22, 0.42] },
  // third pair — steeper
  { x: 120, y: 162, angle: -50, scale: 0.88, dir: 1, range: [0.44, 0.62] },
  { x: 119, y: 156, angle: -46, scale: 0.8, dir: -1, range: [0.5, 0.68] },
  // top pair — near upright, once the stem has reached them
  { x: 120, y: 112, angle: -64, scale: 0.66, dir: -1, range: [0.72, 0.86] },
  { x: 120, y: 106, angle: -68, scale: 0.6, dir: 1, range: [0.76, 0.9] },
];

function GlassPlantLeaf({
  spec,
  progress,
  reduce,
}: {
  spec: LeafSpec;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const [start, end] = spec.range;
  // every leaf is always present and fully shaped — growth swells it from
  // a young 55% to maturity, so no scroll position ever looks bare
  const scale = useTransform(
    progress,
    [start, end],
    [spec.scale * 0.55, spec.scale],
    { clamp: true }
  );
  const opacity = useTransform(
    progress,
    [start, start + (end - start) * 0.5],
    [0.55, 1]
  );
  const veinDraw = useTransform(progress, [start, end + 0.06], [0.25, 1]);
  const nodeGlow = useTransform(progress, [end - 0.06, end + 0.02], [0.2, 1]);

  return (
    <g
      transform={`translate(${spec.x} ${spec.y})${
        spec.dir === -1 ? " scale(-1 1)" : ""
      } rotate(${spec.angle})`}
    >
      <motion.g
        style={
          reduce
            ? { scale: spec.scale, transformBox: "fill-box", originX: 0, originY: 0.75 }
            : {
                scale,
                opacity,
                transformBox: "fill-box",
                originX: 0,
                originY: 0.75,
              }
        }
      >
        {/* soft halo under the edge — the bioluminescent rim from the reference */}
        <path
          d={LEAF_BODY}
          fill="none"
          stroke="#8fe3bc"
          strokeOpacity="0.16"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        {/* near-invisible glass fill — the edge light does the talking */}
        <path
          d={LEAF_BODY}
          fill="url(#gp2-glass)"
          stroke="#9beecb"
          strokeOpacity="0.9"
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ filter: edgeGlow }}
        />
        {/* interior sheen */}
        <path
          d="M6 -3 C 20 -28, 56 -38, 92 -14 C 60 -24, 26 -18, 6 -3 Z"
          fill="url(#gp2-sheen)"
          opacity="0.5"
        />
        {/* circuitry venation, drawing in as the leaf matures */}
        <g style={{ filter: veinGlow }}>
          <motion.path
            d={LEAF_MIDRIB}
            fill="none"
            stroke="#aef7d3"
            strokeWidth="1.1"
            strokeLinecap="round"
            style={reduce ? undefined : { pathLength: veinDraw }}
          />
          {LEAF_VEINS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#aef7d3"
              strokeOpacity="0.7"
              strokeWidth="0.7"
              strokeLinecap="round"
              style={reduce ? undefined : { pathLength: veinDraw }}
            />
          ))}
        </g>
        {/* luminous tip + amber node at the petiole */}
        <circle cx="98" cy="-14" r="1.6" fill="#aef7d3" fillOpacity="0.95" />
        <motion.circle
          cx="0"
          cy="0"
          r="2.3"
          fill="#e8b23a"
          style={{
            filter: amberGlow,
            ...(reduce ? {} : { opacity: nodeGlow }),
          }}
        />
      </motion.g>
    </g>
  );
}

export function GlassPlant({
  progress,
  reduce,
  idle = false,
  className = "",
}: {
  progress: MotionValue<number>;
  reduce: boolean;
  /** Adds a slow float + always-on light pulse (for static contexts). */
  idle?: boolean;
  className?: string;
}) {
  // the stem is always complete; growth is the light filling it upward
  const veinFill = useTransform(progress, [0, 1], [0.3, 1]);
  // the whole plant swells gently as it matures, anchored at the soil
  const plantScale = useTransform(progress, [0, 1], [0.66, 1]);
  const cometOpacity = useTransform(progress, [0.55, 0.8], [0, 0.9]);
  const crownGlow = useTransform(progress, [0.8, 0.95], [0.15, 1]);

  const stemNodeOpacity = STEM_NODES.map((n) =>
    // each core node ignites as the stem grows past it
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(progress, [(300 - n.y) / 300, (300 - n.y) / 300 + 0.08], [0, 1])
  );

  return (
    <motion.svg
      viewBox="0 0 240 330"
      className={`overflow-visible ${className}`}
      role="img"
      aria-label="A translucent glass plant with glowing circuitry veins"
      animate={idle && !reduce ? { y: [0, -8, 0] } : undefined}
      transition={
        idle && !reduce
          ? { repeat: Infinity, duration: 9, ease: "easeInOut" }
          : undefined
      }
    >
      <defs>
        <linearGradient id="gp2-glass" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#aef7d3" stopOpacity="0.16" />
          <stop offset="0.6" stopColor="#2fa678" stopOpacity="0.1" />
          <stop offset="1" stopColor="#0e3a2b" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="gp2-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gp2-stem" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f6f54" />
          <stop offset="0.5" stopColor="#2fa678" />
          <stop offset="1" stopColor="#8fe3bc" />
        </linearGradient>
        <radialGradient id="gp2-soil" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#2fa678" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2fa678" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* glowing soil */}
      <ellipse cx="120" cy="302" rx="86" ry="17" fill="url(#gp2-soil)" />
      <path
        d="M58 302 Q120 288 182 302"
        stroke="#2fa678"
        strokeWidth="2"
        strokeOpacity="0.5"
        fill="none"
        strokeLinecap="round"
        style={{ filter: veinGlow }}
      />

      {/* roots — glassy strands ending in amber light */}
      <g>
        {ROOTS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#8fe3bc"
            strokeOpacity="0.4"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        ))}
        {ROOT_TIPS.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="1.8"
            fill="#e8b23a"
            style={{ filter: amberGlow }}
            animate={reduce ? undefined : { opacity: [0.4, 0.95, 0.4] }}
            transition={{
              repeat: Infinity,
              duration: 3.4,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* the plant body, swelling from sprout to seedling */}
      <motion.g
        style={
          reduce
            ? undefined
            : {
                scale: plantScale,
                transformBox: "fill-box",
                originX: 0.5,
                originY: 1,
              }
        }
      >
        {/* braided stem: always complete — two glassy companions around a
            luminous core whose light fills upward with growth */}
        <path
          d={STEM_LEFT}
          fill="none"
          stroke="#8fe3bc"
          strokeOpacity="0.42"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d={STEM_RIGHT}
          fill="none"
          stroke="#8fe3bc"
          strokeOpacity="0.42"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d={STEM_MAIN}
          fill="none"
          stroke="url(#gp2-stem)"
          strokeOpacity="0.5"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <motion.path
          d={STEM_MAIN}
          fill="none"
          stroke="#aef7d3"
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{
            filter: veinGlow,
            ...(reduce ? {} : { pathLength: veinFill }),
          }}
        />

        {/* amber energy braided into the core */}
        {STEM_NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx="120"
            cy={n.y}
            r={n.r}
            fill="#e8b23a"
            style={{
              filter: amberGlow,
              ...(reduce ? {} : { opacity: stemNodeOpacity[i] }),
            }}
          />
        ))}

        {/* light travelling up the stem */}
        {!reduce && (
          <motion.path
            d={STEM_MAIN}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="14 236"
            initial={{ strokeDashoffset: 250 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 3.4, ease: "linear" }}
            style={{
              opacity: idle ? 0.85 : cometOpacity,
              filter: "drop-shadow(0 0 5px rgba(174,247,211,1))",
            }}
          />
        )}

        {/* leaves — each pair arrives fully formed */}
        {LEAVES.map((spec, i) => (
          <GlassPlantLeaf
            key={i}
            spec={spec}
            progress={progress}
            reduce={reduce}
          />
        ))}

        {/* crown: a luminous growing tip */}
        <motion.g style={reduce ? undefined : { opacity: crownGlow }}>
          <path
            d="M120 70 C 114 58, 115 48, 120 40 C 125 48, 126 58, 120 70 Z"
            fill="url(#gp2-glass)"
            stroke="#9beecb"
            strokeOpacity="0.85"
            strokeWidth="1.2"
            style={{ filter: edgeGlow }}
          />
          <motion.circle
            cx="120"
            cy="44"
            r="3"
            fill="#aef7d3"
            style={{ filter: "drop-shadow(0 0 7px rgba(174,247,211,1))" }}
            animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
