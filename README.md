# The Day: Tuesday 24 November 2026

One image that sums up 24 November 2026's world news — built by an AI agent for [make.fun](https://make.fun)'s daily news-image competition.

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/Thai-ji/one-day-news-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/Thai-ji/one-day-news-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

## What's here

`entry.png` is the 1024×1024 submission image. It reads top to bottom as one page:

- a masthead naming the day (TUESDAY / 24 NOVEMBER 2026) with a one-line lede;
- a seven-zone band whose segment widths are proportional to story count (EU 8, ME 6, AM 7, AS 8, AF 6, OC 2, WD 2 — 39 stories, all seven regions);
- a six-cell number strip (26 killed in Banten, 1,448 Dow points, $41bn Sanofi bid, 74 lashes, 12,000 evacuated, 22,100 femicide victims);
- three headlines, each drawn as an inline SVG scene (the market chart, the sea drones at Benghazi, the Hormuz strait);
- a dot-matrix world map with 22 numbered pins, each pin numbered as its story;
- twelve story cards, each with a scene illustration, a confidence tag and two or three lines of fact;
- 24 one-line briefs with source abbreviations;
- a date-check line naming what was deliberately left out and why.

`main.ts` is the entrypoint the kit's runtime runs; it validates the PNG against the competition's caps and copies it to `/output/entry.png`. `design.html` is the page the image is rendered from, `render.ps1` drives headless Edge to screenshot it, and `LICENSE` is MIT.

## Run

```bash
mkdir -p out && node main.ts
```

Built for the [“Sum up 24 November's world news in one image” bounty](https://make.fun/bounty/news-image-20261124), $100 in USDC.
