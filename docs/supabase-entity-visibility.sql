-- Таблица видимости сущностей контента
-- Выполнить в Supabase → SQL Editor

create table if not exists entity_visibility (
  id text primary key,
  visibility text not null check (visibility in ('draft', 'published', 'private')),
  updated_at timestamptz default now()
);

alter table entity_visibility enable row level security;

-- Чтение всем (anon, authenticated)
create policy "Allow public read" on entity_visibility
  for select to anon using (true);

create policy "Allow authenticated read" on entity_visibility
  for select to authenticated using (true);

-- Запись только через service_role (API routes используют admin client)
-- RLS не блокирует service_role
