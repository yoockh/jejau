"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";
import type { PointerState } from "./pointerState";
import { StaticGlobe } from "./StaticGlobe";
import { isLand } from "./landMask";

type PointerRef = RefObject<PointerState>;

/* ------------------------------------------------------------------ */
/* Deterministic PRNG so renders stay pure (and dots stay put)         */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* Module-scope WebGL probe — this module is only ever loaded client-side. */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const WEBGL_AVAILABLE = typeof window !== "undefined" && supportsWebGL();

/* ------------------------------------------------------------------ */
/* Geography                                                           */
/* ------------------------------------------------------------------ */

// Hubs for the connection arcs (lat, lon) — Jejau's "living network"
const HUBS: Array<[number, number]> = [
  [-6.2, 106.8], // Jakarta
  [35.7, 139.7], // Tokyo
  [28.6, 77.2], // Delhi
  [-1.3, 36.8], // Nairobi
  [51.5, -0.1], // London
  [-23.5, -46.6], // São Paulo
  [37.8, -122.4], // San Francisco
  [-33.9, 151.2], // Sydney
  [6.5, 3.4], // Lagos
  [40.7, -74.0], // New York
];

const ARC_PAIRS: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 7], [0, 3], [2, 4], [3, 8], [4, 9], [5, 9], [6, 9],
  [5, 8], [1, 6], [4, 8],
];

const GLOBE_RADIUS = 1;

function latLonToVec3(lat: number, lon: number, radius = GLOBE_RADIUS) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ------------------------------------------------------------------ */
/* Globe dots: equal-area golden-spiral samples over the sphere, kept   */
/* only where the Natural Earth land mask says there is land — so the   */
/* continents are real geography, oceans stay dark and empty. Coastal   */
/* dots run brighter so the outlines read from a distance.              */
/* ------------------------------------------------------------------ */

type DotLayer = { positions: Float32Array; colors: Float32Array };

