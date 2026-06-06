"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

const DESTINATIONS = [
  "Alibaug, Maharashtra",
  "Anjuna, Goa",
  "Kasauli, Himachal Pradesh",
  "Manali, Himachal Pradesh",
  "Mukteshwar, Uttarakhand",
  "Naukuchiatal, Uttarakhand",
  "Pondicherry",
  "Varkala, Kerala",
  "Goa",
  "Himachal Pradesh",
  "Uttarakhand",
  "Kerala",
  "Maharashtra",
];

type Panel = "where" | "when" | "shares" | null;

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function HeroSearch() {
  const router = useRouter();
  const wrapRef = useRef<HTMLFormElement>(null);

  const [panel, setPanel] = useState<Panel>(null);
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [shares, setShares] = useState(1);
  const [sharesTouched, setSharesTouched] = useState(false);

  // calendar view month (1st of month)
  const [view, setView] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setPanel(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where.trim()) params.set("q", where.trim());
    if (when) params.set("when", when);
    if (sharesTouched) params.set("shares", String(shares));
    const qs = params.toString();
    router.push("/properties" + (qs ? `?${qs}` : ""));
  }

  const suggestions = where.trim()
    ? DESTINATIONS.filter((d) => d.toLowerCase().includes(where.trim().toLowerCase())).slice(0, 6)
    : [];

  // calendar grid
  const y = view.getFullYear();
  const m = view.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <form
      ref={wrapRef}
      onSubmit={submit}
      className="relative z-20 mx-auto -mt-9 flex max-w-[860px] flex-col items-stretch gap-2 rounded-3xl border border-hairline bg-canvas p-2.5 shadow-card md:flex-row md:items-center md:rounded-full"
    >
      {/* Where */}
      <div className="relative flex-1 border-b border-hairline px-6 py-2 md:border-b-0 md:border-r">
        <div className="text-xs font-bold">Where</div>
        <input
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          onFocus={() => setPanel("where")}
          placeholder="Search destinations"
          autoComplete="off"
          className="mt-0.5 w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
        {panel === "where" && suggestions.length > 0 && (
          <div className="absolute left-0 top-[calc(100%+10px)] z-40 max-h-[300px] min-w-[240px] overflow-y-auto rounded-md border border-hairline bg-canvas p-1.5 shadow-card">
            {suggestions.map((d) => (
              <button
                key={d}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setWhere(d);
                  setPanel(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left text-sm hover:bg-surface-soft"
              >
                <MapPin size={16} className="text-muted" /> {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* When */}
      <div className="relative flex-1 cursor-pointer border-b border-hairline px-6 py-2 md:border-b-0 md:border-r">
        <div className="text-xs font-bold">When</div>
        <button
          type="button"
          onClick={() => setPanel(panel === "when" ? null : "when")}
          className={`mt-0.5 block w-full text-left text-sm ${when ? "text-ink" : "text-muted"}`}
        >
          {when ? fmt(when) : "Add dates"}
        </button>
        {panel === "when" && (
          <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-[280px] rounded-md border border-hairline bg-canvas p-4 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView(new Date(y, m - 1, 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-hairline hover:bg-surface-soft"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="text-[15px] font-bold">
                {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <button
                type="button"
                onClick={() => setView(new Date(y, m + 1, 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-hairline hover:bg-surface-soft"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="py-1 text-center text-[11px] font-bold text-muted">
                  {d}
                </span>
              ))}
              {Array.from({ length: firstDow }).map((_, i) => (
                <span key={`e${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(y, m, day);
                const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const past = date < today;
                const selected = when === iso;
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={past}
                    onClick={() => {
                      setWhen(iso);
                      setPanel(null);
                    }}
                    className={`aspect-square rounded-full text-[13px] ${
                      past
                        ? "cursor-default text-hairline"
                        : selected
                          ? "bg-ink text-white"
                          : "hover:bg-surface-strong"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Shares */}
      <div className="relative flex-1 px-6 py-2">
        <div className="text-xs font-bold">Shares</div>
        <button
          type="button"
          onClick={() => setPanel(panel === "shares" ? null : "shares")}
          className={`mt-0.5 block w-full text-left text-sm ${sharesTouched ? "text-ink" : "text-muted"}`}
        >
          {sharesTouched ? `${shares} ${shares === 1 ? "share" : "shares"}` : "How many?"}
        </button>
        {panel === "shares" && (
          <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-[260px] rounded-md border border-hairline bg-canvas p-4 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[15px] font-semibold">Shares</div>
                <div className="text-[13px] text-muted">How many would you like?</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Fewer"
                  onClick={() => {
                    setSharesTouched(true);
                    setShares((s) => Math.max(1, s - 1));
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border-strong hover:border-ink"
                >
                  <Minus size={16} />
                </button>
                <span className="w-5 text-center font-semibold">{shares}</span>
                <button
                  type="button"
                  aria-label="More"
                  onClick={() => {
                    setSharesTouched(true);
                    setShares((s) => Math.min(11, s + 1));
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border-strong hover:border-ink"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search orb */}
      <button
        type="submit"
        aria-label="Search"
        className="grid h-12 w-full shrink-0 place-items-center rounded-sm bg-rausch text-white hover:bg-rausch-active md:h-[52px] md:w-[52px] md:rounded-full"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
