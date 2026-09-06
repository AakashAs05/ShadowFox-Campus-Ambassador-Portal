import Image from "next/image";
import Link from "next/link";

import { APPLY_FORM_URL } from "@/lib/config";

const NAV_LINKS = [
  { href: "/#pathways", label: "Programme" },
  { href: "/#points", label: "Points" },
  { href: "/#integrity", label: "Integrity" },
  { href: "/#rewards", label: "Rewards" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-line-bright bg-black">
            <Image
              src="/shadowfox-logo.png"
              alt="ShadowFox"
              width={32}
              height={32}
              priority
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="text-sm font-bold tracking-tight sm:text-base">
            Shadow<span className="text-accent-soft">Fox</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-mute transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#leaderboard"
            className="border-2 border-line-bright px-3 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-white sm:px-4 sm:text-sm"
          >
            Leaderboard
          </Link>
          <a
            href={APPLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white bg-accent px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:shadow-brut-white sm:px-4 sm:text-sm"
          >
            Apply now
          </a>
        </div>
      </div>
    </header>
  );
}
