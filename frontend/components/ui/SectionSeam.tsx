/**
 * Seam between two sections: a clean, straight, precise vertical gradient
 * running EXACTLY from the previous section's colour to the next one's.
 * No curves, no translucent layers, no blur — those read as grey haze.
 */
export function SectionSeam({
  from,
  to,
  className = "h-16 sm:h-24",
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
