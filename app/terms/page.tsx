import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { REDEEM_THRESHOLD, SUPPORT_EMAIL, TERMS_UPDATED } from "@/lib/config";
import { SWAG_ITEMS } from "@/lib/rewards";

export const metadata: Metadata = {
  title: "Terms & Conditions | ShadowFox Referral Program",
  description:
    "The rules of the ShadowFox Campus Ambassador and Club Referral programme: how points are earned and updated, redemption eligibility, delivery, gift card conversion and fair use.",
};

const SECTIONS = [
  { id: "participation", label: "Who can take part" },
  { id: "points", label: "How points are earned" },
  { id: "updates", label: "When the list is updated" },
  { id: "eligibility", label: "Redemption eligibility" },
  { id: "how-to-redeem", label: "How to redeem" },
  { id: "catalogue", label: "The catalogue" },
  { id: "delivery", label: "Delivery" },
  { id: "serviceability", label: "If your pincode is not serviceable" },
  { id: "gift-cards", label: "Amazon gift cards" },
  { id: "fair-use", label: "Fair use and integrity" },
  { id: "data", label: "What we show publicly" },
  { id: "changes", label: "Changes to the programme" },
  { id: "contact", label: "Contact" },
];

function Clause({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t-2 border-line pt-8">
      <p className="eyebrow">Clause {String(index).padStart(2, "0")}</p>
      <h2 className="mt-3 text-xl font-black tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="hyphens-auto mt-4 space-y-4 text-justify text-sm leading-relaxed text-mute sm:text-base">
        {children}
      </div>
    </section>
  );
}

function Mail() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="no-hyphens font-bold text-accent-soft underline underline-offset-4 hover:text-white"
    >
      {SUPPORT_EMAIL}
    </a>
  );
}

