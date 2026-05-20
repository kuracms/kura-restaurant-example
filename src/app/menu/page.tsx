import Image from "next/image";
import { fetchItems, fetchSections, formatJpy, type MenuSection, type MenuItem } from "@/lib/kura";

export const revalidate = 60;

export const metadata = {
  title: "Menu - Kura Izakaya",
  description: "Tonight's menu at Kura Izakaya in Shibuya.",
};

export default async function MenuPage() {
  const [sections, items] = await Promise.all([fetchSections(), fetchItems()]);
  const published = items.filter((i) => i.published);

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-10 py-16 sm:py-24">
      <header className="mb-16">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] mb-4">Tonight</p>
        <h1 className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-tight">
          The menu, as it stands.
        </h1>
        <p className="mt-6 text-[var(--muted)] max-w-2xl leading-relaxed">
          Prices in yen, tax included, no service charge. Most things take a few minutes &mdash;
          skewers come in pairs and the rice plates take longest. Allergies, tell the chef when you
          sit down.
        </p>
      </header>

      <nav className="mb-14 flex flex-wrap gap-x-6 gap-y-2 text-sm border-y border-[var(--line)] py-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.slug}`}
            className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            {s.name}
          </a>
        ))}
      </nav>

      <div className="space-y-24">
        {sections.map((s) => (
          <Section
            key={s.id}
            section={s}
            items={published.filter((i) => itemMatchesSection(i, s))}
          />
        ))}
      </div>
    </div>
  );
}

function Section({ section, items }: { section: MenuSection; items: MenuItem[] }) {
  if (items.length === 0) return null;
  return (
    <section id={section.slug} className="scroll-mt-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)] mb-2">
          {section.subtitle ?? ""}
        </p>
        <h2 className="font-display text-4xl tracking-tight">{section.name}</h2>
        {section.intro && (
          <p className="mt-4 text-[var(--muted)] max-w-2xl leading-relaxed italic">
            {section.intro}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12">
        {items.map((item) => (
          <article key={item.id} className="flex gap-5">
            {item.photo && (
              <div className="relative h-32 w-32 flex-none overflow-hidden rounded-sm bg-[var(--bg-soft)]">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-xl">{item.title}</h3>
                <span className="flex-1 border-b border-dotted border-[var(--line)] mb-1.5" />
                <span className="text-sm tabular-nums text-[var(--muted)]">
                  {formatJpy(item.price_jpy)}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {item.vegetarian && <span>Vegetarian</span>}
                {item.spice === "mild" && <span>Mild spice</span>}
                {item.spice === "medium" && <span>Medium spice</span>}
                {item.spice === "hot" && <span>Hot</span>}
              </div>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function itemMatchesSection(item: MenuItem, section: MenuSection): boolean {
  return item.section.replace(/_/g, "-") === section.slug;
}
