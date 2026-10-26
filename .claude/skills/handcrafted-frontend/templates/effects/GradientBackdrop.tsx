"use client";

// An animated gradient behind a hero. Two engines, same gate:
//
//  - Paper Shaders (default): @paper-design/shaders-react, Apache-2.0, no three.js.
//  - ShaderGradient: @shadergradient/react, MIT, needs three + @react-three/fiber.
//    About 290 KB gzip against Paper's 8 KB. Use it only if you designed the
//    gradient in shadergradient.co and need its exact look. See ShaderGradientBlock.tsx.
//
// Colours come from design tokens, never from a preset. The stock presets are
// exactly what thousands of AI-built sites ship.

import dynamic from "next/dynamic";
import { EffectFrame } from "./EffectFrame";

// Importing through a one-line file keeps tree-shaking working: a dynamic
// import of the package root would pull in every Paper shader (~80 KB gzip).
const PaperGradient = dynamic(() => import("./PaperMesh"), { ssr: false });

const ShaderGradientBlock = dynamic(() => import("./ShaderGradientBlock"), { ssr: false });

type Props = {
  /** 2 to 4 colours from DESIGN.md, as hex strings. */
  colors: string[];
  engine?: "paper" | "shadergradient";
  /** Flat CSS fallback shown first and kept for reduced motion / Save-Data. */
  fallbackClassName: string;
};

export function GradientBackdrop({ colors, engine = "paper", fallbackClassName }: Props) {
  return (
    <EffectFrame
      className="gradient-backdrop"
      poster={<div className={fallbackClassName} />}
    >
      {(active) =>
        engine === "paper" ? (
          <PaperGradient
            colors={colors}
            distortion={0.6}
            swirl={0.2}
            // speed 0 freezes the shader on its current frame when off screen.
            speed={active ? 0.25 : 0}
            maxPixelCount={1280 * 720}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <ShaderGradientBlock colors={colors} active={active} />
        )
      }
    </EffectFrame>
  );
}
