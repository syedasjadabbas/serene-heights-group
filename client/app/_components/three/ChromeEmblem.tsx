"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { RIDGE } from "@/global/components/Emblem";

// SVG space (100 × 136, y down) → world space (centred, y up, 1 unit = 50 px).
const X = (x: number) => (x - 50) / 50;
const Y = (y: number) => -(y - 68) / 50;

function capsule(target: THREE.Shape | THREE.Path, x0: number, y0: number, x1: number, y1: number) {
  const r = (x1 - x0) / 2 / 50;
  const top = Y(y0) - r;
  const bot = Y(y1) + r;
  target.moveTo(X(x1), bot);
  target.lineTo(X(x1), top);
  target.absarc(0, top, r, 0, Math.PI, false);
  target.lineTo(X(x0), bot);
  target.absarc(0, bot, r, Math.PI, Math.PI * 2, false);
  return target;
}

function useEmblemGeometry() {
  return useMemo(() => {
    const extrude = { depth: 0.22, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.03, bevelSegments: 6, curveSegments: 48 };

    const body = capsule(new THREE.Shape(), 8, 8, 92, 128) as THREE.Shape;
    const ridge = new THREE.Path();
    RIDGE.forEach(([x, y], i) => (i ? ridge.lineTo(X(x), Y(y)) : ridge.moveTo(X(x), Y(y))));
    ridge.closePath();
    body.holes.push(ridge);

    const ring = capsule(new THREE.Shape(), 1.2, 1.2, 98.8, 134.8) as THREE.Shape;
    ring.holes.push(capsule(new THREE.Path(), 4.6, 4.6, 95.4, 131.4) as THREE.Path);

    const g1 = new THREE.ExtrudeGeometry(body, extrude);
    const g2 = new THREE.ExtrudeGeometry(ring, { ...extrude, depth: 0.12 });
    g1.translate(0, 0, -0.11);
    g2.translate(0, 0, -0.06);
    return [g1, g2] as const;
  }, []);
}

function Emblem3D() {
  const group = useRef<THREE.Group>(null);
  const [body, ring] = useEmblemGeometry();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.55 + Math.sin(t * 0.35) * 0.25 + state.pointer.x * 0.35, 2.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.12 - state.pointer.y * 0.2, 2.5, dt);
    g.position.y = Math.sin(t * 0.6) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.1, -0.6, -0.18]}>
      <mesh geometry={body}>
        <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh geometry={ring}>
        <meshPhysicalMaterial color="#e6f0ea" metalness={1} roughness={0.08} clearcoat={1} />
      </mesh>
    </group>
  );
}

export default function ChromeEmblem({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Emblem3D />
      <Environment resolution={256}>
        <color attach="background" args={["#0f241e"]} />
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 4, -2]} scale={[10, 1.2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 0.8, 1]} />
        <Lightformer form="rect" intensity={4} color="#7fa797" position={[4, -1, 1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={3} color="#eef5f0" position={[0, -3, 3]} scale={3} />
        <Lightformer form="rect" intensity={1.5} color="#37584f" position={[0, 0, -5]} scale={[12, 12, 1]} />
      </Environment>
    </Canvas>
  );
}
