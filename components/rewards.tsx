import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { REDEEM_THRESHOLD, SUPPORT_EMAIL } from "@/lib/config";
import { SWAG_ITEMS, type SwagItem } from "@/lib/rewards";
import { CountUp } from "./count-up";
import { InfoTip } from "./info-tip";
import { Reveal } from "./reveal";

const STEPS: Array<{ ordinal: string; title: string; body: ReactNode }> = [
  {
    ordinal: "01",
    title: "Cross 2,000 points",
    body: "Keep referring until your Total Points reach 2,000. Below that, points simply keep accumulating, so nothing is lost and nothing expires.",
  },
  {
    ordinal: "02",
    title: "Mail the team",
    body: (
      <>
        Write to <span className="no-hyphens">support@shadowfox.in</span> from
        your registered email with your name, referral ID, college, the items
        you want, and your full postal address with pincode.
      </>
    ),
  },
  {
    ordinal: "03",
    title: "We verify and confirm",
    body: "Your balance is checked against the most recently published points list. We write back confirming the items, the points they cost, and the delivery address.",
  },
  {
    ordinal: "04",
    title: "Swag ships free",
    body: "Your order goes out through our courier partner at no cost to you. The points spent then appear in your Redeemed column at the next monthly update.",
  },
];

const RULES = [
  {
    title: "The 2,000 is a gate, not a fee",
    body: "Crossing 2,000 total points is what unlocks redemption. Each item then costs only the points listed against it, and the rest stay on your balance.",
  },
  {
    title: "The list updates monthly, by the 10th",
    body: "Figures are reviewed and republished every month by the 10th. The date of the list you are looking at sits at the top right of the leaderboard.",
  },
  {
    title: "Delivery is free where couriers reach",
    body: "Shipping is on us. If your pincode is not serviceable, we will either arrange another courier with the fee paid in advance, or convert the items into an Amazon gift card against your points, whichever you prefer.",
  },
];

/** Drawn stand-in for the one item that has no product shot yet. */
function PlaceholderArt() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      stroke="#0a0a0d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0 h-full w-full p-8 transition-transform duration-500 group-hover:scale-[1.06]"
      aria-hidden="true"
    >
      <rect x="18" y="14" width="84" height="56" />
      <path d="M30 30h44M30 40h44M30 50h28" />
      <circle cx="86" cy="56" r="10" stroke="#8b5cf6" />
      <path d="m81 64-3 12 8-4 8 4-3-12" stroke="#8b5cf6" />
    </svg>
  );
}

