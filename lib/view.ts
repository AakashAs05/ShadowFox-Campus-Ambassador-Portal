import { completionRatio, qualityFactor } from "./scoring";
import type { Entry } from "./types";

/**
 * An entry plus the two derived figures that make the scoring readable
 * in-line: the completion ratio and the quality factor it produces.
 */
export interface Row extends Entry {
  ratio: number;
  factor: number;
}

export function toRow(entry: Entry): Row {
  return {
    ...entry,
    ratio: completionRatio(entry.regTotal, entry.completions),
    factor: qualityFactor(entry.regTotal, entry.completions),
  };
}

export type NumericKey =
  | "rank"
  | "regTotal"
  | "completions"
  | "ratio"
  | "factor"
  | "pendingPoints"
  | "approvedPoints"
  | "redeemedPoints"
  | "totalPoints";

export type SortKey = NumericKey | "name";

export interface Column {
  key: NumericKey;
  label: string;
  tip?: string;
  /** Rendered with more visual weight — the figures people look for first. */
  strong?: boolean;
  format: (row: Row) => string;
}

const int = (value: number) => Math.round(value).toLocaleString("en-IN");

export const COLUMNS: Column[] = [
  {
    key: "regTotal",
    label: "Registrations",
    tip: "Virtual Internship registrations attributed to this referral code. This is the figure the pending points formula uses.",
    strong: true,
    format: (row) => int(row.regTotal),
  },
  {
    key: "completions",
    label: "Completions",
    tip: "Referred students who finished the Virtual Internship programme.",
    strong: true,
    format: (row) => int(row.completions),
  },
  {
    key: "ratio",
    label: "Ratio",
    tip: "Completions divided by registrations. 20% or above earns the 1.0x quality factor.",
    format: (row) => `${(row.ratio * 100).toFixed(1)}%`,
  },
  {
    key: "factor",
    label: "Quality",
    tip: "Quality factor applied to pending points: 1.0x at a ratio of 20% or more, otherwise 0.5x.",
    format: (row) => `${row.factor.toFixed(1)}x`,
  },
  {
    key: "pendingPoints",
    label: "Pending",
    tip: "Registrations multiplied by 5.",
    format: (row) => int(row.pendingPoints),
  },
  {
    key: "approvedPoints",
    label: "Approved",
    tip: "(Pending points multiplied by the quality factor) plus (completions multiplied by 25).",
    strong: true,
    format: (row) => int(row.approvedPoints),
  },
  {
    key: "redeemedPoints",
    label: "Redeemed",
    tip: "Points already exchanged for rewards.",
    format: (row) => int(row.redeemedPoints),
  },
  {
    key: "totalPoints",
    label: "Total",
    tip: "Approved points minus redeemed points. Ranking is based on this figure.",
    strong: true,
    format: (row) => int(row.totalPoints),
  },
];

export function sortRows(rows: Row[], key: SortKey, direction: "asc" | "desc"): Row[] {
  const factor = direction === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    if (key === "name") {
      return a.name.localeCompare(b.name) * factor;
    }
    const difference = a[key] - b[key];
    // Ties fall back to rank so the ordering is stable and meaningful.
    return (difference || a.rank - b.rank) * factor;
  });
}

export function matchesQuery(row: Row, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    row.name.toLowerCase().includes(needle) ||
    row.college.toLowerCase().includes(needle) ||
    row.referralId.toLowerCase().includes(needle)
  );
}
