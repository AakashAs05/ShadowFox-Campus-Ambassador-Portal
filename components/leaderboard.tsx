"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CACHE_KEY, LEADERBOARD_UPDATED } from "@/lib/config";
import { loadLeaderboard } from "@/lib/leaderboard";
import type { LeaderboardData, Segment } from "@/lib/types";
import {
  COLUMNS,
  matchesQuery,
  sortRows,
  toRow,
  type Row,
  type SortKey,
} from "@/lib/view";
import { CountUp } from "./count-up";
import { InfoTip } from "./info-tip";
import { Reveal } from "./reveal";

type Status = "loading" | "ready" | "error";

/** Rows per page. */
const PAGE_SIZE = 25;

/** Metrics kept on the face of a mobile card; the rest sit behind a toggle. */
const MOBILE_PRIMARY_KEYS = ["regTotal", "completions", "ratio", "approvedPoints"];

const SEGMENTS: Array<{ id: Segment; code: string; label: string; tip: string }> = [
  {
    id: "ambassador",
    code: "SFCAMP",
    label: "Campus Ambassadors",
    tip: "SFCAMP refers to Campus Ambassadors: individual student leaders representing ShadowFox on their campus.",
  },
  {
    id: "club",
    code: "SFCLUB",
    label: "Clubs",
    tip: "SFCLUB refers to Clubs: college clubs, societies and student communities using the referral program.",
  },
];

const TIERS = [
  { label: "First Place", ordinal: "01" },
  { label: "Second Place", ordinal: "02" },
  { label: "Third Place", ordinal: "03" },
];

