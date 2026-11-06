/**
 * Generates natural-voice MP3 clips for the course with Google Cloud Text-to-Speech.
 *
 *   GOOGLE_TTS_KEY=... npm run audio            # words, examples, sentences, readings, grammar
 *   GOOGLE_TTS_KEY=... npm run audio -- --verbs # also every conjugated form (≈4 500 more clips)
 *   npm run audio -- --dry                      # just count clips and characters
 *
 * Options (env): TTS_VOICE (default es-ES-Neural2-A; Latin America: es-US-Neural2-A), TTS_LANG (from the voice).
 * Existing clips are skipped, so re-running only generates what's new.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { WORDS, SENTENCES } from '../src/data/course';
import { READINGS } from '../src/data/readings';
import { GRAMMAR } from '../src/data/grammar';
import { VERBS } from '../src/data/verbs';
import { conjugate, gerund, participle, TENSES } from '../src/lib/conjugate';
import { audioFile, audioKey, speakable, splitSentences } from '../src/lib/audioKey';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const withVerbs = args.includes('--verbs');
/** --optional: used in deploy builds — no key means "skip", never an error. */
const optional = args.includes('--optional');
/** Stop starting new clips after this many minutes (deploy builds have a time limit). */
const timeLimitMs = Number(process.env.TTS_TIME_LIMIT ?? 0) * 60_000;
const startedAt = Date.now();
const key = process.env.GOOGLE_TTS_KEY;
import { LANG } from '../src/data/lang';
const voice = process.env.TTS_VOICE ?? (LANG === 'de' ? 'de-DE-Neural2-A' : 'es-ES-Neural2-A');
const lang = process.env.TTS_LANG ?? voice.slice(0, 5);
// Spain clips live in public/audio/, other accents in public/audio/<lang>/ (e.g. es-US);
// the app picks the folder matching the accent chosen in Settings.
const OUT = new URL(lang === 'es-ES' ? '../public/audio/' : `../public/audio/${lang}/`, import.meta.url).pathname;

const texts = new Map<string, string>(); // key → text to synthesise
const add = (t?: string) => {
  if (!t) return;
  const k = audioKey(t);
  if (k && !texts.has(k)) texts.set(k, speakable(t));
};

for (const w of WORDS) { add(w.es); add(w.ex); }
for (const s of SENTENCES) add(s.es);
for (const r of READINGS) for (const p of r.paragraphs) splitSentences(p).forEach(add);
for (const g of GRAMMAR) {
  for (const b of g.blocks) if (b.t === 'examples') b.items.forEach(([es]) => add(es));
  for (const q of g.practice.choice ?? []) if (q.q.includes('___')) add(q.q.replace(/_{2,}/, q.options[q.answer]));
}
if (withVerbs) {
  for (const v of VERBS) {
    add(v.inf); add(participle(v)); add(gerund(v));
    for (const t of TENSES) conjugate(v.inf, t.id).forEach((f) => add(f ?? undefined));
  }
}

const chars = [...texts.values()].reduce((a, t) => a + t.length, 0);
console.log(`${texts.size} clips, ${chars.toLocaleString()} characters (voice ${voice}).`);
if (dry) process.exit(0);
if (!key) {
  if (optional) {
    console.log('No GOOGLE_TTS_KEY set — skipping audio generation.');
    process.exit(0);
  }
  console.error('Set GOOGLE_TTS_KEY to a Google Cloud API key with the Text-to-Speech API enabled.');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const todo = [...texts].filter(([k]) => !existsSync(OUT + audioFile(k)));
console.log(`${todo.length} to generate, ${texts.size - todo.length} already exist.`);

const ENDPOINT = process.env.TTS_ENDPOINT ?? 'https://texttospeech.googleapis.com/v1/text:synthesize';
/** Requests per minute. Google's default quota for Neural2 voices is low, so stay well under it. */
const RPM = Number(process.env.TTS_RPM ?? 150);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

class HttpError extends Error {
  constructor(public status: number, body: string) {
    super(`${status} ${body.slice(0, 200)}`);
  }
}

async function synth(text: string): Promise<Buffer> {
  const res = await fetch(`${ENDPOINT}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: lang, name: voice },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95 },
    }),
  });
  if (!res.ok) throw new HttpError(res.status, await res.text());
  return Buffer.from(((await res.json()) as { audioContent: string }).audioContent, 'base64');
}

/** Retries rate limits (429) and server errors with growing pauses: 5 s, 10 s, 20 s… up to 2 min. */
async function synthWithRetry(text: string): Promise<Buffer> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await synth(text);
    } catch (e) {
      const status = e instanceof HttpError ? e.status : 0;
      const retryable = status === 429 || status >= 500 || status === 0;
      if (!retryable || attempt >= 6) throw e;
      const wait = Math.min(120_000, Number(process.env.TTS_RETRY_MS ?? 5000) * 2 ** attempt);
      if (status === 429) console.log(`  Google says "too many requests" — pausing ${wait / 1000}s and retrying…`);
      await sleep(wait);
    }
  }
}

/** The manifest lists every key that has a clip on disk; the app only plays those. */
function writeManifest(): number {
  const files = new Set(readdirSync(OUT));
  const manifest = [...texts.keys()].filter((k) => files.has(audioFile(k)));
  writeFileSync(OUT + 'manifest.json', JSON.stringify(manifest));
  return manifest.length;
}
// Ctrl+C still saves what was made so far.
process.on('SIGINT', () => {
  console.log(`\nStopped. Saved ${writeManifest()} clips — run the same command again to continue.`);
  process.exit(130);
});

let done = 0;
let failed = 0;
let nextSlot = Date.now();
async function worker() {
  for (let item = todo.shift(); item; item = todo.shift()) {
    if (timeLimitMs && Date.now() - startedAt > timeLimitMs) {
      todo.length = 0; // time is up: the rest is generated on the next run
      break;
    }
    // Simple pacing shared by all workers: at most RPM requests per minute.
    const slot = Math.max(nextSlot, Date.now());
    nextSlot = slot + 60_000 / RPM;
    await sleep(slot - Date.now());
    const [k, text] = item;
    try {
      writeFileSync(OUT + audioFile(k), await synthWithRetry(text));
    } catch (e) {
      failed++;
      console.error(`✗ ${text}: ${(e as Error).message}`);
    }
    if (++done % 50 === 0) {
      const saved = writeManifest();
      console.log(`  ${done} done (${saved} clips saved)…`);
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));

const total = writeManifest();
const left = texts.size - total;
if (left) console.log(`${left} clips still missing — they will be generated on the next run.`);
console.log(`Done: ${total} clips in ${OUT.replace(/.*public\//, 'public/')} (${failed} failed${failed ? ' — run the command again to retry them' : ''}).`);
