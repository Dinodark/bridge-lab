"use client";

import { useEffect, useState } from "react";

const WORDS = ["Bridge", "Tribe"];
const INTERVAL_MS = 3000;

export default function BridgeTribeWord() {
  const [index, setIndex] = useState(0);
  const word = WORDS[index];

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex bridge-tribe-word" style={{ minWidth: "5.5ch" }}>
      {word.split("").map((char, i) => (
        <span
          key={`${word}-${i}-${char}`}
          className="bridge-tribe-letter inline-block"
          style={{ ["--letter-delay" as string]: `${i * 95}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
