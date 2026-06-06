import Image from "next/image";
import { Star } from "lucide-react";

const quotes = [
  {
    text: "I always wanted a place in Goa but couldn't justify the cost. With CoEstate I own a share of a stunning villa, get rental income, and holiday there every year.",
    name: "Rohan Mehta",
    meta: "Co-owner since 2024 · Bengaluru",
    avatar: "/images/avatar-1.jpg",
  },
  {
    text: "The whole process was paperless and transparent. Knowing each home is owned by its own registered company gave me real confidence that my ownership is protected.",
    name: "Ananya Iyer",
    meta: "Co-owner since 2023 · Mumbai",
    avatar: "/images/avatar-2.jpg",
  },
  {
    text: "Zero maintenance headaches. They manage everything and the returns have beaten my fixed deposits comfortably. Highly recommend.",
    name: "Vikram Nair",
    meta: "Co-owner since 2022 · Pune",
    avatar: "/images/avatar-3.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-rausch">
            Loved by co-owners
          </div>
          <h2 className="text-[28px] font-bold tracking-tight">Real owners, real returns</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <div key={q.name} className="rounded-md border border-hairline p-6">
              <div className="mb-3 flex gap-0.5 text-rausch">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-rausch" />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-body">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src={q.avatar}
                  alt={q.name}
                  width={42}
                  height={42}
                  className="rounded-full object-cover"
                />
                <div>
                  <b className="text-sm">{q.name}</b>
                  <span className="block text-[13px] text-muted">{q.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
