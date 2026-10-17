"use client";

// Loaded only through GradientBackdrop's dynamic import. Pulls in three.js and
// @react-three/fiber (about 290 KB gzip in total), so use it only when the exact
// ShaderGradient look is the point. Otherwise use Paper Shaders (about 8 KB).

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

type Props = { colors: string[]; active: boolean };

export default function ShaderGradientBlock({ colors, active }: Props) {
  return (
    <ShaderGradientCanvas pixelDensity={1} lazyLoad pointerEvents="none">
      <ShaderGradient
        control="props"
        type="plane"
        animate={active ? "on" : "off"}
        // "3d" lighting needs no downloads. "env" fetches HDR files from the
        // author's GitHub Pages unless you self-host them and pass envBasePath.
        lightType="3d"
        grain="off"
        uSpeed={0.2}
        color1={colors[0]}
        color2={colors[1] ?? colors[0]}
        color3={colors[2] ?? colors[0]}
      />
    </ShaderGradientCanvas>
  );
}
