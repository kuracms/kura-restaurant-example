import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Bistro - Paris bistro",
  description:
    "A small neighbourhood bistro in the 11th. Steak frites, confit de canard, escargots, a short wine list. Open lunch and dinner, closed Mondays.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header>
          <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-8 pb-3 text-center">
            <Link
              href="/"
              className="font-display italic text-3xl sm:text-[2.4rem] tracking-tight inline-block text-[var(--accent)]"
            >
              The Bistro
            </Link>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Bistro &middot; Paris 11<sup>e</sup> &middot; depuis 2006
            </p>
          </div>
          <nav className="border-y border-[var(--rule)]">
            <div className="mx-auto max-w-6xl px-6 sm:px-10 py-3 flex justify-center gap-10 text-[11px] uppercase tracking-[0.22em]">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
              <Link href="/menu" className="hover:text-[var(--accent)] transition-colors">
                Menu
              </Link>
              <Link href="/reserve" className="hover:text-[var(--accent)] transition-colors">
                Reserve
              </Link>
              <Link href="/visit" className="hover:text-[var(--accent)] transition-colors">
                Visit
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-[var(--rule)]">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-12 flex flex-col items-center gap-6 text-center">
            <ChairMark />
            <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
              <strong className="text-[var(--ink)] font-medium">The Bistro</strong>
              <br />
              114 rue Jean-Pierre Timbaud, 75011 Paris
              <br />
              Tue&ndash;Sat lunch &amp; dinner &middot; Sun lunch &middot; closed Monday
            </p>
            <div className="flex gap-6 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[var(--accent)] transition-colors">
                Terms
              </Link>
              <a
                href="https://kuracms.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Built on kura
              </a>
            </div>
            <p className="text-[10px] text-[var(--muted)]/80 max-w-md leading-relaxed">
              A demo site &mdash; not a real bistro. Built with{" "}
              <a href="https://nextjs.org" className="underline underline-offset-4">
                Next.js
              </a>{" "}
              against a{" "}
              <a href="https://kuracms.com" className="underline underline-offset-4">
                kura
              </a>{" "}
              backend.{" "}
              <a
                href="https://github.com/kuracms/kura-restaurant-example"
                className="underline underline-offset-4"
              >
                Source
              </a>
              .
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

function ChairMark() {
  return (
    <svg
      width="42"
      height="56"
      viewBox="0 0 42 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-[var(--accent)]"
      aria-hidden="true"
    >
      <title>Bistro chair</title>
      {/* back */}
      <path d="M11 4 L11 30 M31 4 L31 30" />
      <path d="M11 4 Q21 0 31 4" />
      <path d="M11 11 Q21 8 31 11" />
      <path d="M11 18 Q21 15 31 18" />
      <path d="M11 25 Q21 22 31 25" />
      {/* seat */}
      <path d="M7 30 L35 30 L33 36 L9 36 Z" />
      {/* legs */}
      <path d="M10 36 L8 54 M32 36 L34 54 M14 36 L13 54 M28 36 L29 54" />
    </svg>
  );
}
