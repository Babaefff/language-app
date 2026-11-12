# Session resume

Lessons, Review, Daily sessions and personal lessons/tests save unfinished work in this browser. Home links to the latest saved session; opening its route offers Resume session or Start over. Exit pauses the session. Completing a session removes its draft.

Saved state includes card/question position, question order, typed answers, selected tiles, submitted feedback, session scores and the Daily plan. Personal tests retain their original start time. Resume does not replay submitted answers or card ratings. Start over discards the draft, not learning progress already recorded.

Drafts are separated by account and language, expire after seven days, and are limited to eight per account/language. They are not uploaded or transferred between devices. Reset progress clears the current account/language drafts. Changed or unassigned personal material cannot be resumed. A visible warning reports storage write failures.

Standalone Practice, Grammar, Exam and Writing flows are outside this implementation. Concurrent completion in multiple tabs is not guaranteed to award only once. The local checksum detects accidental corruption; it is not an anti-cheating mechanism.

## Verification

Run `npm test` and `npm run build`. For browser regressions, start Vite on port 5176, then run `node scripts/check-session-resume.mjs`. Playwright must be available; `PLAYWRIGHT_MODULE` can point to its installed entry module, `CHROMIUM_PATH` overrides `/usr/bin/chromium`, and `BASE_URL` overrides the local server URL. The harness rejects remote hosts and mocks personal-account network calls. Its fixture is not imported by the production application.
