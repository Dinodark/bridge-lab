/**
 * Generate music track cover using fal.ai FLUX Schnell text-to-image
 * Track: Cursor In The Dark (Lounge Edition)
 *
 * Run: npm run generate-music-cover
 * Requires: FAL_KEY in .env.local
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";

const ASSETS = path.join(process.cwd(), "public/assets");
const OUT_PATH = path.join(ASSETS, "music-cursor-in-the-dark-cover.png");

const PROMPT = `A young woman sitting on a bed in front of a laptop with a cup of hot cocoa. She wears a cozy white sweater with very long sleeves that hang down past her wrists. Warm ambient lighting, night time outside, big city junction visible through the window with lights and traffic. Cozy intimate atmosphere, soft focus, photorealistic, cinematic composition.`;

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
      shell: process.platform === "win32" ? "cmd.exe" : "/bin/sh",
    });
  }
}

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("Set FAL_KEY in .env.local");
    process.exit(1);
  }

  if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });

  console.log("Generating image with FLUX Schnell...");
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
