"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

export function HeartButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-label="Save"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved((v) => !v);
      }}
      className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90"
    >
      <Heart
        className={saved ? "fill-rausch text-rausch" : "text-ink"}
        size={17}
        strokeWidth={2}
      />
    </button>
  );
}
