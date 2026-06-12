"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-mint/10 bg-charcoal-deep/80 shadow-[0_8px_32px_rgba(11,23,18,0.4)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          aria-label="Jejau — home"
          className="rounded-lg transition-transform duration-300 hover:scale-[1.03]"
        >
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`nav-link text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-mint"
                    : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="ghost">
            Log in
          </Button>
          <Button href="/register" variant="primary">
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-ivory transition-colors hover:bg-ivory/10 md:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-charcoal-deep/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="bio-grid absolute inset-y-0 right-0 flex w-[min(22rem,100%)] flex-col bg-charcoal-deep p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-ivory transition-colors hover:bg-ivory/10"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-14 flex flex-col gap-2">
                {links.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === href ? "page" : undefined}
                      className={`block rounded-xl px-4 py-3 font-display text-2xl font-semibold transition-colors ${
                        pathname === href
                          ? "bg-forest/20 text-mint"
                          : "text-ivory hover:bg-ivory/5 hover:text-mint"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-auto flex flex-col gap-3"
              >
                <Button
                  href="/register"
                  variant="primary"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Get started
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  href="/login"
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
