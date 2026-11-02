"use client";

import { m } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use small values only (≤ 0.2) for sibling blocks. */
  delay?: number;
  as?: "div" | "li" | "article";
};

/**
 * Fades a block in and lifts it 16px the first time it enters the viewport.
 * Use on whole blocks, never on individual paragraphs (DESIGN.md §7).
 * Without JavaScript the `reveal` class is overridden by a <noscript> style.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className ? `reveal ${className}` : "reveal"}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
