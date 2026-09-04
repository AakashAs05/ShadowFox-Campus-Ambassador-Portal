import { ClosingCta } from "@/components/closing-cta";
import { Hero } from "@/components/hero";
import { Integrity } from "@/components/integrity";
import { Leaderboard } from "@/components/leaderboard";
import { Marquee } from "@/components/marquee";
import { Pathways } from "@/components/pathways";
import { PointsExplainer } from "@/components/points-explainer";
import { ReferralFlow } from "@/components/referral-flow";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Pathways />
        <ReferralFlow />
        <PointsExplainer />
        <Integrity />
        <Leaderboard />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
