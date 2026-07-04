"""Run a pricing decision against the synthetic population, many times.

Churn model (prototype, transparent):
  p(churn) = sensitivity * price_shock * (1.35 - satisfaction), clamped
where price_shock = price increase as a fraction. Survivors keep buying at
the new price; churners take their whole spend to zero. Monte Carlo over
population resamples gives distributions, not point guesses.
"""
import random
import statistics


def simulate_price_change(population, price_increase_pct: float,
                          runs: int = 200, seed: int = 11) -> dict:
    rng = random.Random(seed)
    shock = price_increase_pct / 100.0

    base_revenue = sum(c.monthly_spend for c in population)
    deltas, churn_rates, seg_churn_acc = [], [], {}

    for _ in range(runs):
        churned_spend = 0.0
        churned = 0
        seg_counts = {}
        for c in population:
            p = c.price_sensitivity * shock * (1.35 - c.satisfaction)
            p = min(0.95, max(0.0, p))
            if rng.random() < p:
                churned += 1
                churned_spend += c.monthly_spend
                seg_counts[c.segment] = seg_counts.get(c.segment, 0) + 1
        survivors_revenue = (base_revenue - churned_spend) * (1 + shock)
        deltas.append((survivors_revenue - base_revenue) / base_revenue * 100)
        churn_rates.append(churned / len(population) * 100)
        for k, v in seg_counts.items():
            seg_churn_acc.setdefault(k, []).append(v)

    deltas.sort()
    seg_totals = {s: sum(1 for c in population if c.segment == s)
                  for s in {c.segment for c in population}}
    seg_churn = {s: round(statistics.mean(v) / seg_totals[s] * 100, 1)
                 for s, v in seg_churn_acc.items()}

    def pct(q):
        return deltas[min(len(deltas) - 1, int(q * len(deltas)))]

    return {
        "price_increase_pct": price_increase_pct,
        "runs": runs,
        "population": len(population),
        "revenue_delta_median": round(statistics.median(deltas), 2),
        "revenue_delta_p10": round(pct(0.10), 2),
        "revenue_delta_p90": round(pct(0.90), 2),
        "churn_rate_mean": round(statistics.mean(churn_rates), 2),
        "segment_churn_pct": dict(sorted(seg_churn.items(),
                                         key=lambda kv: -kv[1])),
        "downside_risk_pct_runs": round(
            sum(1 for d in deltas if d < 0) / len(deltas) * 100, 1),
    }


def histogram(deltas_summary: dict, width: int = 46) -> str:
    """Cheap text visualization of the outcome band."""
    lo, med, hi = (deltas_summary["revenue_delta_p10"],
                   deltas_summary["revenue_delta_median"],
                   deltas_summary["revenue_delta_p90"])
    span = max(hi - lo, 0.01)
    pos = int((med - lo) / span * width)
    bar = ["-"] * (width + 1)
    bar[0], bar[-1] = "|", "|"
    bar[min(max(pos, 0), width)] = "M"
    return (f"  p10 {lo:+.1f}%  " + "".join(bar) + f"  p90 {hi:+.1f}%   (M = median {med:+.1f}%)")
