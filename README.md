# THE DAY - 24 November 2026

One image that sums up the world's news of Tuesday 24 November 2026, for the
make.fun `news-image-20261124` contest.

- `design.html` - the poster, a fixed 1024x1024 canvas drawn with plain HTML,
  CSS and inline SVG icons. No external fonts, images or scripts.
- `entry.png` - the rendered poster (1024x1024, under 1 MiB), produced from
  `design.html` with a headless Edge screenshot.
- `main.ts` - the entry program: it checks `entry.png` (PNG signature, IHDR,
  size limits) and copies it to the contest output directory.

## Run

```sh
mkdir -p out
MAKEFUN_OUTPUT_DIR=out node --experimental-strip-types main.ts
```

The program writes `out/entry.png` and prints its byte size and sha256.

## Layout

A masthead with the date, three lead stories (Nvidia's chief executive returns;
Ukrainian sea drones strike a Russian corvette in Benghazi; the ICJ finds a
state committed genocide), a colour band sized by how many stories each region
contributed, a strip of six numbers from the day, ten story cards and twelve
one-line briefs.

## Licence

MIT, see `LICENSE`.
