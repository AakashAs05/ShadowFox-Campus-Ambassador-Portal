import { Reveal } from "./reveal";

const STEPS = [
  { label: "Share Program", detail: "Ambassadors promote ShadowFox on campus." },
  { label: "Student Registers", detail: "Sign-ups are attributed to a referral code." },
  { label: "Student Completes", detail: "The learner finishes their programme." },
  { label: "Points Approved", detail: "Quality checks convert effort into approved points." },
  { label: "Rewards Redeemed", detail: "Approved points unlock merchandise and perks." },
];

export function ReferralFlow() {
  return (
    <section className="border-b-2 border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
        <p className="eyebrow">02 · Referral flow</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
          From outreach to reward, every step is tracked.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-mute">
          A streamlined journey that ensures every contribution is recorded and
          valued fairly.
        </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.label} delay={index * 90} className="h-full">
            <div className="brut-card lift flex h-full flex-col p-5">
              <span className="font-mono text-3xl font-black text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{step.detail}</p>
            </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
