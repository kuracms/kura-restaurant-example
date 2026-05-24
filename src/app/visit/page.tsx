export const metadata = {
  title: "Visit - The Bistro",
  description: "How to find The Bistro in the 11th arrondissement, Paris.",
};

export default function VisitPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10 py-16 sm:py-24">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] mb-4">Visit</p>
      <h1 className="font-display text-5xl tracking-tight leading-tight">
        Two minutes from M&eacute;tro Parmentier.
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">Address</p>
          <p className="leading-relaxed">
            114 rue Jean-Pierre Timbaud
            <br />
            75011 Paris
            <br />
            France
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">Open</p>
          <p className="leading-relaxed">
            Tue&ndash;Sat &nbsp; 12:00&ndash;14:30 &amp; 19:00&ndash;22:30
            <br />
            Sunday &nbsp; 12:00&ndash;15:00 (lunch only)
            <br />
            Monday &nbsp; closed
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
            Reservations
          </p>
          <p className="leading-relaxed">
            Reserve a table online, or walk in any night. If we&rsquo;re full we&rsquo;ll seat you
            at the bar across the street and bring you over when a table opens up.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
            Getting there
          </p>
          <p className="leading-relaxed">
            M&eacute;tro Parmentier (line 3), two minutes&apos; walk. Or M&eacute;tro Goncourt (line
            11), five minutes. Look for the small painted sign and the chalkboard on the pavement.
          </p>
        </div>
      </div>

      <div className="mt-14 aspect-[16/9] rounded-sm overflow-hidden border border-[var(--line)] bg-[var(--bg-soft)]">
        <iframe
          title="Map of The Bistro"
          src="https://maps.google.com/maps?q=48.866,2.376&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
