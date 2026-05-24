// Read-only typed client for the kura public REST API.
//
// Runtime config comes from Cloudflare Workers vars (set in wrangler.jsonc).
// Falls back to process.env for `next dev` / local Node usage.

import { getCloudflareContext } from "@opennextjs/cloudflare";

function env(name: "KURA_BASE_URL" | "KURA_PROJECT" | "KURA_TOKEN"): string {
  // Cloudflare runtime context wins; fall back to Node env.
  try {
    const cf = getCloudflareContext();
    const v = (cf?.env as unknown as Record<string, string | undefined>)?.[name];
    if (v) return v;
  } catch {
    // not running under Cloudflare
  }
  return process.env[name] ?? "";
}

export interface KuraListResponse<T> {
  data: T[];
  meta: { count: number; limit: number; offset: number };
}

export interface MenuSection {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  sort_order: number;
  intro?: string;
  published?: boolean;
  published_at: string | null;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  published?: boolean;
  published_at: string | null;
}

export interface MenuItem {
  id: string;
  slug: string;
  title: string;
  section: string;
  description: string;
  price_eur: number;
  photo?: string | null;
  vegetarian?: boolean;
  published?: boolean;
  published_at: string | null;
}

async function kura<T>(path: string): Promise<T> {
  const base = env("KURA_BASE_URL") || "https://kuracms.com";
  const project = env("KURA_PROJECT") || "restaurant";
  const token = env("KURA_TOKEN");
  const url = `${base}/api/v1/${project}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60, tags: ["kura"] },
  });
  if (!res.ok) throw new Error(`kura ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export async function fetchSections(): Promise<MenuSection[]> {
  const r = await kura<KuraListResponse<MenuSection>>("/menu_section?limit=50");
  return r.data.sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchItems(): Promise<MenuItem[]> {
  const r = await kura<KuraListResponse<MenuItem>>("/menu_item?limit=100");
  return r.data;
}

export async function fetchPage(slug: string): Promise<Page | null> {
  const r = await kura<KuraListResponse<Page>>("/page?limit=10");
  const match = r.data.find((p) => p.published === true && p.slug === slug);
  return match ?? null;
}

export function formatEur(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
