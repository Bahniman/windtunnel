import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { runPricingSimulation, SEGMENTS, type Strategy } from "@/lib/pricing-model";

const RUNS = 500;
const STRATEGIES: { id: Strategy; label: string; note: string }[] = [
  { id: "flat", label: "Flat increase", note: "same increase for every cohort" },
  { id: "tiered", label: "Tiered", note: "higher enterprise, lower mid-market" },
  { id: "smb", label: "SMB-only", note: "increase applied to SMB cohort" },
];

export function PricingMonteCarlo() {
  const [pct, setPct] = useState(12);
  const [cohortDraft, setCohortDraft] = useState("8500");
  const [cohortSize, setCohortSize] = useState(8500);
  const [strategy, setStrategy] = useState<Strategy>("flat");
  const [resetMessage, setResetMessage] = useState("");
  const numericCohort = Number(cohortDraft);
  const invalid = cohortDraft.trim() === "" || !Number.isInteger(numericCohort) || numericCohort < 1000 || numericCohort > 50000;
  const result = useMemo(() => runPricingSimulation(pct, cohortSize, strategy, RUNS), [pct, cohortSize, strategy]);
  const min = result.deltas[0] ?? 0;
  const max = result.deltas[result.deltas.length - 1] ?? 0;
  const bins = Array.from({ length: 24 }, () => 0);
  result.deltas.forEach((value) => bins[Math.min(bins.length - 1, Math.floor(((value - min) / (max - min || 1)) * bins.length))]++);
  const peak = Math.max(1, ...bins);
  const highestChurnIndex = result.segmentChurn.indexOf(Math.max(...result.segmentChurn));
  const format = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

  function reset() {
    setPct(12); setCohortDraft("8500"); setCohortSize(8500); setStrategy("flat"); setResetMessage("Back to the starting scenario.");
  }

  return <div className="simulation-shell">
    <div className="simulation-top">
      <div><h3>The tunnel</h3><p>Three customer groups · 500 runs every time you move something.</p></div>
      <button type="button" className="riso-button" onClick={reset}><RefreshCw size={14} aria-hidden="true" /> Reset inputs</button>
    </div>
    <p role="status" className="status-copy" aria-live="polite">{resetMessage}</p>
    <div className="simulation-grid">
      <div className="control-panel">
        <span className="eyebrow">Your move</span>
        <div>
          <label className="control-label" htmlFor="price-increase">Price increase: {pct}%</label>
          <input id="price-increase" className="range-control" type="range" min="5" max="40" value={pct} onChange={(event) => setPct(Number(event.target.value))} />
        </div>
        <div>
          <label className="control-label" htmlFor="cohort-size">Subscribers</label>
          <input id="cohort-size" className="field-number" type="number" min="1000" max="50000" step="500" value={cohortDraft}
            aria-invalid={invalid} aria-describedby="cohort-help cohort-error"
            onChange={(event) => { const draft = event.target.value; setCohortDraft(draft); const value = Number(draft); if (draft.trim() !== "" && Number.isInteger(value) && value >= 1000 && value <= 50000) setCohortSize(value); }} />
          <p id="cohort-help" className="note">Any whole number from 1,000 to 50,000.</p>
          <p id="cohort-error" className="field-error" role={invalid ? "alert" : undefined}>{invalid ? "Enter a whole number from 1,000 to 50,000." : ""}</p>
        </div>
        <fieldset className="choice-group">
          <legend>How the increase lands</legend>
          {STRATEGIES.map((item) => <button key={item.id} type="button" className="strategy-option" aria-pressed={strategy === item.id} onClick={() => setStrategy(item.id)}>
            <span>{item.label}</span><small>{item.note}</small>
          </button>)}
        </fieldset>
      </div>
      <div>
        <div className="output-grid">
          <section className="metric-panel" aria-label="Simulated revenue change">
            <span className="eyebrow">Monthly revenue change</span>
            <div className="metric-list">
              <div className="metric-row"><span>10th percentile</span><strong>{format(result.p10)}</strong></div>
              <div className="metric-row"><span>Median</span><strong>{format(result.median)}</strong></div>
              <div className="metric-row"><span>90th percentile</span><strong>{format(result.p90)}</strong></div>
              <div className="metric-row"><span>Runs below baseline</span><strong>{result.negativeRunPercent.toFixed(0)}%</strong></div>
            </div>
          </section>
          <section className="metric-panel" aria-label="Modeled churn by cohort">
            <span className="eyebrow">Who leaves, by group</span>
            <div className="segment-list">{SEGMENTS.map((segment) => <div className="segment-row" key={segment.id}>
              <span>{segment.name}</span><strong>{result.segmentChurn[segment.id]!.toFixed(1)}%</strong>
            </div>)}</div>
          </section>
        </div>
        <figure className="chart-panel" role="img" aria-label={`Histogram of ${RUNS} modeled revenue-change runs, from ${format(min)} to ${format(max)}. Median ${format(result.median)}; ${result.negativeRunPercent.toFixed(0)} percent of runs are below baseline.`}>
          <figcaption className="eyebrow">Distribution across {RUNS} modeled runs</figcaption>
          <div className="histogram" aria-hidden="true">{bins.map((count, index) => {
            const value = min + (index / bins.length) * (max - min);
            return <span key={index} data-negative={value < 0} style={{ height: `${Math.max(2, (count / peak) * 100)}%` }} />;
          })}</div>
          <div className="chart-ends"><span>Low {format(min)}</span><span>Median {format(result.median)}</span><span>High {format(max)}</span></div>
        </figure>
        <aside className="finding-panel">
          <span className="eyebrow">The read</span>
          <p>{SEGMENTS[highestChurnIndex]!.name} loses the most customers here ({result.segmentChurn[highestChurnIndex]!.toFixed(1)}%). {result.negativeRunPercent.toFixed(0)}% of runs end up earning less than before the increase. That number is the one to argue about before launch.</p>
        </aside>
      </div>
    </div>
  </div>;
}
