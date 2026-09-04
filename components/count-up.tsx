"use client";

import { useEffect, useRef } from "react";
import { whenInView } from "@/lib/in-view";

interface CountUpProps {
  value: number;
  durationMs?: number;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const format = (value: number) => value.toLocaleString("en-IN");

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The markup already carries the final value, so the figure stays correct
 * without JavaScript and under reduced motion, and the animation writes to the
 * node directly rather than re-rendering on every frame.
 */
export function CountUp({ value, durationMs = 1100, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.textContent = format(value);
      return;
    }

    // Start from zero. This runs while the podium is still below the fold.
    node.textContent = format(0);
    let frame = 0;

    const stop = whenInView(node, () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        node.textContent = format(Math.round(value * easeOut(progress)));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });

    return () => {
      stop();
      if (frame) cancelAnimationFrame(frame);
      // Leave the correct figure behind if we unmount mid-animation.
      node.textContent = format(value);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
