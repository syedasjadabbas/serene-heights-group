"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import * as THREE from "three";

// Real relief of the Galiyat around Serene Heights Nathia Gali.
// public/data/galiyat-dem.bin: Int16 metres on a 200 m grid (AWS Terrain Tiles),
// origin at 33.95° N, 73.26° E — the same file the Nathia Gali site's map uses.
const DEM = { x0: -40, z0: -44, step: 0.2, nx: 371, nz: 461 };
const LAT0 = 33.95;
const LON0 = 73.26;
const project = (lat: number, lon: number) => [(lon - LON0) * 92.3, -(lat - LAT0) * 111.3] as const;

const [CX, CZ] = project(34.0745, 73.379); // Serene Heights Nathia Gali
const RADIUS = 9; // km of terrain shown around the resort
const SEG = 220;
const EXAG = 1.7;
const BASE = 0.8; // km — valley floor sits at y = 0

function sample(d: Int16Array, x: number, z: number) {
  const fx = Math.min(DEM.nx - 1.001, Math.max(0, (x - DEM.x0) / DEM.step));
  const fz = Math.min(DEM.nz - 1.001, Math.max(0, (z - DEM.z0) / DEM.step));
  const i = Math.floor(fx);
  const j = Math.floor(fz);
  const tx = fx - i;
  const tz = fz - j;
  const r0 = j * DEM.nx;
  const r1 = r0 + DEM.nx;
  return (
    ((d[r0 + i] * (1 - tx) + d[r0 + i + 1] * tx) * (1 - tz) + (d[r1 + i] * (1 - tx) + d[r1 + i + 1] * tx) * tz) / 1000
  );
}

const vert = /* glsl */ `
  varying float vH;
  varying vec3 vN;
  varying vec2 vXZ;
  void main() {
    vH = position.y;
    vN = normalize(normalMatrix * normal);
    vXZ = position.xz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform float uTime;
  uniform float uExag;
  uniform float uBase;
  uniform float uRadius;
  uniform vec3 uLight;
  varying float vH;
  varying vec3 vN;
  varying vec2 vXZ;

  void main() {
    float km = vH / uExag + uBase;                 // true elevation in km
    float t = smoothstep(0.9, 2.9, km);
    vec3 low = vec3(0.03, 0.08, 0.065);
    vec3 mid = vec3(0.16, 0.3, 0.25);
    vec3 high = vec3(0.96, 0.98, 0.96);
    vec3 col = mix(low, mid, smoothstep(0.0, 0.7, t));
    col = mix(col, high, smoothstep(0.75, 1.0, t));

    float diff = clamp(dot(normalize(vN), normalize(uLight)), 0.0, 1.0);
    col *= 0.28 + diff * 0.85;

    // Contour lines every 100 m, brighter every 500 m.
    float c = km * 10.0;
    float line = 1.0 - min(abs(fract(c - 0.5) - 0.5) / fwidth(c), 1.0);
    float c5 = km * 2.0;
    float major = 1.0 - min(abs(fract(c5 - 0.5) - 0.5) / fwidth(c5), 1.0);
    col += vec3(0.72, 0.86, 0.79) * (line * 0.16 + major * 0.38);

    // Signal rings travelling out from the resort.
    float d = length(vXZ);
    float ring = smoothstep(0.08, 0.0, abs(fract(d * 0.22 - uTime * 0.18) - 0.5) - 0.42);
    col += vec3(0.88, 1.0, 0.93) * ring * 0.35 * (1.0 - smoothstep(0.0, uRadius, d));

    float edge = 1.0 - smoothstep(uRadius * 0.62, uRadius, d);
    gl_FragColor = vec4(col, edge);
  }
`;

function useDem() {
  const [dem, setDem] = useState<Int16Array | null>(null);
  useEffect(() => {
    let live = true;
    fetch("/data/galiyat-dem.bin")
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.statusText))))
      .then((b) => live && setDem(new Int16Array(b)))
      .catch((e) => console.warn("Galiyat elevation data unavailable", e));
    return () => {
      live = false;
    };
  }, []);
  return dem;
}

function Terrain({
  dem,
  progress,
  label,
}: {
  dem: Int16Array;
  progress: React.RefObject<number>;
  label: React.RefObject<HTMLDivElement | null>;
}) {
  const resortY = (sample(dem, CX, CZ) - BASE) * EXAG;
  const tip = useMemo(() => new THREE.Vector3(), []);

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(RADIUS * 2, RADIUS * 2, SEG, SEG);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, (sample(dem, CX + x, CZ + z) - BASE) * EXAG);
    }
    g.computeVertexNormals();
    return g;
  }, [dem]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uExag: { value: EXAG },
      uBase: { value: BASE },
      uRadius: { value: RADIUS },
      uLight: { value: new THREE.Vector3(-0.6, 0.9, 0.35) },
    }),
    [],
  );

  const beam = useRef<THREE.Mesh>(null);
  const look = useMemo(() => new THREE.Vector3(0, resortY * 0.7, 0), [resortY]);

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    const p = progress.current ?? 1;
    // Fly from high above the ridge down to an oblique view across the valleys.
    const a = state.clock.elapsedTime * 0.045 + 0.9 + state.pointer.x * 0.25;
    // Narrow screens get a closer, higher camera so the resort stays the subject.
    const narrow = state.size.width < 600;
    const r = THREE.MathUtils.lerp(4, narrow ? 10.5 : 15.5, Math.min(1, p * 1.25));
    const h = THREE.MathUtils.lerp(19, narrow ? 9.5 : 7.2, Math.min(1, p * 1.25)) - state.pointer.y * 0.8;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, Math.sin(a) * r, 2.5, dt);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, Math.cos(a) * r, 2.5, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, h, 2.5, dt);
    cam.lookAt(look);
    if (beam.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.15;
      beam.current.scale.set(s, 1, s);
    }
    // Pin the DOM label to the top of the beam.
    const el = label.current;
    if (el) {
      tip.set(0, resortY + 3.25, 0).project(cam);
      const x = (tip.x * 0.5 + 0.5) * state.size.width;
      const y = (-tip.y * 0.5 + 0.5) * state.size.height;
      // Above the beam on wide screens; beside it on phones, where the canvas top would clip it.
      el.style.transform = narrow
        ? `translate(${x}px, ${y}px) translate(14px, -30%)`
        : `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      el.style.opacity = tip.z < 1 ? "1" : "0";
    }
  });

  return (
    <group>
      <mesh geometry={geo}>
        <shaderMaterial
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          transparent
          depthWrite
        />
      </mesh>

      {/* Resort marker */}
      <group position={[0, resortY, 0]}>
        <mesh ref={beam} position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 3.2, 12, 1, true]} />
          <meshBasicMaterial color="#dfece4" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 3.25, 0]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
          <ringGeometry args={[0.18, 0.32, 48]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default function Galiyat({ progress, active }: { progress: React.RefObject<number>; active: boolean }) {
  const dem = useDem();
  const label = useRef<HTMLDivElement>(null);
  return (
    <>
      <Canvas
        camera={{ position: [0, 19, 4], fov: 40, near: 0.1, far: 200 }}
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {dem && <Terrain dem={dem} progress={progress} label={label} />}
      </Canvas>
      <div ref={label} className="pin-label" style={{ opacity: 0 }}>
        <b>Serene Heights</b>
        <span>Nathia Gali · 7,906 ft</span>
      </div>
    </>
  );
}
