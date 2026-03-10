import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { createAdminClient } from "@/lib/supabase/admin";

const COOKIE_NAME = "dashboard_session";

const EXCLUDED_IPS = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1", "localhost", "0.0.0.0"]);

function isExcludedIp(ip: string | null): boolean {
  return ip != null && EXCLUDED_IPS.has(ip);
}

function getSecret(): string {
  const s = process.env.DASHBOARD_JWT_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "fallback-dev-secret";
  return s;
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(getSecret());
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "100", 10), 500);

    const [allRes, visitorsRes, eventsRes] = await Promise.all([
      supabase
        .from("analytics_events")
        .select("path, target_id, type, ip")
        .limit(10000),
      supabase
        .from("analytics_events")
        .select("ip, country, city, language, referrer, referrer_search_query, path, timestamp")
        .order("timestamp", { ascending: false })
        .limit(limit),
      supabase
        .from("analytics_events")
        .select("type, path, target_id, target_type, ip, country, language, timestamp")
        .order("timestamp", { ascending: false })
        .limit(limit),
    ]);

    const topContentRaw = allRes.data ?? [];
    const visitorsRaw = visitorsRes.data ?? [];
    const eventsRaw = eventsRes.data ?? [];

    const topContent = topContentRaw.filter((r) => !isExcludedIp(r.ip));
    const visitors = visitorsRaw.filter((r) => !isExcludedIp(r.ip));
    const events = eventsRaw.filter((r) => !isExcludedIp(r.ip));

    const typeCounts: Record<string, number> = {};
    for (const row of topContent) {
      typeCounts[row.type] = (typeCounts[row.type] ?? 0) + 1;
    }

    const byPath: Record<string, { likes: number; downloads: number; copies: number; views: number }> = {};
    for (const row of topContent) {
      const key = `${row.path}${row.target_id ? `#${row.target_id}` : ""}`;
      if (!byPath[key]) byPath[key] = { likes: 0, downloads: 0, copies: 0, views: 0 };
      if (row.type === "page_view") byPath[key].views++;
      else if (row.type === "like") byPath[key].likes++;
      else if (row.type === "download") byPath[key].downloads++;
      else if (row.type === "copy") byPath[key].copies++;
    }
    const topContentSorted = Object.entries(byPath)
      .map(([path, stats]) => ({ path, ...stats, total: stats.likes + stats.downloads + stats.copies + stats.views }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 20);

    return NextResponse.json({
      counts: typeCounts,
      topContent: topContentSorted,
      visitors,
      events,
    });
  } catch (e) {
    console.error("[Dashboard Analytics]", e);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
