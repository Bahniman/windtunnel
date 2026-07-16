import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Synthetic Population", definition: "Thousands of simulated customer profiles whose behavior matches real support logs, reviews, and transaction counts — not static buyer personas." },
  { word: "Monte Carlo", definition: "Executing the same pricing or subscription logic hundreds of times with parameterized noise to map out distributions of likely ARR paths." },
  { word: "Confidence Band", definition: "A range showing where most outcomes land (e.g. '80% of iterations land between -1.5% and +4.2%'), mapping statistical certainty." },
  { word: "Churn Probability", definition: "The probability that a specific customer cancels subscription plans, modeled on price elasticity, shock value, and historical satisfaction." },
  { word: "Model Backtesting", definition: "Validating the simulation by replaying historical price decisions to verify if the model outputs match the actual real-world results." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          Jargon Decoder
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="mt-4 overflow-x-auto">
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
