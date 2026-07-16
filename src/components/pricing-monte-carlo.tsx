import { useState, useEffect } from "react";
import { GlowCard } from "./glow-card";
import { 
  TrendingUp, RefreshCw, BarChart2, CheckCircle2, 
  AlertTriangle, DollarSign, Users, Award, ShieldCheck, Flame
} from "lucide-react";

interface Segment {
  id: number;
  name: string;
  share: number; // percentage of base
  sens: number; // sensitivity threshold
  sat: number; // customer satisfaction (higher = less churn)
  spend: number; // base ARPU in INR
}

const SEGS: Segment[] = [
  { id: 0, name: "SMB / Deal Hunters", share: 0.35, sens: 0.85, sat: 0.52, spend: 620 },
  { id: 1, name: "Mid-Market / Routine", share: 0.40, sens: 0.55, sat: 0.72, spend: 1450 },
  { id: 2, name: "Enterprise / Power Users", share: 0.25, sens: 0.22, sat: 0.88, spend: 4800 },
];

const RUNS = 500; // Number of Monte Carlo iterations

export function PricingMonteCarlo() {
  const [pct, setPct] = useState<number>(12); // Price hike percentage
  const [cohortSize, setCohortSize] = useState<number>(8500); // Target subscribers
  const [strategy, setStrategy] = useState<"flat" | "tiered" | "smb">("flat");
  const [results, setResults] = useState<{
    med: number;
    p10: number;
    p90: number;
    downProb: number;
    segChurn: number[];
    deltas: number[];
  } | null>(null);

  useEffect(() => {
    const shock = pct / 100;
    const deltas: number[] = [];
    const segChurnAcc = [0, 0, 0];
    
    // Base ARR before price changes
    const baseRev = SEGS.reduce((sum, s) => sum + s.share * cohortSize * s.spend, 0);

    for (let r = 0; r < RUNS; r++) {
      let runRev = 0;
      
      SEGS.forEach((s) => {
        const count = s.share * cohortSize;
        const noise = (Math.random() - 0.5) * 0.18; // Gaussian-ish noise factor
        
        // Define strategy-specific shocks
        let appliedShock = shock;
        if (strategy === "tiered") {
          // Enterprise gets full hike, Mid-Market gets half, SMB is insulated (0%)
          appliedShock = s.id === 2 ? shock * 1.5 : s.id === 1 ? shock * 0.5 : 0;
        } else if (strategy === "smb") {
          // SMB gets full hike, Mid-Market and Enterprise are insulated
          appliedShock = s.id === 0 ? shock * 1.5 : 0;
        }

        // Churn probability function
        // Churn rises with sensitivity & shock, falls with satisfaction
        const p = Math.min(0.95, Math.max(0, (s.sens + noise) * appliedShock * (1.4 - s.sat)));
        
        // Calculate churned subscribers using binomial noise approximation
        const churned = Math.min(
          count,
          Math.max(0, count * p + (Math.random() - 0.5) * Math.sqrt(count * p * (1 - p) + 0.1) * 2)
        );
        
        // Accumulate segment churn for average metrics
        segChurnAcc[s.id] += churned / count;

        // Add segment revenue (surviving subscribers * new higher price)
        runRev += (count - churned) * s.spend * (1 + appliedShock);
      });

      // Calculate delta percentage of total ARR
      deltas.push(((runRev - baseRev) / baseRev) * 100);
    }

    // Sort deltas to calculate percentiles
    deltas.sort((a, b) => a - b);
    const med = deltas[Math.floor(RUNS / 2)]!;
    const p10 = deltas[Math.floor(RUNS * 0.1)]!;
    const p90 = deltas[Math.floor(RUNS * 0.9)]!;
    const downProb = (deltas.filter((d) => d < 0).length / RUNS) * 100;
    const segChurn = segChurnAcc.map((x) => (x / RUNS) * 100);

    setResults({ med, p10, p90, downProb, segChurn, deltas });
  }, [pct, cohortSize, strategy]);

  if (!results) return null;

  const fmtSgn = (v: number) => (v >= 0 ? "+" : "") + v.toFixed(1) + "%";
  
  // Render SVG Histogram parameters
  const BINS = 32;
  const minVal = Math.min(...results.deltas);
  const maxVal = Math.max(...results.deltas);
  const binCounts = new Array(BINS).fill(0);
  results.deltas.forEach((d) => {
    const idx = Math.min(BINS - 1, Math.floor(((d - minVal) / (maxVal - minVal + 1e-9)) * BINS));
    binCounts[idx]++;
  });
  const peak = Math.max(...binCounts) || 1;

  // Automated recommendation strategy builder
  const getRecommendation = () => {
    const isDangerous = results.downProb > 25;
    const isLowYield = results.med < 2;
    
    if (isDangerous) {
      return {
        decision: "ABORT / REDESIGN",
        color: "text-red-500 border-red-500/20 bg-red-500/5",
        icon: Flame,
        text: `The simulation shows an unacceptable risk of ARR contraction (${results.downProb.toFixed(0)}% probability of negative yield). We recommend aborting the current plan. Insulate the highly sensitive SMB/Deal Hunters segment by deploying a Tiered Enterprise Migration instead.`
      };
    }
    if (isLowYield) {
      return {
        decision: "HOLD / OPTIMIZE",
        color: "text-amber-500 border-amber-500/20 bg-amber-500/5",
        icon: AlertTriangle,
        text: `The projected median ARR growth is very low (${results.med.toFixed(1)}%). Churn in sensitive cohorts is eroding the gains of the price increase. Consider introducing grandfathered pricing or expansion credits to preserve segment retention.`
      };
    }
    return {
      decision: "PROCEED WITH LAUNCH",
      color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5",
      icon: ShieldCheck,
      text: `The current model shows robust ARR yields (median delta is ${results.med.toFixed(1)}%) with negligible downside risk (${results.downProb.toFixed(0)}% probability of revenue leakage). Excellent safety margin. We recommend proceeding with the launch.`
    };
  };

  const rec = getRecommendation();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between font-sans">
        <div>
          <h3 className="text-lg font-bold text-foreground">Decision Simulation Sandbox</h3>
          <p className="text-xs text-muted-foreground">Modify pricing shock parameters and strategy types to evaluate ARR impact probability curves.</p>
        </div>
        <button
          onClick={() => {
            setPct(12);
            setCohortSize(8500);
            setStrategy("flat");
          }}
          className="btn-press self-start flex h-8 items-center gap-1.5 rounded-lg border border-border bg-foreground/5 px-3 text-xs text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset Sandbox
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="border border-border rounded-xl p-4 bg-foreground/[0.01] space-y-4">
            <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground tracking-wider block border-b border-border/40 pb-1.5">Simulation Inputs</span>
            
            {/* Input 1: Pct */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Target Price Increase:</span>
                <span className="text-foreground font-bold">{pct}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={pct} 
                onChange={(e) => setPct(Number(e.target.value))}
                className="w-full accent-[#FF4D00] h-1 bg-border rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Input 2: Cohort Size */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-muted-foreground block">Cohort Size (Subscribers):</label>
              <input 
                type="number"
                min="1000"
                max="50000"
                step="500"
                value={cohortSize} 
                onChange={(e) => setCohortSize(Number(e.target.value))}
                className="w-full font-mono text-xs border border-border bg-foreground/[0.02] p-2 rounded-lg text-foreground focus:outline-none focus:border-[#FF4D00]"
              />
            </div>

            {/* Input 3: Strategy Type */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground block">Migration Strategy:</label>
              <div className="flex flex-col gap-1.5">
                {(["flat", "tiered", "smb"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStrategy(s)}
                    className={`btn-press w-full p-2.5 rounded-lg border text-left font-mono text-[10px] transition-colors flex items-center justify-between ${
                      strategy === s
                        ? "border-[#FF4D00] bg-[#FF4D00]/10 text-foreground font-bold"
                        : "border-border/60 bg-foreground/[0.01] hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>
                      {s === "flat" ? "⚡ FLAT SHOCK" : s === "tiered" ? "💎 TIERED ENTERPRISE" : "👥 SMB EXPANSION"}
                    </span>
                    <span className="text-[9px] opacity-70">
                      {s === "flat" ? "Uniform" : s === "tiered" ? "Insulates SMB" : "Insulates MM/ENT"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualizations & Strategy recommendations */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Probability Output Metrics */}
            <div className="border border-border rounded-xl p-4 bg-foreground/[0.01] font-mono text-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground block border-b border-border/40 pb-1.5 mb-2">Simulated Delta ARR Yield</span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">10th Percentile (Downside):</span>
                    <span className={`font-bold ${results.p10 >= 0 ? "text-emerald-500" : "text-red-500"}`}>{fmtSgn(results.p10)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Median Growth Expectation:</span>
                    <span className="text-foreground font-bold">{fmtSgn(results.med)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">90th Percentile (Upside):</span>
                    <span className="text-emerald-500 font-bold">{fmtSgn(results.p90)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Downside probability:</span>
                <span className={`font-bold ${results.downProb > 20 ? "text-red-500" : "text-emerald-500"}`}>
                  {results.downProb.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Churn Risk Heatmap */}
            <div className="border border-border rounded-xl p-4 bg-foreground/[0.01] font-mono text-xs">
              <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground block border-b border-border/40 pb-1.5 mb-2">Cohort Churn Risk</span>
              <div className="space-y-2">
                {SEGS.map((s) => {
                  const churnVal = results.segChurn[s.id]!;
                  const isHigh = churnVal > 25;
                  const isMed = churnVal >= 10 && churnVal <= 25;
                  const riskLabel = isHigh ? "HIGH RISK" : isMed ? "MED RISK" : "LOW RISK";
                  const riskColor = isHigh ? "text-red-500 border-red-500/20 bg-red-500/5" : isMed ? "text-amber-500 border-amber-500/20 bg-amber-500/5" : "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";

                  return (
                    <div key={s.id} className="flex items-center justify-between p-1.5 rounded border border-border/40 bg-[#0A0A0B]">
                      <span className="text-foreground text-[10px] truncate max-w-[130px]">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{churnVal.toFixed(1)}% Churn</span>
                        <span className={`text-[8px] font-bold px-1 rounded border ${riskColor}`}>{riskLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Histogram Visualizer */}
          <div className="border border-border rounded-xl p-4 bg-[#0A0A0B]">
            <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground block border-b border-border/40 pb-1.5 mb-3">Probability Distribution (ARR Delta %)</span>
            
            {/* SVG histogram */}
            <div className="w-full h-[120px] flex items-end gap-0.5 pt-4">
              {binCounts.map((count, idx) => {
                const heightPct = (count / peak) * 100;
                // Color mapping: red for negative delta, green for positive delta
                const valueForBin = minVal + (idx / BINS) * (maxVal - minVal);
                const barColor = valueForBin < 0 ? "bg-red-500/70" : "bg-[#FF4D00]/70";
                
                return (
                  <div 
                    key={idx} 
                    className="flex-1 flex flex-col justify-end h-full group relative"
                  >
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 group-hover:brightness-125 ${barColor}`}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black border border-border px-2 py-1 rounded text-[9px] font-mono text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap mb-1">
                      {fmtSgn(valueForBin)} : {count} runs
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between font-mono text-[9px] text-muted-foreground/60 border-t border-border/20 pt-2 mt-1">
              <span>Worst Case ({fmtSgn(minVal)})</span>
              <span className="text-foreground">Median ({fmtSgn(results.med)})</span>
              <span>Best Case ({fmtSgn(maxVal)})</span>
            </div>
          </div>

          {/* Strategy Engine Recommendation */}
          <div className={`border rounded-xl p-4 font-mono text-xs flex gap-3 ${rec.color}`}>
            <rec.icon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[10px] uppercase block tracking-wider">Engine Strategy: {rec.decision}</span>
              <p className="text-[11px] font-sans text-muted-foreground leading-normal">
                {rec.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
