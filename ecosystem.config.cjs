/**
 * PM2 ecosystem config для tribe.vatoko.ru.
 */
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
const env = { NODE_ENV: "production", PORT: 3003 }; // ВАЖНО: порт 3003

if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmed = line.replace(/\r$/, "").trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eq = trimmed.indexOf("=");
        if (eq > 0) {
          const key = trimmed.slice(0, eq).trim();
          let val = trimmed
            .slice(eq + 1)
            .trim()
            .replace(/\r$/, "")
            .replace(/\\\s*$/, "");
          if (
            (val.startsWith('"') && val.includes('"', 1)) ||
            (val.startsWith("'") && val.includes("'", 1))
          ) {
            const endQuote = val.indexOf(val[0], 1);
            if (endQuote > 0) val = val.slice(1, endQuote);
          }
          env[key] = val.trim();
        }
      }
    });
}

module.exports = {
  apps: [
    {
      name: "tribe",      // имя процесса в pm2
      script: "server.js",
      cwd: __dirname,
      env,
    },
  ],
};