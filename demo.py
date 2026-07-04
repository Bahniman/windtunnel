"""Windtunnel demo: rehearse a 12% price increase against 10,000 synthetic
customers grown from real review evidence, before any real customer feels it.

Run:  python demo.py     (zero dependencies)
"""
from collections import Counter

from windtunnel import build_population, simulate_price_change
from windtunnel.simulate import histogram

W = 74


def banner(t):
    print("\n" + "=" * W + "\n" + t + "\n" + "=" * W)


def main():
    banner("WINDTUNNEL: rehearse the decision before the customers feel it")

    print("\n  The decision on the table: raise prices 12% across the catalog.")
    print("  The usual method: a spreadsheet, a meeting, and hope.")

    banner("1. Grow the population from evidence, not personas")
    pop = build_population("sample_data/reviews.csv", n=10_000)
    mix = Counter(c.segment for c in pop)
    print(f"\n  {len(pop):,} synthetic customers grown from 30 real reviews")
    for seg, n in mix.most_common():
        share = n / len(pop) * 100
        print(f"    {seg:<18} {share:5.1f}%")
    sample = pop[0]
    print(f"\n  every customer carries provenance, e.g. grown from:")
    print(f"    \"{sample.source_review}...\"")

    banner("2. Run the decision 200 times")
    r = simulate_price_change(pop, price_increase_pct=12, runs=200)
    print(f"\n  price increase        : +{r['price_increase_pct']}%")
    print(f"  simulated runs        : {r['runs']} x {r['population']:,} customers")
    print(f"\n  revenue delta (median): {r['revenue_delta_median']:+.1f}%")
    print(f"  80% confidence band   : {r['revenue_delta_p10']:+.1f}% to {r['revenue_delta_p90']:+.1f}%")
    print(f"  runs ending negative  : {r['downside_risk_pct_runs']}%")
    print(f"  expected churn        : {r['churn_rate_mean']:.1f}% of customers\n")
    print(histogram(r))

    banner("3. Where it breaks: the segment report")
    print()
    for seg, churn in r["segment_churn_pct"].items():
        print(f"    {seg:<18} loses {churn:5.1f}% of its customers")
    worst = next(iter(r["segment_churn_pct"]))
    print(f"\n  The damage concentrates in the {worst} segment.")

    banner("4. What Windtunnel tells the room")
    small = simulate_price_change(pop, price_increase_pct=6, runs=200)
    print(f"""
  The riskiest assumption: that price-sensitive customers absorb +12%.
  The simulation says they will not; that is where the churn lives.

  Cheapest real-world test before committing: run +12% on the
  quality-focused segment only, where simulated churn is lowest, and
  A/B a +6% variant. Simulated +6%: median {small['revenue_delta_median']:+.1f}%,
  band {small['revenue_delta_p10']:+.1f}% to {small['revenue_delta_p90']:+.1f}%, downside runs {small['downside_risk_pct_runs']}%.

  A rehearsal, confidence bands, the breaking segment, and the next
  experiment: that is Windtunnel. Not an oracle; a wind tunnel.
""")


if __name__ == "__main__":
    main()
