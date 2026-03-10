# Аналитика OneBridge

## Что собираем

- **page_view** — просмотры страниц (авто при смене роута)
- **click** — клики (авто глобально + вручную через `useAnalytics().trackClick()`)
- **like** — лайки
- **share** — шаринг
- **search** — поиск
- **input** — ввод (длина без текста)
- **custom** — произвольные события

## Метаданные каждого события

- `path`, `referrer` — откуда пришли, куда смотрят
- `userAgent` — для бот-детекции
- `screen` — разрешение
- `timeOnPage` — время на странице (мс)
- `timestamp` — время события

## IP и серверные данные

API `/api/analytics` получает IP из заголовков `x-forwarded-for` / `x-real-ip`. Когда появится БД — сохраняем события с IP, страной, городом.

## Использование

```tsx
import { useAnalytics } from "@/contexts/AnalyticsContext";

function MyComponent() {
  const { trackClick, trackLike, trackShare, trackSearch, trackCustom } = useAnalytics();

  return (
    <button
      data-analytics-id="cta-tribe"
      onClick={() => trackLike("campaign-123", "campaign")}
    >
      Like
    </button>
  );
}
```

## data-analytics-id

Добавляй на важные элементы — в событие клика попадёт этот ID вместо generic селектора.

## Очередь и персист

События пишутся в `localStorage` (ключ `bridge-analytics-queue`), батчами отправляются на `/api/analytics`. При уходе со страницы — `sendBeacon` для надёжной доставки.

## Supabase (реализовано)

1. Выполни SQL из `docs/supabase-analytics-events.sql` в Supabase SQL Editor
2. Добавь `SUPABASE_SERVICE_ROLE_KEY` в `.env.local`
3. API `/api/analytics` сохраняет события в `analytics_events` с IP, страной, городом
4. IP geolocation через ip-api.com, парсинг поискового запроса из referrer

## Дашборд

`/dashboard` — личный дашборд с метриками. Защищён паролем (`DASHBOARD_PASSWORDS` в `.env.local`).
