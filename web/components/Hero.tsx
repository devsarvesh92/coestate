"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[560px] items-center pb-10">
      {/* crossfading background slides */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out"
          style={{ backgroundImage: `url('${src}')`, opacity: i === active ? 1 : 0 }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-white">
        <h1
          className="max-w-[600px] font-semibold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(30px,4vw,44px)", textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}
        >
          Smart Way To Own A Holiday Home
        </h1>
        <p
          className="mt-3 text-xl font-medium"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}
        >
          Co-own a fully managed luxury home from just ₹4.5 lacs — earn returns and enjoy free
          stays.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/properties"
            className="inline-flex items-center rounded-sm bg-rausch px-6 py-3.5 font-medium text-white transition-colors hover:bg-rausch-active"
          >
            Explore homes
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-sm border border-white px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
          >
            Book your stay
          </Link>
        </div>
      </div>
    </section>
  );
}
