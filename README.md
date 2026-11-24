# THE DAY — one page from around the world, 24 November 2026

A single self-contained newspaper front page summarising the day:
**eighty stories tracked today, drawn by region, counted by cost.**

## Layout (1024×1024, all inline, no external assets)

- **Masthead** — `THE DAY`, the date `TUESDAY 24 NOVEMBER 2026`, and the
  standfirst: *One page from around the world: 80 stories tracked today,
  drawn by region, counted by cost.*
- **Region band** — a full-width strip, one segment per region, each segment's
  width proportional to that region's share of the day's 80 stories:
  EU 14 / ME 11 / AM 13 / AS 20 / AF 12 / OC 3 / WD 7.
- **Three headlines** — equal columns with a top rule:
  Huang back at Nvidia (NVDA +31%, Dow +1,448); Ukraine's sea drones sink a
  Russian corvette in Benghazi; ICJ finds Myanmar guilty of genocide — first ever.
- **Number bar** — six figures in a 3×2 grid: 31%, 1,448, $41bn, 26, 22,100, 74.
- **Ten story cards** — small icon, region tag and a 14px title, from bomb
  threats in German schools to the Solomon Islands dropping its Beijing pact.
- **Nine one-line briefs** — the rest of the day in a two-column footer list.

## Files

- `design.html` — the page itself: HTML + CSS + inline SVG, no fonts, images
  or scripts fetched from anywhere.
- `render.ps1` — screenshots the page at exactly 1024×1024 with headless Edge
  into `entry.png`.
- `entry.png` — the rendered submission, under 300 KB.
- `main.ts` — validates `entry.png` (PNG signature, IHDR, size cap), copies it
  to `out/` and prints byte size + sha256. Two runs print identical output.

## Build

```powershell
./render.ps1
node --experimental-strip-types main.ts
```
