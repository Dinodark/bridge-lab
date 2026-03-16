import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SUPPORTED_LANGS = ["ru", "de"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function isValidLang(lang: string | null): lang is Lang {
  return SUPPORTED_LANGS.includes((lang as Lang) ?? "ru");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get("lang");
  const lang: Lang = isValidLang(langParam) ? (langParam as Lang) : "ru";

  try {
    const dir = path.join(process.cwd(), "public", "banners", lang);
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)))
      .sort();

    const banners = files.map((name) => ({
      src: `/banners/${lang}/${name}`,
      alt: name,
    }));

    return NextResponse.json({ banners });
  } catch (error) {
    // If directory doesn't exist or any other error, return empty list
    return NextResponse.json({ banners: [] });
  }
}

