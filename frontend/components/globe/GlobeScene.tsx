"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";
import type { PointerState } from "./pointerState";
import { StaticGlobe } from "./StaticGlobe";

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
/* Geography: stylized continents as angular blobs (lat, lon, radius°) */
/* ------------------------------------------------------------------ */

const CONTINENT_BLOBS: Array<[number, number, number]> = [
  // North America
  [55, -100, 18], [45, -95, 14], [62, -112, 13], [40, -78, 9], [35, -106, 8],
  [48, -122, 6], [62, -152, 7], [70, -100, 8], [25, -103, 6], [17, -91, 4],
  [72, -41, 7], // Greenland
  // South America
  [-4, -61, 11], [-14, -56, 10], [-24, -61, 8], [-34, -66, 6], [4, -68, 7],
  [-10, -76, 5], [-45, -70, 4],
  // Africa
  [22, 8, 11], [14, 22, 11], [4, 20, 11], [-8, 24, 9], [-20, 26, 7],
  [-30, 24, 4], [10, -6, 8], [20, 32, 7], [2, 39, 5],
  [-19, 47, 3], // Madagascar
  // Europe
  [49, 9, 7], [55, 32, 9], [45, 24, 5], [40, -4, 5], [53, -2, 3],
  [62, 14, 6], [65, 27, 5],
  // Asia
  [60, 90, 16], [55, 62, 12], [65, 122, 12], [50, 102, 10], [35, 98, 9],
  [30, 82, 7], [23, 79, 7], [46, 134, 6], [34, 114, 7], [15, 103, 5],
  [56, 160, 5], [24, 45, 8], [33, 55, 7], [37, 138, 3],
  // Maritime Southeast Asia + Oceania
  [-2, 114, 4], [-7, 108, 3], [0, 101, 3], [-5, 141, 4],
  [-25, 134, 9], [-30, 120, 6], [-19, 144, 5],
  [-42, 172, 3], // New Zealand
];

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
/* Land dots: fibonacci sphere filtered by the continent mask          */
/* ------------------------------------------------------------------ */

function useLandDots() {
  return useMemo(() => {
    const blobDirs = CONTINENT_BLOBS.map(([lat, lon, r]) => ({
      dir: latLonToVec3(lat, lon, 1).normalize(),
      cos: Math.cos(THREE.MathUtils.degToRad(r)),
    }));

    const positions: number[] = [];
    const colors: number[] = [];
    const deep = new THREE.Color("#1F6F54");
    const bright = new THREE.Color("#8FE3BC");
    const tmp = new THREE.Vector3();
    const golden = Math.PI * (3 - Math.sqrt(5));
    const rand = mulberry32(42);
    const N = 14000;

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      tmp.set(Math.cos(t) * r, y, Math.sin(t) * r);

      let onLand = false;
      for (const blob of blobDirs) {
        if (tmp.dot(blob.dir) > blob.cos) {
          onLand = true;
          break;
        }
      }
      if (!onLand) continue;

      positions.push(
        tmp.x * GLOBE_RADIUS * 1.002,
        tmp.y * GLOBE_RADIUS * 1.002,
        tmp.z * GLOBE_RADIUS * 1.002
      );
      const c = deep.clone().lerp(bright, 0.25 + rand() * 0.75);
      colors.push(c.r, c.g, c.b);
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    };
  }, []);
}

function LandDots() {
  const { positions, colors } = useLandDots();
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        vertexColors
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
    <group ref={group} rotation={[0.18, 0, 0]}>
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
