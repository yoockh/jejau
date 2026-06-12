/**
 * A soft vertical gradient band placed between two sections so the colour
 * transitions instead of jumping. `from`/`to` are CSS colours that should
 * match the previous section's bottom and the next section's top.
 */
export function SectionSeam({
  from,
  to,
  className = "h-20 sm:h-28",
}: {
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
    />
  );
}

/** Palette colours, for convenient seam endpoints. */
export const seamColor = {
  ivory: "#f5f7f4",
  ivoryDim: "#e7ece6",
  charcoal: "#13241d",
  charcoalDeep: "#0b1712",
  forestDark: "#0e3a2b",
} as const;