export function Leaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [segment, setSegment] = useState<Segment>("ambassador");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [reloadToken, setReloadToken] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    loadLeaderboard(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setData(result);
        setStatus("ready");
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [reloadToken]);

  const refresh = useCallback(() => {
    try {
      window.localStorage.removeItem(CACHE_KEY);
    } catch {
      // Storage may be unavailable; the refetch below still runs.
    }
    setStatus("loading");
    setReloadToken((token) => token + 1);
  }, []);

  const segmentRows = useMemo(() => {
    if (!data) return [];
    return data.entries.filter((entry) => entry.segment === segment).map(toRow);
  }, [data, segment]);

  const podium = useMemo(
    () => sortRows(segmentRows, "rank", "asc").slice(0, 3),
    [segmentRows],
  );

  /** Longest bar on the board, used to scale every row's impact bar. */
  const maxPoints = useMemo(
    () => segmentRows.reduce((max, row) => Math.max(max, row.totalPoints), 0),
    [segmentRows],
  );

  const visibleRows = useMemo(() => {
    const filtered = segmentRows.filter((row) => matchesQuery(row, query));
    return sortRows(filtered, sortKey, sortDirection);
  }, [segmentRows, query, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(visibleRows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedRows = visibleRows.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const goToPage = useCallback((next: number) => {
    setPage(next);
    document
      .getElementById("board")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSort = useCallback(
    (key: SortKey) => {
      setPage(1);
      if (sortKey === key) {
        setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
        return;
      }
      setSortKey(key);
      // Ranks read best ascending; every other measure reads best highest-first.
      setSortDirection(key === "rank" ? "asc" : "desc");
    },
    [sortKey],
  );

  const activeSegment = SEGMENTS.find((item) => item.id === segment)!;

  return (
    <section id="leaderboard" className="relative border-b-2 border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow">Leaderboard</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            Track your impact.{" "}
            <span className="text-accent-soft">Compete. Rise.</span>
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-mute">
            Choose a leaderboard to see live standings. Rankings are based on total
            points, and every figure behind them is shown in full.
          </p>
        </Reveal>

        {/* Segment toggle */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Choose a leaderboard"
              className="inline-flex w-full border-2 border-line-bright bg-ink p-1 sm:w-auto"
            >
              {SEGMENTS.map((item) => {
                const selected = item.id === segment;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => {
                      setSegment(item.id);
                      setPage(1);
                    }}
                    className={`flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 sm:flex-none sm:text-sm ${
                      selected
                        ? "bg-accent text-white"
                        : "text-mute hover:bg-surface-2 hover:text-white"
                    }`}
                  >
                    <span className="font-mono">{item.code}</span>
                    <span className="hidden sm:inline">· {item.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="flex items-center gap-1.5 text-xs text-mute">
              Showing {activeSegment.label}
              <InfoTip label={`What does ${activeSegment.code} mean?`}>
                {activeSegment.tip}
              </InfoTip>
            </span>
          </div>
        </Reveal>

        {status === "error" ? (
          <ErrorState onRetry={refresh} />
        ) : status === "loading" ? (
          <LoadingState />
        ) : (
          <>
            {podium.length > 0 ? <Podium rows={podium} /> : null}

            {/* Search + sync status */}
            <div
              id="board"
              className="mt-12 flex scroll-mt-24 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <label className="w-full sm:max-w-xs">
                <span className="sr-only">Search the leaderboard</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name, college or ID…"
                  className="w-full border-2 border-line-bright bg-ink px-4 py-2.5 text-sm text-white transition-colors placeholder:text-mute focus:border-accent focus:outline-none"
                />
              </label>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mute">
                <span className="flex items-center gap-1.5">
                  Points list updated {LEADERBOARD_UPDATED}
                  <InfoTip label="How often is the points list updated?">
                    The points list is reviewed and republished every month by
                    the 10th. Activity recorded after a month&rsquo;s cut-off
                    appears in the following update.
                  </InfoTip>
                </span>
                {data?.source === "fallback" ? (
                  <span className="border border-line-bright px-2 py-0.5 text-[0.625rem] uppercase tracking-wider">
                    Offline snapshot
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={refresh}
                  className="border border-line-bright px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent-soft"
                >
                  Refresh
                </button>
              </div>
            </div>

            {segmentRows.length === 0 ? (
              <EmptySegment segment={segment} />
            ) : visibleRows.length === 0 ? (
              <p className="brut-card mt-4 p-10 text-center text-sm text-mute">
                No one matches “{query}” on this leaderboard.
              </p>
            ) : (
              <>
                <DesktopTable
                  rows={pagedRows}
                  maxPoints={maxPoints}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <MobileList rows={pagedRows} maxPoints={maxPoints} />

                <Pagination
                  page={safePage}
                  totalPages={totalPages}
                  totalRows={visibleRows.length}
                  onChange={goToPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/** Tiered prize blocks: second, first and third, first raised above the rest. */
function Podium({ rows }: { rows: Row[] }) {
  // DOM order stays 1-2-3 so a single column reads naturally; on wide screens
  // the grid reorders to put the winner in the middle, raised above the rest.
  const heights = ["md:min-h-[16rem]", "md:min-h-[13rem]", "md:min-h-[11.5rem]"];
  const columnOrder = ["md:order-2", "md:order-1", "md:order-3"];

  return (
    <div className="mt-10 grid items-end gap-4 md:grid-cols-3">
      {rows.map((row, position) => {
        const tier = TIERS[position];
        const isWinner = position === 0;

        return (
          <Reveal
            key={row.referralId}
            delay={position * 110}
            className={columnOrder[position]}
          >
            <article
              className={`lift relative flex h-full flex-col justify-between overflow-hidden border-2 p-6 ${
                heights[position]
              } ${
                isWinner
                  ? "border-accent bg-accent/12"
                  : "border-line-bright bg-ink"
              }`}
            >
              {/* Ghost numeral watermark */}
              <span
                aria-hidden="true"
                className="outline-text pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] font-black leading-none"
              >
                {tier.ordinal}
              </span>

              <div className="relative">
                <span
                  className={`inline-block border-2 px-2 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.15em] ${
                    isWinner
                      ? "border-accent bg-accent text-white"
                      : "border-line-bright text-mute"
                  }`}
                >
                  {tier.label}
                </span>
              </div>

              <div className="relative mt-8">
                <h3
                  className={`truncate font-black tracking-tight ${
                    isWinner ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {row.name}
                </h3>
                <p className="mt-1 truncate text-xs text-mute">
                  <span className="font-mono">{row.referralId}</span>
                  {row.college ? ` · ${row.college}` : ""}
                </p>

                <p className="tabular mt-5 flex items-baseline gap-1.5">
                  <CountUp
                    value={row.totalPoints}
                    className={`font-black ${
                      isWinner ? "text-4xl text-accent-soft sm:text-5xl" : "text-3xl"
                    }`}
                  />
                  <span className="font-mono text-[0.625rem] uppercase tracking-wider text-mute">
                    points
                  </span>
                </p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Relative-standing bar, scaled against the board leader. */
function ImpactBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 1.5 : 0) : 0;
  return (
    <span
      aria-hidden="true"
      className="mt-1.5 block h-[3px] w-full max-w-[11rem] bg-line"
    >
      <span
        className="bar-grow block h-full bg-accent"
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: "asc" | "desc";
}) {
  return (
    <span
      aria-hidden="true"
      className={`ml-1 inline-block text-[0.625rem] transition-colors ${
        active ? "text-accent-soft" : "text-line-bright"
      }`}
    >
      {active ? (direction === "asc" ? "▲" : "▼") : "▲"}
    </span>
  );
}

function RankBadge({ rank, size = "sm" }: { rank: number; size?: "sm" | "md" }) {
  return (
    <span
      className={`tabular grid shrink-0 place-items-center border-2 font-mono font-black transition-colors ${
        size === "md" ? "h-8 w-10 text-xs" : "h-7 w-9 text-xs"
      } ${
        rank <= 3
          ? "border-accent bg-accent text-white"
          : "border-line-bright text-mute"
      }`}
    >
      {rank}
    </span>
  );
}

function DesktopTable({
  rows,
  maxPoints,
  sortKey,
  sortDirection,
  onSort,
}: {
  rows: Row[];
  maxPoints: number;
  sortKey: SortKey;
  sortDirection: "asc" | "desc";
  onSort: (key: SortKey) => void;
}) {
  return (
    <div className="mt-4 hidden md:block">
      <div className="overflow-x-auto border-2 border-line-bright">
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-line-bright bg-surface-2">
              <th
                scope="col"
                aria-sort={
                  sortKey === "rank"
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className="sticky left-0 z-20 border-r-2 border-line-bright bg-surface-2 p-0 text-left"
              >
                <button
                  type="button"
                  onClick={() => onSort("rank")}
                  className="w-full px-4 py-3 text-left font-mono text-[0.625rem] font-bold uppercase tracking-wider text-mute transition-colors hover:text-white"
                >
                  Rank &amp; Name
                  <SortIndicator active={sortKey === "rank"} direction={sortDirection} />
                </button>
              </th>

              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    sortKey === column.key
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="p-0 text-right"
                >
                  <div className="flex items-center justify-end gap-1 pr-2">
                    <button
                      type="button"
                      onClick={() => onSort(column.key)}
                      className="whitespace-nowrap py-3 pl-3 font-mono text-[0.625rem] font-bold uppercase tracking-wider text-mute transition-colors hover:text-white"
                    >
                      {column.label}
                      <SortIndicator
                        active={sortKey === column.key}
                        direction={sortDirection}
                      />
                    </button>
                    {column.tip ? (
                      <InfoTip label={`About ${column.label}`}>{column.tip}</InfoTip>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.referralId}
                className="group border-b border-line transition-colors last:border-b-0 odd:bg-ink even:bg-surface hover:!bg-accent/10"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-r-2 border-line-bright px-4 py-3 text-left font-normal transition-colors group-odd:bg-ink group-even:bg-surface group-hover:!bg-accent/10"
                >
                  <div className="flex items-center gap-3">
                    <RankBadge rank={row.rank} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold">{row.name}</span>
                      <span className="block truncate text-xs text-mute">
                        <span className="font-mono">{row.referralId}</span>
                        {row.college ? ` · ${row.college}` : ""}
                      </span>
                      <ImpactBar value={row.totalPoints} max={maxPoints} />
                    </span>
                  </div>
                </th>

                {COLUMNS.map((column) => (
                  <td
                    key={column.key}
                    className={`tabular whitespace-nowrap px-3 py-3 text-right ${
                      column.strong ? "font-bold text-white" : "text-mute"
                    }`}
                  >
                    {column.format(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileList({ rows, maxPoints }: { rows: Row[]; maxPoints: number }) {
  const primaryColumns = COLUMNS.filter((column) =>
    MOBILE_PRIMARY_KEYS.includes(column.key),
  );
  const secondaryColumns = COLUMNS.filter(
    (column) => !MOBILE_PRIMARY_KEYS.includes(column.key),
  );

  return (
    <ul className="mt-4 space-y-3 md:hidden">
      {rows.map((row) => (
        <li key={row.referralId} className="brut-card p-4">
          <div className="flex items-start gap-3">
            <RankBadge rank={row.rank} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{row.name}</p>
              <p className="truncate text-xs text-mute">
                <span className="font-mono">{row.referralId}</span>
                {row.college ? ` · ${row.college}` : ""}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="tabular text-lg font-black leading-none">
                {row.totalPoints.toLocaleString("en-IN")}
              </p>
              <p className="font-mono text-[0.625rem] uppercase tracking-wider text-mute">
                points
              </p>
            </div>
          </div>

          <ImpactBar value={row.totalPoints} max={maxPoints} />

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-3 text-xs">
            {primaryColumns.map((column) => (
              <div key={column.key} className="flex justify-between gap-2">
                <dt className="truncate text-mute">{column.label}</dt>
                <dd
                  className={`tabular shrink-0 ${
                    column.strong ? "font-bold text-white" : "text-mute"
                  }`}
                >
                  {column.format(row)}
                </dd>
              </div>
            ))}
          </dl>

          <details className="group mt-3 border-t border-line pt-3">
            <summary className="cursor-pointer list-none font-mono text-[0.625rem] uppercase tracking-wider text-mute transition-colors hover:text-accent-soft">
              <span className="group-open:hidden">+ Full breakdown</span>
              <span className="hidden group-open:inline">− Hide breakdown</span>
            </summary>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {secondaryColumns.map((column) => (
                <div key={column.key} className="flex justify-between gap-2">
                  <dt className="truncate text-mute">{column.label}</dt>
                  <dd
                    className={`tabular shrink-0 ${
                      column.strong ? "font-bold text-white" : "text-mute"
                    }`}
                  >
                    {column.format(row)}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </li>
      ))}
    </ul>
  );
}

function Pagination({
  page,
  totalPages,
  totalRows,
  onChange,
}: {
  page: number;
  totalPages: number;
  totalRows: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalRows);

  // A short window of page numbers around the current page.
  const pageWindow: number[] = [];
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  for (let index = start; index <= end; index += 1) pageWindow.push(index);

  const buttonBase =
    "border-2 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all";

  return (
    <nav
      aria-label="Leaderboard pages"
      className="mt-6 flex flex-col items-center gap-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className={`${buttonBase} ${
            page === 1
              ? "cursor-not-allowed border-line text-line-bright"
              : "border-line-bright text-white hover:border-accent hover:text-accent-soft"
          }`}
        >
          Prev
        </button>

        {start > 1 ? (
          <span className="px-1 font-mono text-xs text-mute">…</span>
        ) : null}

        {pageWindow.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onChange(number)}
            aria-current={number === page ? "page" : undefined}
            className={`${buttonBase} ${
              number === page
                ? "border-accent bg-accent text-white"
                : "border-line-bright text-mute hover:border-white hover:text-white"
            }`}
          >
            {number}
          </button>
        ))}

        {end < totalPages ? (
          <span className="px-1 font-mono text-xs text-mute">…</span>
        ) : null}

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className={`${buttonBase} ${
            page === totalPages
              ? "cursor-not-allowed border-line text-line-bright"
              : "border-line-bright text-white hover:border-accent hover:text-accent-soft"
          }`}
        >
          Next
        </button>
      </div>

      <p className="tabular text-xs text-mute">
        Showing {from}–{to} of {totalRows.toLocaleString("en-IN")}
      </p>
    </nav>
  );
}

function LoadingState() {
  return (
    <div className="mt-10 space-y-3" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading leaderboard…</span>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse border-2 border-line bg-surface-2"
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="brut-card mt-10 p-8 text-center sm:p-12">
      <h3 className="text-xl font-black">Leaderboard unavailable</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute">
        We could not reach the standings just now. This usually clears on its own,
        so try again in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="lift mt-6 border-2 border-white bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink"
      >
        Try again
      </button>
    </div>
  );
}

function EmptySegment({ segment }: { segment: Segment }) {
  return (
    <div className="brut-card mt-4 p-10 text-center sm:p-14">
      <h3 className="text-xl font-black">
        {segment === "club" ? "No clubs on the board yet" : "No ambassadors yet"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute">
        {segment === "club"
          ? "Club standings appear here as soon as partner clubs start earning points through the referral program."
          : "Ambassador standings appear here once referral activity is recorded."}
      </p>
    </div>
  );
}