function makeLandDotLayer(opts: {
  count: number;
  seed: number;
  keep: number;
  brightBias: number;
}): DotLayer {
  const { count, seed, keep, brightBias } = opts;
  const positions: number[] = [];
  const colors: number[] = [];
  const deep = new THREE.Color("#1F6F54");
  const bright = new THREE.Color("#8FE3BC");
  const accent = new THREE.Color("#AEF7D3");
  const golden = Math.PI * (3 - Math.sqrt(5));
  const rand = mulberry32(seed);
  // rotate each layer's spiral so the lattices never align between layers
  const lonOffset = rand() * 360;

  for (let i = 0; i < count; i++) {
    // uniform-in-y sampling → equal area per dot, expressed as lat/lon
    const y = 1 - (i / (count - 1)) * 2;
    const lat = THREE.MathUtils.radToDeg(
      Math.asin(THREE.MathUtils.clamp(y, -1, 1))
    );
    const lon =
      ((THREE.MathUtils.radToDeg(golden * i) + lonOffset) % 360) - 180;

    // jitter off the lattice (sub-cell) so the eye can't lock onto rows
    const jLat = lat + (rand() - 0.5) * 0.5;
    const jLon = lon + (rand() - 0.5) * 0.5;

    if (!isLand(jLat, jLon)) continue;
    if (rand() > keep) continue;

    const v = latLonToVec3(jLat, jLon, GLOBE_RADIUS * 1.002);
    positions.push(v.x, v.y, v.z);

    // dots bordering water glow brighter — crisp, readable coastlines
    const coastal =
      !isLand(jLat + 0.5, jLon) ||
      !isLand(jLat - 0.5, jLon) ||
      !isLand(jLat, jLon + 0.5) ||
      !isLand(jLat, jLon - 0.5);

    const shade = Math.min(
      1,
      0.22 + rand() * 0.42 + (coastal ? 0.3 : 0) + brightBias
    );
    const c = deep.clone().lerp(bright, shade);
    if (rand() < 0.04) c.lerp(accent, 0.6);
    colors.push(c.r, c.g, c.b);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}

function useGlobeDots() {
  return useMemo(() => {
    // dense, fine base field covering every landmass
    const base = makeLandDotLayer({
      count: 42000,
      seed: 42,
      keep: 0.9,
      brightBias: 0,
    });
    // sparser, larger, brighter sparkle layer over the same geography
    const accent = makeLandDotLayer({
      count: 9000,
      seed: 1337,
      keep: 0.5,
      brightBias: 0.3,
    });
    return { base, accent };
  }, []);
}

function DotField({ layer, size, opacity }: { layer: DotLayer; size: number; opacity: number }) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[layer.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[layer.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function LandDots() {
  const { base, accent } = useGlobeDots();
  return (
    <group>
      <DotField layer={base} size={0.011} opacity={0.85} />
      <DotField layer={accent} size={0.022} opacity={0.95} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Connection arcs with a travelling dash pulse                        */
/* ------------------------------------------------------------------ */

function Arc({
  from,
  to,
  seed,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  seed: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  // Each arc's pulse starts at a different phase and speed
  const phase = (seed * 0.618034) % 1;
  const speed = 0.12 + ((seed * 0.317) % 1) * 0.1;

  const curve = useMemo(() => {
    const dist = from.distanceTo(to);
    const altitude = GLOBE_RADIUS + dist * 0.45;
    const mid1 = from.clone().lerp(to, 0.33).normalize().multiplyScalar(altitude);
    const mid2 = from.clone().lerp(to, 0.66).normalize().multiplyScalar(altitude);
    return new THREE.CubicBezierCurve3(from, mid1, mid2, to);
  }, [from, to]);

  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(64)
    );
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color("#2FA678"),
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(geometry, material);
  }, [curve]);

  useFrame(({ clock }) => {
    const pulse = pulseRef.current;
    if (!pulse) return;
    const t = (clock.elapsedTime * speed + phase) % 1;
    pulse.position.copy(curve.getPoint(t));
    // Fade the pulse in and out near the endpoints
    const fade = Math.sin(t * Math.PI);
    (pulse.material as THREE.MeshBasicMaterial).opacity = fade;
    pulse.scale.setScalar(0.6 + fade * 0.6);
  });

  return (
    <group>
      <primitive object={line} />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial
          color="#AEF7D3"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Arcs() {
  const hubVecs = useMemo(
    () => HUBS.map(([lat, lon]) => latLonToVec3(lat, lon, GLOBE_RADIUS * 1.005)),
    []
  );
  return (
    <group>
      {ARC_PAIRS.map(([a, b], i) => (
        <Arc key={i} from={hubVecs[a]} to={hubVecs[b]} seed={i + 1} />
      ))}
      <HubMarkers vecs={hubVecs} />
    </group>
  );
}

function HubMarkers({ vecs }: { vecs: THREE.Vector3[] }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(
    () => new Float32Array(vecs.flatMap((v) => [v.x, v.y, v.z])),
    [vecs]
  );
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.PointsMaterial;
      m.size = 0.035 + Math.sin(clock.elapsedTime * 2.2) * 0.009;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#E8B23A"
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Atmosphere: fresnel glow on a back-side shell                       */
/* ------------------------------------------------------------------ */

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
    gl_FragColor = vec4(0.18, 0.65, 0.47, 1.0) * intensity;
  }
`;

function Atmosphere() {
  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <shaderMaterial
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Faint starfield                                                     */
/* ------------------------------------------------------------------ */

function Stars() {
  const positions = useMemo(() => {
    const rand = mulberry32(7);
    const arr = new Float32Array(1200 * 3);
    const v = new THREE.Vector3();
    for (let i = 0; i < 1200; i++) {
      v.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1)
        .normalize()
        .multiplyScalar(14 + rand() * 18);
      arr.set([v.x, v.y, v.z], i * 3);
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#9fd9c0"
        transparent
        opacity={0.45}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* The rotating globe group, steered by the cursor                     */
/* ------------------------------------------------------------------ */

function RotatingGlobe({ pointer }: { pointer: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const speed = useRef(0.12);
  const tilt = useRef(0.18);

  useFrame((_, delta) => {
    const g = group.current;
    const p = pointer.current;
    if (!g) return;

    // Cursor right → spins right; cursor up/down → tilts.
    const targetSpeed = p.hovering ? p.x * 0.9 : 0.12;
    const targetTilt = p.hovering ? p.y * 0.4 : 0.18;

    const k = 1 - Math.exp(-delta * 3);
    speed.current += (targetSpeed - speed.current) * k;
    tilt.current += (targetTilt - tilt.current) * k;

    g.rotation.y += speed.current * delta;
    g.rotation.x = tilt.current;
  });

  return (
    // rotation.y puts Indonesia/SE Asia front and center on first paint
    <group ref={group} rotation={[0.18, 2.85, 0]}>
      {/* Dark planet body */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, 64, 64]} />
        <meshStandardMaterial
          color="#0E3A2B"
          roughness={0.85}
          metalness={0.15}
          emissive="#0B1712"
        />
      </mesh>
      {/* Faint wireframe graticule for the tech feel */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.99, 24, 24]} />
        <meshBasicMaterial
          color="#1F6F54"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>
      <LandDots />
      <Arcs />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene root                                                          */
/* ------------------------------------------------------------------ */

export default function GlobeScene({ pointer }: { pointer: PointerRef }) {
  if (!WEBGL_AVAILABLE) return <StaticGlobe />;
  return (
    <Canvas
      camera={{ position: [0, 0, 2.7], fov: 48 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 3, 5]} intensity={1.1} color="#bdf2d8" />
      <Stars />
      <Atmosphere />
      <RotatingGlobe pointer={pointer} />
    </Canvas>
  );
}
