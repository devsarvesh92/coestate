import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/PropertyExplorer";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Holiday homes you can co-own — CoEstate",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-6">
          <h1 className="text-[28px] font-bold tracking-tight">Holiday homes you can co-own</h1>
          <p className="mt-2 text-muted">
            Each home is owned by its own company — buy as few or as many shares as you like.
          </p>
        </div>
        <PropertyExplorer properties={properties} initialQuery={q ?? ""} />
      </div>
    </section>
  );
}
