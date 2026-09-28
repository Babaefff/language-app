# Hablo: learn Spanish (A1 → B1)

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

Progress is stored on the device in `localStorage`. You can export or import a backup in Settings.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # conjugation engine, SRS, answer checking, content integrity
npm run build      # static site in dist/
```

`dist/` is a plain static site. You can deploy it to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any other static host.

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
