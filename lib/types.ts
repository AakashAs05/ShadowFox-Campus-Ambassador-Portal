export type Segment = "ambassador" | "club";

/** One parsed leaderboard row. Email is deliberately never parsed or stored. */
export interface Entry {
  referralId: string;
  name: string;
  college: string;

  regTotal: number;
  completions: number;

  pendingPoints: number;
  approvedPoints: number;
  redeemedPoints: number;
  totalPoints: number;

  /** Rank recorded in the sheet, across every referral ID. */
  sheetRank: number;
  /** Rank computed within this entry's own leaderboard (ties share a rank). */
  rank: number;

  lastUpdated: string;
  segment: Segment;
}

export type DataSource = "live" | "cache" | "fallback";

export interface LeaderboardData {
  entries: Entry[];
  /** Most recent last_updated value seen across all rows. */
  lastUpdated: string | null;
  source: DataSource;
  fetchedAt: number;
}
