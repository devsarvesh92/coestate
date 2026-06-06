import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Property } from "@/lib/properties";
import { HeartButton } from "./HeartButton";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-md bg-surface-strong">
        <span className="absolute top-3 left-3 z-10 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold shadow-card">
          Guest favorite
        </span>
        <HeartButton />
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(max-width: 744px) 100vw, (max-width: 1128px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="pt-3">
        <div className="flex justify-between gap-2">
          <span className="text-[15px] font-semibold truncate">{property.name}</span>
          <span className="flex items-center gap-1 text-sm whitespace-nowrap">
            <Star size={14} className="fill-ink text-ink" />
            {property.rating}
          </span>
        </div>
        <div className="mt-0.5 text-sm text-muted">{property.location}</div>
        <div className="mt-1.5 text-sm">
          From <b className="font-semibold">{property.pricePerShare}</b> / share
        </div>
      </div>
    </Link>
  );
}
