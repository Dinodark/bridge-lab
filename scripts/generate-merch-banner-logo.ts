/**
 * Add OneTribe Berlin logo to merch-banner.png (guy + girl in black t-shirts).
 * Uses nano-banana-2/edit to place logo on both t-shirts.
 *
 * Run: npm run generate-merch-banner-logo
 * Requires: FAL_KEY in .env.local, merch-banner.png in public/assets
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";
import sharp from "sharp";

const ASSETS = path.join(process.cwd(), "public/assets");
const BANNER_IN = path.join(ASSETS, "merch-banner.png");
const BANNER_OUT = path.join(ASSETS, "merch-banner-logo.png");
const LOGO_SVG_PATH = path.join(process.cwd(), "public/assets/OneTribe-Berlin.svg");

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
  if (!fs.existsSync(BANNER_IN)) {
    console.error("merch-banner.png not found. Run: npm run generate-merch-banner");
    process.exit(1);
  }
  if (!fs.existsSync(LOGO_SVG_PATH)) {
    console.error("Logo not found:", LOGO_SVG_PATH);
    process.exit(1);
  }

  const logoPngBuffer = await sharp(LOGO_SVG_PATH)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toBuffer();
  const logoDataUri = `data:image/png;base64,${logoPngBuffer.toString("base64")}`;
  const bannerDataUri = `data:image/png;base64,${fs.readFileSync(BANNER_IN).toString("base64")}`;

  console.log("Adding OneTribe Berlin logo to both t-shirts (nano-banana-2/edit)...");
  const editResult = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt:
        "Place the OneTribe Berlin design from the second image onto the center of the black t-shirt on BOTH the man and the woman in the first image. Add the logo to each person's chest area. The design has orange artwork on black background. Keep it clearly visible and properly scaled on both t-shirts. Do not change anything else in the image.",
      image_urls: [bannerDataUri, logoDataUri],
      aspect_ratio: "16:9",
      resolution: "1K",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const editedUrl = (editResult.data as { images: { url: string }[] }).images[0].url;
  await download(editedUrl, BANNER_OUT);
  console.log("Saved:", BANNER_OUT);
}

main().catch(console.error);
