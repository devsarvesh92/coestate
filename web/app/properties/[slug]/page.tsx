import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Star, MapPin, Waves, BedDouble, Wifi, ChefHat, Eye, Car } from "lucide-react";
import { properties, getProperty } from "@/lib/properties";

const gallery = ["/images/interior-1.jpg", "/images/interior-2.jpg", "/images/interior-3.jpg", "/images/interior-4.jpg"];
const amenities = [
  { icon: Waves, label: "Private pool" },
  { icon: BedDouble, label: "4 bedrooms" },
  { icon: Wifi, label: "High-speed Wifi" },
  { icon: ChefHat, label: "Chef on call" },
  { icon: Eye, label: "Scenic view" },
  { icon: Car, label: "Free parking" },
];

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  return { title: p ? `${p.name}, ${p.location} — CoEstate` : "Property — CoEstate" };
}

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const owned = property.totalShares - property.availableShares;
  const pct = Math.round((owned / property.totalShares) * 100);

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8">
      {/* Header */}
      <h1 className="text-[26px] font-semibold tracking-tight">{property.name}</h1>
      <div className="mt-1.5 flex items-center gap-1.5 text-[15px] text-body">
        <Star size={14} className="fill-ink text-ink" /> {property.rating} rating ·{" "}
        {property.reviews} reviews · <MapPin size={14} /> {property.location}
      </div>

      {/* Gallery */}
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-2" style={{ height: 420 }}>
        <div className="relative md:col-span-1 md:row-span-2 overflow-hidden rounded-md">
          <Image src={property.image} alt={property.name} fill className="object-cover" sizes="50vw" />
        </div>
        {gallery.map((src) => (
          <div key={src} className="relative hidden md:block overflow-hidden rounded-sm">
            <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[1.7fr_1fr]">
        <div>
          <h2 className="mb-4 text-[21px] font-bold">What this home offers</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {amenities.map((a) => (
              <div key={a.label} className="flex items-center gap-3 border-b border-hairline-soft py-3 text-[15px]">
                <a.icon size={22} className="shrink-0" /> {a.label}
              </div>
            ))}
          </div>

          <p className="mt-6 border-t border-hairline pt-6 leading-relaxed text-body">
            {property.description} The home is professionally managed end-to-end, so co-owners
            simply show up and enjoy.
          </p>

          <div className="mt-8 border-t border-hairline pt-6">
            <h2 className="text-[21px] font-bold">Own a share from {property.pricePerShare}</h2>
            <div className="my-3 h-2 overflow-hidden rounded-full bg-surface-strong">
              <div className="h-full rounded-full bg-rausch" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-muted">
              {property.availableShares} of {property.totalShares} shares available · be a co-owner
              in a professionally managed luxury home.
            </p>
          </div>
        </div>

        {/* Reservation card */}
        <aside className="self-start rounded-md border border-hairline p-6 shadow-card md:sticky md:top-24">
          <div className="text-2xl font-bold">
            ₹{(property.priceLacs * 100000).toLocaleString("en-IN")}{" "}
            <span className="text-sm font-normal text-muted">per share</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            No payment is taken online — register your interest and our team will guide you through
            the co-ownership process.
          </p>
          <Link
            href={`/contact?property=${property.slug}`}
            className="mt-4 flex w-full items-center justify-center rounded-sm bg-rausch px-6 py-3.5 font-medium text-white transition-colors hover:bg-rausch-active"
          >
            Reserve your share
          </Link>
          <Link
            href="/properties"
            className="mt-2 flex w-full items-center justify-center text-sm text-muted hover:text-ink"
          >
            ← Back to all homes
          </Link>
        </aside>
      </div>
    </div>
  );
}
