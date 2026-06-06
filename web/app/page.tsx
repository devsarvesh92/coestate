import Link from "next/link";
import { Hero } from "@/components/Hero";
import { HeroSearch } from "@/components/HeroSearch";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyCoEstate } from "@/components/WhyCoEstate";
import { Testimonials } from "@/components/Testimonials";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/properties";

export default function Home() {
  const featured = properties.slice(0, 4);

  return (
    <>
      <Hero />

      <div className="px-6">
        <HeroSearch />
      </div>

      <HowItWorks />

      {/* Featured homes */}
      <section className="py-[72px]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-10 text-center">
            <h2 className="text-[28px] font-bold tracking-tight">Featured holiday homes</h2>
            <p className="mx-auto mt-2 max-w-[640px] text-muted">
              Premium, fully managed homes you can co-own today.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </div>
      </section>

      <WhyCoEstate />

      <Testimonials />

      {/* CTA */}
      <section className="bg-surface-soft py-[72px]">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="text-[32px] font-bold tracking-tight">
            Dream holiday home ownership for 1/11th the cost
          </h2>
          <p className="mx-auto mt-3.5 max-w-[560px] text-muted">
            Download our brochure or talk to our team to find the perfect home for you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm bg-rausch px-6 py-3.5 font-medium text-white transition-colors hover:bg-rausch-active"
            >
              Get in touch
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center rounded-sm border border-ink px-6 py-3.5 font-medium text-ink transition-colors hover:bg-surface-soft"
            >
              Browse homes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
