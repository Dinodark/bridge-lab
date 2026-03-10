# Подключение Supabase

## 1. Создай проект в Supabase

1. Перейди на [database.new](https://database.new/) или [supabase.com/dashboard](https://supabase.com/dashboard)
2. Войди или зарегистрируйся
3. Нажми **New Project**
4. Укажи имя, пароль БД и регион
5. Дождись создания проекта (~2 мин)

## 2. Получи ключи

1. В дашборде проекта открой **Settings** → **API**
2. Скопируй:
   - **Project URL** — это `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** (или **anon public** в Legacy API Keys) — это `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 3. Настрой переменные окружения

1. Скопируй `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Открой `.env.local` и подставь свои значения:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 4. Использование в коде

**Server Components / Server Actions / Route Handlers:**
```ts
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("your_table").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

**Client Components:**
```ts
"use client";
import { createClient } from "@/lib/supabase/client";

export default function ClientComponent() {
  const supabase = createClient();
  // supabase.from("your_table").select()...
}
```

## 5. Создание таблиц

В Supabase Dashboard → **Table Editor** → **New table** или через **SQL Editor**:

```sql
-- Пример таблицы
create table example (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

-- RLS: разрешить чтение анонимам (если нужно)
alter table example enable row level security;
create policy "Allow public read" on example for select to anon using (true);
```

## 6. Аналитика (таблица analytics_events)

Выполни SQL из [`docs/supabase-analytics-events.sql`](supabase-analytics-events.sql) в Supabase → SQL Editor.

Добавь в `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=твой-service-role-key
```
(Настройки проекта → API → service_role secret)

## 7. Проверка

После настройки `.env.local` перезапусти dev-сервер и открой страницу, которая использует Supabase.
