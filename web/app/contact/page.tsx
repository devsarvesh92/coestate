import type { Metadata } from "next";
import { Check } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getProperty } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Get in touch — CoEstate",
};

const trust = [
  "Legally registered, transparent ownership",
  "Fully managed, end to end",
  "High returns, shared intelligently",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string }>;
}) {
  const { property } = await searchParams;
  const home = property ? getProperty(property) : undefined;

  return (
    <section className="py-[72px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-6 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-[30px] font-bold tracking-tight">Let&rsquo;s get you started</h1>
          <p className="mt-3 text-base text-muted">
            {home
              ? `Register your interest in ${home.name}, ${home.location}. Our team will walk you through co-ownership.`
              : "Own a fraction of a luxury holiday home in dream destinations. CoEstate makes it simple, transparent and rewarding."}
          </p>
          <ul className="mt-6 grid gap-3">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-3 font-medium">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ffe8ec] text-rausch">
                  <Check size={14} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <EnquiryForm property={property} />
      </div>
    </section>
  );
}
