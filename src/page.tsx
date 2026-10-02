import { PricingMonteCarlo } from "@/components/pricing-monte-carlo";
import { PricingHeroSheet } from "@/components/pricing-hero-sheet";
import { JargonDecoder } from "@/components/jargon-decoder";
import { SuiteHeader } from "@/components/suite-header";
import { SuiteNext } from "@/components/suite-next";

export default function LandingPage() {
  return (
    <div className="windtunnel-page pk" style={{ ["--a" as string]: "var(--pink-display)", ["--b" as string]: "var(--blue)" }}>

      <SuiteHeader name="Windtunnel" sections={[
        { label: "The case", href: "#problem" },
        { label: "Try it", href: "#demo" },
        { label: "How it works", href: "#how" },
        { label: "Weak spots", href: "#limits" },
        { label: "Sources", href: "#sources" },
      ]} />

      <main id="main" className="suite-main">

        {/* ------------------------------ the poster ------------------------------ */}
        <section className="pk-wrap pk-hero">
          <div className="pk-hero-copy">
            <p className="pk-kick"><span className="n">04</span> Prototype · Pricing</p>
            <h1 className="pk-big">
              <span className="a">Test</span>
              <span className="b">the wind.</span>
              <span className="c">Rehearse a price change before your customers react to the real one.</span>
            </h1>
            <p className="pk-dek">
              Windtunnel plays a price increase out <b>500 times</b> across three kinds of customer, then shows
              who leaves, what revenue does, and how often the whole move <b>backfires</b>.
            </p>
            <div className="pk-cta">
              <a href="#demo" className="pk-btn pri">Run the tunnel ↓</a>
              <a href="#problem" className="pk-btn">The Unity story</a>
            </div>
          </div>

          <div className="pk-board">
            <span className="pk-sticker">500 runs<small>per click</small></span>
            <PricingHeroSheet />
          </div>
        </section>

        <div className="pk-wrap">
          <div className="pk-glance">
            <dl className="pk-facts">
              <div><dt>500</dt><dd>runs behind every number on this page</dd></div>
              <div><dt>3</dt><dd>customer groups, each with its own price sensitivity</dd></div>
              <div><dt>12 mo</dt><dd>from Unity's install fee to its full reversal <a className="lnk" href="#sources">[1]</a></dd></div>
              <div><dt>+25%</dt><dd>the Enterprise price rise Unity chose instead <a className="lnk" href="#sources">[4]</a></dd></div>
            </dl>
            <ul className="pk-rows">
              <li><span>What</span><b>A simulator for pricing decisions</b></li>
              <li><span>Built</span><b>Monte Carlo model in Python, plus the sandbox on this page</b></li>
              <li><span>For</span><b>Product and finance teams before a price change</b></li>
              <li><span>Stage</span><b>Prototype, running on three sample customer groups</b></li>
            </ul>
          </div>
        </div>

        {/* ------------------------------- the band ------------------------------- */}
        <section className="pk-band">
          <div className="pk-wrap">
            <p className="pk-kick on-blue"><span className="n">The bet</span></p>
            <p className="line">Unity changed one fee. <em>It took a year and a new CEO to undo it.</em></p>
            <p className="by">Most pricing mistakes aren't bad arithmetic. They are a customer reaction nobody rehearsed.</p>
          </div>
        </section>

        {/* -------------------------------- the case -------------------------------- */}
        <section className="pk-wrap pk-sec" id="problem">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> The case</p>
            <h2>One fee, <em>one bad year.</em></h2>
          </div>
          <div className="pk-split">
            <ol className="wt-line" aria-label="Unity Runtime Fee timeline">
              <li><time>Sep 2023</time><b>Per-install fee announced</b><span>Developers pay each time a game is installed past a threshold</span><em className="wt-stamp">Backlash</em></li>
              <li><time>Sep 2023</time><b>Terms walked back</b><span>Studios publicly threaten to leave the engine</span><em className="wt-stamp">Revised</em></li>
              <li><time>Oct 2023</time><b>CEO John Riccitiello departs</b><em className="wt-stamp">Exit</em></li>
              <li><time>Sep 2024</time><b>Fee cancelled by the new CEO</b><em className="wt-stamp">Reversed</em></li>
              <li className="wt-end"><time>Sep 2024</time><b>Subscription prices raised instead</b><span>Unity Pro +8%, Unity Enterprise +25%</span><em className="wt-stamp">+8% / +25%</em></li>
            </ol>
            <div>
              <div className="pk-prose">
                <p>
                  Unity wanted more revenue from its biggest users. It got there in the end, through a plain
                  subscription rise, but only after a year in which the first attempt cost it developer trust
                  and its chief executive.
                </p>
                <p>
                  No model predicts anger. What a model does is force the right argument <b>before</b> launch:
                  which customers carry the increase, which ones leave, and in how many of the plausible futures
                  the move loses money. Windtunnel is built to start that argument.
                </p>
              </div>
              <figure className="pk-quote" style={{ marginTop: 28 }}>
                <p>The spreadsheet gives you one number. <em>The tunnel gives you the spread.</em></p>
                <small>Why 500 runs, not one forecast</small>
              </figure>
            </div>
          </div>
        </section>

        {/* -------------------------------- the demo -------------------------------- */}
        <section className="pk-wrap pk-sec" id="demo">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> Try it</p>
            <h2>Move the price. <em>Watch the tail.</em></h2>
            <p className="pk-lede">Pick an increase, a subscriber count and how the increase lands. The 500 runs redraw instantly.</p>
          </div>
          <div className="pk-stage">
            <span className="pk-stage-tag">Live in your browser</span>
            <PricingMonteCarlo />
          </div>
        </section>

        {/* ------------------------------- how it works ------------------------------- */}
        <section className="pk-wrap pk-sec" id="how">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> How it works</p>
            <h2>Three steps, <em>in the open.</em></h2>
          </div>
          <ol className="pk-cards">
            <li>
              <p className="pk-kick"><span className="n">1</span> Name</p>
              <h3>Split the customers</h3>
              <p>Three groups with their own size, spend and sensitivity to price. Every assumption is on the screen, so anyone can challenge it.</p>
              <span className="eg">Deal hunters 35% · ₹620 a month</span>
            </li>
            <li>
              <p className="pk-kick"><span className="n">2</span> Repeat</p>
              <h3>Run it 500 times</h3>
              <p>Each run draws a different market mood, from forgiving to hostile. Past a 20% rise, cancellations climb fast. Together the runs show a range instead of one confident guess.</p>
              <span className="eg">Same inputs, same 500 runs, every time</span>
            </li>
            <li>
              <p className="pk-kick"><span className="n">3</span> Read</p>
              <h3>Look at the tail</h3>
              <p>The median tells you what usually happens. The bad end tells you whether you can survive it. Both sit side by side.</p>
              <span className="eg">10th percentile · median · 90th percentile</span>
            </li>
          </ol>
        </section>

        {/* ------------------------------- weak spots ------------------------------- */}
        <section className="pk-wrap pk-sec" id="limits">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> Where this is weakest</p>
            <h2>What a CFO <em>would ask.</em></h2>
          </div>
          <ul className="pk-weak">
            <li>
              <p className="q">The customer behaviour is assumed.</p>
              <p className="ans">It is, and 500 runs don't fix a wrong assumption. The value is in making the assumption visible enough to argue with, then replacing it with real churn data.</p>
            </li>
            <li>
              <p className="q">Unity's problem was trust, not maths.</p>
              <p className="ans">Agreed. Retroactive terms and poor communication drove that reaction, and no simulator measures them. Windtunnel covers the revenue side so the team can spend its energy on the rest.</p>
            </li>
            <li>
              <p className="q">Where does the real data come from?</p>
              <p className="ans">Billing history, cancellation reasons and reviews. The Python side already reads a reviews file; the next step is checking the model against past price changes.</p>
            </li>
          </ul>
        </section>

        {/* ---------------------------- decoder + sources ---------------------------- */}
        <section className="pk-wrap pk-sec" id="sources">
          <div className="pk-two">
            <div>
              <div className="pk-head">
                <p className="pk-kick"><span className="dot" /> Plain English</p>
                <h2>The <em>words.</em></h2>
              </div>
              <JargonDecoder />
            </div>
            <div>
              <div className="pk-head">
                <p className="pk-kick"><span className="dot" /> Checkable</p>
                <h2><em>Sources.</em></h2>
              </div>
              <ol className="pk-src">
                <li>
                  Unity, September 2024: cancelling the Runtime Fee and changing subscription prices.{" "}
                  <a href="https://unity.com/blog/unity-is-canceling-the-runtime-fee" target="_blank" rel="noreferrer">Unity</a>
                </li>
                <li>
                  Unity drops the Runtime Fee and moves to seat-based pricing, September 2024.{" "}
                  <a href="https://www.engadget.com/gaming/unity-dumps-the-runtime-fee-that-caused-a-developer-revolt-181559332.html" target="_blank" rel="noreferrer">Engadget</a>
                </li>
                <li>
                  A year of fallout, including the CEO's departure, summarised at the reversal.{" "}
                  <a href="https://www.pcgamer.com/gaming-industry/a-year-after-outraging-developers-blowing-up-its-reputation-and-saying-goodbye-to-its-ceo-unity-decides-runtime-fees-are-a-bad-idea-so-its-getting-rid-of-them/" target="_blank" rel="noreferrer">PC Gamer</a>
                </li>
                <li>
                  Unity Pro up 8% and Unity Enterprise up 25% in place of the fee.{" "}
                  <a href="https://www.cgchannel.com/2024/09/unity-scraps-controversial-runtime-fee-but-raises-prices/" target="_blank" rel="noreferrer">CG Channel</a>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <SuiteNext current="Windtunnel" />
      </main>
    </div>
  );
}
