"use client";

// Scroll-scrubbed video: the visitor's scroll position drives the playhead, the
// technique behind Apple's product pages and the scroll-world repo. Written from
// scratch for this skill (clean unmount, no global DOM injection, no forced styles).
//
// Feed it REAL footage: a walk through the client's shop, a drone pass over the
// site, a product turntable shot on a phone. Encode for fast seeking:
//
//   ffmpeg -i in.mp4 -an -vf "scale=1280:-2" -c:v libx264 -crf 23 -g 6 \
//          -pix_fmt yuv420p -movflags +faststart scrub-1280.mp4
//   ffmpeg -i in.mp4 -an -vf "scale=720:-2"  -c:v libx264 -crf 26 -g 4 \
//          -pix_fmt yuv420p -movflags +faststart scrub-720.mp4
//
// Keep each file under ~4 MB. The host must support HTTP range requests
// (Vercel, Netlify and most CDNs do).

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  /** Smaller encode for narrow screens. */
  srcMobile?: string;
  /** First frame as an image, shown before the video can seek and for reduced motion. */
  poster: string;
  /** Describe what the footage shows. Rendered as the poster's alt text. */
  alt: string;
  /** How many viewport heights of scrolling the clip spans. */
  lengthVh?: number;
  /** Text or other content layered over the footage. */
  children?: ReactNode;
};

export function ScrollScrubVideo({ src, srcMobile, poster, alt, lengthVh = 300, children }: Props) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"poster" | "video">("poster");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    setMode(motion.matches || saveData ? "poster" : "video");
  }, []);

  useEffect(() => {
    if (mode !== "video") return;
    const el = section.current;
    const vid = video.current;
    if (!el || !vid) return;

    let target = 0;
    let current = 0;
    let frame = 0;
    let running = false;

    const readScroll = () => {
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      target = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
    };

    const tick = () => {
      current += (target - current) * 0.2;
      const duration = vid.duration;
      // Never queue a seek while the decoder is busy; fast flicks would pile up.
      if (duration && !vid.seeking) {
        const t = current * (duration - 0.05);
        if (Math.abs(vid.currentTime - t) > 0.01) vid.currentTime = t;
      }
      if (Math.abs(target - current) > 0.0005) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onScroll = () => {
      readScroll();
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    // Only listen while the section is near the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mode]);

  return (
    <section ref={section} className="scrub" style={{ height: `${lengthVh}vh` }}>
      <div className="scrub__sticky">
        {mode === "video" ? (
          <video
            ref={video}
            className="scrub__media"
            muted
            playsInline
            preload="auto"
            poster={poster}
            aria-label={alt}
          >
            {srcMobile ? <source src={srcMobile} media="(max-width: 720px)" type="video/mp4" /> : null}
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="scrub__media" src={poster} alt={alt} />
        )}
        {children ? <div className="scrub__content">{children}</div> : null}
      </div>
    </section>
  );
}
