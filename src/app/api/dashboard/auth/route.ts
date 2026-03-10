import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const COOKIE_NAME = "dashboard_session";
const MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  const s = process.env.DASHBOARD_JWT_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "fallback-dev-secret";
  return s;
}

function getPasswords(): string[] {
  const raw = process.env.DASHBOARD_PASSWORDS ?? process.env.NEXT_PUBLIC_DAO_PASSWORDS ?? "dashboard,analytics";
  return raw.split(",").map((p) => p.trim()).filter(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body as { password?: string };

    if (!password || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "No password" }, { status: 400 });
    }

    const valid = getPasswords().includes(password.trim());
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(getSecret());
    const token = await new SignJWT({ sub: "dashboard" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(`${MAX_AGE}s`)
      .sign(secret);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error("[Dashboard Auth]", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
