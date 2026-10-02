# Windtunnel

*Last updated: 2 October 2026*

**Live site:** <https://bahniman.github.io/windtunnel/>

**Test the wind.** Windtunnel plays a price increase out 500 times across three customer groups, then shows who leaves, what revenue does, and how often the move backfires. Each run draws a different market mood, and cancellations climb fast past a 20% rise.

## Explore the site

- **The case:** Unity's 2023 per-install Runtime Fee, the backlash, the CEO's departure and the 2024 reversal to plain subscription rises (Pro +8%, Enterprise +25%), with sources.
- **The tunnel:** set the increase (5 to 40%), the subscriber count and how the increase lands (flat, tiered, SMB-only). Read the 10th percentile, median, 90th percentile, share of losing runs and churn by group. At 8,500 subscribers a flat 12% rise never loses money; a flat 30% rise loses money in 58% of runs.
- **Weak spots:** the three questions a CFO would ask, each with an answer.

The tunnel runs in the browser on three hand-set customer groups. The Python side (`windtunnel/`) grows a synthetic population from a reviews file; checking the model against real past price changes is the next step.

## Design

The site uses the Riso Poster system shared with [the portfolio](https://bahniman.github.io/): cream paper (dark ink in dark mode), blue and pink overprinted inks, yellow stickers, 2.5px ink outlines and hard offset shadows; Bricolage Grotesque, Newsreader and Space Mono. Every project page is built from the same poster kit (`src/poster.css`): an overprinted headline beside a tilted demo board, a ticket strip of key facts, a blue statement band, stamped cards, a framed live demo, objection cards and a strip linking to the other three prototypes. Each page keeps its own board, ink order and subject.

Motion follows the portfolio: a staged hero entrance, scroll reveals with a slight tilt, smooth wheel scrolling, lift-and-press buttons, a reading-progress rule and a back-to-top sticker. Reduced-motion settings turn all of it off. The page has a skip link, labelled controls, visible focus and keyboard-operable demos.

## Run the website locally

Requires Node.js 22.12+ and npm.

```bash
npm install
npm run dev       # local Vite development server
npm run build     # production assets in docs/
npm run preview   # preview the production build
npx tsc --noEmit  # TypeScript check
```

The Vite build uses `/windtunnel/` as its base path and writes static output to `docs/` for GitHub Pages.

## Run the Python prototype

Requires Python 3.9+; the CLI demo uses the Python standard library and bundled sample review data.

```bash
python demo.py
```

The Python CLI and website are separate implementations. The CLI builds sample profiles from `sample_data/reviews.csv` and runs its own pricing simulation. Its current output labels the p10–p90 span an “80% confidence band”; those are percentiles of the model runs, not a statistically calibrated confidence interval or real-world uncertainty estimate. The printed interpretation and suggested test are hand-authored examples, not conclusions produced or validated by the model.

## Source map

- `src/poster.css`, `src/components/suite-next.tsx`: shared poster kit and the next-prototype strip.
- `src/page.tsx`: website narrative and sections.
- `src/components/pricing-hero-sheet.tsx`: interactive hero strategy preview using the website model defaults.
- `src/components/pricing-monte-carlo.tsx`: website controls, charts, and result summary.
- `src/lib/pricing-model.ts`: deterministic website scenario model and assumed cohorts.
- `windtunnel/population.py`, `windtunnel/simulate.py`: separate Python prototype.
- `demo.py`, `sample_data/reviews.csv`: CLI walkthrough and bundled sample input.
- `src/components/suite-header.tsx`, `src/components/suite-motion.tsx`: shared project navigation, anchor focus/history, active-section state, progress, and back-to-top behavior.
- `src/riso-tokens.css`, `src/riso-suite.css`, `src/riso-motion.css`: shared Riso tokens, components, and motion/reduced-motion rules.
- `vite.config.ts`: `/windtunnel/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).