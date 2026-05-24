import { notFound } from "next/navigation";
import { marked } from "marked";
import { fetchPage } from "@/lib/kura";

marked.setOptions({ gfm: true, breaks: false });

export async function LegalPage({ slug, eyebrow }: { slug: string; eyebrow: string }) {
  const page = await fetchPage(slug);
  if (!page) notFound();

  const html = await marked.parse(page.body ?? "");

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-10 py-16 sm:py-24">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] mb-4">{eyebrow}</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.0] tracking-tight">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="mt-5 text-[var(--muted)] leading-relaxed">{page.subtitle}</p>
        )}
      </header>

      <article
        className="legal-prose text-[var(--ink)] leading-relaxed"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown rendered from trusted kura CMS content
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
