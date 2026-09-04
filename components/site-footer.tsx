import Image from "next/image";

/** In-page anchors for this portal. */
const PROGRAMME_LINKS = [
  { href: "#pathways", label: "Two pathways" },
  { href: "#points", label: "How points work" },
  { href: "#integrity", label: "Integrity" },
  { href: "#leaderboard", label: "Leaderboard" },
];

const LINKEDIN_URL = "https://www.linkedin.com/company/shadowfoxinfo/";
const COMMUNITY_URL = "https://chat.whatsapp.com/CSSYJi4Q3C1GMiwvfRB19Y";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft"
      aria-hidden="true"
    >
      <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 3Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft"
      aria-hidden="true"
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-line-bright bg-black">
                <Image
                  src="/shadowfox-logo.png"
                  alt=""
                  width={44}
                  height={44}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="text-xl font-black tracking-tight">
                Shadow<span className="text-accent-soft">Fox</span>
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              Empowering students with industry-ready skills, verified
              credentials, and career-focused programs.
            </p>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-mute">
              Operated by ZAPPIER SHADOWFOX TECHNOLOGIES LLP.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lift border-2 border-line-bright px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-white"
              >
                LinkedIn
              </a>
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lift group inline-flex items-center gap-2 border-2 border-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-soft hover:text-white"
              >
                Join the community
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* This programme */}
          <div>
            <ColumnHeading>Programme</ColumnHeading>
            <ul className="mt-5 space-y-3">
              {PROGRAMME_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mute transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 space-y-3 text-sm text-mute">
              <li className="flex gap-2.5">
                <MailIcon />
                <a
                  href="mailto:support@shadowfox.in"
                  className="transition-colors hover:text-white"
                >
                  support@shadowfox.in
                </a>
              </li>
              <li className="flex gap-2.5">
                <PhoneIcon />
                <a
                  href="tel:+918095776765"
                  className="transition-colors hover:text-white"
                >
                  +91-8095776765
                </a>
              </li>
              <li className="flex gap-2.5">
                <PinIcon />
                <span>Chennai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t-2 border-line pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-mute">
              &copy; {new Date().getFullYear()} ShadowFox. All rights reserved.
            </p>
            <p className="eyebrow mt-2">Learn, Create, Lead.</p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-mute">
            Leaderboard figures are maintained by the ShadowFox programme team and
            refresh automatically. Points shown reflect approved activity only.
          </p>
        </div>
      </div>
    </footer>
  );
}
