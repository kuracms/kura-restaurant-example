import Link from "next/link";
import Image from "next/image";
import { fetchItems, fetchSections, formatEur } from "@/lib/kura";

export const revalidate = 60;

export default async function HomePage() {
  const [sections, items] = await Promise.all([fetchSections(), fetchItems()]);
  const published = items.filter((i) => i.published);

  const previews = sections
    .map((s) => published.find((i) => itemSectionMatches(i.section, s.slug)))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 6);

  return (
    <>
      <section className="relative subtle-grain">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-20 sm:pt-28 pb-16">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)] mb-6">
            rue Jean-Pierre Timbaud &middot; Paris 11<sup>e</sup>
          </p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-3xl">
            A short menu, written in chalk,{" "}
            <em className="font-normal italic text-[var(--accent)]">on a board by the door.</em>
          </h1>
          <p className="mt-8 text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            Twenty-four seats, an open kitchen, one cook. We do lunch and dinner six days a week and
            we don&rsquo;t take reservations except on Sundays. The menu changes most days &mdash;
            these are the dishes on it today.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/menu"
              className="px-7 py-3 rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
            >
              Today&rsquo;s menu &rarr;
            </Link>
            <Link
              href="/visit"
              className="px-7 py-3 rounded-full border border-[var(--line)] text-sm font-medium hover:border-[var(--ink)] transition-colors"
            >
              How to find us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 sm:px-10 py-12">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-3xl">A few things on it today</h2>
          <Link href="/menu" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
            See all {published.length} dishes &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {previews.map((dish) => (
            <article key={dish.id} className="group">
              {dish.photo && (
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--bg-soft)]">
                  <Image
                    src={dish.photo}
                    alt={dish.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-1.5">
                  {sectionLabel(dish.section, sections)}
                </p>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl">{dish.title}</h3>
                  <span className="text-sm tabular-nums text-[var(--muted)]">
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
      </section>

      <section className="mx-auto max-w-3xl px-6 sm:px-10 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] mb-6">House style</p>
        <p className="font-display text-3xl sm:text-4xl leading-snug">
          One menu, one cook, no specials nobody can pronounce. We don&rsquo;t take reservations
          except on Sundays, and if we&rsquo;re full when you arrive we&rsquo;ll pour you a glass at
          the bar across the street until a table opens up.
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
