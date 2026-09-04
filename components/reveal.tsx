"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { whenInView } from "@/lib/in-view";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Fades content up the first time it scrolls into view. The class is toggled
 * straight on the node — a one-way DOM sync that costs no re-render.
 */
export function Reveal({ children, delay = 0, className = "", as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return whenInView(node, () => node.classList.add("is-visible"));
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
