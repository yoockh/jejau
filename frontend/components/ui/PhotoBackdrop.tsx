"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  photoSrc,
  photoCreditUrl,
  photographerUrl,
  type UnsplashPhoto,
} from "@/lib/unsplash";

type PhotoBackdropProps = {
  photo: UnsplashPhoto;
  /** Tailwind class for the gradient overlay — always dark-green for cohesion. */
  overlayClassName?: string;
  /** Add a gentle vertical parallax as the section scrolls. */
  parallax?: boolean;
  /** Eager-load (use for above-the-fold imagery). */
  priority?: boolean;
  /** Show the per-image photographer credit chip. */
  credit?: boolean;
  className?: string;
};

const DEFAULT_OVERLAY =
  "bg-[linear-gradient(180deg,rgba(11,23,18,0.55)_0%,rgba(14,58,43,0.6)_45%,rgba(11,23,18,0.82)_100%)]";

/**
 * Full-bleed Unsplash photo with a cohesive dark-green gradient overlay so
 * foreground text stays readable and the colour stays on-palette.
 */
export function PhotoBackdrop({
  photo,
  overlayClassName = DEFAULT_OVERLAY,
  parallax = true,
  priority = false,
  credit = true,
  className = "",
}: PhotoBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Image is over-tall (120%) so it can drift without revealing edges.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const animate = parallax && !reduce;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0 -inset-y-[10%]"
        style={animate ? { y } : undefined}
      >
        <Image
          src={photoSrc(photo)}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* dark-green gradient overlay keeps text legible + colour cohesive */}
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
      {/* faint living-network grid tying photos to the rest of the brand */}
      <div
        className="bio-grid absolute inset-0 opacity-40 mix-blend-soft-light"
        aria-hidden="true"
      />

      {credit && (
        <p className="absolute bottom-3 right-3 z-10 text-[10px] text-ivory/55">
          Photo:{" "}
          <a
            href={photographerUrl(photo.username)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-ivory hover:underline"
          >
            {photo.photographer}
          </a>{" "}
          /{" "}
          <a
            href={photoCreditUrl(photo)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-ivory hover:underline"
          >
            Unsplash
          </a>
        </p>
      )}
    </div>
  );
}
