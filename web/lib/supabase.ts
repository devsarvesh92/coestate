/**
 * Lead capture via Supabase PostgREST (direct fetch).
 *
 * We use a plain fetch instead of @supabase/supabase-js for inserts because
 * the JS client eagerly initialises a realtime WebSocket, which isn't
 * available in the Node server runtime. A REST insert needs none of that.
 *
 * The anon key is safe here: the `leads` table has RLS that allows INSERT
 * but not SELECT for the anon role.
 */
export type LeadInsert = {
  type: string;
  name: string;
  email: string;
  phone: string;
  interest: string | null;
  message: string | null;
  property_slug: string | null;
};

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function insertLead(lead: LeadInsert) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_* env vars).");
  }
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed (${res.status}): ${text}`);
  }
}
