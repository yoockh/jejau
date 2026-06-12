import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "amber";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-forest-bright";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory shadow-[0_0_24px_rgba(47,166,120,0.35)] hover:bg-forest-bright hover:shadow-[0_0_36px_rgba(47,166,120,0.55)] hover:-translate-y-0.5",
  ghost:
    "text-ivory/90 hover:text-ivory hover:bg-ivory/10 border border-transparent",
  outline:
    "border border-mint/30 text-mint hover:border-mint/70 hover:bg-mint/10 hover:-translate-y-0.5",
  amber:
    "bg-amber text-charcoal-deep shadow-[0_0_24px_rgba(232,178,58,0.3)] hover:bg-amber-soft hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<ComponentProps<"button">, "className" | "onClick">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
