# Security and reliability fixes — 12 November 2026

Based on remote commit `274655ac`. These changes address all six findings in the review. No production database has been modified by these tests.

## Deployment order

1. In the project's Supabase SQL Editor, run `supabase/migrations/20261112_security_fixes.sql`. It is transactional and re-runnable. It does not delete existing learner data. `schema.sql` includes the same migration for fresh installations.
2. Deploy the corresponding app commit. Before the migration, ordinary course sync remains compatible; the new cloud deletion operation fails visibly rather than silently falling back to a temporary deletion.
3. With test accounts, verify that a personal lesson cannot follow an account switch, an offline test uploads once after reconnecting, and deleting cloud course progress blocks uploads from an older second tab. Resume syncing explicitly to restore uploads.

The migration fixes the server-side feedback quota and admin JSON handling, and adds a durable pause for course progress. Frontend code alone cannot enforce those protections. No production Supabase connection was available in the development session.

## Behavior changes

- Personal-material requests are bound to the authentication generation, not just a cached account ID. The UI hides data owned by a different account synchronously, stale responses are discarded, and stale result-view promises are ignored.
- Test attempts use stable UUIDs. The browser persists an attempt before sending it, and retries use INSERT ON CONFLICT DO NOTHING. Queue operations are serialized with Web Locks across tabs where supported, with an in-process queue fallback. A legacy local ID is upgraded once before upload. Storage failures are reported rather than falsely claiming an offline save succeeded.
- Personal uploads validate question text, answer types, options, lesson fields, references, unique IDs, and translation maps. Malformed saved material is filtered before rendering.
- Feedback creation time is assigned by the database. Per-user advisory transaction locks serialize the rolling 30-report quota.
- The admin overview converts non-object progress fields to empty objects and parses numeric values defensively. Corrupt records do not take down the whole query.
- “Delete cloud progress” explicitly affects course progress for all languages; local progress, personal test results, and feedback are kept. The server pauses course uploads across devices. “Resume cloud sync” explicitly uploads retained local progress again. Account deletion remains the operation for deleting the account and its user-owned cloud records. Destructive RPCs check the expected account ID as well as the authenticated identity.

## Regression coverage

Client tests cover late account responses, concurrent outbox flushes, an upload followed by an ambiguous network failure, enqueueing during a flush, unavailable storage, invalid content, paused sync after reopening, deletion with a pending save, and explicit resume.

The database test harness creates a disposable database with simulated Supabase auth roles and RLS. It applies the schema and re-applies the migration, then checks timestamps/quotas, hostile JSON, admin authorization, pause/resume authorization, persistent upload blocking, and duplicate inserts under RLS. It does not connect to a hosted Supabase project. Cross-connection concurrency and actual hosted deployment configuration still need staging verification; the local engine serializes its connection.

To repeat the database checks without adding app dependencies:

```sh
npm install --prefix /tmp/hablo-db-test --cache /tmp/hablo-npm-cache @electric-sql/pglite@0.5.16
PGLITE_MODULE=/tmp/hablo-db-test/node_modules/@electric-sql/pglite/dist/index.js node scripts/test-security-db.mjs
```

Run `npm test` and `npm run build` for client checks.

## Rollback considerations

The additive database migration should normally remain installed if the frontend is rolled back: its protections also cover older clients. Older clients cannot resume a paused account themselves. Keep the new client available for explicit resume, or use an authorized administrative procedure after verifying the account owner's request. Do not remove the guard or clear pause flags automatically as a rollback step.

The retry mechanism prevents new duplicate uploads; it deliberately does not delete historical results because identical answers may represent legitimate separate attempts.

## Completed checks

160 client tests across 26 files passed, and the production build passed. The disposable PostgreSQL checks passed. Chromium smoke checks covered the welcome page and six main routes at 390 and 1440 px without runtime errors or horizontal overflow. The existing startup-errors.js build warning remains nonfatal. Live Netlify and production Supabase verification are still pending.
