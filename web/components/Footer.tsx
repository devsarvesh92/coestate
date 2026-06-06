import Link from "next/link";

const footerLinks = [
  { href: "/#how", label: "How it works" },
  { href: "/properties", label: "Properties" },
  { href: "/#why", label: "About" },
  { href: "/contact", label: "Get in touch" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline py-8">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            Co<span className="text-rausch">Estate</span>
          </Link>
          <nav className="flex flex-wrap gap-6">
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[15px] text-muted hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-4 text-[13px] text-muted-soft">
          © 2026 CoEstate Proptech Pvt. Ltd. · hello@coestate.in
        </div>
      </div>
    </footer>
  );
}
