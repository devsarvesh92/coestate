import Link from "next/link";

export default function Home() {
  return (
    <section
      className="relative min-h-[560px] flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 text-white">
        <h1
          className="font-semibold leading-[1.08] tracking-tight max-w-[600px]"
          style={{ fontSize: "clamp(30px,4vw,44px)", textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}
        >
          Smart Way To Own A Holiday Home
        </h1>
        <p
          className="mt-3 text-xl font-medium"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}
        >
          Co-own a fully managed luxury home from just ₹4.5 lacs — earn returns and enjoy free
          stays.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/properties"
            className="inline-flex items-center rounded-sm bg-rausch px-6 py-3.5 font-medium text-white hover:bg-rausch-active transition-colors"
          >
            Explore homes
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-sm border border-white px-6 py-3.5 font-medium text-white hover:bg-white/10 transition-colors"
          >
            Book your stay
          </Link>
        </div>
      </div>
    </section>
  );
}
