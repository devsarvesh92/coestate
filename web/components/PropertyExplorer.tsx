"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Property } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";

const priceOptions = [
  { value: "any", label: "Any price" },
  { value: "lt6", label: "Under ₹6 lacs" },
  { value: "6to8", label: "₹6 – 8 lacs" },
  { value: "gt8", label: "Over ₹8 lacs" },
];

function priceMatch(p: number, filter: string) {
  if (filter === "lt6") return p < 6;
  if (filter === "6to8") return p >= 6 && p <= 8;
  if (filter === "gt8") return p > 8;
  return true;
}

export function PropertyExplorer({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState("any");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter(
      (p) =>
        (!q || `${p.name} ${p.location}`.toLowerCase().includes(q)) &&
        priceMatch(p.priceLacs, price)
    );
  }, [properties, query, price]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="flex flex-1 items-center gap-2.5 rounded-full border border-hairline px-4 py-3 shadow-card focus-within:border-border-strong min-w-[240px]">
          <Search size={18} className="shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or destination (e.g. Goa, villa, Manali)"
            className="w-full bg-transparent text-[15px] outline-none"
          />
        </label>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-full border border-hairline px-4 py-3 text-[15px] outline-none focus:border-border-strong"
        >
          {priceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="whitespace-nowrap text-sm text-muted">
          {results.length} {results.length === 1 ? "home" : "homes"}
        </span>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <p className="py-14 text-center text-muted">
          No homes match your search. Try clearing the filters.
        </p>
      )}
    </>
  );
}
