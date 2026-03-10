/**
 * Diagnose analytics pipeline: DB insert, API endpoint.
 * Run: npx tsx scripts/diagnose-analytics.ts
 */
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function main() {
  console.log("=== Analytics diagnostics ===\n");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("FAIL: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  console.log("OK: Supabase env vars present");

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const testRow = {
    type: "page_view",
    path: "/diagnostic-test",
    ip: "93.115.175.63",
    timestamp: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("analytics_events").insert(testRow).select("id").single();

  if (error) {
    console.error("FAIL: Supabase insert error:", error.message);
    console.error("  Code:", error.code);
    console.error("  Details:", error.details);
    process.exit(1);
  }
  console.log("OK: Test row inserted, id:", data?.id);

  const { count } = await supabase.from("analytics_events").select("id", { count: "exact", head: true });
  console.log("OK: Total rows in analytics_events:", count);

  await supabase.from("analytics_events").delete().eq("path", "/diagnostic-test");
  console.log("OK: Test row cleaned up");

  console.log("\n--- API test (requires dev server on localhost:3000) ---");
  try {
    const res = await fetch("http://localhost:3000/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "93.115.175.63" },
      body: JSON.stringify({
        events: [
          {
            id: "diag-1",
            type: "page_view",
            path: "/",
            timestamp: new Date().toISOString(),
            userAgent: "Diagnostic",
            language: "en",
          },
        ],
      }),
    });
    const json = await res.json();
    if (res.ok && json.ok) {
      console.log("OK: API accepted event (IP 93.115.175.63)");
    } else {
      console.log("API response:", res.status, json);
    }
  } catch (e) {
    console.log("SKIP: API test failed (is dev server running?)", (e as Error).message);
  }

  console.log("\n=== Done ===");
}

main();
