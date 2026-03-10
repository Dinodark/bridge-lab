/**
 * API для приёма аналитики. Сохраняет события в Supabase с IP, страной, городом.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getGeoFromIp } from "@/lib/analytics/geo";
import { parseSearchQueryFromReferrer } from "@/lib/analytics/referrer";

type ClientEvent = {
  id?: string;
  type: string;
  timestamp?: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
  language?: string;
  screen?: { w?: number; h?: number };
  timeOnPage?: number;
  targetId?: string;
  targetType?: string;
  [key: string]: unknown;
};

function toDbRow(
  e: ClientEvent,
  ip: string,
  country: string,
  city: string
): Record<string, unknown> {
  const referrer = typeof e.referrer === "string" ? e.referrer : undefined;
  const referrerSearchQuery = parseSearchQueryFromReferrer(referrer);

  return {
    type: String(e.type ?? "custom"),
    path: String(e.path ?? ""),
    referrer: referrer ?? null,
    referrer_search_query: referrerSearchQuery,
    user_agent: typeof e.userAgent === "string" ? e.userAgent : null,
    language: typeof e.language === "string" ? e.language : null,
    screen_w: typeof e.screen?.w === "number" ? e.screen.w : null,
    screen_h: typeof e.screen?.h === "number" ? e.screen.h : null,
    time_on_page: typeof e.timeOnPage === "number" ? e.timeOnPage : null,
    ip,
    country: country || null,
    city: city || null,
    target_id: typeof e.targetId === "string" ? e.targetId : null,
    target_type: typeof e.targetType === "string" ? e.targetType : null,
    metadata: {
      ...e,
      id: undefined,
      type: undefined,
      timestamp: undefined,
      path: undefined,
      referrer: undefined,
      userAgent: undefined,
      language: undefined,
      screen: undefined,
      timeOnPage: undefined,
      targetId: undefined,
      targetType: undefined,
    },
    timestamp: e.timestamp ? new Date(e.timestamp).toISOString() : new Date().toISOString(),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body as { events?: unknown[] };

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ ok: false, error: "No events" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const excludedIps = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1", "localhost", "0.0.0.0"]);
    if (excludedIps.has(ip)) {
      return NextResponse.json({ ok: true, received: events.length });
    }

    const { country, city } = await getGeoFromIp(ip);

    const supabase = createAdminClient();
    const rows = (events as ClientEvent[]).map((e) => toDbRow(e, ip, country, city));

    const { error } = await supabase.from("analytics_events").insert(rows);

    if (error) {
      console.error("[Analytics API] Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: "Database error" }, { status: 500 });
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", events.length, "events saved, IP:", ip, country || "", city || "");
    }

    return NextResponse.json({ ok: true, received: events.length });
  } catch (e) {
    console.error("[Analytics API]", e);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 500 });
  }
}
