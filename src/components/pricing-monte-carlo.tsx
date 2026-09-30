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
    setPct(12); setCohortDraft("8500"); setCohortSize(8500); setStrategy("flat"); setResetMessage("Sandbox reset to its illustrative defaults.");
  }

  return <div className="simulation-shell">
    <div className="simulation-top">
      <div><h3>Pricing scenario sandbox</h3><p>Three assumed cohorts · 500 repeatable runs · no customer data.</p></div>
      <button type="button" className="riso-button" onClick={reset}><RefreshCw size={14} aria-hidden="true" /> Reset inputs</button>
    </div>
    <p role="status" className="status-copy" aria-live="polite">{resetMessage}</p>
    <div className="simulation-grid">
      <div className="control-panel">
        <span className="eyebrow">Scenario inputs</span>
        <div>
          <label className="control-label" htmlFor="price-increase">Price increase: {pct}%</label>
          <input id="price-increase" className="range-control" type="range" min="5" max="40" value={pct} onChange={(event) => setPct(Number(event.target.value))} />
        </div>
        <div>
          <label className="control-label" htmlFor="cohort-size">Assumed subscriber count</label>
          <input id="cohort-size" className="field-number" type="number" min="1000" max="50000" step="500" value={cohortDraft}
            aria-invalid={invalid} aria-describedby="cohort-help cohort-error"
            onChange={(event) => { const draft = event.target.value; setCohortDraft(draft); const value = Number(draft); if (draft.trim() !== "" && Number.isInteger(value) && value >= 1000 && value <= 50000) setCohortSize(value); }} />
          <p id="cohort-help" className="note">Valid range: 1,000–50,000. Outputs keep using the last valid count while editing an invalid value.</p>
          <p id="cohort-error" className="field-error" role={invalid ? "alert" : undefined}>{invalid ? "Enter a whole number from 1,000 to 50,000." : ""}</p>
        </div>
        <fieldset className="choice-group">
          <legend>Illustrative pricing pattern</legend>
          {STRATEGIES.map((item) => <button key={item.id} type="button" className="strategy-option" aria-pressed={strategy === item.id} onClick={() => setStrategy(item.id)}>
            <span>{item.label}</span><small>{item.note}</small>
          </button>)}
        </fieldset>
      </div>
      <div>
        <div className="output-grid">
          <section className="metric-panel" aria-label="Simulated revenue change">
            <span className="eyebrow">Modeled monthly revenue change</span>
            <div className="metric-list">
              <div className="metric-row"><span>10th percentile</span><strong>{format(result.p10)}</strong></div>
              <div className="metric-row"><span>Median</span><strong>{format(result.median)}</strong></div>
              <div className="metric-row"><span>90th percentile</span><strong>{format(result.p90)}</strong></div>
              <div className="metric-row"><span>Runs below baseline</span><strong>{result.negativeRunPercent.toFixed(0)}%</strong></div>
            </div>
          </section>
          <section className="metric-panel" aria-label="Modeled churn by cohort">
            <span className="eyebrow">Modeled churn by assumed cohort</span>
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
          <span className="eyebrow">What this run shows</span>
          <p>{SEGMENTS[highestChurnIndex]!.name} has the highest modeled churn in this scenario ({result.segmentChurn[highestChurnIndex]!.toFixed(1)}%). {result.negativeRunPercent.toFixed(0)}% of runs fall below the modeled baseline. These are outputs of the stated assumptions, not a forecast or launch recommendation.</p>
        </aside>
      </div>
    </div>
  </div>;
}
