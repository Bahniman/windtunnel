import { useState, useEffect, useRef } from "react";
import { GlowCard } from "./glow-card";
import { TrendingUp, RefreshCw, BarChart2, CheckCircle2 } from "lucide-react";

interface Segment {
  id: number;
  name: string;
  share: number;
  sens: number;
  sat: number;
  spend: number;
}

const SEGS: Segment[] = [
  { id: 0, name: "Deal Hunters", share: 0.22, sens: 0.80, sat: 0.58, spend: 620 },
  { id: 1, name: "Gifters", share: 0.12, sens: 0.55, sat: 0.68, spend: 480 },
  { id: 2, name: "Routine Subscribers", share: 0.38, sens: 0.42, sat: 0.79, spend: 890 },
  { id: 3, name: "Coffee Enthusiasts", share: 0.28, sens: 0.26, sat: 0.87, spend: 1350 },
];

const N = 4100;
const RUNS = 400;

export function PricingMonteCarlo() {
  const [pct, setPct] = useState(8);
  const [results, setResults] = useState<{
    med: number;
    p10: number;
    p90: number;
    down: number;
    segChurn: number[];
    deltas: number[];
  } | null>(null);

  useEffect(() => {
    // Run Monte Carlo simulation
    const shock = pct / 100;
    const deltas: number[] = [];
    const segChurnAcc = [0, 0, 0, 0];
    const baseRev = SEGS.reduce((sum, g) => sum + g.share * N * g.spend, 0);

    for (let r = 0; r < RUNS; r++) {
      let rev = 0;
      SEGS.forEach((g) => {
        const count = g.share * N;
        const noise = (Math.random() - 0.5) * 0.16;
        const p = Math.min(0.95, Math.max(0, (g.sens + noise) * shock * (1.35 - g.sat)));
        const churned = Math.min(
          count,
          Math.max(0, count * p + (Math.random() - 0.5) * Math.sqrt(count * p * (1 - p) + 0.01) * 2)
        );
        if (r < 60) {
          segChurnAcc[g.id] += churned / count;
        }
        rev += (count - churned) * g.spend * (1 + shock);
      });
      deltas.push(((rev - baseRev) / baseRev) * 100);
    }

    deltas.sort((a, b) => a - b);
    const med = deltas[Math.floor(RUNS / 2)];
    const p10 = deltas[Math.floor(RUNS * 0.1)];
    const p90 = deltas[Math.floor(RUNS * 0.9)];
    const down = (deltas.filter((d) => d < 0).length / RUNS) * 100;
    const segChurn = segChurnAcc.map((x) => (x / 60) * 100);

    setResults({ med, p10, p90, down, segChurn, deltas });
  }, [pct]);

  if (!results) return null;

  const fmtSgn = (v: number) => (v >= 0 ? "+" : "") + v.toFixed(1) + "%";
  const formatCurrency = (val: number) => "₹" + Math.round(val).toLocaleString("en-IN");

  const worstSegIdx = results.segChurn.indexOf(Math.max(...results.segChurn));
  const safeSegIdx = results.segChurn.indexOf(Math.min(...results.segChurn));

  // Render SVG Histogram
  const B = 28;
  const minVal = Math.min(...results.deltas);
  const maxVal = Math.max(...results.deltas);
  const binCounts = new Array(B).fill(0);
  results.deltas.forEach((d) => {
    const idx = Math.min(B - 1, Math.floor(((d - minVal) / (maxVal - minVal + 1e-9)) * B));
    binCounts[idx]++;
  });
  const peak = Math.max(...binCounts) || 1;

  return (
    <GlowCard className="flex flex-col gap-6" showTechBrackets={true}>
      <div className="flex flex-col gap-4 border-b border-border/40 pb-4 md:flex-row md:items-center md:justify-between font-sans">
        <div>
          <h3 className="text-lg font-bold text-foreground">Decision Simulation Sandbox</h3>
          <p className="text-xs text-muted-foreground">Adjust the slider to simulate ARR distribution shifts and segment impact.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left: Input Control */}
        <div className="md:col-span-1 rounded-xl border border-border bg-foreground/[0.01] p-4 flex flex-col gap-4">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">The Price Decision</span>
          
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-accent">{formatCurrency(899 * (1 + pct / 100))}</span>
            <span className="text-xs text-muted-foreground font-sans">vs ₹899 / mo base</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
              <span>Price Shock</span>
              <span className="font-bold text-foreground">{pct}% Increase</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={pct}
              onChange={(e) => setPct(parseInt(e.target.value))}
              className="h-1.5 w-full cursor-pointer rounded-lg bg-border accent-accent"
            />
          </div>

          <p className="text-[10px] text-muted-foreground leading-normal font-sans pt-2 border-t border-border/40">
            Every movement executes <strong>400 iterations</strong> of all 4,100 subscriber records. Churn probability = price-sensitivity × price shock × base dissatisfaction.
          </p>
        </div>

        {/* Right: Simulation Dashboard & Histogram */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3 text-center font-sans">
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="text-[10px] text-muted-foreground block">Median Revenue Change</span>
              <span className={`text-md md:text-lg font-bold block mt-1 ${results.med >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {fmtSgn(results.med)}
              </span>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="text-[10px] text-muted-foreground block">80% Conf. Band</span>
              <span className="text-[11px] md:text-xs font-semibold block mt-2 text-foreground/90">
                {fmtSgn(results.p10)} … {fmtSgn(results.p90)}
              </span>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="text-[10px] text-muted-foreground block">Loss Probability</span>
              <span className={`text-md md:text-lg font-bold block mt-1 ${results.down > 25 ? "text-red-400" : "text-emerald-400"}`}>
                {results.down.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Histogram Chart */}
          <div className="rounded-xl border border-border bg-black/60 p-4">
            <span className="font-sans text-[10px] text-muted-foreground tracking-wide block mb-2">Annual Revenue Impact Distribution (400 Outcomes):</span>
            
            <svg className="h-[120px] w-full" viewBox="0 0 600 150" preserveAspectRatio="none">
              {binCounts.map((count, idx) => {
                const height = (count / peak) * 130;
                const width = 600 / B;
                const binVal = minVal + (idx + 0.5) * ((maxVal - minVal) / B);
                const isLoss = binVal < 0;
                return (
                  <rect
                    key={idx}
                    x={idx * width + 1}
                    width={width - 2}
                    y={150 - height}
                    height={height}
                    rx="2"
                    fill={isLoss ? "#f87171" : "#34d399"}
                    opacity={binVal >= results.p10 && binVal <= results.p90 ? 0.95 : 0.35}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-2">
              <span>{minVal.toFixed(1)}% ARR</span>
              <span>0.0% Baseline</span>
              <span>+{maxVal.toFixed(1)}% ARR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Churn Breakdown by Segment */}
      <div className="space-y-3 border-t border-border/40 pt-4">
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">Expected Churn by Customer Cohort:</span>
        <div className="grid gap-3 sm:grid-cols-2">
          {SEGS.map((g, idx) => {
            const churn = results.segChurn[idx];
            return (
              <div key={g.id} className="rounded-lg border border-border/80 bg-foreground/[0.01] p-3 space-y-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold text-foreground">{g.name} <span className="text-[10px] text-muted-foreground font-normal">({Math.round(g.share * 100)}% base)</span></span>
                  <span className={`font-mono font-bold ${churn > 8 ? "text-red-400" : "text-foreground"}`}>{churn.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full rounded bg-foreground/5 overflow-hidden border border-border/30">
                  <div
                    style={{ width: `${Math.min(churn * 5, 100)}%` }}
                    className={`h-full rounded transition-all duration-500 ${churn > 8 ? "bg-red-400" : "bg-accent"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulation Advice */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] p-4 text-xs font-sans text-muted-foreground leading-relaxed flex items-start gap-2.5">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
        <div>
          {pct === 0 ? (
            <span><strong>Move the slider</strong> to evaluate pricing plans and run simulator iterations.</span>
          ) : (
            <span>
              <strong>Simulation Recommendation at +{pct}%:</strong> Median ARR shift of {fmtSgn(results.med)}. However, the churn damage heavily spikes within the <strong>{SEGS[worstSegIdx].name}</strong> cohort ({results.segChurn[worstSegIdx].toFixed(1)}% churn), who represent {Math.round(SEGS[worstSegIdx].share * 100)}% of your base.
              <br /><br />
              <strong>Recommended Pilot Strategy:</strong> Grandfather the price structure for existing {SEGS[worstSegIdx].name.toLowerCase()} for 6 months. Target the price increase at <strong>{SEGS[safeSegIdx].name}</strong> first ({results.segChurn[safeSegIdx].toFixed(1)}% expected churn), and run a localized cohort A/B test on new acquisition channels.
            </span>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
