# Workbook redesign and learning flow

## What changed

Home uses a compact dashboard with the next lesson, review counts, direct activity links, and course progress. The daily session is an optional sidebar action. A shared palette, spacing system, controls, typography, and five-item mobile navigation apply across the app. Grammar and Songs remain available through Practice. Home, unit overviews, Review, and exercise feedback have dedicated layouts. Light and dark modes are supported.

The daily session freezes a plan when opened: up to five due word questions, up to three due mistakes not already covered by those words, one complete next lesson step, and one eligible sentence check. Stages with no material are omitted. It has a finite finish; additional practice is optional. Completed lesson steps and answers are saved. An interrupted daily session restarts its plan when revisited, rather than claiming partial steps were completed.

A mistake notebook records model prompts and corrections, not learners' typed answers. Mistakes become due after 24 hours and clear on a later successful first attempt. Immediate retries remain practice. History is bounded and follows the existing account separation, backup, reset, and sync behavior. Old backups remain supported. No database schema change or analytics service is required.

## What the measurements mean

- Delayed recall: a first typed word response at least 24 hours after both the card's last scheduled review and its most recent recorded exercise. Repeated exposure within a session, retries, and notebook drills are excluded. Recent aborted exercises also prevent another attempt from being called delayed recall.
- Sentence checks: the first recorded attempt at a held-out combination of familiar phrases, using material from a unit whose practice step was completed. Two authored checks per language are excluded from ordinary lessons and practice. Once attempted, a check is not reused as a fresh test in retained history. This small near-transfer sample is not proof of broad transfer or a CEFR result.
- Insights use the last 30 days within the most recent 500 measured checks. No historical XP is relabeled as evidence. Small samples are shown with counts.
- Concurrent device histories merge individual measured events by ID, avoiding duplicated samples. Resolved mistakes carry timestamps so an older cloud copy does not reopen them.

Spacing and retrieval practice have broad research support. The particular 24-hour notebook delay, batch sizes, colors, and wording here are product choices, not scientifically validated prescriptions. Useful background: Dunlosky et al. (2013), *Improving Students’ Learning With Effective Learning Techniques*, https://doi.org/10.1177/1529100612453266; Cepeda et al. (2006), *Distributed practice in verbal recall tasks*, https://doi.org/10.1037/0033-2909.132.3.354; Rowland (2014), *The effect of testing versus restudy on retention*, https://doi.org/10.1037/a0037559. These sources were not newly checked online in this task.

## Validation and learner study

Automated validation covers bounded plans, old saves, mistake scheduling and resolution, history merging, malformed data, and delayed-recall eligibility. Browser checks cover new and returning learner session completion, incorrect-answer feedback, immediate retries, notebook resolution, insights, responsive layouts, theme switching, and all four course languages.

Real learner testing is still pending; automated browser runs are not learner participants. Recruit 3–5 people across beginner and returning-learner experience, preferably on their own phones. Ask for consent before recording or collecting their exported progress. Do not coach them through these tasks:

1. From Home, find the next useful activity and explain why you chose it.
2. Start and finish today's session. Explain whether it feels clear when you can stop.
3. Make a mistake. Explain the correction and where you would find it later.
4. Return after at least 24 hours and try the review before opening the correction.
5. Explain the two figures in Learning insights, including their limits.

Record task completion, wrong turns, where help was needed, and whether feedback/finish were understood. Note device and theme. Use delayed-recall and sentence-check counts as descriptive pilot data. For a design comparison, balance task order and use equivalent material; do not infer a learning effect from a handful of participants or compare different learners' raw XP. Expand and independently review the small held-out sentence bank before claiming broader transfer.

## Rollback

The exact pre-redesign code is preserved on GitHub at branch `backup/before-workbook-redesign-2026-11-08`, commit `2515b5497191fa73599d4b0eb48674dfedcfc08e`.

To undo this release, revert the workbook redesign commit on `claude/spanish-learning-platform-x0ckgi` and push the revert. Prefer a normal revert over resetting or force-pushing shared history. The release commit is named `Redesign learning workspace and add daily retrieval practice`. If later commits depend on it, review those before reverting.

Export a progress backup before rollback: older code ignores the new learning-history fields and can omit them on subsequent saves or syncs. Existing words, completed steps, scores, and settings remain compatible. This rollback branch is a code checkpoint, not a backup of learners' browser or cloud data. Netlify deploy status must be checked separately from a successful Git push.

## Checks completed for this release

- `npm test`: 85 tests across 13 files passed.
- `npm run build`: TypeScript and production bundling passed. The existing classic-script warning for `startup-errors.js` remains nonfatal.
- Chromium: complete new-learner and returning-learner daily sessions, including deliberately wrong answers, retry exclusion, later notebook resolution, and displayed insight counts.
- 83 route/layout/language checks across 320, 390, 768, and 1440 px in light and dark themes, plus sign-in header checks at 320, 390, 800, 900, and 1440 px.
- Production-preview smoke checks: all four languages load and start their daily lesson without runtime exceptions.
- Live Netlify verification remains blocked by this environment's outbound proxy (403 on CONNECT). A Git push can trigger Netlify, but does not prove deployment completion.

## Compact-layout correction

Removed the Home hero, motivational paragraphs, and repeated explanations. Exercise feedback and headings now use short functional labels. Home has about 100 words for a new learner. The daily lesson workspace explicitly fills its available width (800 px on desktop, fluid on mobile), fixing shrink-to-content behavior caused by horizontal auto margins inside a flex column. The learning, notebook, and measurement behavior is unchanged. The original pre-redesign rollback branch remains available.
