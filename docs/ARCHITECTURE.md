# Windtunnel — architecture

## Pipeline

```
company evidence (reviews, tickets, transactions, CRM)
   |   segmentation + distribution fitting   (provenance kept per customer)
   v
synthetic population (10k+ customers: segment, spend, satisfaction, sensitivity)
   |   decision applied N times (Monte Carlo over resamples)
   v
outcome distribution
   |-- median + confidence band
   |-- downside probability (share of runs ending negative)
   |-- segment breakage report
   +-- riskiest assumption -> cheapest falsifying experiment
```

## Design rules

1. **Distributions, not point guesses.** A single number invites false
   confidence; a band with a downside probability invites the right argument.
2. **Provenance, not personas.** Every synthetic customer traces to real
   evidence. "Grown from: 'Too expensive for what it is...'" is auditable;
   "Meet persona Priya, 28" is theater.
3. **Always name the falsifying experiment.** The output of a rehearsal is a
   better real-world test, not a permission slip to skip testing.
4. **Transparent models first.** The prototype's churn model is one line and
   inspectable. LLM-graded behavior slots in behind the same interface once
   backtests justify the added opacity.

## The moat is the backtest ledger

The plan for credibility, in order:
1. Replay historical decisions with known outcomes (public case studies,
   partner data). Publish accuracy, including the misses.
2. Calibrate per vertical (D2C first). Calibration data compounds.
3. Only then widen decision types (retention policies, feature removal,
   fee structures).

A follower can copy the architecture in a weekend. They cannot copy two
years of published prediction accuracy.

## Honest limits

- Simulated humans are a model, not the market; competitor response and
  macro shocks are out of scope for v0.
- Garbage in, garbage out: a data-readiness score gates engagements.
- The product claim is bounded on purpose: a wind tunnel, not an oracle.
