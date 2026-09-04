import { Reveal } from "./reveal";

const QUALITY_REASONS = [
  {
    title: "Rewards Genuine Engagement",
    body: "Quality metrics ensure ambassadors who inspire real learning outcomes receive the recognition they deserve.",
  },
  {
    title: "Prevents Misuse",
    body: "Completion ratios filter out low-quality referrals, protecting the system from gaming or artificial inflation.",
  },
  {
    title: "Protects Programme Credibility",
    body: "Maintaining high standards preserves ShadowFox's reputation and value for all participants.",
  },
  {
    title: "Ensures Fair Leaderboards",
    body: "Merit-based rankings reflect true impact, creating healthy competition amongst ambassadors.",
  },
];

const FAIR_USE = [
  {
    title: "No Fake or Duplicate Referrals",
    body: "All registrations must be from real, unique students. Multiple accounts or fraudulent sign-ups are prohibited and monitored.",
  },
  {
    title: "Only Genuine Participation Rewarded",
    body: "Points are awarded based on authentic engagement and verified completions, not just clicks or registrations.",
  },
  {
    title: "Misuse Leads to Adjustment or Disqualification",
    body: "Violations result in points deduction, removal from leaderboards, or permanent programme exclusion depending on severity.",
  },
];

export function Integrity() {
  return (
    <section id="integrity" className="border-b-2 border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
        <p className="eyebrow">04 — Why quality matters</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
          A quality-first approach protects everyone.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-mute">
          Our approach ensures fairness, protects programme integrity, and rewards
          ambassadors who drive genuine engagement.
        </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {QUALITY_REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90} className="h-full">
            <article className="lift h-full border-2 border-line-bright border-l-4 border-l-accent bg-ink p-6">
              <h3 className="text-lg font-bold leading-snug">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{reason.body}</p>
            </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
          <p className="eyebrow">05 — Fair use policy</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
            Rewards go to those who drive genuine impact.
          </h2>
          </Reveal>

          <ol className="mt-10 grid gap-4 lg:grid-cols-3">
            {FAIR_USE.map((rule, index) => (
              <Reveal as="li" key={rule.title} delay={index * 110} className="h-full">
              <div className="brut-card lift relative h-full p-6 pt-9">
                <span className="absolute -top-4 left-6 grid h-8 w-8 place-items-center border-2 border-ink bg-accent font-mono text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold leading-snug">{rule.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{rule.body}</p>
              </div>
              </Reveal>
            ))}
          </ol>

          <p className="mt-6 border-2 border-accent bg-accent/10 p-5 text-sm leading-relaxed text-mute">
            <span className="font-bold text-white">Note:</span> Referral quality is
            monitored continuously. Suspicious patterns trigger reviews to maintain
            fairness for all ambassadors and clubs.
          </p>
        </div>
      </div>
    </section>
  );
}
