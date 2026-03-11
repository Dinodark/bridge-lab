/**
 * Generate petrogliph merch mockups: t-shirt, backpack, bag, etc.
 * Uses petrogliph-full.svg + fal.ai (nano-banana-2, FLUX, nano-banana-2/edit).
 *
 * Run: npm run generate-petrogliph-merch [--product=tshirt-black]
 * Products: tshirt-black, tshirt-white, backpack, bag, flag, car-hood, notebook
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

type ProductId = "tshirt-black" | "tshirt-white" | "backpack" | "bag" | "flag" | "car-hood" | "notebook";

const PRODUCTS: Record<
  ProductId,
  { basePrompt: string; editPrompt: string; aspectRatio: string; model: "nano" | "flux" }
> = {
  "tshirt-black": {
    model: "nano",
    basePrompt: "Professional photo of a person wearing a plain black t-shirt, chest visible, studio lighting, neutral background, portrait, high quality",
    editPrompt: "Place the petroglyph design from the second image onto the center of the black t-shirt on the person. The design has white and orange line art on black background. Keep it clearly visible on the chest.",
    aspectRatio: "4:5",
  },
  "tshirt-white": {
    model: "nano",
    basePrompt: "Professional photo of a light-skinned white woman wearing a plain black t-shirt, chest visible, studio lighting, neutral background, portrait, high quality",
    editPrompt: "Place the petroglyph design from the second image onto the center of the black t-shirt on the person. The design has white and orange line art on black background. Keep it clearly visible on the chest.",
    aspectRatio: "4:5",
  },
  backpack: {
    model: "flux",
    basePrompt: "Product photo of a black backpack, front pocket visible, studio lighting, white background, commercial shot",
    editPrompt: "Place the petroglyph design from the second image onto the front pocket of the backpack. The design has white and orange artwork on black. Keep it centered and visible.",
    aspectRatio: "4:5",
  },
  bag: {
    model: "flux",
    basePrompt: "Product photo of a black canvas tote bag, front visible, flat lay or hanging, studio lighting, white background",
    editPrompt: "Place the petroglyph design from the second image onto the front of the tote bag. The design has white and orange artwork. Keep it centered and clearly visible.",
    aspectRatio: "4:5",
  },
  flag: {
    model: "flux",
    basePrompt: "Black flag on a pole, fabric visible, outdoor, simple background",
    editPrompt: "Place the petroglyph design from the second image onto the center of the black flag. The design has white and orange artwork. Keep it centered and visible on the flag fabric.",
    aspectRatio: "3:4",
  },
  "car-hood": {
    model: "flux",
    basePrompt: "Black car hood, glossy paint, front view, product shot, studio lighting, automotive",
    editPrompt: "Place the petroglyph design from the second image onto the black car hood as a vinyl decal or wrap. The design has white and orange artwork. Cover the hood with the design, make it look like a real car decal.",
    aspectRatio: "4:5",
  },
  notebook: {
    model: "flux",
    basePrompt: "Black hardcover notebook or journal, front cover visible, product shot, studio lighting",
    editPrompt: "Place the petroglyph design from the second image onto the center of the notebook cover. The design has white and orange artwork. Keep it centered and clearly visible.",
    aspectRatio: "4:5",
  },
};

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
  console.log("Trying curl fallback...");
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

  const productArg = process.argv.find((a) => a.startsWith("--product=")) ?? process.argv[2];
  const productId = typeof productArg === "string" && productArg.startsWith("--product=")
    ? productArg.split("=")[1]
    : productArg;
  const products: ProductId[] = productId && PRODUCTS[productId as ProductId]
    ? [productId as ProductId]
    : (Object.keys(PRODUCTS) as ProductId[]);

  for (const id of products) {
    const config = PRODUCTS[id];
    if (!config) {
      console.warn("Unknown product:", id);
      continue;
    }
    const outPath = path.join(MERCH_DIR, `${id}.png`);
    console.log(`\n--- ${id} ---`);

    let baseDataUri: string;

    if (config.model === "nano") {
      console.log("Generating base image (nano-banana-2)...");
      const baseResult = await fal.subscribe("fal-ai/nano-banana-2", {
        input: {
          prompt: config.basePrompt,
          aspect_ratio: config.aspectRatio as "4:5" | "1:1" | "3:4",
          resolution: "1K",
        },
        logs: true,
        onQueueUpdate: (u) => {
          if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
        },
      });
      const baseUrl = (baseResult.data as { images: { url: string }[] }).images[0].url;
      const basePath = path.join(MERCH_DIR, `${id}-base.png`);
      await download(baseUrl, basePath);
      baseDataUri = `data:image/png;base64,${fs.readFileSync(basePath).toString("base64")}`;
    } else {
      console.log("Generating base image (FLUX Schnell)...");
      const fluxSize = config.aspectRatio === "1:1" ? "square_hd" : "portrait_4_3";
      const baseResult = await fal.subscribe("fal-ai/flux/schnell", {
        input: {
          prompt: config.basePrompt,
          image_size: fluxSize,
          num_inference_steps: 4,
          guidance_scale: 3.5,
          output_format: "png",
        },
        logs: true,
        onQueueUpdate: (u) => {
          if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
        },
      });
      const baseUrl = (baseResult.data as { images: { url: string }[] }).images[0].url;
      const basePath = path.join(MERCH_DIR, `${id}-base.png`);
      await download(baseUrl, basePath);
      baseDataUri = `data:image/png;base64,${fs.readFileSync(basePath).toString("base64")}`;
    }

    console.log("Adding design (nano-banana-2/edit)...");
    const editResult = await fal.subscribe("fal-ai/nano-banana-2/edit", {
      input: {
        prompt: config.editPrompt,
        image_urls: [baseDataUri, designDataUri],
        aspect_ratio: config.aspectRatio as "4:5" | "1:1" | "3:4" | "16:9",
        resolution: "1K",
      },
      logs: true,
      onQueueUpdate: (u) => {
        if (u.status === "IN_PROGRESS" && u.logs) u.logs.map((l) => l.message).forEach(console.log);
      },
    });
    const editedUrl = (editResult.data as { images: { url: string }[] }).images[0].url;
    await download(editedUrl, outPath);
    console.log("Saved:", outPath);
  }

  console.log("\nDone.");
}

main().catch(console.error);
