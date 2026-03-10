/**
 * API для получения счётчиков аналитики по target_id.
 * Публичный endpoint — данные не секретные.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const EXCLUDED_IPS = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1", "localhost", "0.0.0.0"]);

function isExcludedIp(ip: string | null): boolean {
  return ip != null && EXCLUDED_IPS.has(ip);
}

export type CountsByTarget = Record<string, { like: number; download: number; copy: number; play: number }>;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");
    if (!idsParam || idsParam.trim() === "") {
      return NextResponse.json({ counts: {} as CountsByTarget });
    }

    const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) {
      return NextResponse.json({ counts: {} as CountsByTarget });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("analytics_events")
      .select("target_id, type, ip")
      .in("target_id", ids)
      .in("type", ["like", "download", "copy", "play"]);

    if (error) {
      console.error("[Analytics Counts]", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const counts: CountsByTarget = {};
    for (const id of ids) {
      counts[id] = { like: 0, download: 0, copy: 0, play: 0 };
    }

    for (const row of data ?? []) {
      if (isExcludedIp(row.ip)) continue;
      const targetId = row.target_id;
      if (!targetId || !ids.includes(targetId)) continue;
      if (!counts[targetId]) counts[targetId] = { like: 0, download: 0, copy: 0, play: 0 };
      const t = row.type as keyof typeof counts[string];
      if (t in counts[targetId]) {
        counts[targetId][t]++;
      }
    }

    return NextResponse.json({ counts });
  } catch (e) {
    console.error("[Analytics Counts]", e);
    return NextResponse.json({ error: "Failed to fetch counts" }, { status: 500 });
  }
}
