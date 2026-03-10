/**
 * Clear all analytics_events from Supabase.
 * Run: npx tsx scripts/clear-analytics.ts
 */
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("analytics_events").delete().gte("created_at", "1970-01-01");

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }

  console.log("Analytics history cleared.");
}

main();