export default function TermsPage() {
  const threshold = REDEEM_THRESHOLD.toLocaleString("en-IN");

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Link
            href="/"
            className="text-sm text-mute transition-colors hover:text-white"
          >
            &larr; Back to the programme
          </Link>

          <p className="eyebrow mt-10">Legal</p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Terms &amp;{" "}
              <span className="text-accent-soft">Conditions</span>
            </h1>
            <div className="shrink-0 border-2 border-line-bright px-4 py-3 sm:text-right">
              <p className="eyebrow">Last updated</p>
              <p className="mt-1 text-sm font-bold">{TERMS_UPDATED}</p>
            </div>
          </div>

          <p className="hyphens-auto mt-8 text-justify text-base leading-relaxed text-mute sm:text-lg">
            These terms govern participation in the ShadowFox Campus Ambassador
            and Club Referral Programme, operated by ZAPPIER SHADOWFOX
            TECHNOLOGIES LLP. They are written in plain English on purpose. If
            any part of them is unclear, please mail <Mail /> before you act on
            it. We would rather answer a question than have you assume.
          </p>

          {/* Index */}
          <nav
            aria-label="Sections"
            className="mt-12 border-2 border-line-bright bg-surface p-6"
          >
            <p className="eyebrow">On this page</p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {SECTIONS.map((section, index) => (
                <li key={section.id} className="text-sm">
                  <a
                    href={`#${section.id}`}
                    className="text-mute transition-colors hover:text-white"
                  >
                    <span className="tabular mr-2 text-accent-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 space-y-12">
            <Clause id="participation" index={1} title="Who can take part">
              <p>
                The programme is open to students and to college clubs,
                societies and student communities. Each participant is issued a
                single referral ID by the ShadowFox team: an ambassador ID
                beginning with SFCAMP, or a club ID beginning with SFCLUB. One
                person or club may hold only one active referral ID.
              </p>
              <p>
                Taking part is free. We never ask a participant to pay to join,
                to rank, or to receive a reward.
              </p>
            </Clause>

            <Clause id="points" index={2} title="How points are earned">
              <p>
                Points come from Virtual Internship registrations and
                completions attributed to your referral ID. Registrations earn
                pending points, which convert to approved points once
                completions are verified and the quality factor is applied.
                Redeemed points are then subtracted to give your total. The
                exact arithmetic is shown, in full, in the{" "}
                <Link
                  href="/#points"
                  className="font-bold text-accent-soft underline underline-offset-4 hover:text-white"
                >
                  How points work
                </Link>{" "}
                section of the programme page.
              </p>
              <p>
                Points are awarded only for genuine registrations by real
                students who intended to join the programme. Points are not
                currency: they hold no cash value, cannot be exchanged for cash,
                and cannot be transferred, sold or pooled between participants.
              </p>
            </Clause>

            <Clause id="updates" index={3} title="When the list is updated">
              <p>
                The points list is reviewed and republished{" "}
                <span className="font-bold text-white">
                  every month, by the 10th
                </span>
                . The date of the list currently on the site is shown at the top
                right of the leaderboard, so you can always tell which set of
                figures you are looking at.
              </p>
              <p>
                Between updates the published figures stay as they are. Activity
                recorded after a month&rsquo;s cut-off appears in the following
                month&rsquo;s update, not immediately. If you believe your
                figures are wrong, mail <Mail /> with your referral ID and we
                will check them against our records.
              </p>
            </Clause>

            <Clause id="eligibility" index={4} title="Redemption eligibility">
              <p>
                You may request a redemption once your total points reach{" "}
                <span className="font-bold text-white">{threshold}</span>. Below
                that threshold, points continue to accumulate, so nothing is
                lost and nothing expires while the programme is running.
              </p>
              <p>
                The {threshold} is an eligibility gate, not a fee. Crossing it
                unlocks redemption; each item then costs only the points listed
                against it, and the remaining points stay on your balance for
                future requests. Only approved, unredeemed points count towards
                the threshold.
              </p>
            </Clause>

            <Clause id="how-to-redeem" index={5} title="How to redeem">
              <p>
                Mail <Mail /> from the email address you registered with, and
                include:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>your full name, referral ID and college;</li>
                <li>the item or items you wish to redeem;</li>
                <li>
                  your full postal address including pincode, and a contact
                  number the courier can reach you on.
                </li>
              </ul>
              <p>
                We verify your balance against the most recently published
                points list and write back confirming the items, the points they
                cost and the delivery address. A request is only accepted once
                we have confirmed it in writing. Points are deducted on
                despatch, and the deduction appears in your Redeemed column at
                the next monthly update.
              </p>
              <p>
                Please keep one redemption request open at a time, so that
                balances and despatches do not get crossed.
              </p>
            </Clause>

            <Clause id="catalogue" index={6} title="The catalogue">
              <p>The current items and their point costs are:</p>
              <ul className="ml-5 list-disc space-y-2">
                {SWAG_ITEMS.map((item) => (
                  <li key={item.name}>
                    <span className="font-bold text-white">{item.name}</span>
                    {": "}
                    {/* A custom-priced item's note only restates the pricing,
                        so the descriptor stands on its own there. */}
                    {item.points === null
                      ? "value is decided by the team, case to case."
                      : `${item.points} points.${item.note ? ` ${item.note}` : ""}`}
                  </li>
                ))}
              </ul>
              <p>
                Certificates are issued physically and posted to you along with
                your other items. We do not issue a digital or downloadable
                certificate in place of the printed one. Co-branding a
                certificate with your club or college is possible on request,
                subject to our approval of the artwork.
              </p>
              <p>
                Product images on this site are representative. Colour, finish
                and design may vary from the photographs, and an item may
                occasionally be out of stock. In that case we will tell you and
                offer an alternative, or hold the request until stock returns.
              </p>
            </Clause>

            <Clause id="delivery" index={7} title="Delivery">
              <p>
                Delivery within India is free. We despatch through third-party
                courier partners, including Professional Couriers, to
                serviceable pincodes.
              </p>
              <p>
                Delivery timelines are indicative and depend on the courier. We
                do not control their schedules and cannot guarantee a delivery
                date. Please check the parcel on arrival and report
                non-delivery or a missing item to <Mail /> within seven days of
                the delivery date shown by the courier, so that we can take it
                up with them.
              </p>
              <p className="border-l-2 border-accent pl-4 text-white">
                Once an item has been handed over for shipment, it travels
                through a third-party network that is outside our control.
                ShadowFox cannot be held liable for damage caused in transit,
                and no refund or replacement will be provided for it. As a
                gesture of good will we will still take the matter up with the
                courier on your behalf and assist by doing the needful wherever
                we reasonably can.
              </p>
            </Clause>

            <Clause
              id="serviceability"
              index={8}
              title="If your pincode is not serviceable"
            >
              <p>
                Courier networks do not reach every pincode in the country. If
                yours is not serviceable by our partner, we will tell you and
                offer you a choice:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  we arrange delivery through a different courier service, with
                  the delivery fee paid by you in advance; or
                </li>
                <li>
                  we convert the request into an Amazon gift card voucher
                  against your points, so that the reward still reaches you.
                </li>
              </ul>
              <p>
                The choice is yours. If neither option suits you, the request is
                cancelled and your points are restored in full.
              </p>
            </Clause>

            <Clause id="gift-cards" index={9} title="Amazon gift cards">
              <p>
                Amazon gift card vouchers are not priced at a fixed rate. The
                value is decided by the programme team case to case, taking into
                account your points balance and the reason for the conversion.
              </p>
              <p>
                As an illustration, a participant holding 3,000 points may be
                offered an Amazon gift card worth ₹1,000. That is an example
                only and not a guaranteed rate of exchange. For details of what
                your balance could convert to, mail <Mail />.
              </p>
            </Clause>

            <Clause id="fair-use" index={10} title="Fair use and integrity">
              <p>
                The leaderboard is only worth something if the numbers behind it
                are honest. Registrations that are fake, duplicated, made with
                throwaway details, or created by a participant on their own
                behalf will have their points reversed when found.
              </p>
              <p>
                Repeated or deliberate abuse leads to removal from the
                leaderboard, forfeiture of the balance and disqualification from
                the programme. We write to the participant by email before
                acting wherever we reasonably can, and decisions of the
                programme team are final.
              </p>
            </Clause>

            <Clause id="data" index={11} title="What we show publicly">
              <p>
                The public leaderboard shows your name (or club name), college,
                referral ID and points. If you would prefer your college not to
                be displayed, mail <Mail /> and we will remove it from the
                published list.
              </p>
              <p>
                Postal addresses and contact numbers are collected only to
                deliver a redemption. They are shared with the courier partner
                for that delivery and are not used for any other purpose.
              </p>
            </Clause>

            <Clause id="changes" index={12} title="Changes to the programme">
              <p>
                Items, point costs and the redemption threshold may change as
                the programme develops. Changes are published on this page and
                take effect from the date they appear, shown as the last updated
                date beside the title. A redemption we have already confirmed in
                writing is honoured at the terms confirmed, even if the
                catalogue changes afterwards.
              </p>
              <p>
                Should the programme be paused or closed, we will announce it on
                the programme page and allow a reasonable window for eligible
                participants to redeem the points they already hold.
              </p>
            </Clause>

            <Clause id="contact" index={13} title="Contact">
              <p>
                ShadowFox Referral Programme, operated by ZAPPIER SHADOWFOX
                TECHNOLOGIES LLP, Chennai, India.
              </p>
              <p>
                For redemptions, corrections or anything in these terms, write
                to <Mail />. It is the only address that handles redemption
                requests, and we answer every one of them.
              </p>
            </Clause>
          </div>

          <div className="mt-16 border-t-2 border-line pt-8">
            <Link
              href="/#rewards"
              className="lift inline-flex items-center justify-center border-2 border-line-bright px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:border-white"
            >
              Back to rewards
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
