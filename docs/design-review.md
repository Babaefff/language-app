# Hablo design review

Reviewed 8 November 2026. Scope: shared light/dark palette, lesson overview actions, grammar actions, and the interaction rules that should govern later changes.

## Decision

Keep teal as Hablo's action color and the recognizable fire streak. Use neutral backgrounds and reading surfaces, with brighter surfaces above the dark page background. Group a page's progress/context and primary action on its left reading edge. Keep the wide, compact desktop dashboard and short functional labels.

The previous lesson button used `justify-content: space-between`, separating related elements across the entire content width. That was a layout choice without a good justification for this page. Passing overflow and click tests did not validate its visual hierarchy. The corrected desktop arrangement is progress, then Continue lesson 12 px below it, sharing the left edge of the step list. Mobile keeps the full-width button. The first unfinished step still has a Next label and border, and completed steps remain available.

There is no universal rule that every primary button must be on the left. Page content, dialogs, toolbars, and sequential exercise footers have different contexts. This change also aligns the standalone grammar page's Practise action and unit grammar's Start exercises action with their content; exercise Back/Next controls retain their sequential layout.

## Research and applicability

The public documentation sites returned proxy 403 errors. The official repositories below were accessible and read directly; this is source-document research, not a visual inspection of the live websites. These systems are reference implementations, not universal laws or evidence that Hablo's retention will improve.

