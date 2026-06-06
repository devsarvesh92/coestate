import {
  Wallet,
  Sofa,
  Wrench,
  Star,
  ShieldCheck,
  TrendingUp,
  Ticket,
  Repeat,
} from "lucide-react";

const features = [
  { icon: Wallet, title: "Easy to buy", text: "Own a share from ₹6 lacs with a fully digital, paperless onboarding." },
  { icon: Sofa, title: "Fully furnished & managed", text: "Interiors, housekeeping and bookings are all handled for you." },
  { icon: Wrench, title: "Low maintenance cost", text: "Shared upkeep means a fraction of the cost of sole ownership." },
  { icon: Star, title: "Premium inventory", text: "Hand-picked luxury homes in India's top holiday destinations." },
  { icon: ShieldCheck, title: "Safe & legally yours", text: "Each home is owned by its own company; you hold registered shares." },
  { icon: TrendingUp, title: "High returns", text: "Rental income plus long-term capital appreciation on your share." },
  { icon: Ticket, title: "Unlimited holidays", text: "Stay at your home every year and swap across our network." },
  { icon: Repeat, title: "Easy to liquidate", text: "Resell your shares anytime on our co-owner marketplace." },
];

export function WhyCoEstate() {
  return (
    <section id="why" className="bg-surface-soft py-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-bold tracking-tight">Why CoEstate</h2>
          <p className="mx-auto mt-2 max-w-[640px] text-muted">
            A new-age PropTech platform that makes fractional real estate simple, transparent and
            rewarding.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title}>
              <f.icon size={30} strokeWidth={1.75} className="mb-3 text-rausch" />
              <h4 className="text-base font-semibold">{f.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
