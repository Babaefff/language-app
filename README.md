# Hablo: learn Spanish and German

A web app for learning Spanish that also installs on phones. It covers vocabulary, conjugation, sentence building, graded reading, and audio for every word.

## Features

| | |
|---|---|
| **Course** | 43 units (A1 ×17, A2 ×13, B1 ×13), 1,022 words, including 275 most-frequent words in 11 "Top words" sets. Each unit has 3 steps: *learn the words* (flashcards with audio → recognition quiz), *practise* (listen & type, choose, write), and *grammar + sentences + verbs*. |
| **Grammar** | 20 step-by-step lessons (A1–B1) that teach the logic: stem + ending, the person code, boot verbs, yo-go verbs, irregular preterite and future stem families, ser/estar, por/para, subjunctive… Colour-coded verb tables (endings vs. changed stems), examples with audio, and practice at the end of each lesson. |
| **Spaced repetition** | Every word you meet goes into an SM‑2 style review deck. Words come back just before you'd forget them. Review as flashcards (self-graded) or as a quiz. |
| **Keeps words in front of you** | A *word ticker* on every page cycles through the words you're weakest on (tap to hear). There's also a *word of the day* and a hands-free **Listen mode** that plays word → pause → meaning → example on a loop. |
| **Conjugation** | A rule-based engine (`src/lib/conjugate.ts`) covering 9 tenses: presente, continuo, indefinido, imperfecto, perfecto, futuro, condicional, subjuntivo, imperativo. It handles stem changes, spelling changes and irregulars. There's a drill mode plus full verb tables with audio. |
| **Sentences** | Build sentences from word tiles, or write them from scratch. |
| **Reading** | 12 texts from A1 to B1+, including public-domain classics: *Don Quijote* (ch. 1), *Lazarillo de Tormes*, Bécquer's *Rima LIII*. Tap any word for its meaning, including conjugated forms like *fue → ir/ser, preterite*. The text can be read aloud with sentence highlighting, and there are comprehension questions. |
| **Audio** | Uses the device's built-in Spanish text-to-speech (free, works offline). You can choose the voice, the accent (Spain / Latin America) and the speed. |

Progress is stored on the device in `localStorage`. You can export or import a backup in Settings. Signed-in accounts keep separate local progress copies. Signing out returns to guest progress; guest progress is only added to an account with the **Import guest progress** button in Settings. Existing unassigned progress from older versions stays in the guest copy, so import it only if it is yours. Backup imports are limited to 1 MB and validated before use.

## Daily practice and learning insights

Home now offers a finite daily session: a small batch of due reviews, due mistakes, one complete lesson step, and a sentence check when eligible. Review includes a mistake notebook; corrections return after 24 hours and clear on a later successful retrieval. Learning insights show first-attempt delayed word recall and first recorded sentence checks with sample counts, rather than treating XP as proficiency.