| Source read | Relevant guidance | Application to Hablo |
| --- | --- | --- |
| [IBM Carbon: button usage](https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/button/usage.mdx#alignment) | Full-page primary actions generally align left; wizard/dialog actions may align right. One primary action establishes hierarchy. | Keep Continue close to the lesson context on the reading edge. Other step choices use lower emphasis. |
| [GOV.UK: buttons](https://github.com/alphagov/govuk-design-system/blob/main/src/components/button/index.md) | Use action-describing labels, one main call to action, and left-align the primary form action. | Start lesson / Continue lesson / Next lesson describe the actual state and action. Form guidance is supporting evidence, not an assertion that a lesson overview is a form. |
| [GOV.UK: question pages](https://github.com/alphagov/govuk-design-system/blob/main/src/patterns/question-pages/index.md) | Clear heading, back link, and Continue action; test progress indicators rather than adding complexity by default. | Preserve clear exercise tasks and exits. Do not add a second instructional paragraph to explain navigation. |
| [Carbon: color](https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/elements/color/overview.mdx) | Neutral surfaces organize content; an action color has a specific role; dark layers become lighter. | Keep teal for actions/selection, neutralize large reading surfaces, retain separate success/error roles. Carbon's blue is its brand choice, not a reason to make Hablo blue. |
| [Carbon: themes](https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/elements/themes/overview.mdx) | Tokens keep the same semantic roles across themes. | Update shared CSS variables, not scattered page-specific hex values. Check both explicit and OS-selected themes. |
| [Carbon: spacing](https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/elements/spacing/overview.mdx#designing-with-space) | Proximity communicates relationships; consistent spacing establishes groups and hierarchy. | Use a 12 px progress/action gap, with more space before the step list. Do not use a viewport-wide empty gap between related controls. |
| [GOV.UK: colour](https://github.com/alphagov/govuk-design-system/blob/main/src/styles/colour/index.md) | Functional colors should have consistent purposes; check contrast. | Keep brand, success, error, surface, and text roles distinct. |
| [W3C: contrast minimum](https://github.com/w3c/wcag/blob/main/understanding/20/contrast-minimum.html) | Normal text needs 4.5:1; evaluate actual foreground/background values without rounding a failure upward. | Check muted text, primary buttons, status text, and small level labels, not just body text. |
| [W3C: non-text contrast](https://github.com/w3c/wcag/blob/main/understanding/21/non-text-contrast.html) | Essential control/state cues need 3:1 against adjacent colors; decorative boundaries have different requirements. | Check focus outlines against the reading surfaces. Do not claim every decorative card border must be 3:1. |
| [W3C: use of color](https://github.com/w3c/wcag/blob/main/understanding/20/use-of-color.html) | Color cannot be the only means of conveying information. | Retain Next, completion checks, scores, and feedback text alongside color. |
| [W3C: target size minimum](https://github.com/w3c/wcag/blob/main/understanding/22/target-size-minimum.html) | AA specifies 24 × 24 CSS px with exceptions; the enhanced criterion uses 44 × 44. | Keep the larger existing primary-action/settings targets; do not misrepresent 44 px as the universal AA minimum. |

GOV.UK's button page also reports better start-button click-through with green in its own research. That is not evidence that green improves language learning or long-term return visits. The underlying linked discussion was not independently evaluated here.

## Shared palette

The previous teal palette was readable in the main text pairs, but gave background, cards, ticker, and selection a similar hue. The diagnosis of weak visual separation is a design judgment; contrast alone does not measure it. The revised palette preserves the action color while reducing that competition.

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#f6f7f8` | `#171a1c` |
| Card / reading surface | `#ffffff` | `#222629` |
| Secondary surface | `#eef1f3` | `#2d3337` |
| Text | `#20272b` | `#f4f5f5` |
| Secondary text | `#56636b` | `#b6bfc3` |
| Primary action | `#176452` | `#85d7bd` |
| Primary label | `#ffffff` | `#102722` |

The dark A1/A2/B1 badges previously measured 3.94:1, 3.84:1, and 4.25:1 with white labels. Darkening their backgrounds raises them to 5.05:1, 5.04:1, and 5.61:1. The same level colors still distinguish the levels, with explicit A1/A2/B1 labels.

Selected text contrast after the change:

| Pair | Light | Dark |
| --- | --- | --- |
| Body text / page | 14.12:1 | 16.01:1 |
| Secondary text / secondary surface | 5.46:1 | 6.85:1 |
| Primary label / primary action | 7.04:1 | 9.33:1 |

These are targeted measured checks, not a full WCAG conformance assessment.

## Rules for subsequent changes

- Put the page's main action near the content that explains it. On content pages, align it with the left reading edge; justify exceptions by the interaction context.
- Give one action the strongest emphasis. Explanations and optional activities should not compete with it.
- Keep progress/context and its action grouped; reserve larger gaps for different sections.
- Use shared color roles in both themes. Retest text, status labels, control states, and focus when a role changes.
- Preserve recognizable navigation, Grammar access, and the fire streak. Consistency does not require replacing every familiar symbol.
- Check new, partially completed, completed, and empty states. Test long labels and every supported language at narrow and wide widths.
- Inspect screenshots as well as geometry. A working click target and no overflow do not establish a clear design.

## Retention and learning: what to validate next

The useful outcome is learners returning and remembering more. Extra time spent trying to find Continue is not engagement. No retention improvement is claimed for this release.

1. Test Home → lesson → next unfinished step with 3–5 learners. Ask them to continue without coaching. Record first click, wrong turns, time to find the action, completion, and where help was needed. Include desktop and mobile. This is a usability pilot, not a statistically powered retention experiment.
2. Prioritize reliable resume behavior and clear next steps over more promotional copy. Review still offers two equally prominent modes when words are due; test whether a single recommended review action would reduce hesitation before changing it.
3. For a later measured release, define eligible cohorts and observation windows first: lesson-start rate after opening an overview, step-completion rate after starting, and return to a learning activity within 7 days after the first completed lesson. Compare equivalent users and report counts. Determine sample size from baseline rates before an A/B test.
4. Pair return/completion metrics with the existing delayed-recall and unfamiliar-sentence checks. Those are limited descriptive samples, not proof of general proficiency.
5. Watch errors, accidental repeats, abandonments, and user-reported difficulty as guardrails. Avoid inferring success from session length or XP alone.

No new analytics, notifications, or data collection were added. Real learner testing remains pending. Further CSS cleanup should consolidate the older overlapping style blocks in a separately checked change; it should not become another visual redesign.

## Validation and rollback

Validation results are recorded with the implementation in `learning-redesign.md`. The code before this refinement is commit `702c4661`; a normal revert of this refinement can restore its palette/layout without resetting learner progress. The original pre-redesign backup branch also remains available. A successful push is not confirmation of a completed Netlify deployment.
