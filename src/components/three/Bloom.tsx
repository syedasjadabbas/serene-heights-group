"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 24000;

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uPixel;
  uniform float uSpread;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float wob = sin(uTime * 0.6 + aSeed * 6.2831) * 0.06;
    p += normalize(p) * (wob + uSpread * (0.4 + aSeed));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.8 + aSeed * 3.2) * uPixel;
    gl_PointSize = size * (6.0 / -mv.z);
    vColor = aColor;
    // Nearer points brighter; far side of the shell fades for depth.
    vAlpha = (1.0 - smoothstep(3.0, 9.0, -mv.z)) * (0.55 + 0.45 * aSeed) * 1.8;
  }
`;

const frag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function Cloud({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    const white = new THREE.Color("#ffffff");
    const violet = new THREE.Color("#a77dff");
    const rose = new THREE.Color("#f4b6ec");
    const tmp = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      // Points on a lumpy shell — denser at the rim, like mist around a summit.
      const u = Math.random() * 2 - 1;
      const t = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const dir = new THREE.Vector3(s * Math.cos(t), u, s * Math.sin(t));
      const lump = 1 + 0.18 * Math.sin(dir.x * 4.0) * Math.cos(dir.y * 3.0 + dir.z * 2.0);
      const r = (1.75 + Math.pow(Math.random(), 4) * 0.35) * lump;
      pos.set([dir.x * r, dir.y * r, dir.z * r], i * 3);
      const k = (dir.x + 1) / 2;
      tmp.copy(white).lerp(violet, Math.min(1, k * 1.6 + 0.15)).lerp(rose, Math.max(0, dir.y * -0.8) * k);
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixel: { value: 1 }, uSpread: { value: 0 } }),
    [],
  );

  useFrame((state, dt) => {
    const p = progress.current ?? 0;
    uniforms.uTime.value += dt;
    uniforms.uPixel.value = state.viewport.dpr * 1.6;
    uniforms.uSpread.value = THREE.MathUtils.damp(uniforms.uSpread.value, Math.max(0, p - 0.7) * 0.5, 3, dt);
    if (ref.current) {
      ref.current.rotation.y += dt * 0.08;
      ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, 0.35 + state.pointer.y * 0.15, 2, dt);
      ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, -state.pointer.x * 0.12, 2, dt);
      const s = 0.5 + Math.min(1, p * 1.4) * 0.25;
      ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, s, 4, dt));
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Bloom({ progress, active }: { progress: React.RefObject<number>; active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <Cloud progress={progress} />
    </Canvas>
  );
}
