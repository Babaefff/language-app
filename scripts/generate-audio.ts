/**
 * Generates natural-voice MP3 clips for the course with Google Cloud Text-to-Speech.
 *
 *   GOOGLE_TTS_KEY=... npm run audio            # words, examples, sentences, readings, grammar
 *   GOOGLE_TTS_KEY=... npm run audio -- --verbs # also every conjugated form (≈4 500 more clips)
 *   npm run audio -- --dry                      # just count clips and characters
 *
 * Options (env): TTS_VOICE (default es-ES-Neural2-A), TTS_LANG (default es-ES).
 * Existing clips are skipped, so re-running only generates what's new.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { WORDS, SENTENCES } from '../src/data/course';
import { READINGS } from '../src/data/readings';
import { GRAMMAR } from '../src/data/grammar';
import { VERBS } from '../src/data/verbs';
import { conjugate, gerund, participle, TENSES } from '../src/lib/conjugate';
import { audioFile, audioKey, speakable, splitSentences } from '../src/lib/audioKey';

const OUT = new URL('../public/audio/', import.meta.url).pathname;
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const withVerbs = args.includes('--verbs');
const key = process.env.GOOGLE_TTS_KEY;
const voice = process.env.TTS_VOICE ?? 'es-ES-Neural2-A';
const lang = process.env.TTS_LANG ?? voice.slice(0, 5);

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
  console.error('Set GOOGLE_TTS_KEY to a Google Cloud API key with the Text-to-Speech API enabled.');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const todo = [...texts].filter(([k]) => !existsSync(OUT + audioFile(k)));
console.log(`${todo.length} to generate, ${texts.size - todo.length} already exist.`);

async function synth(text: string): Promise<Buffer> {
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: lang, name: voice },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95 },
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return Buffer.from(((await res.json()) as { audioContent: string }).audioContent, 'base64');
}

let done = 0;
let failed = 0;
async function worker() {
  for (let item = todo.shift(); item; item = todo.shift()) {
    const [k, text] = item;
    try {
      writeFileSync(OUT + audioFile(k), await synth(text));
    } catch (e) {
      failed++;
      console.error(`✗ ${text}: ${(e as Error).message.slice(0, 200)}`);
      if (failed > 10) process.exit(1);
    }
    if (++done % 50 === 0) console.log(`  ${done} done…`);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

// The manifest lists every key that has a clip on disk; the app only plays those.
const files = new Set(readdirSync(OUT));
const manifest = [...texts.keys()].filter((k) => files.has(audioFile(k)));
writeFileSync(OUT + 'manifest.json', JSON.stringify(manifest));
console.log(`Done: ${manifest.length} clips in public/audio (${failed} failed).`);
