// Validate entry.png against the competition's caps, then stage it as the entry
// artifact. The grader mounts the repository read-only at /bot and gives a
// writable /output, so the destination comes from MAKEFUN_OUTPUT_DIR (which
// stands in for /output outside the container). Both runs must write the same
// bytes: the copy is byte for byte the validated source.
import { createHash } from 'node:crypto';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dst = join(outDir, 'entry.png');

const buf = readFileSync(src);

// PNG signature: 89 50 4E 47 0D 0A 1A 0A
const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (buf.length < 8 || !buf.subarray(0, 8).equals(SIG)) {
  throw new Error('not a PNG: bad signature');
}
// IHDR must be the first chunk: length 13, type "IHDR".
if (buf.readUInt32BE(8) !== 13 || buf.toString('ascii', 12, 16) !== 'IHDR') {
  throw new Error('first chunk is not IHDR');
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`canvas ${width}x${height} exceeds the 1024px cap`);
}
if (buf.length > 1048576) {
  throw new Error(`file is ${buf.length} bytes, over the 1 MiB cap`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
const copied = readFileSync(dst);
const sha = createHash('sha256').update(copied).digest('hex');

console.log(`entry.png: ${copied.length} bytes, ${width}x${height}, sha256 ${sha} -> ${dst}`);
