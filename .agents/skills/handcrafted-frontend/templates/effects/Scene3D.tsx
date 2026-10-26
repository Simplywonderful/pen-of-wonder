"use client";

// The only file the rest of the site imports for 3D. It lazy-loads the heavy
// scene in its own chunk and shows the poster until the gate allows the effect.
// `dynamic(..., { ssr: false })` must live in a Client Component like this one;
// Next.js rejects it inside Server Components.

import dynamic from "next/dynamic";
import Image from "next/image";
import { EffectFrame } from "./EffectFrame";

const ProductScene = dynamic(() => import("./ProductScene"), { ssr: false });

type Props = {
  posterSrc: string;
  posterAlt: string;
  posterWidth: number;
  posterHeight: number;
  modelUrl: string;
  environmentUrl: string;
};

export function Scene3D(props: Props) {
  return (
    <EffectFrame
      className="scene-3d"
      poster={
        <Image
          src={props.posterSrc}
          alt={props.posterAlt}
          width={props.posterWidth}
          height={props.posterHeight}
          priority
        />
      }
    >
      {(active) => (
        <ProductScene
          modelUrl={props.modelUrl}
          environmentUrl={props.environmentUrl}
          active={active}
        />
      )}
    </EffectFrame>
  );
}
