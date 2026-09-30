export type Strategy = "flat" | "tiered" | "smb";

export interface Segment {
  id: number;
  name: string;
  share: number;
  sensitivity: number;
  satisfaction: number;
  monthlySpend: number;
}

export interface SimulationResult {
  median: number;
  p10: number;
  p90: number;
  negativeRunPercent: number;
  segmentChurn: number[];
  deltas: number[];
}

export const SEGMENTS: Segment[] = [
  { id: 0, name: "SMB · Deal hunters", share: 0.35, sensitivity: 0.85, satisfaction: 0.52, monthlySpend: 620 },
  { id: 1, name: "Mid-market · Routine", share: 0.4, sensitivity: 0.55, satisfaction: 0.72, monthlySpend: 1450 },
  { id: 2, name: "Enterprise · Power users", share: 0.25, sensitivity: 0.22, satisfaction: 0.88, monthlySpend: 4800 },
];

function random(seed: number) {
  let value = seed >>> 0 || 1;
  return () => {
    value ^= value << 13; value ^= value >>> 17; value ^= value << 5;
    return (value >>> 0) / 4294967296;
  };
}

export function runPricingSimulation(priceIncrease: number, cohortSize: number, strategy: Strategy, runs = 500): SimulationResult {
  const rnd = random((priceIncrease * 1009 + cohortSize * 9176 + ["flat", "tiered", "smb"].indexOf(strategy) * 65537) >>> 0);
  const baseRevenue = SEGMENTS.reduce((sum, segment) => sum + segment.share * cohortSize * segment.monthlySpend, 0);
  const churnTotals = SEGMENTS.map(() => 0);
  const deltas = Array.from({ length: runs }, () => {
    let revenue = 0;
    for (const segment of SEGMENTS) {
      const count = segment.share * cohortSize;
      const baseShock = priceIncrease / 100;
      const applied = strategy === "tiered" ? (segment.id === 2 ? baseShock * 1.5 : segment.id === 1 ? baseShock * 0.5 : 0)
        : strategy === "smb" ? (segment.id === 0 ? baseShock * 1.5 : 0) : baseShock;
      const noise = (rnd() - 0.5) * 0.18;
      const probability = Math.min(0.95, Math.max(0, (segment.sensitivity + noise) * applied * (1.4 - segment.satisfaction)));
      const churned = Math.min(count, Math.max(0, count * probability + (rnd() - 0.5) * Math.sqrt(count * probability * (1 - probability) + 0.1) * 2));
      churnTotals[segment.id] += churned / count;
      revenue += (count - churned) * segment.monthlySpend * (1 + applied);
    }
    return ((revenue - baseRevenue) / baseRevenue) * 100;
  }).sort((a, b) => a - b);
  const lowerMiddle = Math.floor((runs - 1) / 2);
  const upperMiddle = Math.ceil((runs - 1) / 2);
  return {
    median: (deltas[lowerMiddle]! + deltas[upperMiddle]!) / 2,
    p10: deltas[Math.ceil(runs * 0.1) - 1]!,
    p90: deltas[Math.ceil(runs * 0.9) - 1]!,
    negativeRunPercent: (deltas.filter((delta) => delta < 0).length / runs) * 100,
    segmentChurn: churnTotals.map((value) => (value / runs) * 100),
    deltas,
  };
}
