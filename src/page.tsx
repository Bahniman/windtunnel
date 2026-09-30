import { PricingMonteCarlo } from "@/components/pricing-monte-carlo";
import { JargonDecoder } from "@/components/jargon-decoder";
import { SuiteHeader } from "@/components/suite-header";

export default function LandingPage() {
  return (
    <div>

      <SuiteHeader name="Windtunnel" sections={[
        { label: "Case", href: "#problem" },
        { label: "Sandbox", href: "#demo" },
        { label: "Limits", href: "#limits" },
        { label: "Sources", href: "#sources" },
      ]} />

      <main id="main" className="suite-main">

        {/* ------------------------------ opening ----------------------------- */}
        <section className="shell section hero-grid">
          <div>
            <h1 className="display">Pricing scenarios<span className="hero-accent">before launch.</span></h1>
            <p className="lede">
              A client-side sandbox for exploring how pricing assumptions change modeled outcomes.
            </p>
            <p className="hero-note">Illustrative cohorts only · no customer data, forecast, or launch recommendation.</p>
            <div className="hero-cta">
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
            <div><dt>Status</dt><dd>Illustrative model · MIT licensed</dd></div>
            <div><dt>Method</dt><dd>500 seeded runs across assumed cohorts</dd></div>
            <div><dt>Scope</dt><dd>No customer data or forecast</dd></div>
          </dl>
        </section>

        {/* ----------------------------- statement ---------------------------- */}
        <section className="statement">
          <div className="shell">
            <p className="line">A pricing change is a business decision. A model can help make its assumptions visible.</p>
            <p className="by">
              Windtunnel uses a documented pricing-policy reversal as context. Its small model does not establish what would have predicted or prevented that outcome.
            </p>
          </div>
        </section>

        {/* ------------------------------ problem ----------------------------- */}
        <section className="shell section band" id="problem">
          <div className="section-head">
            <span className="idx">Case</span>
            <h2 className="h2">A pricing-policy change in public view</h2>
            <p className="note">A dated policy change, followed by a published revision.</p>
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
                  <td className="n">Public backlash</td>
                </tr>
                <tr>
                  <td>Terms walked back after backlash<span className="sub">Studios publicly threatened to leave the engine</span></td>
                  <td className="n">Sep 2023</td>
                  <td className="n">Terms revised</td>
                </tr>
                <tr>
                  <td>CEO John Riccitiello departs</td>
                  <td className="n">Oct 2023</td>
                  <td className="n">CEO departed</td>
                </tr>
                <tr>
                  <td>Runtime Fee cancelled outright by the new CEO</td>
                  <td className="n">Sep 2024</td>
                  <td className="n">Reversed</td>
                </tr>
                <tr>
                  <td><strong>Unity also announced subscription price changes</strong><span className="sub">Unity Pro +8%, Unity Enterprise +25%</span></td>
                  <td className="n">Sep 2024</td>
                  <td className="n"><strong>+8% / +25%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="prose" style={{ marginTop: "2rem" }}>
            Unity later cancelled the Runtime Fee and announced subscription price changes. That
            sequence is a useful case for discussing policy reversals; it does not show that this
            illustrative model could have predicted the response or selected a better policy.
          </p>
        </section>

        {/* ----------------------------- mechanism ---------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">3 parts</span>
            <h2 className="h2">What the simulation actually does</h2>
            <p className="note">A distribution of modeled outcomes, including downside runs.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div><h3 className="title">Make the assumptions visible</h3><p className="role">Hand-set sample cohorts</p></div>
              <div>
                <p className="desc">
                  The current demo does not ingest customer records. It uses three hand-set
                  cohorts with explicit shares, sensitivity, satisfaction and monthly spend
                  assumptions so visitors can see how changing those assumptions affects output.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">02</span>
              <div><h3 className="title">Repeat the sampled scenario</h3><p className="role">500 seeded runs</p></div>
              <div>
                <p className="desc">
                  Five hundred runs vary modeled churn assumptions within a bounded range. The
                  median and 10th-to-90th percentile range describe this simulation only; they are
                  not a confidence interval or forecast of a real business.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">03</span>
              <div><h3 className="title">Inspect the trade-offs</h3><p className="role">No launch recommendation</p></div>
              <div>
                <p className="desc">
                  The display compares modeled revenue change and churn under three simple
                  strategies. It does not account for contract terms, competition, acquisition,
                  costs or trust, and should not be used to make a real pricing decision.
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
            <p className="note">Illustrative subscription business · 500 deterministic runs · assumed cohorts, not company data.</p>
          </div>
          <PricingMonteCarlo />
        </section>

        {/* ---------------------------- the objection -------------------------- */}
        <section className="shell section band" id="limits">
          <div className="section-head">
            <span className="idx">Honest</span>
            <h2 className="h2">Where this is weakest</h2>
            <p className="note">Questions to answer before evaluating this approach.</p>
          </div>
          <div className="prose" style={{ display: "grid", gap: "1.25rem" }}>
            <p>
              <strong>Outputs depend on the behavioral assumptions.</strong> Repeating a scenario
              does not validate the modeled response. Read these results as sensitivity to stated
              inputs, not as a prediction of revenue or a search for a break-even point.
            </p>
            <p>
              <strong>The Unity dispute included factors outside this model.</strong> Public
              discussion included retroactivity and trust concerns. This demo has no variables for
              contract history, communications or sentiment, so its outputs do not describe those
              factors or establish how an alternative policy would have performed.
            </p>
            <p>
              <strong>A future calibrated version would depend on usable company data.</strong>
              Data availability, governance and quality would need to be checked for each use case
              before deciding whether a model can support it.
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
        <section className="shell section band" id="sources">
          <div className="section-head">
            <span className="idx">Checkable</span>
            <h2 className="h2">Sources</h2>
            <p className="note">The Unity timeline above, traceable.</p>
          </div>
          <ol className="src">
            <li>
              Unity's September 2024 update cancelling the Runtime Fee and describing subscription
              price changes. <a href="https://unity.com/blog/unity-is-canceling-the-runtime-fee" target="_blank" rel="noreferrer">Unity</a>
            </li>
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
          </ol>
        </section>

        {/* ------------------------------- footer ----------------------------- */}
        <footer className="shell section band">
          <div>
            <h2 className="h2" style={{ fontSize: "1.5rem" }}>Built by Bahniman Talukdar</h2>
            <p className="prose" style={{ marginTop: "0.75rem", fontSize: "0.9375rem" }}>
              One of four prototypes exploring the agent economy.
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
