import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Assumed cohorts", definition: "Groups of customers who behave alike. Here: deal hunters, routine mid-market buyers and enterprise power users, each with its own spend and price sensitivity." },
  { word: "Seeded runs", definition: "The same scenario played 500 times with small random differences, so you see a range of outcomes, not one guess." },
  { word: "Percentile range", definition: "Line up all 500 results. The 10th percentile is the bad-but-plausible end, the 90th the good end." },
  { word: "Modeled churn", definition: "The share of a group that cancels after the price change." },
  { word: "Backtesting", definition: "Checking a model against what really happened in the past. The next step for a version fed with real customer data." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="decoder">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="windtunnel-jargon-table"
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          The words, in plain English
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
