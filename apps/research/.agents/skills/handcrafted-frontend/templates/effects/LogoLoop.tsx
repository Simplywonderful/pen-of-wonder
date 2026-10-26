"use client";

// A short animated logo (for example a liquid-metal loop exported from the
// liquid-logo tool, or rendered once with Paper Shaders' LiquidMetal) shipped as
// a video file instead of a live shader. A 3-second WebM is usually 200 to 600 KB
// and costs the visitor's GPU nothing.
//
// Export: liquid-logo exports MP4. Make a WebM too and a still for the poster:
//   ffmpeg -i logo.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 logo.webm
//   ffmpeg -i logo.mp4 -frames:v 1 logo-poster.png

import { useEffect, useRef, useState } from "react";

type Props = {
  webm: string;
  mp4: string;
  poster: string;
  /** The brand name. The video is decorative; this is what screen readers hear. */
  label: string;
  width: number;
  height: number;
};

export function LogoLoop({ webm, mp4, poster, label, width, height }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const vid = ref.current;
    if (still || !vid) return;
    // Play only while visible.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
    observer.observe(vid);
    return () => observer.disconnect();
  }, [still]);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={label} width={width} height={height} />;
  }

  return (
    <video
      ref={ref}
      width={width}
      height={height}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
