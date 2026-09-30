import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Assumed cohorts", definition: "Three simplified groups in this demo with hand-set shares, price sensitivities, satisfaction scores and monthly spend. They are not derived from customer records." },
  { word: "Seeded runs", definition: "Five hundred repeatable iterations that vary modeled churn within set bounds. The output describes this model, not a real company's likely results." },
  { word: "Percentile range", definition: "The 10th-to-90th percentile of these simulation runs. It is not a statistical confidence interval." },
  { word: "Modeled churn", definition: "An assumed share of each cohort that leaves in the simulation, based on the demo's sensitivity and satisfaction parameters." },
  { word: "Backtesting", definition: "Comparing a model with historical outcomes. This prototype does not perform backtesting." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="decoder">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="windtunnel-jargon-table"
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          Jargon Decoder
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div id="windtunnel-jargon-table" className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-foreground/[0.02]">
                <th className="p-3 font-semibold text-foreground">Term</th>
                <th className="p-3 font-semibold text-foreground">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {TERMS.map((term, idx) => (
                <tr key={idx} className="hover:bg-foreground/[0.01]">
                  <td className="p-3 font-semibold text-accent whitespace-nowrap">{term.word}</td>
                  <td className="p-3 text-muted-foreground leading-relaxed">{term.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
