import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function CountUpStat({ text }: { text: string }) {
  const match = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return <>{text}</>;
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;
  const { val, ref } = useCountUp(target);
  const shown =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function Nav() {
  const links = [
    { label: "Problem", id: "problem" },
    { label: "Demo", id: "demo" },
    { label: "Architecture", id: "architecture" },
    { label: "Business Case", id: "business" },
    { label: "References", id: "references" },
  ];
  const active = useActiveSection(links.map((l) => l.id));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-primary to-secondary"
      />
      <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="text-base font-semibold tracking-tight text-foreground">
              Windtunnel
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-foreground/8 ring-1 ring-inset ring-foreground/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://bahniman.github.io"
              className="text-xs sm:text-sm font-medium text-foreground/75 hover:text-foreground transition-colors mr-2"
            >
              ← Back to Portal
            </a>
            <ThemeToggle />
            <a
              href="https://github.com/Bahniman/windtunnel"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Nav />

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-32 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-24">
          
          {/* M3 Hero Section */}
          <section className="relative overflow-hidden pt-8 pb-4 space-y-6 text-left">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-40 right-[-10%] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute -bottom-40 left-[-10%] h-[380px] w-[380px] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            </div>

            <motion.div {...fadeUp} className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-label-lg font-medium text-primary">
                <Award className="h-4 w-4" /> Startup Lab · Strategic Decision Engine
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="text-[45px] leading-[52px] md:text-[57px] md:leading-[64px] font-normal tracking-tight text-on-surface"
            >
              Rehearse decisions<br />before launch.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-title-lg leading-relaxed text-on-surface-variant max-w-[760px]"
            >
              Companies execute their most critical strategic moves — pricing updates, fee plans, plan structures — based on spreadsheet projections and gut feelings. A/B testing is limited to small post-launch changes. Windtunnel solves this by building synthetic user populations modeled from real support transcripts and review text, simulating decisions thousands of times.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-6 py-3 text-label-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/windtunnel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-6 py-3 text-label-lg font-medium text-primary hover:bg-surface-container-low transition-colors"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </motion.div>
          </section>

          {/* Business Context Info Header (M3 Outlined Container) */}
          <motion.section
            id="problem"
            {...fadeUp}
            className="rounded-[12px] border border-outline-variant bg-surface p-4 flex flex-col justify-between gap-3 sm:flex-row text-body-md text-on-surface-variant scroll-mt-28"
          >
            <span>Currently Simulating: <strong className="text-on-surface font-semibold">BrewCircle Pvt Ltd</strong> (₹3.2 Cr ARR · 4,100 active subscribers)</span>
            <span>Target Population: <strong className="text-on-surface font-semibold">1,240 Reviews + 18 Months transaction logs</strong></span>
          </motion.section>

          {/* Detailed Problem Statement (Error Container style for urgency) */}
          <motion.section {...fadeUp} className="rounded-lg bg-error-container p-6 space-y-4">
            <h3 className="text-title-lg font-medium text-on-error-container inline-flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> The Cost of Blind Rollouts
            </h3>
            <p className="text-body-lg text-on-error-container leading-relaxed">
              Pricing updates are difficult to roll back once customer cohorts react. Traditional market research takes months and costs millions without providing structured, falsifiable predictions. A/B testing is dynamic but exposes real users to unstable packages.
              <br /><br />
              Windtunnel acts as a pre-launch simulation chamber. By modeling pricing sensitivities and satisfaction factors into synthetic cohorts, companies identify where retention breaks and receive structured recommendations before deploying code.
            </p>
          </motion.section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-28 space-y-8 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp} className="space-y-2">
              <h2 className="text-headline-lg font-normal text-on-surface">Interactive Simulator Deck</h2>
              <p className="text-body-lg text-on-surface-variant">Adjust pricing hikes to test the subscription base stability across segments.</p>
            </motion.div>

            <motion.div {...fadeUp} className="w-full">
              <PricingMonteCarlo />
            </motion.div>
          </section>

          {/* Architecture Details (Filled Cards) */}
          <section id="architecture" className="scroll-mt-28 space-y-6 pt-8 border-t border-outline-variant">
            <motion.h2 {...fadeUp} className="text-headline-lg font-normal text-on-surface">Core Elements</motion.h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <Gauge className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">1. Synthetic Cohorts</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Extracts characteristics from review sentiment, usage cadence, and order frequencies to build thousands of representative synthetic customer agents.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <Sliders className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">2. Monte Carlo Run</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Executes subscription decisions over hundreds of random iterations, mapping confidence intervals to estimate exactly where revenue risks spike.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.16 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <TrendingDown className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">3. Falsifiable Pilots</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Translates mathematical models into actionable, cost-effective pilot specifications. Recommends the cheapest test format to prove predictions.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Business Model (Filled Cards) */}
          <section id="business" className="scroll-mt-28 grid gap-6 md:grid-cols-2 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp} className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
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
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Moat & Revenue</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Consulting engagement pricing for per-decision simulation runs, migrating to monthly subscription terms for product groups that run routine pricing sprints. First targeted vertical: D2C subscriptions, where customer sentiment and purchase metrics are already indexed.
              </p>
            </motion.div>
          </section>

          {/* Jargon and Sources */}
          <section id="references" className="scroll-mt-28 space-y-6 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp}>
              <JargonDecoder />
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[12px] border border-outline-variant bg-surface p-6 text-body-md text-on-surface-variant space-y-4">
              <h4 className="font-medium text-on-surface">Source Material & Model References:</h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>BrewCircle Pvt Ltd subscription data logs (sample dataset Q2 2026).</li>
                <li>Monte Carlo methods in price optimization and elastic churn modeling.</li>
                <li>Windtunnel open-source engine specification – <a href="https://github.com/Bahniman/windtunnel" target="_blank" rel="noreferrer" className="text-primary hover:underline">Windtunnel GitHub Repository</a>.</li>
              </ol>
            </motion.div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container-low py-8">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-body-md text-on-surface-variant leading-normal">
            Windtunnel · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-primary hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
