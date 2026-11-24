// THE DAY - news image entry for make.fun (news-image-20261124)
// Copies the rendered poster to the contest output directory after checking it.
import { createHash } from "node:crypto";
import { copyFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

const size = statSync(src).size;
if (size === 0) throw new Error("entry.png is empty");
if (size > MAX_BYTES) throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);

const png = Buffer.alloc(24);
const fh = await (await import("node:fs/promises")).open(src, "r");
try {
  await fh.read(png, 0, 24, 0);
} finally {
  await fh.close();
}
const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!png.subarray(0, 8).equals(signature)) throw new Error("entry.png is not a PNG");
if (png.readUInt32BE(8) !== 13 || png.toString("ascii", 12, 16) !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk");
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}

copyFileSync(src, dst);
const hash = createHash("sha256").update(await (await import("node:fs/promises")).readFile(dst)).digest("hex");
console.log(`entry.png: ${size} bytes, 1024x1024, sha256 ${hash}`);
console.log(`copied to ${dst}`);
