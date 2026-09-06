# ShadowFox Campus Ambassador Portal

A public portal for the ShadowFox Referral Program. It explains how the programme
works, publishes live standings for both referral tracks, and documents how
points convert into rewards.

Visitors choose a leaderboard, **SFCAMP** (Campus Ambassadors) or **SFCLUB**
(Clubs), and see every scoring column that produces a rank, so any figure on
screen can be checked against the published rules.

## Overview

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) with React 19 |
| **Styling** | Tailwind CSS v4 |
| **Language** | TypeScript |

Leaderboard maintenance is a spreadsheet task rather than a deployment task. The
programme team edits the sheet and the site reflects it on the next load.

## Project structure

```
app/
  page.tsx            Landing page composition
  terms/page.tsx      Terms and conditions
  layout.tsx          Root layout, metadata, fonts
components/           Section components (hero, leaderboard, rewards, ...)
lib/
  config.ts           Sheet URL, support address, published dates
  leaderboard.ts      Fetch, parse, cache and rank the sheet data
  scoring.ts          Points arithmetic from the programme brochure
  rewards.ts          Swag catalogue and point costs
  view.ts             Table columns, sorting and search
public/
  data/               Bundled fallback snapshot
  Merch-CA/           Reward product images
```

## Data model

Each row in the sheet is one participant. The `referral_id` prefix decides which
board the row appears on: an ID beginning with `SFCLUB` goes to the Clubs board
and everything else goes to Campus Ambassadors. Moving an entry between boards
means changing its referral ID in the sheet, with no code change required.

Expected columns:

```
referral_id, name_or_club, college, VI_registrations_T, VI_completions,
VI_pending_points, VI_approved_points, Redeemed_Points, Total_Points_Final,
rank, last_updated
```

## Scoring

Implemented in [`lib/scoring.ts`](lib/scoring.ts):

```
Pending Points  = Total Registrations x 5
Quality Factor  = 1.0 if completion ratio >= 20%, otherwise 0.5
Approved Points = (Pending Points x Quality Factor) + (Completions x 25)
Total Points    = Approved Points - Redeemed Points
```

The table displays the sheet's own stored figures rather than recomputing them,
because those columns can carry manual adjustments such as fair use deductions or
redemptions. The `Ratio` and `Quality` columns are derived on the fly so each
row's arithmetic stays checkable on screen.

Ranking uses standard competition ranking (`1, 2, 2, 4`) on `Total_Points_Final`,
calculated within each board so the Clubs table never inherits gaps left by
Campus Ambassador rows.

The board paginates at 25 rows. Search covers the entire board rather than the
current page.

## Rewards

The redemption rules and swag catalogue live in [`lib/rewards.ts`](lib/rewards.ts)
and are rendered by the rewards section and the terms page from that single
source.

Participants become eligible to redeem at 2,000 total points, then request items
by email. Amazon gift card values are set case by case rather than at a fixed
rate.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SHEET_CSV_URL` | Published CSV URL of the leaderboard sheet |

The variable is optional. When unset, the site falls back to the URL defined in
[`lib/config.ts`](lib/config.ts). The URL must be the CSV export of a published
sheet (`.../pub?output=csv`), not the `pubhtml` page.

Two dates in [`lib/config.ts`](lib/config.ts) are maintained by hand:

- `LEADERBOARD_UPDATED` is shown at the top right of the leaderboard and is
  updated each month once the points list is finalised.
- `TERMS_UPDATED` is shown beside the terms and conditions heading and is updated
  whenever those terms change.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Data resilience

The leaderboard resolves its data in order: a fresh browser cache, the live
sheet, a stale browser cache, then the snapshot committed at
`public/data/fallback-leaderboard.csv`.

If the sheet is unpublished or its URL is rotated, the page still renders from
the bundled snapshot and displays an "Offline snapshot" badge rather than
failing. Cached copies are held for five minutes before a refetch, and a manual
Refresh control is available beside the leaderboard.