function SwagCard({ item }: { item: SwagItem }) {
  const isCustom = item.points === null;

  return (
    <article
      className={`lift group relative flex h-full flex-col border-2 bg-surface transition-colors ${
        isCustom ? "border-accent" : "border-line-bright hover:border-accent"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-line-bright bg-white">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <PlaceholderArt />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-base font-bold leading-snug">{item.name}</h4>
          <span
            className={`tabular shrink-0 border-2 px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              isCustom
                ? "border-accent bg-accent text-white"
                : "border-accent/50 bg-accent/10 text-accent-soft group-hover:border-accent group-hover:bg-accent group-hover:text-white"
            }`}
          >
            {isCustom ? "Custom" : `${item.points} pts`}
          </span>
        </div>

        {item.note ? (
          <p className="hyphens-auto text-justify text-xs leading-relaxed text-mute">
            {item.note}
          </p>
        ) : null}

        {isCustom ? (
          <div className="mt-auto flex justify-end pt-1">
            <InfoTip label="How Amazon gift card values are decided">
              For example, 3,000 points can be redeemed for an Amazon gift card
              worth ₹1,000. Values vary case to case. To know more details,
              kindly mail {SUPPORT_EMAIL}.
            </InfoTip>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function Rewards() {
  return (
    <section id="rewards" className="relative overflow-hidden border-b-2 border-line">
      {/* Ambient motion, matching the hero: one breathing glow and two drifting
          blocks, all disabled under prefers-reduced-motion. */}
      <div
        className="breathe pointer-events-none absolute -left-40 top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-accent blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="breathe pointer-events-none absolute -right-32 bottom-[-10rem] h-[26rem] w-[26rem] rounded-full bg-accent-deep blur-[140px]"
        style={{ animationDelay: "4s" }}
        aria-hidden="true"
      />
      <div
        className="float-slow pointer-events-none absolute right-[6%] top-[12%] hidden h-14 w-14 border-2 border-accent/50 lg:block"
        aria-hidden="true"
      />
      <div
        className="float-slow pointer-events-none absolute bottom-[5%] left-[2%] hidden h-9 w-9 bg-accent/40 lg:block"
        style={{ animationDelay: "3.5s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow">Rewards</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            Your points are worth something real.{" "}
            <span className="relative inline-block">
              <span className="text-accent-soft">Here is how you claim it.</span>
              <span
                className="bar-on-reveal absolute -bottom-1 left-0 h-1.5 w-full bg-accent"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="hyphens-auto mt-6 max-w-2xl text-justify leading-relaxed text-mute">
            Every reward below is paid for with points you have already earned.
            No lucky draws and no hidden conditions: one threshold, one email,
            one confirmation.
          </p>
        </Reveal>

        {/* Eligibility gate, the single fact everything else depends on. */}
        <Reveal delay={80}>
          <div className="lift mt-12 flex flex-col gap-6 border-2 border-accent bg-surface p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-8">
            <div className="shrink-0">
              <p className="eyebrow">Minimum to redeem</p>
              <p className="tabular mt-2 text-5xl font-black leading-none sm:text-6xl">
                <CountUp value={REDEEM_THRESHOLD} />
                <span className="ml-2 text-lg font-bold text-mute">points</span>
              </p>
            </div>
            <p className="hyphens-auto max-w-xl text-justify text-sm leading-relaxed text-mute sm:text-base">
              You need {REDEEM_THRESHOLD.toLocaleString("en-IN")} total points
              before your first redemption. That is an{" "}
              <span className="font-bold text-white">eligibility gate, not a fee</span>
              : once you cross it, each item costs only the points listed against
              it and the remainder stays on your balance.
            </p>
          </div>
        </Reveal>

        {/* Process */}
        <Reveal delay={120}>
          <p className="eyebrow mt-16">How redeeming works</p>
        </Reveal>
        <div className="mt-6 grid gap-px border-2 border-line-bright bg-line-bright sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.ordinal}
              delay={140 + index * 90}
              className="h-full"
            >
              <div className="step-tile flex h-full flex-col bg-surface p-6 transition-colors duration-300 hover:bg-surface-2">
                <span className="outline-text text-4xl font-black leading-none">
                  {step.ordinal}
                </span>
                <h3 className="mt-4 text-base font-bold">{step.title}</h3>
                <p className="hyphens-auto mt-2 text-justify text-sm leading-relaxed text-mute">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Swag%20redemption%20request`}
              className="lift group inline-flex items-center justify-center gap-3 border-2 border-white bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              Mail {SUPPORT_EMAIL}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <p className="text-sm text-mute">
              Write from the email address you registered with, so we can match
              the request to your referral ID.
            </p>
          </div>
        </Reveal>

        {/* Catalogue */}
        <Reveal delay={100}>
          <div className="mt-20 flex flex-wrap items-baseline justify-between gap-3">
            <p className="eyebrow">What you can redeem</p>
            <p className="text-xs text-mute">
              Product images are representative. Colours and design may vary.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SWAG_ITEMS.map((item, index) => (
            <Reveal key={item.name} delay={index * 70} className="h-full">
              <SwagCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* Rules */}
        <Reveal delay={100}>
          <p className="eyebrow mt-20">Good to know</p>
        </Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {RULES.map((rule, index) => (
            <Reveal key={rule.title} delay={index * 90} className="h-full">
              <div className="lift h-full border-l-2 border-accent bg-surface p-5 transition-colors hover:bg-surface-2">
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  {rule.title}
                </h3>
                <p className="hyphens-auto mt-2 text-justify text-sm leading-relaxed text-mute">
                  {rule.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="hyphens-auto mt-10 max-w-3xl text-justify text-sm text-mute">
            The full rules covering delivery, serviceability, gift card
            conversion and fair use are set out in the{" "}
            <Link
              href="/terms"
              className="font-bold text-accent-soft underline underline-offset-4 hover:text-white"
            >
              terms and conditions
            </Link>
            . Please read them before you place a request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
