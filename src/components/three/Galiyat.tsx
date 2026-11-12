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

const NG = { lat: 34.0745, lon: 73.379 }; // Serene Heights Nathia Gali
const LHR = { lat: 31.5154, lon: 74.3487 }; // Serene Heights Lahore, Gulberg Main Boulevard
const [CX, CZ] = project(NG.lat, NG.lon);

// Lahore is ~300 km away — far outside the terrain — so it is pinned at the terrain's edge in its
// true compass direction, with a route line from the resort and the straight-line distance.
const LHR_KM = (() => {
  const R = 6371;
  const toRad = Math.PI / 180;
  const dLat = (LHR.lat - NG.lat) * toRad;
  const dLon = (LHR.lon - NG.lon) * toRad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(NG.lat * toRad) * Math.cos(LHR.lat * toRad) * Math.sin(dLon / 2) ** 2;
  return Math.round((2 * R * Math.asin(Math.sqrt(a))) / 10) * 10;
})();
const LHR_DIR = (() => {
  const east = (LHR.lon - NG.lon) * 111.32 * Math.cos(((NG.lat + LHR.lat) / 2) * (Math.PI / 180));
  const south = (NG.lat - LHR.lat) * 111.32;
  const len = Math.hypot(east, south);
  return [east / len, south / len] as const; // world x = east, world z = south
})();
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

type Labels = { ng: React.RefObject<HTMLDivElement | null>; lhr: React.RefObject<HTMLDivElement | null> };

function Terrain({ dem, progress, labels }: { dem: Int16Array; progress: React.RefObject<number>; labels: Labels }) {
  const height = (x: number, z: number) => (sample(dem, CX + x, CZ + z) - BASE) * EXAG;
  const resortY = height(0, 0);
  const tip = useMemo(() => new THREE.Vector3(), []);

  // Lahore marker sits on the terrain, 60% of the way to the edge, in Lahore's direction.
  const lhrX = LHR_DIR[0] * RADIUS * 0.6;
  const lhrZ = LHR_DIR[1] * RADIUS * 0.6;
  const lhrY = height(lhrX, lhrZ);

  // Route from the resort toward Lahore, draped over the ridges.
  const route = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const x = lhrX * t;
      const z = lhrZ * t;
      pts.push(new THREE.Vector3(x, height(x, z) + 0.07, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(240)),
      new THREE.LineDashedMaterial({ color: "#eef5f0", dashSize: 0.22, gapSize: 0.14, transparent: true, opacity: 0.9 }),
    );
    line.computeLineDistances();
    return { curve, line };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dem]);
  const runner = useRef<THREE.Mesh>(null);

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
    // Moving light along the route to Lahore.
    if (runner.current) {
      const t = (state.clock.elapsedTime * 0.12) % 1;
      runner.current.position.copy(route.curve.getPointAt(t));
    }
    // Pin the DOM labels to the tops of the beams.
    const place = (el: HTMLDivElement | null, x: number, y: number, z: number) => {
      if (!el) return;
      tip.set(x, y, z).project(cam);
      const px = (tip.x * 0.5 + 0.5) * state.size.width;
      // Never let a label rise under the fixed nav bar at the top of the screen.
      const canvasTop = state.gl.domElement.getBoundingClientRect().top;
      const minY = Math.max(0, 180 - canvasTop);
      const py = Math.max((-tip.y * 0.5 + 0.5) * state.size.height, minY);
      // Above the beam on wide screens; beside it on phones, where the canvas top would clip it.
      el.style.transform = narrow
        ? `translate(${px}px, ${py}px) translate(14px, -30%)`
        : `translate(${px}px, ${py}px) translate(-50%, -100%)`;
      el.style.opacity = tip.z < 1 ? "1" : "0";
    };
    place(labels.ng.current, 0, resortY + 2.35, 0);
    place(labels.lhr.current, lhrX, lhrY + 1.95, lhrZ);
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
        <mesh ref={beam} position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 2.3, 12, 1, true]} />
          <meshBasicMaterial color="#dfece4" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 2.35, 0]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
          <ringGeometry args={[0.18, 0.32, 48]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Route + Lahore marker (direction-true, at the terrain's edge) */}
      <primitive object={route.line} />
      <mesh ref={runner}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <group position={[lhrX, lhrY, lhrZ]}>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.9, 12, 1, true]} />
          <meshBasicMaterial color="#c8a46a" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshBasicMaterial color="#f3e2c2" />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
          <ringGeometry args={[0.14, 0.24, 48]} />
          <meshBasicMaterial color="#f3e2c2" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default function Galiyat({ progress, active }: { progress: React.RefObject<number>; active: boolean }) {
  const dem = useDem();
  const ng = useRef<HTMLDivElement>(null);
  const lhr = useRef<HTMLDivElement>(null);
  return (
    <>
      <Canvas
        camera={{ position: [0, 19, 4], fov: 40, near: 0.1, far: 200 }}
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {dem && <Terrain dem={dem} progress={progress} labels={{ ng, lhr }} />}
      </Canvas>
      <div ref={ng} className="pin-label" style={{ opacity: 0 }}>
        <b>Serene Heights Nathia Gali</b>
        <span>Kala Bagh Road · 7,906 ft</span>
      </div>
      <div ref={lhr} className="pin-label pin-label--far" style={{ opacity: 0 }}>
        <b>Serene Heights Lahore</b>
        <span>{LHR_KM} km this way · Gulberg</span>
      </div>
    </>
  );
}
