import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Width of the inner container */
  width?: "default" | "wide" | "full";
};

const widths = {
  default: "mx-auto max-w-6xl px-5 sm:px-8",
  wide: "mx-auto max-w-7xl px-5 sm:px-8",
  full: "w-full",
};

export function Section({
  id,
  children,
  className = "",
  width = "default",
}: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className={widths[width]}>{children}</div>
    </section>
  );
}

export function SectionLabel({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.25em] ${
        tone === "dark" ? "text-forest" : "text-mint"
      }`}
    >
      <span
        className={`h-px w-8 ${tone === "dark" ? "bg-forest/60" : "bg-mint/60"}`}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
