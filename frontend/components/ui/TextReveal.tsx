"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Word-by-word cascade: each word rises out of its own overflow mask in
 * sequence, like shoots breaking soil. Use on large display headings.
 */
export function WordCascade({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: delay + i * 0.07, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/**
 * Masked wipe: content sweeps into view right-to-left behind a clip mask,
 * trailed by a thin bioluminescent edge. For full lines / blocks.
 */
export function WipeReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        whileInView={{ clipPath: "inset(0 0 0 0%)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.div>
      {/* the travelling light edge */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-mint to-transparent"
        style={{ boxShadow: "0 0 18px rgba(143,227,188,0.8)" }}
        initial={{ left: "100%", opacity: 1 }}
        whileInView={{ left: "0%", opacity: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay, ease }}
      />
    </div>
  );
}
