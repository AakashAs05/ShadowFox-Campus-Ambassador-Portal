/**
 * Single source of truth for where leaderboard data comes from.
 *
 * The admin workflow is: edit the Google Sheet -> the site picks it up on the
 * next page load. Nothing is redeployed and nothing is stored server-side.
 *
 * The URL can be overridden per-environment with NEXT_PUBLIC_SHEET_CSV_URL
 * (set it in Vercel -> Project -> Settings -> Environment Variables) so the
 * sheet can be swapped without touching code.
 */
export const SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL ??
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpvOEJInQH__bRASRNoeG-d_jME4c1s-jB3gqevjZwrE1sujOP3mc4_aQ-tId7ZBu4HAcfhadjP3Rm/pub?output=csv";

/** Bundled snapshot used only if the live sheet cannot be reached. */
export const FALLBACK_CSV_URL = "/data/fallback-leaderboard.csv";

/** localStorage key for the cached parse. Bump the suffix to invalidate. */
export const CACHE_KEY = "sfx-leaderboard-v2";

/** How long a cached copy is served before we refetch the sheet. */
export const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Where "Apply now" sends people. Kept here so every entry point on the page
 * (header, hero, closing CTA) always points at the same form.
 */
export const APPLY_FORM_URL = "https://forms.gle/cNR67XDdWhLrS4T57";

/**
 * The date the points list was last reviewed and republished.
 *
 * This is deliberately manual rather than derived from the sheet: the sheet's
 * own timestamps move whenever a cell is touched, whereas participants need
 * one authoritative "this month's figures are final" date. The programme team
 * edits this line each month once the list is finalised (by the 10th), and it
 * is the date shown at the top right of the leaderboard.
 */
export const LEADERBOARD_UPDATED = "7th September 2026";

/** Address participants write to for redemptions and queries. */
export const SUPPORT_EMAIL = "support@shadowfox.in";

/** Total points a participant must hold before they can request a redemption. */
export const REDEEM_THRESHOLD = 2000;

/**
 * The date the terms and conditions were last changed. Edit this line whenever
 * the wording on /terms is amended; it is the date shown beside that page's
 * title. It is deliberately separate from LEADERBOARD_UPDATED, because the
 * points list and the terms change on their own schedules.
 */
export const TERMS_UPDATED = "5th September 2026";
