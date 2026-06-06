import { Search, Home, Umbrella } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "Step 01",
    title: "Choose",
    text: "Pick a curated luxury home and decide how many shares you'd like to own.",
  },
  {
    icon: Home,
    num: "Step 02",
    title: "Own",
    text: "You become a legally registered co-owner — like owning a flat jointly with family, but for a luxury holiday home you actually use and earn from.",
  },
  {
    icon: Umbrella,
    num: "Step 03",
    title: "Enjoy",
    text: "We manage everything end to end. You enjoy stays and track your returns.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-surface-soft py-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-bold tracking-tight">
            Own a holiday home in 3 simple steps
          </h2>
          <p className="mx-auto mt-2 max-w-[640px] text-muted">
            Fractional ownership simply means a few people co-own one luxury home together — you
            pay only for your share, and enjoy the home and its earnings in the same proportion. No
            paperwork, no management hassle.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* dashed connector behind the circles on desktop */}
          <div className="pointer-events-none absolute top-11 left-[16%] right-[16%] hidden border-t-2 border-dashed border-hairline md:block" />
          {steps.map((s) => (
            <div key={s.title} className="relative z-10 text-center">
              <div className="mx-auto mb-6 grid h-[88px] w-[88px] place-items-center rounded-full border border-hairline bg-white text-rausch shadow-card">
                <s.icon size={34} strokeWidth={1.75} />
              </div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-[1.5px] text-rausch">
                {s.num}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
              <p className="mx-auto max-w-[280px] text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
