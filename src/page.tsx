import { ThemeToggle } from "@/components/theme-toggle";
import { GlowCard } from "@/components/glow-card";
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
    <div className="relative min-h-screen bg-transparent grid-bg">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="animate-blob-1 absolute -top-[10%] -left-[10%] h-[800px] w-[800px] rounded-full bg-emerald-500/18 dark:bg-emerald-500/12 blur-[130px] opacity-90" />
        <div className="animate-blob-2 absolute bottom-[-10%] right-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-600/18 dark:bg-indigo-600/12 blur-[130px] opacity-90" />
        <div className="animate-blob-1 absolute top-[25%] left-[30%] h-[600px] w-[600px] rounded-full bg-rose-500/16 dark:bg-rose-500/12 blur-[130px] opacity-90" />
        <div className="animate-blob-2 absolute bottom-[25%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/16 dark:bg-amber-500/10 blur-[130px] opacity-90" />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
            <a href="#" className="flex items-center gap-2.5">
              <span className="text-base font-semibold tracking-tight text-foreground font-sans">
                Windtunnel
              </span>
            </a>
            <nav className="flex items-center gap-3">
              <a
                href="https://bahniman.github.io"
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                ← Back to Portal
              </a>
              <a
                href="https://github.com/Bahniman/windtunnel"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-16">
          
          {/* Hero Section */}
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent tracking-wide uppercase">
              <Award className="h-3.5 w-3.5" /> Startup Lab · Strategic Decision Engine
            </div>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08] bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Rehearse decisions<br />before launch.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[760px]">
              Companies execute their most critical strategic moves — pricing updates, fee plans, plan structures — based on spreadsheet projections and gut feelings. A/B testing is limited to small post-launch changes. Windtunnel solves this by building synthetic user populations modeled from real support transcripts and review text, simulating decisions thousands of times.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#demo"
                className="btn-press inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-5 py-3 text-sm font-bold shadow-[0_4px_20px_rgba(255,77,0,0.25)] hover:brightness-110"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/windtunnel"
                target="_blank"
                rel="noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.02] px-5 py-3 text-sm font-bold text-foreground hover:bg-foreground/5"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </div>
          </section>

          {/* Business Context Info Header */}
          <section className="rounded-xl border border-border bg-card/60 p-4 font-sans text-xs md:text-sm text-muted-foreground flex flex-col justify-between gap-3 sm:flex-row">
            <span>Currently Simulating: <strong className="text-foreground font-semibold">BrewCircle Pvt Ltd</strong> (₹3.2 Cr ARR · 4,100 active subscribers)</span>
            <span>Target Population: <strong className="text-foreground font-semibold">1,240 Reviews + 18 Months transaction logs</strong></span>
          </section>

          {/* Detailed Problem Statement */}
          <section className="rounded-2xl border border-accent/20 bg-accent/[0.02] border-l-4 border-l-accent p-6 space-y-4">
            <h3 className="font-sans text-md font-bold text-accent uppercase tracking-wider inline-flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> The Cost of Blind Rollouts
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Pricing updates are difficult to roll back once customer cohorts react. Traditional market research takes months and costs millions without providing structured, falsifiable predictions. A/B testing is dynamic but exposes real users to unstable packages.
              <br /><br />
              Windtunnel acts as a pre-launch simulation chamber. By modeling pricing sensitivities and satisfaction factors into synthetic cohorts, companies identify where retention breaks and receive structured recommendations before deploying code.
            </p>
          </section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-24 space-y-8">
            <div className="space-y-2">
              <h2 className="font-sans text-2xl font-bold text-foreground">Interactive Simulator Deck</h2>
              <p className="text-sm text-muted-foreground">Adjust pricing hikes to test the subscription base stability across segments.</p>
            </div>

            <PricingMonteCarlo />
          </section>

          {/* Architecture Details */}
          <section className="space-y-6">
            <h2 className="font-sans text-2xl font-bold text-foreground">Core Elements</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <Gauge className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">1. Synthetic Cohorts</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Extracts characteristics from review sentiment, usage cadence, and order frequencies to build thousands of representative synthetic customer agents.
                </p>
              </GlowCard>
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <Sliders className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">2. Monte Carlo Run</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Executes subscription decisions over hundreds of random iterations, mapping confidence intervals to estimate exactly where revenue risks spike.
                </p>
              </GlowCard>
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <TrendingDown className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">3. Falsifiable Pilots</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Translates mathematical models into actionable, cost-effective pilot specifications. Recommends the cheapest test format to prove predictions.
                </p>
              </GlowCard>
            </div>
          </section>

          {/* Business Model */}
          <section className="grid gap-6 md:grid-cols-2">
            <GlowCard className="space-y-4" showTechBrackets={true}>
              <h3 className="font-sans text-lg font-bold text-foreground">Strategic Rationale</h3>
              <ul className="space-y-3 text-xs md:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Decision Protection:</strong> Reduces the risk of launching bad price changes that destroy ARR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Falsifiable Advice:</strong> Provides clear, numbers-based predictions that can be verified during pilots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Accuracy Moat:</strong> Prediction accuracy compiles and improves over years of historical simulation runs.</span>
                </li>
              </ul>
            </GlowCard>

            <GlowCard className="space-y-4" showTechBrackets={true}>
              <h3 className="font-sans text-lg font-bold text-foreground">Moat & Revenue</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Consulting engagement pricing for per-decision simulation runs, migrating to monthly subscription terms for product groups that run routine pricing sprints. First targeted vertical: D2C subscriptions, where customer sentiment and purchase metrics are already indexed.
              </p>
            </GlowCard>
          </section>

          {/* Jargon and Sources */}
          <section className="space-y-6">
            <JargonDecoder />

            <div className="rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground space-y-3">
              <h4 className="font-bold text-foreground">Source Material & Model References:</h4>
              <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
                <li>BrewCircle Pvt Ltd subscription data logs (sample dataset Q2 2026).</li>
                <li>Monte Carlo methods in price optimization and elastic churn modeling.</li>
                <li>Windtunnel open-source engine specification – <a href="https://github.com/Bahniman/windtunnel" target="_blank" rel="noreferrer" className="text-accent hover:underline">Windtunnel GitHub Repository</a>.</li>
              </ol>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/20">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-xs text-muted-foreground leading-normal">
            Windtunnel · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-accent hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
