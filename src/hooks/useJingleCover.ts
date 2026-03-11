"use client";

import { useState, useEffect } from "react";

function pictureToDataUrl(picture: { data: number[]; format: string }): string {
  let base64 = "";
  for (let i = 0; i < picture.data.length; i++) {
    base64 += String.fromCharCode(picture.data[i]);
  }
  return `data:${picture.format};base64,${typeof btoa !== "undefined" ? btoa(base64) : ""}`;
}

export function useJingleCover(src: string | null): string | null {
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    if (!src || typeof window === "undefined") return;
    const url = src.startsWith("/") ? `${window.location.origin}${src}` : src;
    if (!url.startsWith("http")) return;

    const jsmediatags = require("jsmediatags");
    jsmediatags.read(url, {
      onSuccess: (tag: { tags?: { picture?: { data: number[]; format: string } } }) => {
        const picture = tag.tags?.picture;
        if (picture?.data?.length) {
          setCover(pictureToDataUrl(picture));
        }
      },
      onError: () => {},
    });
  }, [src]);

  return cover;
}
