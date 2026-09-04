import { APPLY_FORM_URL } from "@/lib/config";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden border-b-2 border-line"
    >
      {/* Drifting graph-paper ground */}
      <div className="grid-bg grid-bg-drift absolute inset-0" aria-hidden="true" />

      {/* Slow-breathing accent glows, one per side */}
      <div
        className="breathe pointer-events-none absolute -left-48 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-accent blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="breathe pointer-events-none absolute -right-40 bottom-[-14rem] h-[30rem] w-[30rem] rounded-full bg-accent-deep blur-[150px]"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      {/* Floating hard-edged blocks — the neo-brutalist counterweight to the glow */}
      <div
        className="float-slow pointer-events-none absolute left-[6%] top-[22%] hidden h-16 w-16 border-2 border-accent/60 lg:block"
        aria-hidden="true"
      />
      <div
        className="float-slow pointer-events-none absolute right-[9%] top-[30%] hidden h-10 w-10 bg-accent/70 lg:block"
        style={{ animationDelay: "2.5s" }}
        aria-hidden="true"
      />
      <div
        className="float-slow pointer-events-none absolute bottom-[22%] left-[14%] hidden h-8 w-8 border-2 border-white/25 lg:block"
        style={{ animationDelay: "5s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8">
        <p className="enter eyebrow" style={{ "--enter-delay": "0ms" } as React.CSSProperties}>
          Campus Ambassadors &amp; Club Referral System
        </p>

        <h1
          className="enter mt-6 text-[clamp(2.75rem,9vw,7rem)] font-black leading-[0.92] tracking-tight"
          style={{ "--enter-delay": "90ms" } as React.CSSProperties}
        >
          ShadowFox
          <br />
          <span className="relative inline-block">
            Referral Program
            <span
              className="absolute -bottom-1 left-0 h-1.5 w-full origin-left bg-accent bar-grow"
              style={{ animationDelay: "700ms" }}
              aria-hidden="true"
            />
          </span>
        </h1>

        <p
          className="enter mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xl font-bold sm:text-3xl"
          style={{ "--enter-delay": "220ms" } as React.CSSProperties}
        >
          <span>Transparent.</span>
          <span className="text-accent-soft">Fair.</span>
          <span>Impact-Driven.</span>
        </p>

        <p
          className="enter mx-auto mt-7 max-w-2xl text-base leading-relaxed text-mute sm:text-lg"
          style={{ "--enter-delay": "310ms" } as React.CSSProperties}
        >
          Two pathways designed to empower student leaders and campus communities
          to grow together whilst earning rewards for genuine impact.
        </p>

        <div
          className="enter mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ "--enter-delay": "400ms" } as React.CSSProperties}
        >
          <a
            href={APPLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lift group flex w-full items-center justify-center gap-3 border-2 border-white bg-accent px-7 py-4 text-sm font-bold uppercase tracking-wider text-white sm:w-auto"
          >
            Apply now
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
          <a
            href="#leaderboard"
            className="lift w-full border-2 border-line-bright px-7 py-4 text-sm font-bold uppercase tracking-wider text-white hover:border-white sm:w-auto"
          >
            View the leaderboard
          </a>
        </div>

        <p
          className="enter mt-6 text-sm text-mute"
          style={{ "--enter-delay": "480ms" } as React.CSSProperties}
        >
          Free to join &middot; Open to every campus &middot;{" "}
          <a href="#points" className="text-accent-soft underline underline-offset-4 hover:text-white">
            See how points work
          </a>
        </p>
      </div>
    </section>
  );
}
