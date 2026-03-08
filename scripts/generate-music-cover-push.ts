/**
 * Generate music track cover using fal.ai FLUX Schnell text-to-image
 * Track: Push It To Prod
 *
 * Run: npm run generate-music-cover-push
 * Requires: FAL_KEY in .env.local
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";

const ASSETS = path.join(process.cwd(), "public/assets");
const OUT_PATH = path.join(ASSETS, "music-push-it-to-prod-cover.png");

const PROMPT = `Explosive celebratory scene. A young woman dancing and screaming with joy, arms raised in victory. Code snippets, brackets, and programming symbols float and burst around her like confetti. She just shipped her app, everything works, pure euphoria. Bubblegum pink and electric purple energy burst, vibrant neon colors. Dynamic composition, motion blur, explosive energy, bubblegum bubble pop aesthetic. Photorealistic, cinematic, high energy, emotional explosion of happiness.`;

async function download(url: string, outPath: string) {
  let ok = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(outPath, buf);
      ok = true;
      break;
    } catch (e) {
      console.warn(`Download attempt ${attempt}/3 failed:`, (e as Error).message);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 3000));
    }
  }
  if (!ok) {
    console.log("Trying curl fallback...");
    child_process.execSync(`curl -L -o "${outPath.replace(/\\/g, "/")}" "${url}"`, {
      stdio: "inherit",
      shell: true,
    });
  }
}

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("Set FAL_KEY in .env.local");
    process.exit(1);
  }

  if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });

  console.log("Generating Push It To Prod cover with FLUX Schnell...");
  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt: PROMPT,
      image_size: "portrait_4_3",
      num_inference_steps: 4,
      guidance_scale: 3.5,
      output_format: "png",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });

  const data = result.data as { images: { url: string }[] };
  const url = data.images[0].url;
  await download(url, OUT_PATH);
  console.log("Saved:", OUT_PATH);
}

main().catch(console.error);
