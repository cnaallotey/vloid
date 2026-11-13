import fs from "node:fs";
import path from "node:path";

const EXTS = ["avif", "webp", "jpg", "jpeg", "png"];

/**
 * Server-only: returns `/images/<name>.<ext>` if that file exists in
 * public/images, otherwise null. Drop `hero.webp` / `cta.webp` in and the
 * page picks them up — no code change needed. Prompts: image-prompts.md.
 */
export function findImage(name: string): string | null {
  for (const ext of EXTS) {
    const file = path.join(process.cwd(), "public", "images", `${name}.${ext}`);
    if (fs.existsSync(file)) return `/images/${name}.${ext}`;
  }
  return null;
}
