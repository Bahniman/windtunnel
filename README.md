# Windtunnel

**A flight simulator for management decisions.**

Pilots rehearse landings. Surgeons rehearse operations. A CEO changes pricing for two million customers on a slide deck and a gut call. The biggest decisions companies make — pricing, policy changes, product removals — ship untested, because there is nowhere to test them:

- A/B tests only work after launch, on small reversible things, with real customers as the crash-test dummies.
- Consulting sells analysis and benchmarks at millions per engagement, with no falsifiable prediction attached.
- Spreadsheet models assume customers are averages. Customers are populations, with segments that react differently and loudly.

Windtunnel builds a synthetic population of a company's own customers — grown from its actual reviews, tickets and transactions, every synthetic customer tracing back to evidence — and runs the decision against it hundreds of times before any real customer feels it.

## Quickstart

Python 3.9+, zero dependencies.

```bash
python demo.py
```

The demo rehearses a 12% price increase for a D2C brand:

```
revenue delta (median): +8.8%
80% confidence band   : +8.5% to +9.0%
expected churn        : 3.5% of customers

segment report:
  price_sensitive    loses  6.3% of its customers
  convenience        loses  2.6% ...
  quality_focused    loses  2.1% ...
```

Then it does what a wind tunnel is for: names the riskiest assumption (that price-sensitive customers absorb +12%), and proposes the cheapest real-world experiment (segment-limited rollout, A/B a +6% variant, with the +6% simulation alongside).

## How it works

| Stage | File | Prototype | Production |
|---|---|---|---|
| Population | `windtunnel/population.py` | Transparent keyword segmentation over a reviews CSV; spend/satisfaction distributions from the data | LLM-graded segmentation over reviews, tickets, transactions, CRM; per-vertical calibration |
| Simulation | `windtunnel/simulate.py` | Explicit churn model: sensitivity x price shock x dissatisfaction; Monte Carlo over resamples | Behaviorally-grounded agent responses; competitor reactions; time dynamics |
| Report | `demo.py` | Confidence bands, downside probability, breaking segment, next experiment | Full decision memo with backtest references |

The design rule that survives from prototype to production: **distributions, not point guesses; provenance, not personas; and always name the experiment that would falsify the result.** Windtunnel is positioned as a pre-mortem instrument that sharpens the launch experiment — not an oracle that replaces judgment.

## Why this is a company

The comparison is not "versus consulting fees." It is versus the write-off from the decision that turned out wrong. The moat is a track record: every backtest against a known historical outcome, and every vertical's calibration data, compounds into something a copycat cannot download.

## Status and roadmap

Working concept prototype.

- [x] Evidence-grown population, Monte Carlo pricing simulation, confidence bands, segment breakage, next-experiment recommendation
- [ ] LLM-graded segmentation and response modeling (drop-in behind the same interfaces)
- [ ] Backtest harness: replay historical pricing decisions with known outcomes, publish accuracy
- [ ] Second decision type: retention/policy changes
- [ ] Data-readiness scoring (decline engagements the data cannot support)

## License

MIT
