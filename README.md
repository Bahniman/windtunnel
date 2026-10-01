# Windtunnel

*Last updated: 1 October 2026*

**Live site:** <https://bahniman.github.io/windtunnel/>

Windtunnel is a concept for making pricing-scenario assumptions visible. Its website models an illustrative subscription business with three hand-set cohorts and 500 seeded runs. Visitors can adjust the assumed price increase, cohort count, and strategy, then inspect modeled revenue changes and churn by cohort.

The website is a deterministic local model, not a forecast, confidence interval, backtest, or launch recommendation. Its cohort shares, spending, sensitivity, satisfaction, and variation are assumptions; no company or customer data is connected.

## Explore the site

- **Public pricing-policy example:** a dated Unity policy change and later revision, with links to sources. This is context for asking what scenario models can and cannot answer; the model does not claim it could have predicted the decision.
- **Hero scenario sheet:** preview Flat, Tiered, or SMB-only patterns on the existing model with a fixed 12% base move, 8,500 assumed subscribers, and 500 seeded runs.
- **Pricing sandbox:** vary the price increase, cohort count, and strategy; inspect a 500-run distribution, compare modeled cohort churn, and reset the controls. Invalid cohort counts are reported while the last valid count remains in use.
- **Limitations and jargon decoder:** review the questions that would need real evidence and plain-language definitions.

## Design and accessibility

Windtunnel uses the shared Riso Poster design system and responsive project header used by Realium, Heirloom, and Turnstile. Its hero worksheet recalculates the same local model when visitors choose Flat, Tiered, or SMB-only; its cohort and run assumptions stay visible. The headline and pricing sheet enter in a staggered sequence, section content reveals as you read, and buttons respond with a small lift and press. The worksheet gives Windtunnel's pricing scenarios a distinct focal point within the shared visual style. On narrower screens, section links move into a native disclosure menu; the light/dark theme choice is stored locally. Wheel input uses smooth scrolling, while touch gestures and the browser scrollbar remain native. Section links update the URL fragment, move focus to the destination, and support browser back/forward. The header marks the current section and shows reading progress. A back-to-top link returns focus to the main content. Reduced-motion preferences keep the plotted distribution static.

The page includes a skip link, semantic headings, labeled inputs, announced invalid-input and reset feedback, pressed states for strategy options, a text summary for the chart, keyboard-operable controls, and reduced-motion styling. These are implemented features, not a formal accessibility certification.

Selected pricing patterns use dark ink on pink so both their names and explanatory notes stay readable in either theme. Source links use readable ink variants, and the jargon disclosure supports keyboard opening and closing.

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

- `src/page.tsx` — website narrative and sections.
- `src/components/pricing-hero-sheet.tsx` — interactive hero strategy preview using the website model defaults.
- `src/components/pricing-monte-carlo.tsx` — website controls, charts, and result summary.
- `src/lib/pricing-model.ts` — deterministic website scenario model and assumed cohorts.
- `windtunnel/population.py`, `windtunnel/simulate.py` — separate Python prototype.
- `demo.py`, `sample_data/reviews.csv` — CLI walkthrough and bundled sample input.
- `src/components/suite-header.tsx`, `src/components/suite-motion.tsx` — shared project navigation, anchor focus/history, active-section state, progress, and back-to-top behavior.
- `src/riso-tokens.css`, `src/riso-suite.css`, `src/riso-motion.css` — shared Riso tokens, components, and motion/reduced-motion rules.
- `vite.config.ts` — `/windtunnel/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).