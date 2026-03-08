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

## Когда появится БД

1. Добавить модель в Prisma/Drizzle
2. В `src/app/api/analytics/route.ts` раскомментировать/добавить `db.analyticsEvents.createMany(...)`
3. Опционально: добавить IP lookup (MaxMind, ipapi) для country/city
