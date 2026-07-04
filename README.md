# Windtunnel

**A flight simulator for management decisions.**

### ▶ Try the live demo (no installation): https://bahniman.github.io/windtunnel.html

---

## In plain English (no jargon)

Pilots practise landings in a flight simulator before flying a real plane full of people. But when a company raises prices for millions of customers, it usually just picks a number in a meeting and hopes for the best.

**Windtunnel is a simulator for that decision.** It builds a crowd of realistic *simulated customers* from a company's real customer reviews, then tries the price change on them thousands of times to predict what would happen — how much revenue moves, how many customers leave, and *which type* of customer leaves. It answers with an honest range ("most likely +5% to +9%"), not a fake-precise single number, and it recommends the cheapest small real-world test to run before committing.

The comparison that makes it click: the thing this competes with isn't a consulting bill — it's the cost of the big decision that turned out wrong.

## The business, concretely

The buyer is any subscription or D2C business facing an irreversible pricing/policy call. The engagement:

1. **Data in:** the company's reviews, order history, churn records, support tickets — everything already sits in their stack. A data-readiness score gates the engagement (decline what the data can't support; credibility is the asset).
2. **Population out:** thousands of simulated customers fitted to that evidence, segment by segment — every synthetic customer traceable to real data, not invented personas.
3. **The rehearsal:** the decision runs hundreds of times. The deliverable is a *distribution* (median, confidence band, probability revenue falls), the segment that breaks, the riskiest assumption named — and the cheapest real-world pilot that would falsify it before full rollout.
4. **Priced per decision**, in days, at a fraction of a consulting engagement — then a subscription for teams that rehearse routinely (every quarterly pricing review, every plan change).

**The moat is the track record:** published backtests against past decisions whose real outcomes are known, accumulated per vertical, including the misses. A copycat can clone the architecture in a weekend; they cannot clone two years of published prediction accuracy. First vertical: D2C subscription pricing, where the input data is richest and decisions recur quarterly.

<details>
<summary><b>Jargon decoder</b> (click to expand)</summary>

| Term | What it actually means |
|---|---|
| **Simulated / synthetic customer** | A made-up but realistic customer, built from patterns in real review data — not a real person. |
| **Segment** | A group of similar customers (e.g. "price-sensitive" vs "quality-focused") who react differently. |
| **Churn** | Customers who quit because of the change. |
| **Monte Carlo simulation** | Running the same scenario many times with a little randomness, to get a *range* of likely outcomes. |
| **Confidence band** | "Most likely between X and Y." Honest about uncertainty instead of pretending to know one exact number. |
| **Backtest** | Checking the tool's predictions against decisions whose real outcomes are already known — the proof it works. |

</details>

---

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
