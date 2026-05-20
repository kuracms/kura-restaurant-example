export const metadata = {
  title: "Visit - Kura Izakaya",
  description: "How to find Kura Izakaya in Shibuya, Tokyo.",
};

export default function VisitPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10 py-16 sm:py-24">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] mb-4">Visit</p>
      <h1 className="font-display text-5xl tracking-tight leading-tight">
        Down the small lane off Center-gai.
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">Address</p>
          <p className="leading-relaxed">
            2-14-3 Dogenzaka
            <br />
            Shibuya-ku, Tokyo 150-0043
            <br />
            Japan
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">Open</p>
          <p className="leading-relaxed">
            Mon&ndash;Sat &nbsp; 18:00 to late
            <br />
            Sunday &nbsp; closed
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
            Reservations
          </p>
          <p className="leading-relaxed">
            Walk-in most nights. Weekend bookings by email only:{" "}
            <a className="underline underline-offset-4" href="mailto:hello@kura-izakaya.example">
              hello@kura-izakaya.example
            </a>
            .
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
            Getting there
          </p>
          <p className="leading-relaxed">
            Six minutes&apos; walk from Shibuya station, Hachiko exit. Through Center-gai, left at
            Tower Records, take the third lane on your right. Look for the small wooden door with
            the noren curtain.
          </p>
        </div>
      </div>

      <div className="mt-14 aspect-[16/9] rounded-sm overflow-hidden border border-[var(--line)] bg-[var(--bg-soft)]">
        <iframe
          title="Map of Kura Izakaya"
          src="https://maps.google.com/maps?q=35.658034,139.701636&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
