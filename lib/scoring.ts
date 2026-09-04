/**
 * Scoring rules, transcribed from the ShadowFox Referral Program brochure.
 *
 * Pending Points  = Total Registrations x 5
 * Quality Factor  = 1.0 when completion ratio >= 20%, otherwise 0.5
 * Approved Points = (Pending Points x Quality Factor) + (Completions x 25)
 *
 * These are used to render the working alongside each row so the table is
 * auditable. The sheet's own figures stay authoritative for display, because
 * they can carry manual adjustments (fair-use deductions, redemptions).
 */

export const POINTS_PER_REGISTRATION = 5;
export const POINTS_PER_COMPLETION = 25;
export const QUALITY_THRESHOLD = 0.2;
export const QUALITY_FACTOR_HIGH = 1;
export const QUALITY_FACTOR_LOW = 0.5;

export function completionRatio(registrations: number, completions: number): number {
  if (registrations <= 0) return 0;
  return completions / registrations;
}

export function qualityFactor(registrations: number, completions: number): number {
  return completionRatio(registrations, completions) >= QUALITY_THRESHOLD
    ? QUALITY_FACTOR_HIGH
    : QUALITY_FACTOR_LOW;
}

export function pendingPoints(registrations: number): number {
  return registrations * POINTS_PER_REGISTRATION;
}

export function approvedPoints(registrations: number, completions: number): number {
  const base = pendingPoints(registrations) * qualityFactor(registrations, completions);
  return Math.round(base + completions * POINTS_PER_COMPLETION);
}
