import { ThemeToggle } from "@/components/theme-toggle";
import { PricingMonteCarlo } from "@/components/pricing-monte-carlo";
import { JargonDecoder } from "@/components/jargon-decoder";
import {
  ShieldAlert,
  ArrowRight,
  Gauge,
  Sliders,
  TrendingDown,
  Award,
  Zap,
  Github
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">
      
      {/* M3 Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/50 bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2.5">
              <span className="text-title-lg font-medium">
                Windtunnel
              </span>
            </a>
            <nav className="flex items-center gap-2 sm:gap-4">
              <a
                href="https://bahniman.github.io"
                className="text-xs sm:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">← Back to Portal</span>
                <span className="sm:hidden">← Portal</span>
              </a>
              <a
                href="https://github.com/Bahniman/windtunnel"
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-16">
          
          {/* M3 Hero Section */}
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary-container/40 px-4 py-2 text-label-lg font-medium text-primary transition-all duration-500 ease-[cubic-bezier(0.34,1.42,0.64,1)] hover:rounded-full">
              <Award className="h-4 w-4" /> Startup Lab · Strategic Decision Engine
            </div>
            <h1 className="text-[42px] leading-[48px] md:text-[60px] md:leading-[66px] font-medium tracking-[-1.2px] text-on-surface">
              Rehearse decisions<br />before launch.
            </h1>
            <p className="text-title-lg leading-relaxed text-on-surface-variant max-w-[760px]">
              Companies execute their most critical strategic moves — pricing updates, fee plans, plan structures — based on spreadsheet projections and gut feelings. A/B testing is limited to small post-launch changes. Windtunnel solves this by building synthetic user populations modeled from real support transcripts and review text, simulating decisions thousands of times.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-6 py-3 text-label-lg font-medium hover:bg-[color-mix(in_srgb,var(--md-sys-color-on-primary)_8%,var(--md-sys-color-primary))] transition-colors"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/windtunnel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-label-lg font-medium text-primary hover:bg-surface-container-low transition-colors"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </div>
          </section>

          {/* Business Context Info Header (M3 Outlined Container) */}
          <section className="rounded-[16px] border border-outline-variant/60 bg-surface-container-low p-4 flex flex-col justify-between gap-3 sm:flex-row text-body-md text-on-surface-variant">
            <span>Currently Simulating: <strong className="text-on-surface font-semibold">BrewCircle Pvt Ltd</strong> (₹3.2 Cr ARR · 4,100 active subscribers)</span>
            <span>Target Population: <strong className="text-on-surface font-semibold">1,240 Reviews + 18 Months transaction logs</strong></span>
          </section>

          {/* Detailed Problem Statement (Error Container style for urgency) */}
          <section className="relative overflow-hidden rounded-[20px] border border-error/25 bg-surface-container-low p-7 pl-8 space-y-4 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-error before:content-['']">
            <h3 className="text-title-lg font-medium text-error inline-flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> The Cost of Blind Rollouts
            </h3>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Pricing updates are difficult to roll back once customer cohorts react. Traditional market research takes months and costs millions without providing structured, falsifiable predictions. A/B testing is dynamic but exposes real users to unstable packages.
              <br /><br />
              Windtunnel acts as a pre-launch simulation chamber. By modeling pricing sensitivities and satisfaction factors into synthetic cohorts, companies identify where retention breaks and receive structured recommendations before deploying code.
            </p>
          </section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-24 space-y-8 pt-8 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-headline-lg font-normal text-on-surface">Interactive Simulator Deck</h2>
              <p className="text-body-lg text-on-surface-variant">Adjust pricing hikes to test the subscription base stability across segments.</p>
            </div>

            <div className="w-full">
              <PricingMonteCarlo />
            </div>
          </section>

          {/* Architecture Details (Filled Cards) */}
          <section className="space-y-6 pt-8 border-t border-border">
            <h2 className="text-headline-lg font-normal text-on-surface">Core Elements</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.42,0.64,1)] hover:-translate-y-1 hover:rounded-[28px] hover:bg-surface-container-high">
                <Gauge className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">1. Synthetic Cohorts</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Extracts characteristics from review sentiment, usage cadence, and order frequencies to build thousands of representative synthetic customer agents.
                </p>
              </div>
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.42,0.64,1)] hover:-translate-y-1 hover:rounded-[28px] hover:bg-surface-container-high">
                <Sliders className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">2. Monte Carlo Run</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Executes subscription decisions over hundreds of random iterations, mapping confidence intervals to estimate exactly where revenue risks spike.
                </p>
              </div>
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.42,0.64,1)] hover:-translate-y-1 hover:rounded-[28px] hover:bg-surface-container-high">
                <TrendingDown className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">3. Falsifiable Pilots</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Translates mathematical models into actionable, cost-effective pilot specifications. Recommends the cheapest test format to prove predictions.
                </p>
              </div>
            </div>
          </section>

          {/* Business Model (Filled Cards) */}
          <section className="grid gap-6 md:grid-cols-2 pt-8 border-t border-border">
            <div className="rounded-[16px] bg-surface-container-low p-6 space-y-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.42,0.64,1)] hover:-translate-y-1 hover:rounded-[28px] hover:bg-surface-container">
              <h3 className="text-headline-md font-normal text-on-surface">Strategic Rationale</h3>
              <ul className="space-y-4 text-body-md text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Decision Protection:</strong> Reduces the risk of launching bad price changes that destroy ARR.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Falsifiable Advice:</strong> Provides clear, numbers-based predictions that can be verified during pilots.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Accuracy Moat:</strong> Prediction accuracy compiles and improves over years of historical simulation runs.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[16px] bg-surface-container-low p-6 space-y-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.42,0.64,1)] hover:-translate-y-1 hover:rounded-[28px] hover:bg-surface-container">
              <h3 className="text-headline-md font-normal text-on-surface">Moat & Revenue</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Consulting engagement pricing for per-decision simulation runs, migrating to monthly subscription terms for product groups that run routine pricing sprints. First targeted vertical: D2C subscriptions, where customer sentiment and purchase metrics are already indexed.
              </p>
            </div>
          </section>

          {/* Jargon and Sources */}
          <section className="space-y-6 pt-8 border-t border-border">
            <JargonDecoder />

            <div className="rounded-[16px] border border-outline-variant/60 bg-surface-container-low p-6 text-body-md text-on-surface-variant space-y-4">
              <h4 className="font-medium text-on-surface">Source Material & Model References:</h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>BrewCircle Pvt Ltd subscription data logs (sample dataset Q2 2026).</li>
                <li>Monte Carlo methods in price optimization and elastic churn modeling.</li>
                <li>Windtunnel open-source engine specification – <a href="https://github.com/Bahniman/windtunnel" target="_blank" rel="noreferrer" className="text-primary hover:underline">Windtunnel GitHub Repository</a>.</li>
              </ol>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-container-low py-8">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-body-md text-on-surface-variant leading-normal">
            Windtunnel · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-primary hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
