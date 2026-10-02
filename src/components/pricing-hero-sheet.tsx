import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { runPricingSimulation, SEGMENTS, type Strategy } from "@/lib/pricing-model";

const RUNS = 500;
const BIN_COUNT = 20;
const PRICE_INCREASE = 12;
const COHORT_SIZE = 8_500;
const patterns: { id: Strategy; label: string }[] = [
  { id: "flat", label: "Flat" },
  { id: "tiered", label: "Tiered" },
  { id: "smb", label: "SMB only" },
];
const formatPct = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

function getDistribution(result: ReturnType<typeof runPricingSimulation>) {
  const low = result.deltas[0] ?? 0;
  const high = result.deltas[result.deltas.length - 1] ?? 0;
  const bins = Array.from({ length: BIN_COUNT }, () => 0);
  result.deltas.forEach((value) => {
    const position = high === low ? 0 : Math.floor(((value - low) / (high - low)) * BIN_COUNT);
    bins[Math.min(BIN_COUNT - 1, position)]++;
  });
  const peak = Math.max(1, ...bins);
  return { low, high, bins, peak };
}

export function PricingHeroSheet() {
  const reduceMotion = useReducedMotion();
  const [strategy, setStrategy] = useState<Strategy>("flat");
  const result = useMemo(() => runPricingSimulation(PRICE_INCREASE, COHORT_SIZE, strategy, RUNS), [strategy]);
  const { low, high, bins, peak } = useMemo(() => getDistribution(result), [result]);

  return (
    <figure className="price-sheet" aria-labelledby="price-sheet-title">
      <figcaption className="price-sheet-head">
        <span id="price-sheet-title">Scenario sheet</span>
        
      </figcaption>

      <div className="price-sheet-inputs">
        <div className="price-sheet-change">
          <strong>+{PRICE_INCREASE}%</strong>
          <span>base price move</span>
        </div>
        <div className="price-sheet-count">
          <span>Subscribers</span>
          <strong>{COHORT_SIZE.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="price-pattern-picker" role="group" aria-label="Preview a pricing pattern">
        <span>Change the pattern</span>
        <div>{patterns.map((pattern) => (
          <button key={pattern.id} type="button" aria-pressed={strategy === pattern.id} onClick={() => setStrategy(pattern.id)}>
            {pattern.label}
          </button>
        ))}</div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {patterns.find((pattern) => pattern.id === strategy)?.label} pattern selected. Modeled monthly revenue change: 10th percentile {formatPct(result.p10)}, median {formatPct(result.median)}, 90th percentile {formatPct(result.p90)}.
      </p>

      <div className="price-sheet-cohorts" role="group" aria-label="Hand-set cohort assumptions">
        <div className="price-cohort-head">
          <span>Customer groups</span>
          <span>Share</span>
          <span>Monthly spend</span>
        </div>
        {SEGMENTS.map((segment) => (
          <div className="price-cohort-row" key={segment.id}>
            <strong>{segment.name}</strong>
            <span className="price-share">
              <span className="price-share-track" aria-hidden="true">
                <span style={{ width: `${segment.share * 100}%` }} />
              </span>
              <span>{Math.round(segment.share * 100)}%</span>
            </span>
            <span className="price-spend">₹{segment.monthlySpend.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>

      <div className="price-sheet-distribution">
        <div className="price-distribution-head">
          <strong>Monthly revenue change, 500 runs</strong>
          <span>{patterns.find((pattern) => pattern.id === strategy)?.label} · 500 runs</span>
        </div>
        <div
          className="price-bars"
          role="img"
          aria-label={`Distribution from ${formatPct(low)} to ${formatPct(high)}. 10th percentile ${formatPct(result.p10)}, median ${formatPct(result.median)}, 90th percentile ${formatPct(result.p90)}. These are outputs of an illustrative model.`}
        >
          {bins.map((count, index) => {
            const binValue = low + ((index + 0.5) / BIN_COUNT) * (high - low);
            return (
            <motion.span
              key={index}
              aria-hidden="true"
              data-negative={binValue < 0 ? "true" : "false"}
              style={{ height: `${Math.max(4, (count / peak) * 100)}%` }}
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.36, delay: Math.min(index * 0.012, 0.22), ease: [0.16, 1, 0.3, 1] }}
            />
            );
          })}
        </div>
        <div className="price-percentiles" aria-hidden="true">
          <span><small>P10</small><strong>{formatPct(result.p10)}</strong></span>
          <span><small>Median</small><strong>{formatPct(result.median)}</strong></span>
          <span><small>P90</small><strong>{formatPct(result.p90)}</strong></span>
        </div>
      </div>
      <p className="price-sheet-note">Tap a pattern. The full tunnel is further down.</p>
    </figure>
  );
}
