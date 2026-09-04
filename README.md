# ShadowFox Campus Ambassador Portal

A public, static portal for the ShadowFox Referral Program. Visitors read how the
programme works, then pick a leaderboard - **SFCAMP** (Campus Ambassadors) or
**SFCLUB** (Clubs) - and see live standings with every scoring column exposed.

There is no backend, no database and no admin login. The leaderboard reads a
published Google Sheet directly from the visitor's browser.

---

### Which leaderboard a row lands on

A `referral_id` starting with `SFCLUB` goes to the **Clubs** board. Everything
else goes to **Campus Ambassadors**. To move an entry between boards, change its
referral ID in the sheet, nothing else is needed.

---

## Configuration

The sheet URL is read from `NEXT_PUBLIC_SHEET_CSV_URL`, falling back to the value
in [`lib/config.ts`](lib/config.ts). To change the sheet without touching code,
set that variable in **Vercel → Project → Settings → Environment Variables** and
redeploy. See [`.env.example`](.env.example).

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

---

## Deploying

### Vercel (free tier)

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repo, and deploy. The Next.js
   preset needs no configuration.
3. Optionally set `NEXT_PUBLIC_SHEET_CSV_URL` under Environment Variables.

Every push to `main` redeploys automatically. Note that routine leaderboard
updates need none of this — those are just sheet edits.

## How the numbers work

Transcribed from the programme brochure and implemented in
[`lib/scoring.ts`](lib/scoring.ts):

```
Pending Points  = Total Registrations × 5
Quality Factor  = 1.0 if completion ratio ≥ 20%, else 0.5
Approved Points = (Pending Points × Quality Factor) + (Completions × 25)
```

The sheet's own figures are what the table displays, they can carry manual
adjustments such as fair-use deductions or redemptions, and overwriting them with
recomputed values would silently erase those. The `Ratio` and `Quality` columns
are derived on the fly so every row's arithmetic is checkable on screen.

Ranking uses standard competition ranking (`1, 2, 2, 4`) on `Total_Points_Final`,
computed **within each board** so the club table never inherits gaps left by
ambassador rows.

The sheet also carries its own `rank` column, which the site ignores. As of the
current sheet that column is ordered by `VI_registrations_T` rather than by
`Total_Points_Final`, which would place a 93-point entry above a 1,075-point one
and contradicts the brochure rule that only approved points decide ranking. The
site therefore derives rank from `Total_Points_Final` itself. Worth correcting
the sheet formula so both agree.

The board shows 25 rows per page with numbered pagination; searching looks across
the whole board, not just the current page.

## Resilience

The leaderboard tries, in order: a fresh browser cache, the live sheet, a stale
browser cache, then the snapshot committed at
`public/data/fallback-leaderboard.csv`. If the sheet is ever unpublished or its
URL rotated, the page still renders and shows an "Offline snapshot" badge rather
than breaking.
