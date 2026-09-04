"use client";

import { useMemo, useState } from "react";
import {
  POINTS_PER_COMPLETION,
  POINTS_PER_REGISTRATION,
  QUALITY_THRESHOLD,
  approvedPoints,
  completionRatio,
  pendingPoints,
  qualityFactor,
} from "@/lib/scoring";

const MAX_INPUT = 100000;

function clamp(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(Math.floor(value), MAX_INPUT);
}

export function PointsCalculator() {
  const [registrations, setRegistrations] = useState(100);
  const [completions, setCompletions] = useState(25);

  // Completions can never exceed the registrations they came from.
  const safeCompletions = Math.min(completions, registrations);

  const result = useMemo(() => {
    const ratio = completionRatio(registrations, safeCompletions);
    return {
      ratio,
      pending: pendingPoints(registrations),
      factor: qualityFactor(registrations, safeCompletions),
      approved: approvedPoints(registrations, safeCompletions),
      meetsThreshold: ratio >= QUALITY_THRESHOLD,
    };
  }, [registrations, safeCompletions]);

  return (
    <div className="brut-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-xl font-black tracking-tight sm:text-2xl">
          Points calculator
        </h3>
        <span className="border border-line-bright px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-mute">
          Try it
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mute">
        Enter a scenario to see exactly how the formula resolves. This is the same
        calculation applied to every row of the leaderboard.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Total registrations
          </span>
          <input
            type="number"
            min={0}
            max={MAX_INPUT}
            inputMode="numeric"
            value={registrations}
            onChange={(event) => setRegistrations(clamp(event.target.valueAsNumber))}
            className="tabular mt-2 w-full border-2 border-line-bright bg-ink px-4 py-3 text-lg font-bold text-white focus:border-accent focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Completions
          </span>
          <input
            type="number"
            min={0}
            max={registrations}
            inputMode="numeric"
            value={safeCompletions}
            onChange={(event) => setCompletions(clamp(event.target.valueAsNumber))}
            className="tabular mt-2 w-full border-2 border-line-bright bg-ink px-4 py-3 text-lg font-bold text-white focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      <dl className="mt-7 space-y-2.5 border-t-2 border-line pt-6 font-mono text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-mute">
            Pending = {registrations.toLocaleString()} x {POINTS_PER_REGISTRATION}
          </dt>
          <dd className="tabular font-bold">{result.pending.toLocaleString()}</dd>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-mute">
            Completion ratio = {safeCompletions.toLocaleString()} /{" "}
            {registrations.toLocaleString()}
          </dt>
          <dd className="tabular font-bold">
            {(result.ratio * 100).toFixed(1)}%
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-mute">
            Quality factor ({result.meetsThreshold ? "≥" : "<"} 20%)
          </dt>
          <dd
            className={`tabular font-bold ${
              result.meetsThreshold ? "text-accent-soft" : "text-white"
            }`}
          >
            {result.factor.toFixed(1)}x
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t-2 border-line pt-4">
          <dt className="text-white">
            Approved = ({result.pending.toLocaleString()} x{" "}
            {result.factor.toFixed(1)}) + ({safeCompletions.toLocaleString()} x{" "}
            {POINTS_PER_COMPLETION})
          </dt>
          <dd className="tabular text-2xl font-black text-accent-soft">
            {result.approved.toLocaleString()}
          </dd>
        </div>
      </dl>
    </div>
  );
}
