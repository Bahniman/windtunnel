import { ThemeToggle } from "@/components/theme-toggle";
import { PricingMonteCarlo } from "@/components/pricing-monte-carlo";
import { JargonDecoder } from "@/components/jargon-decoder";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">

      {/* ------------------------------ masthead ------------------------------ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/50 bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="shell">
          <div className="flex items-center justify-between h-16">
            <a href="https://bahniman.github.io" className="flex items-center gap-2.5">
              <span className="inline-block h-[7px] w-[7px] bg-primary" />
              <span className="text-[1.0625rem] font-extrabold tracking-[-0.02em]">Windtunnel</span>
            </a>
            <nav className="flex items-center gap-5">
              <a href="https://bahniman.github.io" className="mono hover:text-on-surface transition-colors">&larr; Portfolio</a>
              <a href="https://github.com/Bahniman/windtunnel" target="_blank" rel="noreferrer" className="mono hover:text-on-surface transition-colors">Source</a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* ------------------------------ opening ----------------------------- */}
        <section className="shell section hero-grid">
          <div>
            <h1 className="display">Rehearse decisions<br />before launch.</h1>
            <p className="lede" style={{ marginTop: "2rem" }}>
              You can A/B test a button. You cannot A/B test a pricing structure, because every
              customer has to be on one model and the ones you experiment on are real. So the
              biggest commercial decisions get made on a spreadsheet and a hunch. Windtunnel
              builds synthetic customer cohorts from real support and transaction history and
              runs the change thousands of times first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
              <a href="#demo" className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-label-lg font-medium text-on-primary">
                Run a simulation
              </a>
              <a href="#problem" className="inline-flex items-center gap-2 rounded border border-outline px-6 py-3 text-label-lg font-medium">
                Read the argument
              </a>
            </div>
          </div>

          <dl className="meta">
            <div><dt>Layer</dt><dd>Simulation</dd></div>
            <div><dt>Status</dt><dd>Working prototype, MIT licensed</dd></div>
            <div><dt>Method</dt><dd>Monte Carlo over synthetic cohorts</dd></div>
            <div><dt>Part of</dt><dd>Four protocols for the agent economy</dd></div>
          </dl>
        </section>

        {/* ----------------------------- statement ---------------------------- */}
        <section className="statement">
          <div className="shell">
            <p className="line">Unity spent a year, a CEO and most of its goodwill discovering it should have raised prices 8%.</p>
            <p className="by">
              The whole episode is a public, dated record of a decision nobody could test before
              shipping it.
            </p>
          </div>
        </section>

        {/* ------------------------------ problem ----------------------------- */}
        <section className="shell section band" id="problem">
          <div className="section-head">
            <span className="idx">Case</span>
            <h2 className="h2">The most expensive kind of untested change</h2>
            <p className="note">Not a hypothetical. A timeline anyone can check.</p>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Unity Runtime Fee</th><th className="n">When</th><th className="n">Consequence</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Per-install Runtime Fee announced<span className="sub">Developers would pay each time a game was installed past a threshold</span></td>
                  <td className="n">Sep 2023</td>
                  <td className="n">Immediate revolt</td>
                </tr>
                <tr>
                  <td>Terms walked back after backlash<span className="sub">Studios publicly threatened to leave the engine</span></td>
                  <td className="n">Sep 2023</td>
                  <td className="n">Trust gone</td>
                </tr>
                <tr>
                  <td>CEO John Riccitiello departs<span className="sub">Unity Create head Marc Whitten also resigned</span></td>
                  <td className="n">Oct 2023</td>
                  <td className="n">Leadership</td>
                </tr>
                <tr>
                  <td>Runtime Fee cancelled outright by the new CEO</td>
                  <td className="n">Sep 2024</td>
                  <td className="n">Reversed</td>
                </tr>
                <tr>
                  <td><strong>What they did instead: raise subscription prices</strong><span className="sub">Unity Pro +8%, Unity Enterprise +25%</span></td>
                  <td className="n">Sep 2024</td>
                  <td className="n"><strong>+8% / +25%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="prose" style={{ marginTop: "2rem" }}>
            Read the last row against the first. After twelve months, two executive departures and
            a permanent dent in developer trust, Unity landed on an ordinary price increase, which
            is roughly the least dramatic option that was available on day one. The cost was not
            the price change. It was choosing the wrong structure and finding out in public.
          </p>
        </section>

        {/* ----------------------------- mechanism ---------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">3 parts</span>
            <h2 className="h2">What the simulation actually does</h2>
            <p className="note">Not a forecast. A distribution of outcomes with the bad tail visible.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div><h3 className="title">Build the cohorts from evidence</h3><p className="role">Synthetic, not invented</p></div>
              <div>
                <p className="desc">
                  Cohorts are generated from real support transcripts, review text and transaction
                  history, so price sensitivity comes from how customers already behaved rather
                  than from a segment name someone chose in a workshop. A cohort that complains
                  about billing in support tickets gets modelled as one that churns on a rise.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">02</span>
              <div><h3 className="title">Run it thousands of times</h3><p className="role">Monte Carlo</p></div>
              <div>
                <p className="desc">
                  A single projected number hides the thing you need. Running the change repeatedly
                  across sampled behaviour produces a distribution, which is where you see that a
                  median gain of four percent can still carry a meaningful probability of losing
                  your best-paying segment.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">03</span>
              <div><h3 className="title">Report where it breaks, not whether to ship</h3><p className="role">Structured recommendation</p></div>
              <div>
                <p className="desc">
                  The useful output is not go or no-go. It is which cohort breaks first, at what
                  threshold, and which sequencing keeps the damage contained. Staging a rise on the
                  least price-sensitive group first is a different decision from cancelling it.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ------------------------------- demo ------------------------------- */}
        <section className="shell section band" id="demo">
          <div className="section-head">
            <span className="idx">Sandbox</span>
            <h2 className="h2">Move the price. Watch the tail.</h2>
            <p className="note">Sample subscription business. Change the increase and the cohort mix, then read the downside percentile rather than the median.</p>
          </div>
          <PricingMonteCarlo />
        </section>

        {/* ---------------------------- the objection -------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Honest</span>
            <h2 className="h2">Where this is weakest</h2>
            <p className="note">The objections a CFO would actually raise.</p>
          </div>
          <div className="prose" style={{ display: "grid", gap: "1.25rem" }}>
            <p>
              <strong>A simulation is only as good as its behavioural assumptions.</strong> If the
              model of how a cohort reacts to a rise is wrong, running it ten thousand times
              produces a very confident wrong answer. The output should be read as a way to find
              the breaking point, not as a prediction of revenue.
            </p>
            <p>
              <strong>Unity&rsquo;s failure was not purely quantitative.</strong> The revolt was
              about retroactivity and trust, that a fee could apply to games already shipped, and
              no cohort model captures a community deciding it has been betrayed. Simulation would
              have flagged the churn risk; it would not have measured the outrage.
            </p>
            <p>
              <strong>The data needed is data most firms handle badly.</strong> Support transcripts
              and review text sit in three systems and a spreadsheet. The honest first version is
              narrow, one product line and one pricing question, rather than a general engine for
              strategy.
            </p>
          </div>
        </section>

        {/* ------------------------------ decoder ----------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Plain</span>
            <h2 className="h2">The words, without the jargon</h2>
            <p className="note">For anyone reading this who does not build software.</p>
          </div>
          <JargonDecoder />
        </section>

        {/* ------------------------------ sources ----------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Checkable</span>
            <h2 className="h2">Sources</h2>
            <p className="note">The Unity timeline above, traceable.</p>
          </div>
          <ol className="src">
            <li>
              Unity cancels the Runtime Fee and moves to seat-based pricing, September 2024.{" "}
              <a href="https://www.engadget.com/gaming/unity-dumps-the-runtime-fee-that-caused-a-developer-revolt-181559332.html" target="_blank" rel="noreferrer">Engadget</a>
            </li>
            <li>
              A year of fallout, including the departure of the CEO, summarised at the point of
              reversal.{" "}
              <a href="https://www.pcgamer.com/gaming-industry/a-year-after-outraging-developers-blowing-up-its-reputation-and-saying-goodbye-to-its-ceo-unity-decides-runtime-fees-are-a-bad-idea-so-its-getting-rid-of-them/" target="_blank" rel="noreferrer">PC Gamer</a>
            </li>
            <li>
              Unity Pro up 8% and Unity Enterprise up 25% as the replacement for the fee.{" "}
              <a href="https://www.cgchannel.com/2024/09/unity-scraps-controversial-runtime-fee-but-raises-prices/" target="_blank" rel="noreferrer">CG Channel</a>
            </li>
            <li>
              The original apology and revised fee criteria, September 2023.{" "}
              <a href="https://www.theregister.com/software/2023/09/23/unity-apologizes-announces-revised-runtime-fee-criteria/325218" target="_blank" rel="noreferrer">The Register</a>
            </li>
          </ol>
        </section>

        {/* ------------------------------- footer ----------------------------- */}
        <footer className="shell section band">
          <div>
            <h2 className="h2" style={{ fontSize: "1.5rem" }}>Built by Bahniman Talukdar</h2>
            <p className="prose" style={{ marginTop: "0.75rem", fontSize: "0.9375rem" }}>
              One of four protocols for the agent economy.
            </p>
            <p style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a className="lnk" href="https://bahniman.github.io">Portfolio</a>
              <a className="lnk" href="https://github.com/Bahniman/windtunnel" target="_blank" rel="noreferrer">Source</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
