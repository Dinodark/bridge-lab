/**
 * Generate petrogliph banners and YouTube covers.
 * Uses petrogliph-full.svg + fal.ai (FLUX, nano-banana-2/edit).
 *
 * Run: npm run generate-petrogliph-banners
 * Requires: FAL_KEY in .env.local
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";
import sharp from "sharp";

const CONCEPT_DIR = path.join(process.cwd(), "public/concepts/petrogliph");
const MERCH_DIR = path.join(CONCEPT_DIR, "merch");
const DESIGN_SVG = path.join(CONCEPT_DIR, "petrogliph-full.svg");

async function download(url: string, outPath: string) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(outPath, buf);
      return;
    } catch (e) {
      console.warn(`Download attempt ${attempt}/3 failed:`, (e as Error).message);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 3000));
    }
  }
  child_process.execSync(`curl -L -o "${outPath.replace(/\\/g, "/")}" "${url}"`, {
    stdio: "inherit",
    shell: process.platform === "win32" ? "cmd.exe" : "/bin/sh",
  });
}

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("Set FAL_KEY in .env.local");
    process.exit(1);
  }
  if (!fs.existsSync(DESIGN_SVG)) {
    console.error("Design not found:", DESIGN_SVG);
    process.exit(1);
  }

  if (!fs.existsSync(MERCH_DIR)) fs.mkdirSync(MERCH_DIR, { recursive: true });

  const designPng = await sharp(DESIGN_SVG)
    .resize(512, 512, { fit: "contain", background: { r: 4, g: 4, b: 4, alpha: 1 } })
    .png()
    .toBuffer();
  const designDataUri = `data:image/png;base64,${designPng.toString("base64")}`;

  // Banner 16:9
  console.log("\n--- banner-16x9 ---");
  const bannerPrompt =
    "Minimalist dark background, black, subtle gradient. Space for overlay design. Clean, professional, no people.";
  const bannerResult = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt: bannerPrompt,
      image_size: "landscape_16_9",
      num_inference_steps: 4,
      guidance_scale: 3.5,
      output_format: "png",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const bannerUrl = (bannerResult.data as { images: { url: string }[] }).images[0].url;
  const bannerBasePath = path.join(MERCH_DIR, "banner-16x9-base.png");
  await download(bannerUrl, bannerBasePath);
  const bannerBaseUri = `data:image/png;base64,${fs.readFileSync(bannerBasePath).toString("base64")}`;

  const bannerEditResult = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt:
        "Place the petroglyph design from the second image prominently in the center of the dark background. The design has white and orange line art. Scale it to fill about 60% of the width. Keep the design centered and clearly visible.",
      image_urls: [bannerBaseUri, designDataUri],
      aspect_ratio: "16:9",
      resolution: "1K",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const bannerOutPath = path.join(MERCH_DIR, "banner-16x9.png");
  await download((bannerEditResult.data as { images: { url: string }[] }).images[0].url, bannerOutPath);
  console.log("Saved:", bannerOutPath);

  // YouTube cover 1280x720 (16:9)
  console.log("\n--- youtube-cover ---");
  const ytPrompt =
    "Dark minimalist background for video thumbnail, black with subtle depth. Professional, clean. Space for central graphic.";
  const ytResult = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt: ytPrompt,
      image_size: "landscape_16_9",
      num_inference_steps: 4,
      guidance_scale: 3.5,
      output_format: "png",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const ytBasePath = path.join(MERCH_DIR, "youtube-cover-base.png");
  await download((ytResult.data as { images: { url: string }[] }).images[0].url, ytBasePath);
  const ytBaseUri = `data:image/png;base64,${fs.readFileSync(ytBasePath).toString("base64")}`;

  const ytEditResult = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt:
        "Place the petroglyph design from the second image in the center of the thumbnail. The design has white and orange artwork on black. Make it prominent and clearly visible for a YouTube video cover.",
      image_urls: [ytBaseUri, designDataUri],
      aspect_ratio: "16:9",
      resolution: "1K",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const ytOutPath = path.join(MERCH_DIR, "youtube-cover.png");
  await download((ytEditResult.data as { images: { url: string }[] }).images[0].url, ytOutPath);
  console.log("Saved:", ytOutPath);

  console.log("\nDone.");
}

main().catch(console.error);
