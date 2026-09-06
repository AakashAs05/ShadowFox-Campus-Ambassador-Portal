import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://shadow-fox-campus-ambassador-portal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ShadowFox Referral Program | Campus Ambassador Portal",
  description:
    "Track referrals, points and rankings for the ShadowFox Campus Ambassador and Club Referral programmes. Transparent. Fair. Impact-driven.",
  openGraph: {
    title: "ShadowFox Referral Program",
    description:
      "Live leaderboards for ShadowFox Campus Ambassadors and partner clubs.",
    type: "website",
    images: [{ url: "/shadowfox-logo.png", width: 1254, height: 1254 }],
  },
  twitter: {
    card: "summary",
    title: "ShadowFox Referral Program",
    description:
      "Live leaderboards for ShadowFox Campus Ambassadors and partner clubs.",
    images: ["/shadowfox-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Scroll-reveal starts at opacity 0; without JS nothing would toggle it. */}
        <noscript>
          <style>{".reveal{opacity:1!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-ink text-white">{children}</body>
    </html>
  );
}
