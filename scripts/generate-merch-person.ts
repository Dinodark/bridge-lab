/**
 * Merch AI Workflow: Person in black t-shirt → add logo → video
 * 1. nano-banana-2: generate person in black t-shirt
 * 2. nano-banana-2/edit: add OneTribe Berlin design to t-shirt
 * 3. wan-25-preview/image-to-video: create video
 *
 * Run: npm run generate-merch-person
 * Requires: FAL_KEY in .env.local
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";
import sharp from "sharp";

const ASSETS = path.join(process.cwd(), "public/assets");
const LOGO_SVG_PATH = path.join(process.cwd(), "public/assets/OneTribe-Berlin.svg");

const isGirl = process.argv.includes("--girl");
const suffix = isGirl ? "-girl" : "";
const PERSON_OUT = path.join(ASSETS, `merch-person${suffix}.png`);
const PERSON_LOGO_OUT = path.join(ASSETS, `merch-person${suffix}-logo.png`);
const VIDEO_OUT = path.join(ASSETS, `merch-person${suffix}-video.mp4`);

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

  // Step 1: Generate person in black t-shirt
  const personType = isGirl ? "woman" : "man";
  console.log(`Step 1/3: Generating ${personType} in black t-shirt (nano-banana-2)...`);
  const personResult = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt:
        `Professional photo of a ${personType} wearing a plain black t-shirt, chest visible, studio lighting, neutral background, portrait orientation, high quality`,
      aspect_ratio: "4:5",
      resolution: "1K",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const personUrl = (personResult.data as { images: { url: string }[] }).images[0].url;
  await download(personUrl, PERSON_OUT);
  console.log("Saved:", PERSON_OUT);

  // Step 2: Add OneTribe Berlin design to t-shirt (nano-banana-2/edit)
  if (!fs.existsSync(LOGO_SVG_PATH)) {
    console.error("Logo not found:", LOGO_SVG_PATH);
    process.exit(1);
  }
  const logoPngBuffer = await sharp(LOGO_SVG_PATH)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toBuffer();
  const logoDataUri = `data:image/png;base64,${logoPngBuffer.toString("base64")}`;
  const personDataUri = `data:image/png;base64,${fs.readFileSync(PERSON_OUT).toString("base64")}`;

  console.log("Step 2/3: Adding OneTribe Berlin design to t-shirt (nano-banana-2/edit)...");
  const editResult = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt:
        "Place the OneTribe Berlin design from the second image onto the center of the black t-shirt on the person in the first image. The design has orange artwork on black background. Keep it clearly visible and properly scaled on the chest area.",
      image_urls: [personDataUri, logoDataUri],
      aspect_ratio: "4:5",
      resolution: "1K",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const editedUrl = (editResult.data as { images: { url: string }[] }).images[0].url;
  await download(editedUrl, PERSON_LOGO_OUT);
  console.log("Saved:", PERSON_LOGO_OUT);

  // Step 3: Image to video
  const editedBase64 = fs.readFileSync(PERSON_LOGO_OUT).toString("base64");
  const editedDataUri = `data:image/png;base64,${editedBase64}`;

  console.log("Step 3/3: Generating video (wan-25-preview)...");
  const videoResult = await fal.subscribe("fal-ai/wan-25-preview/image-to-video", {
    input: {
      image_url: editedDataUri,
      prompt:
        "Subtle camera movement, person standing still, soft lighting, professional product shot, minimal motion",
      resolution: "720p",
      duration: "5",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });
  const videoUrl = (videoResult.data as { video: { url: string } }).video.url;
  await download(videoUrl, VIDEO_OUT);
  console.log("Saved:", VIDEO_OUT);
  console.log(`Done. Files: merch-person${suffix}.png, merch-person${suffix}-logo.png, merch-person${suffix}-video.mp4`);
}

main().catch(console.error);
