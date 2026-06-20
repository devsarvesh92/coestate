"use client";

import { useEffect, useRef } from "react";

/**
 * Concept explainer ad for the landing page. Plays the generated cinematic
 * brand video (public/coestate-ad.mp4). Autoplays muted once scrolled into
 * view (respecting prefers-reduced-motion); user can unmute/replay via controls.
 */
export function ConceptVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="concept" className="scroll-mt-24 py-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-bold tracking-tight">
            Own a luxury holiday home — for a fraction of the price
          </h2>
          <p className="mx-auto mt-2 max-w-[640px] text-muted">
            See how fractional ownership turns a crore-rupee home into a share you can own,
            enjoy, and earn from.
          </p>
        </div>

        <div className="mx-auto max-w-[900px]">
          <div className="overflow-hidden rounded-lg border border-hairline bg-surface-soft shadow-card">
            <video
              ref={ref}
              className="aspect-video w-full"
              src="/coestate-ad.mp4"
              poster="/coestate-ad-poster.jpg"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
