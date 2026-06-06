-- CoEstate: leads table for capturing interested users.
-- Apply via the Supabase SQL editor or `supabase db push`.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  type          text not null default 'enquiry',  -- enquiry | reservation | booking
  name          text not null,
  email         text not null,
  phone         text not null,
  interest      text,
  message       text,
  property_slug text,
  created_at    timestamptz not null default now()
);

-- Lock it down: nobody can read leads via the public API.
alter table public.leads enable row level security;

-- Allow the public (anon) role to INSERT a lead only.
-- (No SELECT policy = the anon/public key cannot read rows back.
--  You still see everything in the Supabase dashboard / service role.)
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
