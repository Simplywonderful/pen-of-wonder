"use client";

// Every heavy visual effect sits inside this frame. The poster (a real image or a
// plain styled block) is always rendered first, so the page is complete without
// JavaScript, on slow phones, for reduced-motion users, and as the LCP element.
// The effect is mounted on top only when the device and the visitor allow it,
// and it is told when it is off screen so it can stop drawing.

import { Component, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export type GateReason =
  | "pending"
  | "reduced-motion"
  | "save-data"
  | "no-webgl"
  | "ok";

type Options = {
  /** Set false for effects that are plain <video> or CSS. */
  needsWebGL?: boolean;
  /** Start mounting a little before the frame scrolls into view. */
  rootMargin?: string;
};

type NetworkInfo = { saveData?: boolean };

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function useEffectGate(
  target: RefObject<HTMLElement | null>,
  { needsWebGL = true, rootMargin = "200px" }: Options = {},
) {
  const [reason, setReason] = useState<GateReason>("pending");
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;

    const decide = () => {
      if (motion.matches) return setReason("reduced-motion");
      if (connection?.saveData) return setReason("save-data");
      if (needsWebGL && !hasWebGL2()) return setReason("no-webgl");
      setReason("ok");
    };
    decide();
    motion.addEventListener("change", decide);
    return () => motion.removeEventListener("change", decide);
  }, [needsWebGL]);

  useEffect(() => {
    const node = target.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, rootMargin]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const allowed = reason === "ok";
  return { allowed, reason, seen, active: allowed && inView && pageVisible };
}

// If the effect throws (model 404, lost WebGL context, a library bug), drop it
// and keep the poster. Without this, one failed asset takes the whole page down.
class EffectBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") console.warn("Effect disabled:", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type FrameProps = {
  /** Always rendered. Use next/image or <img> with real dimensions and alt text. */
  poster: ReactNode;
  /** Receives `active`: false when off screen or the tab is hidden. Pause on false. */
  children: (active: boolean) => ReactNode;
  needsWebGL?: boolean;
  className?: string;
};

export function EffectFrame({ poster, children, needsWebGL = true, className }: FrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { allowed, active, seen } = useEffectGate(ref, { needsWebGL });

  return (
    <div ref={ref} className={["effect-frame", className].filter(Boolean).join(" ")}>
      {poster}
      {/* Mount once the frame has been near the viewport; keep it mounted after that
          so scrolling back does not pay the start-up cost again. */}
      {allowed && seen ? (
        <div className="effect-frame__layer" aria-hidden="true">
          <EffectBoundary>{children(active)}</EffectBoundary>
        </div>
      ) : null}
    </div>
  );
}
