import Link from "next/link";
import { Globe, AtSign, MessageCircle, Sprout } from "lucide-react";
import { Logo } from "@/components/Logo";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/register", label: "Get started" },
  { href: "/login", label: "Log in" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com", label: "GitHub", Icon: Globe },
  { href: "https://instagram.com", label: "Instagram", Icon: AtSign },
  { href: "https://twitter.com", label: "Twitter / X", Icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal-deep text-ivory">
      {/* glowing top seam */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest-bright/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="orb-glow absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
              A medical record for your plants. Photograph, diagnose, and
              follow every plant&apos;s health journey over time.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-mint/15 p-2.5 text-ivory/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-mint/80">
              Product
            </h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-ivory/60 transition-colors hover:text-mint"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-mint/80">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-ivory/60 transition-colors hover:text-mint"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-mint/10 pt-8 sm:flex-row">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} Jejau. Grown with care.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-ivory/40">
            <Sprout className="h-3.5 w-3.5 text-forest-bright" aria-hidden="true" />
            The future of farming starts with a single photo.
          </p>
        </div>
      </div>
    </footer>
  );
}
