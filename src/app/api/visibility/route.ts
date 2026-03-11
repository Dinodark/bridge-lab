import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { createAdminClient } from "@/lib/supabase/admin";

const COOKIE_NAME = "dashboard_session";

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

export type VisibilityStatus = "draft" | "published" | "private";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get("ids");
  const ids = idsParam ? idsParam.split(",").map((id) => id.trim()).filter(Boolean) : [];

  if (ids.length === 0) {
    return NextResponse.json({});
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("entity_visibility")
      .select("id, visibility")
      .in("id", ids);

    if (error) {
      console.error("[Visibility GET]", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const result: Record<string, VisibilityStatus> = {};
    for (const id of ids) {
      const row = data?.find((r) => r.id === id);
      result[id] = (row?.visibility as VisibilityStatus) ?? "published";
    }
    return NextResponse.json(result);
  } catch (e) {
    console.error("[Visibility GET]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, visibility } = body as { id?: string; visibility?: string };

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    if (!["draft", "published", "private"].includes(visibility ?? "")) {
      return NextResponse.json({ error: "Invalid visibility" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("entity_visibility")
      .upsert({ id, visibility, updated_at: new Date().toISOString() }, { onConflict: "id" });

    if (error) {
      console.error("[Visibility PATCH]", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id, visibility });
  } catch (e) {
    console.error("[Visibility PATCH]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
