/**
 * Merch workflow: person in black t-shirt → add logo → video
 * 1. nano-banana-2: generate person in black t-shirt
 * 2. nano-banana-2/edit: add OneTribe logo to t-shirt
 * 3. wan-25-preview/image-to-video: create video
 *
 * Run: npm run generate-merch-person-video
 * Requires: FAL_KEY in .env.local
 *
 * Output: public/assets/merch-person-with-logo.png, public/assets/merch-person-video.mp4
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import { fal } from "@fal-ai/client";

const LOGO_PATH = path.join(process.cwd(), "public/sticker-1-onetribe.png");
const PERSON_OUT = path.join(process.cwd(), "public/assets/merch-person.png");
const WITH_LOGO_OUT = path.join(process.cwd(), "public/assets/merch-person-with-logo.png");
const VIDEO_OUT = path.join(process.cwd(), "public/assets/merch-person-video.mp4");

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

  if (!fs.existsSync(LOGO_PATH)) {
    console.error("Logo not found:", LOGO_PATH, "- using sticker-1-onetribe.png");
    process.exit(1);
  }

  // Step 1: Generate person in black t-shirt
  console.log("Step 1/3: Generating person in black t-shirt (nano-banana-2)...");
  const personResult = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt:
        "Professional photo of a person wearing a plain black t-shirt, chest and shoulders visible, neutral background, studio lighting, high quality, portrait style, centered composition",
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

  // Step 2: Add logo to t-shirt
  console.log("Step 2/3: Adding OneTribe logo to t-shirt (nano-banana-2/edit)...");
  const logoBuffer = fs.readFileSync(LOGO_PATH);
  const logoBase64 = logoBuffer.toString("base64");
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  const editResult = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt:
        "Place the OneTribe logo from the second image onto the center of the black t-shirt on the person. The logo should be clearly visible on the chest area, properly scaled and integrated.",
      image_urls: [personUrl, logoDataUri],
      aspect_ratio: "4:5",
      resolution: "1K",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });

  const withLogoUrl = (editResult.data as { images: { url: string }[] }).images[0].url;
  await download(withLogoUrl, WITH_LOGO_OUT);
  console.log("Saved:", WITH_LOGO_OUT);

  // Step 3: Image to video
  console.log("Step 3/3: Creating video (wan-25-preview)...");
  const withLogoBuffer = fs.readFileSync(WITH_LOGO_OUT);
  const withLogoDataUri = `data:image/png;base64,${withLogoBuffer.toString("base64")}`;

  const videoResult = await fal.subscribe("fal-ai/wan-25-preview/image-to-video", {
    input: {
      image_url: withLogoDataUri,
      prompt:
        "Gentle camera movement, person stands still, subtle ambient motion, professional product shot feel, soft lighting",
      resolution: "720p",
      duration: "5",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
    },
  });

  const videoUrl = (videoResult.data as { video: { url: string } }).video.url;
  console.log("Video URL:", videoUrl);
  await download(videoUrl, VIDEO_OUT);
  console.log("Saved:", VIDEO_OUT);
  console.log("Done! Add to Merch gallery.");
}

main().catch(console.error);
