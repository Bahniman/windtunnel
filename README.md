# Windtunnel

*Last updated: 1 October 2026*

**Live site:** <https://bahniman.github.io/windtunnel/>

Windtunnel is a concept for making pricing-scenario assumptions visible. Its website models an illustrative subscription business with three hand-set cohorts and 500 seeded runs. Visitors can adjust the assumed price increase, cohort count, and strategy, then inspect modeled revenue changes and churn by cohort.

The website is a deterministic local model, not a forecast, confidence interval, backtest, or launch recommendation. Its cohort shares, spending, sensitivity, satisfaction, and variation are assumptions; no company or customer data is connected.

## Explore the site

- **Public pricing-policy example:** a dated Unity policy change and later revision, with links to sources. This is context for asking what scenario models can and cannot answer; the model does not claim it could have predicted the decision.
- **Pricing sandbox:** vary the assumptions, inspect a 500-run distribution, compare modeled cohort churn, and reset the controls. Invalid cohort counts are reported while the last valid count remains in use.
- **Limitations and jargon decoder:** review the questions that would need real evidence and plain-language definitions.

## Design and accessibility

Windtunnel uses the shared Riso Poster design system and project header used by Realium, Heirloom, and Turnstile. On wide screens the header shows section links; on narrower screens it uses a native disclosure menu with page and project navigation. Theme selection is stored in local storage.

The page includes a skip link, semantic headings, labeled inputs, announced invalid-input and reset feedback, pressed states for strategy options, a text summary for the chart, keyboard-operable controls, and reduced-motion styling. These are implemented features, not a formal accessibility certification.

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
- `src/components/pricing-monte-carlo.tsx` — website controls, charts, and result summary.
- `src/lib/pricing-model.ts` — deterministic website scenario model and assumed cohorts.
- `windtunnel/population.py`, `windtunnel/simulate.py` — separate Python prototype.
- `demo.py`, `sample_data/reviews.csv` — CLI walkthrough and bundled sample input.
- `vite.config.ts` — `/windtunnel/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).
