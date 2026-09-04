import Papa from "papaparse";
import {
  CACHE_KEY,
  CACHE_TTL_MS,
  FALLBACK_CSV_URL,
  SHEET_CSV_URL,
} from "./config";
import type { DataSource, Entry, LeaderboardData, Segment } from "./types";

/** Referral IDs beginning with this prefix belong to the club leaderboard. */
const CLUB_PREFIX = "SFCLUB";

type CsvRow = Record<string, string | undefined>;

function toNumber(raw: string | undefined): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[,\s]/g, "");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function toText(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  // The sheet uses "NA" as a placeholder for a college that was never supplied.
  return value.toUpperCase() === "NA" ? "" : value;
}

export function segmentOf(referralId: string): Segment {
  return referralId.trim().toUpperCase().startsWith(CLUB_PREFIX)
    ? "club"
    : "ambassador";
}

function mapRow(row: CsvRow): Entry | null {
  const referralId = (row["referral_id"] ?? "").trim();
  const name = (row["name_or_club"] ?? "").trim();

  // Skip blank padding rows that Google Sheets often exports below the data.
  if (!referralId && !name) return null;

  return {
    referralId,
    name: name || referralId,
    college: toText(row["college"]),
    regTotal: toNumber(row["VI_registrations_T"]),
    completions: toNumber(row["VI_completions"]),
    pendingPoints: toNumber(row["VI_pending_points"]),
    approvedPoints: toNumber(row["VI_approved_points"]),
    redeemedPoints: toNumber(row["Redeemed_Points"]),
    totalPoints: toNumber(row["Total_Points_Final"]),
    sheetRank: toNumber(row["rank"]),
    rank: 0,
    lastUpdated: (row["last_updated"] ?? "").trim(),
    segment: segmentOf(referralId),
  };
}

/**
 * Standard competition ranking ("1224") on total points, applied within each
 * leaderboard so a club board never shows gaps left by ambassador rows.
 */
function assignRanks(entries: Entry[]): void {
  (["ambassador", "club"] as Segment[]).forEach((segment) => {
    const group = entries
      .filter((entry) => entry.segment === segment)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    let previousPoints: number | null = null;
    let previousRank = 0;

    group.forEach((entry, index) => {
      if (previousPoints !== null && entry.totalPoints === previousPoints) {
        entry.rank = previousRank;
        return;
      }
      entry.rank = index + 1;
      previousRank = entry.rank;
      previousPoints = entry.totalPoints;
    });
  });
}

export function parseCsv(text: string): Omit<LeaderboardData, "source" | "fetchedAt"> {
  const parsed = Papa.parse<CsvRow>(text, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.trim(),
  });

  const entries = parsed.data
    .map(mapRow)
    .filter((entry): entry is Entry => entry !== null);

  assignRanks(entries);

  const lastUpdated =
    entries
      .map((entry) => entry.lastUpdated)
      .filter(Boolean)
      .sort()
      .pop() ?? null;

  return { entries, lastUpdated };
}

interface CachePayload {
  csv: string;
  fetchedAt: number;
}

function readCache(): CachePayload | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const payload = JSON.parse(raw) as CachePayload;
    if (typeof payload?.csv !== "string" || typeof payload?.fetchedAt !== "number") {
      return null;
    }
    return payload;
  } catch {
    // Private browsing / disabled storage: caching is a nicety, never required.
    return null;
  }
}

function writeCache(csv: string): void {
  try {
    const payload: CachePayload = { csv, fetchedAt: Date.now() };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota or storage-blocked errors.
  }
}

async function fetchCsv(url: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const text = await response.text();
  if (!text.includes("referral_id")) {
    throw new Error("Response did not look like the leaderboard sheet");
  }
  return text;
}

/**
 * Load order: fresh cache -> live sheet -> stale cache -> bundled snapshot.
 * The page therefore still renders something useful if the sheet is
 * unpublished, renamed, or briefly unreachable.
 */
export async function loadLeaderboard(signal?: AbortSignal): Promise<LeaderboardData> {
  const cached = readCache();
  const cacheIsFresh = cached !== null && Date.now() - cached.fetchedAt < CACHE_TTL_MS;

  if (cached && cacheIsFresh) {
    return { ...parseCsv(cached.csv), source: "cache", fetchedAt: cached.fetchedAt };
  }

  const attempts: Array<{ url: string; source: DataSource }> = [
    { url: SHEET_CSV_URL, source: "live" },
    { url: FALLBACK_CSV_URL, source: "fallback" },
  ];

  let liveError: unknown = null;

  for (const attempt of attempts) {
    try {
      const csv = await fetchCsv(attempt.url, signal);
      if (attempt.source === "live") writeCache(csv);
      return { ...parseCsv(csv), source: attempt.source, fetchedAt: Date.now() };
    } catch (error) {
      if (signal?.aborted) throw error;
      if (attempt.source === "live") {
        liveError = error;
        // Prefer a stale cache over the bundled snapshot: it is more recent.
        if (cached) {
          return {
            ...parseCsv(cached.csv),
            source: "cache",
            fetchedAt: cached.fetchedAt,
          };
        }
      }
    }
  }

  throw liveError instanceof Error
    ? liveError
    : new Error("Leaderboard data could not be loaded");
}
