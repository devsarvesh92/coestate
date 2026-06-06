"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#how", label: "How it works" },
  { href: "/properties", label: "Properties" },
  { href: "/#why", label: "About" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 bg-canvas border-b border-hairline">
      <div className="mx-auto max-w-[1280px] h-full px-6 flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Co<span className="text-rausch">Estate</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-base font-semibold text-ink border-b-2 border-transparent hover:border-ink pb-1"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-rausch px-5 py-2.5 text-sm font-medium text-white hover:bg-rausch-active transition-colors"
          >
            Get In Touch
          </Link>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="block w-5 h-0.5 bg-ink rounded" />
            <span className="block w-5 h-0.5 bg-ink rounded" />
            <span className="block w-5 h-0.5 bg-ink rounded" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-20 bg-canvas border-b border-hairline shadow-card px-6 py-2">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block w-full py-3.5 px-3 rounded-sm hover:bg-surface-soft text-ink font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
