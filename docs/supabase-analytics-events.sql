-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New query

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  path text not null default '',
  referrer text,
  referrer_search_query text,
  user_agent text,
  language text,
  screen_w int,
  screen_h int,
  time_on_page int,
  ip text,
  country text,
  city text,
  target_id text,
  target_type text,
  metadata jsonb default '{}',
  timestamp timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_type on public.analytics_events (type);
create index if not exists idx_analytics_events_path on public.analytics_events (path);
create index if not exists idx_analytics_events_created_at on public.analytics_events (created_at desc);
create index if not exists idx_analytics_events_timestamp on public.analytics_events (timestamp desc);

-- RLS: service_role bypasses. For anon inserts from API, we use service_role key on server.
alter table public.analytics_events enable row level security;

-- Allow service_role full access (default)
-- Allow anon to insert (for API with anon key - optional, prefer service_role)
create policy "Allow service role all" on public.analytics_events
  for all to service_role using (true) with check (true);
