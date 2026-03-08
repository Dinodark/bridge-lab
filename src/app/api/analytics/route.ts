/**
 * API для приёма аналитики. Когда появится БД — сохраняем события.
 * Сейчас: логируем и возвращаем 200 (события не теряются, клиент держит в очереди).
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body as { events?: unknown[] };

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ ok: false, error: "No events" }, { status: 400 });
    }

    // IP и метаданные с сервера (для будущей БД)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // TODO: когда появится БД — сохранять:
    // await db.analyticsEvents.createMany({ data: events.map(e => ({ ...e, ip })) });
    // Пока только логируем в dev
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", events.length, "events, IP:", ip);
    }

    return NextResponse.json({ ok: true, received: events.length });
  } catch (e) {
    console.error("[Analytics API]", e);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 500 });
  }
}
