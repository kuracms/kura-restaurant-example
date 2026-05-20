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
  title: "Kura Izakaya - Shibuya, Tokyo",
  description:
    "A small neighbourhood izakaya in Shibuya. Charcoal-grilled skewers, small plates, sake, natural wines. Open evenings only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-5 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl tracking-tight">
              Kura Izakaya
            </Link>
            <nav className="flex items-center gap-7 text-sm text-[var(--muted)]">
              <Link href="/menu" className="hover:text-[var(--ink)] transition-colors">
                Menu
              </Link>
              <Link href="/visit" className="hover:text-[var(--ink)] transition-colors">
                Visit
              </Link>
              <a
                href="https://kuracms.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]/80 hover:text-[var(--ink)]"
              >
                Built on kura
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--line)] mt-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-10 text-sm text-[var(--muted)] flex flex-col gap-2 sm:flex-row sm:justify-between">
            <p>
              <strong className="text-[var(--ink)]">Kura Izakaya</strong> — 2-chome, Shibuya, Tokyo.
              Open evenings, closed Sundays.
            </p>
            <p>
              This is a demo site. Built with{" "}
              <a href="https://nextjs.org" className="underline underline-offset-4">
                Next.js
              </a>{" "}
              against a{" "}
              <a href="https://kuracms.com" className="underline underline-offset-4">
                kura
              </a>{" "}
              content backend.{" "}
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
