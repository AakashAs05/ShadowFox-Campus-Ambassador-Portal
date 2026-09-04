"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

interface InfoTipProps {
  /** Accessible name for the trigger, e.g. "What does SFCAMP mean?". */
  label: string;
  children: ReactNode;
}

/**
 * Small "i" affordance. Opens on hover for pointer users and on click/keyboard
 * for everyone else, so it works on touch screens too.
 */
export function InfoTip({ label, children }: InfoTipProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="grid h-4 w-4 place-items-center border border-line-bright bg-surface-2 text-[0.625rem] font-bold leading-none text-mute transition-colors hover:border-accent hover:text-accent-soft"
      >
        i
      </button>

      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 border-2 border-accent bg-surface-2 p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-white shadow-brut-sm"
        >
          {children}
        </span>
      ) : null}
    </span>
  );
}
