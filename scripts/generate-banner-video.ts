/**
 * Generate video from home banner image using fal.ai wan-25-preview/image-to-video
 * Run: npm run generate-banner-video
 * Requires: FAL_KEY in .env.local
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";

const IMAGE_PATH = path.join(process.cwd(), "public/assets/home-feed-illustration.webp");
const OUTPUT_PATH = path.join(process.cwd(), "public/assets/home-banner-video.mp4");

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("Set FAL_KEY in .env.local");
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  const base64 = imageBuffer.toString("base64");
  const dataUri = `data:image/webp;base64,${base64}`;

  console.log("Submitting to fal.ai (1–3 min)...");
  const result = await fal.subscribe("fal-ai/wan-25-preview/image-to-video", {
    input: {
      image_url: dataUri,
      prompt:
        "Gentle ambient motion, soft light shifts, subtle camera drift. Community and technology theme. Calm, atmospheric mood. Minimal movement.",
      resolution: "720p",
      duration: "5",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS" && update.logs) {
        update.logs.map((l) => l.message).forEach((m) => console.log(m));
      }
    },
  });

  const videoUrl = (result.data as { video: { url: string } }).video.url;
  console.log("Video URL:", videoUrl);
  console.log("Downloading video...");
  let ok = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(videoUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(OUTPUT_PATH, buf);
      ok = true;
      break;
    } catch (e) {
      console.warn(`Attempt ${attempt}/3 failed:`, (e as Error).message);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 3000));
    }
  }
  if (!ok) {
    console.log("Trying curl fallback...");
    child_process.execSync(`curl -L -o "${OUTPUT_PATH.replace(/"/g, '\\"')}" "${videoUrl}"`, {
      stdio: "inherit",
      shell: true,
    });
  }
  console.log("Saved:", OUTPUT_PATH);
}

main().catch(console.error);
