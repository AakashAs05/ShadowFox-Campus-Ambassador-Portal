import { PointsCalculator } from "./points-calculator";
import { Reveal } from "./reveal";

export function PointsExplainer() {
  return (
    <section id="points" className="border-b-2 border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
        <p className="eyebrow">03 · Understanding your points</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
          Every point on this page is reproducible.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-mute">
          The same two formulas govern both Campus Ambassadors and Clubs. Only
          approved points count towards ranking and rewards.
        </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Pending points — filled card, mirroring the programme brochure. */}
          <Reveal className="h-full">
          <article className="lift h-full border-2 border-accent bg-accent p-7 text-white sm:p-9">
            <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
              Pending Points
            </h3>
            <p className="mt-4 leading-relaxed text-white/85">
              <span className="font-bold text-white">What they represent:</span>{" "}
              Initial outreach effort and registration activity.
            </p>
            <div className="mt-7 border-2 border-white/40 bg-black/25 p-4 font-mono text-xs font-bold leading-relaxed sm:text-sm">
              <div>Pending Points =</div>
              <div className="pl-4">Total Registrations × 5</div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/85">
              <p>
                <span className="font-bold text-white">Worked example:</span> 120
                registrations × 5 = 600 pending points.
              </p>
              <p>
                Pending points record outreach the moment it happens. They convert
                into approved points once completions are verified, and it is the
                approved figure that decides your rank.
              </p>
            </div>
          </article>

          </Reveal>

          {/* Approved points — dark card. */}
          <Reveal delay={120} className="h-full">
          <article className="brut-card lift h-full p-7 sm:p-9">
            <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
              Approved Points
            </h3>
            <p className="mt-4 leading-relaxed text-mute">
              <span className="font-bold text-white">What they represent:</span>{" "}
              Real learning impact validated through programme completions.
            </p>
            <div className="mt-7 border-2 border-line-bright bg-ink p-4 font-mono text-xs font-bold leading-relaxed sm:text-sm">
              <div>Approved Points =</div>
              <div className="pl-4">(Pending Points × Quality Factor)</div>
              <div className="pl-4">+ (Completions × 25)</div>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 border border-accent bg-accent/15 px-1.5 py-0.5 font-mono text-xs font-bold text-accent-soft">
                  1.0×
                </span>
                <span className="text-mute">
                  Quality Factor is <span className="text-white">1.0</span> when the
                  completion ratio is 20% or higher.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 border border-line-bright bg-surface-2 px-1.5 py-0.5 font-mono text-xs font-bold text-mute">
                  0.5×
                </span>
                <span className="text-mute">
                  Quality Factor drops to <span className="text-white">0.5</span>{" "}
                  when the completion ratio falls below 20%.
                </span>
              </li>
            </ul>

            <p className="mt-6 border-t-2 border-line pt-5 text-sm italic text-mute">
              Only approved points count towards ranking and rewards.
            </p>
          </article>
          </Reveal>
        </div>

        <Reveal className="mt-6 block">
          <PointsCalculator />
        </Reveal>
      </div>
    </section>
  );
}
