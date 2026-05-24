"use client";

import { useMemo, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "done";

const LUNCH_SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00"];
const DINNER_SLOTS = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatHumanDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function ReservePage() {
  const today = useMemo(() => toISODate(new Date()), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return toISODate(d);
  }, []);

  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:30");
  const [party, setParty] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<{
    name: string;
    phone: string;
    date: string;
    time: string;
    party: number;
  } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setTimeout(() => {
      setSubmitted({ name, phone, date, time, party });
      setStatus("done");
    }, 600);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-10 py-16 sm:py-24">
      <header className="mb-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-4">
          Reservations
        </p>
        <h1 className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-tight">
          <span className="italic text-[var(--accent)]">Une</span> table
        </h1>
        <div className="mt-6 flex justify-center">
          <span className="h-px w-16 bg-[var(--rule)]" />
        </div>
        <p className="mt-6 text-[var(--muted)] max-w-md mx-auto leading-relaxed italic font-display text-base">
          Tell us when you&rsquo;d like to eat. We&rsquo;ll call to confirm within the day.
        </p>
      </header>

      <div className="border border-[var(--rule)] bg-[var(--bg-soft)]/40 px-6 sm:px-10 py-10 sm:py-12 rounded-sm shadow-[0_1px_0_0_var(--rule)]">
        {status === "done" && submitted ? (
          <SuccessCard
            data={submitted}
            onReset={() => {
              setSubmitted(null);
              setStatus("idle");
            }}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Date" htmlFor="reserve-date">
                <input
                  id="reserve-date"
                  type="date"
                  required
                  value={date}
                  min={today}
                  max={maxDate}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Time" htmlFor="reserve-time">
                <select
                  id="reserve-time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClass}
                >
                  <optgroup label="Lunch">
                    {LUNCH_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Dinner">
                    {DINNER_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </Field>
            </div>

            <fieldset className="border-0 p-0 m-0">
              <legend className="block text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] mb-2">
                Party size
              </legend>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
                  const active = party === n;
                  return (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setParty(n)}
                      aria-pressed={active}
                      aria-label={`Party of ${n}`}
                      className={`h-10 w-10 rounded-full text-sm tabular-nums border transition-colors ${
                        active
                          ? "bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]"
                          : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="h-px bg-[var(--line)]" />

            <Field label="Name" htmlFor="reserve-name">
              <input
                id="reserve-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Marie Dubois"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Phone" htmlFor="reserve-phone">
                <input
                  id="reserve-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="06 12 34 56 78"
                  className={inputClass}
                />
              </Field>
              <Field label="Email" htmlFor="reserve-email">
                <input
                  id="reserve-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="marie@example.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-medium hover:bg-[var(--accent-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Request a table"}
              </button>
            </div>
          </form>
        )}
      </div>

      <p className="mt-10 text-center text-xs text-[var(--muted)] italic font-display leading-relaxed">
        This is a demo &mdash; submitting won&rsquo;t actually request a table. Built on kura.
      </p>
    </div>
  );
}

const inputClass =
  "w-full bg-transparent border-0 border-b border-[var(--line)] focus:border-[var(--accent)] focus:outline-none px-0 py-2 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 font-display";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={htmlFor}
        className="block text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SuccessCard({
  data,
  onReset,
}: {
  data: { name: string; phone: string; date: string; time: string; party: number };
  onReset: () => void;
}) {
  return (
    <div className="text-center py-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-4">Merci</p>
      <h2 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight">
        Table requested for <span className="italic text-[var(--accent)]">{data.name}</span>.
      </h2>
      <div className="mt-6 flex justify-center">
        <span className="h-px w-12 bg-[var(--rule)]" />
      </div>
      <p className="mt-6 text-[var(--muted)] leading-relaxed">
        {formatHumanDate(data.date)} at <span className="tabular-nums">{data.time}</span>, for{" "}
        {data.party} {data.party === 1 ? "person" : "people"}.
      </p>
      <p className="mt-2 text-[var(--ink)] leading-relaxed">
        We&rsquo;ll call <span className="tabular-nums">{data.phone}</span> within the day to
        confirm.
      </p>
      <div className="mt-10">
        <button
          type="button"
          onClick={onReset}
          className="text-sm uppercase tracking-[0.22em] text-[var(--accent)] hover:text-[var(--accent-deep)] border-b border-[var(--accent)]/40 pb-1"
        >
          Make another request
        </button>
      </div>
    </div>
  );
}
