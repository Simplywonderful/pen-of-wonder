"use client";

// A single 3D object (a product, a building, a logo mark) rendered with
// React Three Fiber. Import this file through Scene3D.tsx, never directly from
// a Server Component, so three.js stays out of the first page load.
//
// Requires: three, @react-three/fiber 9.x (React 19), @react-three/drei 10.x.
// Models: export as .glb, then compress with Meshopt and keep it under ~1.5 MB:
//   npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt
// Prefer Meshopt to Draco: drei bundles the Meshopt decoder, but for Draco it
// downloads the decoder from www.gstatic.com unless you self-host it and call
// useGLTF.setDecoderPath("/draco/").

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerformanceMonitor, useGLTF } from "@react-three/drei";
import type { Group } from "three";

type Props = {
  /** Self-hosted .glb under /public, e.g. "/models/bottle.glb". */
  modelUrl: string;
  /** Self-hosted .hdr under /public. Do NOT use drei's `preset` prop: it downloads
      HDR files from a third-party CDN (raw.githack.com) at runtime. */
  environmentUrl: string;
  /** From EffectFrame. When false the scene stops rendering frames. */
  active: boolean;
};

function Model({ url, active }: { url: string; active: boolean }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    // Slow, constant turn. Reduced-motion visitors never reach this component.
    if (active && group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export default function ProductScene({ modelUrl, environmentUrl, active }: Props) {
  // Start at a modest pixel ratio and drop further if the device struggles.
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      // "never" stops the render loop entirely while off screen or in a hidden tab.
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4], fov: 35 }}
      gl={{ antialias: true, powerPreference: "default" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Suspense fallback={null}>
        <Model url={modelUrl} active={active} />
        <Environment files={environmentUrl} />
      </Suspense>
    </Canvas>
  );
}
