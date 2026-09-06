import { InfoTip } from "./info-tip";
import { Reveal } from "./reveal";

const PATHWAYS = [
  {
    code: "SFCAMP",
    title: "Campus Ambassadors",
    body: "Individual student leaders representing ShadowFox on campus, driving awareness and inspiring peers to join meaningful learning experiences.",
    tip: "Referral IDs beginning with SFCAMP belong to individual Campus Ambassadors.",
    filled: true,
  },
  {
    code: "SFCLUB",
    title: "Club Referral System",
    body: "College clubs and student communities partnering with ShadowFox to enhance events, boost engagement, and reward active participation.",
    tip: "Referral IDs beginning with SFCLUB belong to partner clubs and student communities.",
    filled: false,
  },
];

export function Pathways() {
  return (
    <section id="pathways" className="border-b-2 border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow">01 · Two pathways</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            Built for student leaders and the communities they run.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PATHWAYS.map((pathway, index) => (
            <Reveal key={pathway.code} delay={index * 120}>
            <article
              className={`brut-card lift h-full p-7 sm:p-9 ${
                pathway.filled ? "border-accent" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="border-2 border-accent bg-accent/15 px-2 py-1 font-mono text-xs font-bold tracking-wider text-accent-soft">
                  {pathway.code}
                </span>
                <InfoTip label={`What does ${pathway.code} mean?`}>
                  {pathway.tip}
                </InfoTip>
              </div>

              <h3 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
                {pathway.title}
              </h3>
              <p className="mt-4 leading-relaxed text-mute">{pathway.body}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