The visual system uses warm white surfaces and teal actions, with matching dark mode. The measurement definitions, validation notes, pending real-learner study, and rollback checkpoint are documented in [the redesign guide](docs/learning-redesign.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # conjugation engine, SRS, answer checking, content integrity
npm run build      # static site in dist/
```

`dist/` is a plain static site. You can deploy it to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any other static host.

## Publishing (Netlify — live at https://habloso.netlify.app)

Netlify builds the site on every push (`netlify.toml`). If **GOOGLE_TTS_KEY** is set under *Project configuration → Environment variables* in Netlify, each build first creates natural-voice clips for anything new (up to 5 minutes per language), and keeps them between builds with `netlify-plugin-cache`. For a big backlog, run `npm run audio -- --verbs` (and with `HABLO_LANG=de`) locally once and commit `public/audio/`.

## Mobile

**Now (no app store needed):** Hablo is a PWA. Open the deployed site, then:
- iPhone (Safari): Share → *Add to Home Screen*
- Android (Chrome): ⋮ → *Install app*

It then opens full-screen like a native app and works offline.

**Play Store / App Store later:** wrap the same build with [Capacitor](https://capacitorjs.com):

```bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init Hablo com.example.hablo --web-dir dist
npm run build && npx cap add android && npx cap open android   # build & sign in Android Studio
```

iOS works the same way (`@capacitor/ios`), but it needs a Mac with Xcode. The app already uses relative paths and hash routing, so it runs unchanged inside Capacitor.

## Languages

Pick the language in the header (🇪🇸 Spanish / 🇩🇪 German). Each language keeps its own progress.

- **Spanish:** A1 → B1 (`src/data/*.ts`)
- **German:** A1–B1, with 1,003 words, 29 grammar lessons and 14 readings (`src/data/de/`). Its own verb engine is in `src/lib/conjugate-de.ts`; it covers present, Perfekt, Präteritum, Futur, Konjunktiv II and imperative, including vowel changes and separable verbs.

Scripts choose the language with `HABLO_LANG=de`.

## Natural voice (Google Cloud Text-to-Speech)

By default the app uses the device's built-in voice. For a natural, consistent voice everywhere, generate MP3 clips once:

1. In [Google Cloud Console](https://console.cloud.google.com): create a project → enable **Cloud Text-to-Speech API** → *APIs & Services → Credentials → Create credentials → API key* (restrict it to the Text-to-Speech API).
2. Run:
   ```bash
   npm run audio -- --dry                  # shows how many clips / characters
   GOOGLE_TTS_KEY=your-key npm run audio   # ≈1 400 clips, ≈24k characters
   GOOGLE_TTS_KEY=your-key npm run audio -- --verbs   # + every verb form (≈76k characters)
   ```
3. Commit `public/audio/`. For a Latin American voice run it again with `TTS_VOICE=es-US-Neural2-A` (clips go to `public/audio/es-US/`); the Accent setting switches between them. The app plays a clip whenever one exists and falls back to the device voice otherwise (toggle in Settings).

German audio: `HABLO_LANG=de GOOGLE_TTS_KEY=your-key npm run audio -- --verbs` (clips go to `public/audio/de-DE/`).

Choose another voice with `TTS_VOICE`, e.g. `es-US-Neural2-A` (Latin American) or `es-ES-Neural2-F` (male). Neural2 voices are free up to 1 million characters per month, so the whole course is well within the free tier. Re-running only generates new clips.

## Adding content

- **Words / units:** `src/data/a1.ts`, `a2.ts`, `b1.ts`. Word rows are `[spanish, english, example?, exampleEnglish?]`. Grammar notes use a tiny markup: `## heading`, `- bullet`, `| table |`, `**bold**`, `*italic*`.
- **Verbs:** `src/data/verbs.ts`. Only irregular parts need declaring (`yo: 'tengo'`, `stem: 'ie'`, `pret: 'tuv'`, `fut: 'tendr'`, …).
- **Readings:** `src/data/readings.ts`.
- **Grammar lessons:** `src/data/grammar.ts`. Blocks are text, colour-coded verb tables (`{ t: 'table', verbs, tense }`), examples and tips; practice is conjugation items and/or gap-fill questions. Link lessons to units in `UNIT_LESSONS` (`src/data/course.ts`).
- **New levels (B2…):** add the level to `LEVELS` in `src/data/types.ts` and add a data file.

`npm test` checks the content: duplicate words, unknown verbs, malformed readings.

## Roadmap ideas

- Recorded or neural TTS audio files for consistent pronunciation across devices
- Accounts + cloud sync (e.g. Supabase) so progress follows you between phone and laptop
- Speaking practice with speech recognition
- More languages: the data model is language-agnostic

## Lesson feedback (needs accounts)

Signed-in learners can press the flag button in any exercise, lesson, grammar lesson or text to
report a problem. The report carries where it happened (lesson, step, the exercise, the expected
answer and what they typed). They see their reports under **My feedback**; when an admin marks one
fixed, they get a thank-you in the app.

Setup, once, in Supabase → SQL Editor:
1. Run `supabase/schema.sql` again (it is safe to re-run).
2. Make yourself an admin (use the email you sign in with):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'YOUR-EMAIL' on conflict do nothing;
   ```
Then the account menu shows **Feedback inbox (admin)**: open a report, press **Open this lesson**
to go there (in the right language), fix it, and press **Mark fixed & thank**.

## Accounts (optional, Supabase)

Without these settings the app saves progress only in the browser. To let learners sign in and sync progress across devices:

1. Create a free project at supabase.com.
2. **SQL Editor → New query**: paste `supabase/schema.sql` and run it (creates the `progress` table with row-level security).
3. **Authentication → URL Configuration**: set *Site URL* to the deployed address (e.g. `https://habloso.netlify.app`) and add it, plus `http://localhost:5173`, to *Redirect URLs*.
4. **Project Settings → API Keys**: copy the *publishable* key (`sb_publishable_…`). The Project URL is `https://<Project ID>.supabase.co` (Project ID under **Project Settings → General**). Put them into Netlify (**Project configuration → Environment variables**) as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, and into `.env.local` for local development. Never use a *secret* key (`sb_secret_…`) in the app.
5. Redeploy. A **☁️ Account** card appears in Settings (email sign-in link). For Google sign-in, enable the Google provider in Supabase and set `VITE_SUPABASE_GOOGLE=1`.

## Audio voices

`npm run audio -- --sample` writes `sample.mp3` so you can compare voices first, e.g. `TTS_VOICE=de-DE-Chirp3-HD-Aoede HABLO_LANG=de npm run audio -- --sample`. Dialogues ("– … – …") use a second voice (`TTS_VOICE_2`). After choosing a new voice, `--redo` regenerates every clip; `--redo-dialogues` only the conversations.
