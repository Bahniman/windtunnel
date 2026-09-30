# Windtunnel visual direction

Windtunnel inherits the shared Riso Poster system: cream paper, blue and pink spot inks, a yellow sticker accent, Bricolage Grotesque display, Newsreader narrative type, Space Mono for data, firm ink outlines, and offset print shadows. Use the shared suite header, tokens, and CSS. Keep charts, assumptions, and control rows straight and scan-friendly. No glass, blur, gradients, or soft shadows.

## Page composition

The surface persuades about making pricing assumptions inspectable, then offers a local scenario sandbox. The hero pairs a pink/blue overprinted headline and links with a subject-specific worksheet, not a generic metrics card. It is generated from the web model's current defaults: a 12% increase, 8,500 assumed subscribers, three hand-set cohorts, and 500 seeded runs. Its Flat, Tiered, and SMB only choices immediately recalculate the same model at those fixed assumptions; the full sandbox below also exposes price and cohort inputs. Show cohort shares and monthly spend assumptions beside the distribution of modeled revenue changes. Label the percentile marks and the sheet as illustrative. Keep the no-customer-data/no-forecast caveat visible near those results.

The worksheet and interactive sandbox should agree at their shared defaults. The model is deterministic for a given input combination, but its hand-set inputs have not been calibrated against company outcomes. Percentile spans describe this simulation; they are not confidence intervals or a forecast. The Unity policy timeline is context only and must not imply that the model could have predicted or prevented the policy reversal.

## Motion and interaction

The one authored entrance is a short rise of the worksheet's distribution bars from their shared baseline, with a restrained capped stagger. It gives the data its plotted form without delaying the headline or controls. Respect `prefers-reduced-motion` by rendering the full chart immediately. The three worksheet choices are real buttons with pressed-state semantics and update the modeled distribution; keep sheet height stable while switching. Buttons may lift slightly and press flat; inputs and the sheet's text do not move on hover. Do not add looping decoration or repeated section entrances. Use `suite-reveal` only on the statement panel when the shared observer is available.

Keep all inputs labeled, invalid values announced, strategy states explicit, and the chart summary available to assistive technology. Use text as well as color to distinguish states. Preserve visible focus and reduced-motion support.


## Shared motion and navigation

Updated 1 October 2026. The shared SuiteMotion runtime adds Lenis wheel and anchor smoothing, focus-safe section navigation with browser history, a pink reading-progress rule, active-section links, and a tactile back-to-top control. Touch scrolling, nested scroll regions and the visible browser scrollbar remain native. The animation-frame loop sleeps at rest. Reduced-motion preferences disable smoothing and spatial animation. Only selected narrative artifacts enter on scroll; working inputs and feedback remain stable.
