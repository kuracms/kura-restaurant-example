import Image from "next/image";
import { fetchItems, fetchSections, formatEur, type MenuSection, type MenuItem } from "@/lib/kura";

export const revalidate = 60;

export const metadata = {
  title: "Menu - The Bistro",
  description: "Today's menu at The Bistro in the 11th.",
};

export default async function MenuPage() {
  const [sections, items] = await Promise.all([fetchSections(), fetchItems()]);
  const published = items.filter((i) => i.published);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10 py-16 sm:py-24">
      <header className="mb-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-4">{today}</p>
        <h1 className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-tight">
          <span className="italic text-[var(--accent)]">La</span> Carte
        </h1>
        <div className="mt-6 flex justify-center">
          <span className="h-px w-16 bg-[var(--rule)]" />
        </div>
        <p className="mt-6 text-[var(--muted)] max-w-xl mx-auto leading-relaxed italic font-display text-base">
          Prices in euros &middot; tax and service included &middot; no cover
        </p>
      </header>

      <nav className="mb-16 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] border-y border-[var(--rule)] py-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.slug}`}
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            {s.name}
          </a>
        ))}
      </nav>

      <div className="space-y-20">
        {sections.map((s) => (
          <Section
            key={s.id}
            section={s}
            items={published.filter((i) => itemMatchesSection(i, s))}
          />
        ))}
      </div>

      <p className="mt-24 text-center text-xs text-[var(--muted)] italic font-display">
        Allergies: tell the cook when you sit down.
      </p>
    </div>
  );
}

function Section({ section, items }: { section: MenuSection; items: MenuItem[] }) {
  if (items.length === 0) return null;
  return (
    <section id={section.slug} className="scroll-mt-16">
      <div className="mb-8 text-center">
        <h2 className="font-display italic text-3xl tracking-tight text-[var(--accent)]">
          {section.name}
        </h2>
        {section.subtitle && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            {section.subtitle}
          </p>
        )}
        {section.intro && (
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto leading-relaxed italic font-display text-sm">
            {section.intro}
          </p>
        )}
      </div>

      <div className="space-y-7">
        {items.map((item) => (
          <article key={item.id} className="flex gap-5 items-start">
            {item.photo && (
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-sm bg-[var(--bg-soft)] hidden sm:block">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <h3 className="font-display text-lg sm:text-xl">
                  {item.title}
                  {item.vegetarian && (
                    <span
                      className="ml-2 text-[9px] uppercase tracking-[0.22em] text-[var(--accent)] align-middle"
                      title="vegetarian"
                    >
                      v
                    </span>
                  )}
                </h3>
                <span className="flex-1 menu-leader h-3" />
                <span className="text-sm tabular-nums text-[var(--ink)]">
                  {formatEur(item.price_eur)}
                </span>
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function itemMatchesSection(item: MenuItem, section: MenuSection): boolean {
  return item.section === section.slug || item.section.replace(/_/g, "-") === section.slug;
}
