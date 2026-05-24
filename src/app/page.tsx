import Link from "next/link";
import Image from "next/image";
import { fetchItems, fetchSections, fetchPage, formatEur } from "@/lib/kura";

export const revalidate = 60;

export default async function HomePage() {
  const [sections, items, home] = await Promise.all([
    fetchSections(),
    fetchItems(),
    fetchPage("home"),
  ]);
  const published = items.filter((i) => i.published);

  const previews = sections
    .map((s) => published.find((i) => itemSectionMatches(i.section, s.slug)))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 6);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const title = home?.title ?? "The Bistro";
  const subtitle = home?.subtitle ?? "A small Paris bistro in the 11th";
  const bodyParagraphs = (home?.body ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="relative subtle-grain">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 pt-16 sm:pt-24 pb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-8">
            {today} &middot; le plat du jour
          </p>
          <p className="font-display italic text-[var(--accent)] text-lg mb-5">{subtitle}</p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl mx-auto">
            {title}
          </h1>

          <div className="mt-10 flex justify-center">
            <span className="h-px w-16 bg-[var(--rule)]" />
          </div>

          <div className="mt-10 max-w-2xl mx-auto space-y-5 text-left sm:text-center">
            {bodyParagraphs.map((p, i) => (
              <p
                key={p.slice(0, 40)}
                className={
                  i === 0
                    ? "text-lg text-[var(--ink)] leading-relaxed"
                    : "text-base text-[var(--muted)] leading-relaxed"
                }
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              href="/menu"
              className="px-7 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-medium hover:bg-[var(--accent-deep)] transition-colors"
            >
              See today&rsquo;s menu &rarr;
            </Link>
            <Link
              href="/reserve"
              className="px-7 py-3 rounded-full border border-[var(--rule)] text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            >
              Reserve a table
            </Link>
            <Link
              href="/visit"
              className="px-7 py-3 rounded-full border border-[var(--rule)] text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            >
              How to find us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 sm:px-10 py-12">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
            On the board
          </p>
          <h2 className="font-display text-3xl sm:text-4xl">A few things, today.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {previews.map((dish) => (
            <article key={dish.id} className="group">
              {dish.photo ? (
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--bg-soft)]">
                  <Image
                    src={dish.photo}
                    alt={dish.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] border border-[var(--line)] bg-[var(--bg-soft)]/40 flex items-center justify-center rounded-sm">
                  <span className="font-display italic text-2xl text-[var(--muted)]">
                    &mdash; today &mdash;
                  </span>
                </div>
              )}
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mb-1.5">
                  {sectionLabel(dish.section, sections)}
                </p>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-xl">{dish.title}</h3>
                  <span className="flex-1 menu-leader h-3" />
                  <span className="text-sm tabular-nums text-[var(--ink)]">
                    {formatEur(dish.price_eur)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="text-sm uppercase tracking-[0.22em] text-[var(--accent)] hover:text-[var(--accent-deep)] border-b border-[var(--accent)]/40 pb-1"
          >
            See all {published.length} dishes
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 sm:px-10 py-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-6">
          La maison
        </p>
        <p className="font-display italic text-2xl sm:text-3xl leading-snug text-[var(--ink)]">
          &ldquo;One menu, one cook, no specials nobody can pronounce. Reserve a table if you want
          one held; walk in if you&rsquo;d rather chance it. Either way we&rsquo;ll pour you a glass
          at the bar across the street if we&rsquo;re busy when you arrive.&rdquo;
        </p>
      </section>
    </>
  );
}

function itemSectionMatches(itemSection: string, sectionSlug: string): boolean {
  return itemSection === sectionSlug || itemSection.replace(/_/g, "-") === sectionSlug;
}

function sectionLabel(slug: string, sections: { slug: string; name: string }[]): string {
  return sections.find((s) => itemSectionMatches(slug, s.slug))?.name ?? slug;
}
