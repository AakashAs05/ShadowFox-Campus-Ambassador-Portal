import { APPLY_FORM_URL } from "@/lib/config";
import { Reveal } from "./reveal";

/** Reasons to apply, shown as a hard-edged strip beneath the button. */
const PROOF = [
  { value: "2 min", label: "To apply" },
  { value: "0", label: "Cost to join" },
  { value: "100%", label: "Transparent points" },
];

export function ClosingCta() {
  return (
    <section id="apply" className="relative overflow-hidden border-b-2 border-line">
      <div
        className="breathe pointer-events-none absolute -right-32 bottom-[-14rem] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="float-slow pointer-events-none absolute left-[7%] top-[18%] hidden h-12 w-12 border-2 border-accent/60 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow">Applications are open</p>

          <h2 className="mt-6 max-w-4xl text-3xl font-black leading-[1.1] tracking-tight sm:text-6xl">
            Lead with Integrity.
            <br />
            Build Real Impact.
            <br />
            <span className="text-accent-soft">Let the System Reward You.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
            Every campus has one person who makes things happen. If you have read
            this far, it is probably you. Take the seat before someone else on
            your campus does.
          </p>

          <div className="mt-11 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={APPLY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lift group inline-flex w-full items-center justify-center gap-3 border-2 border-white bg-accent px-9 py-5 text-base font-bold uppercase tracking-wider text-white sm:w-auto"
            >
              Apply now
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <p className="text-sm text-mute">
              Opens the application form. Rolling selection, so early applicants
              get first pick of campus slots.
            </p>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-1 border-2 border-line-bright sm:grid-cols-3">
            {PROOF.map((item) => (
              <div
                key={item.label}
                className="border-b-2 border-line-bright px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r-2 sm:last:border-r-0"
              >
                <dt className="text-2xl font-black tabular sm:text-3xl">
                  {item.value}
                </dt>
                <dd className="eyebrow mt-1">{item.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 border-t-2 border-line pt-6">
            <p className="text-base font-bold sm:text-lg">
              ShadowFox{" "}
              <span className="font-normal text-mute">Learn, Create, Lead.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
