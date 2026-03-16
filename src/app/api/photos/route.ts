import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
const PHOTOS_FOLDER = "style-01";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "photos", PHOTOS_FOLDER);
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) =>
        IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext))
      )
      .sort();

    const photos = files.map((name) => ({
      src: `/photos/${PHOTOS_FOLDER}/${name}`,
      alt: name,
    }));

    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ photos: [] });
  }
}
