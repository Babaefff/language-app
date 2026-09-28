import { getProgress } from './store';

// Sandboxed/embedded pages can expose speechSynthesis but throw when it is used, so every
// call below is guarded: missing audio must never break a lesson.
function getSynth(): SpeechSynthesis | null {
  try {
    return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  } catch {
    return null;
  }
}
const synth = getSynth();

let voices: SpeechSynthesisVoice[] = [];
const voiceListeners = new Set<() => void>();

function refreshVoices() {
  if (!synth) return;
  try {
    voices = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith('es'));
  } catch {
    voices = [];
  }
  voiceListeners.forEach((l) => l());
}

if (synth) {
  refreshVoices();
  try {
    synth.addEventListener?.('voiceschanged', refreshVoices);
  } catch {
    // ignore
  }
}

export const speechSupported = () => !!synth;
export const spanishVoices = () => voices;
export function onVoicesChanged(l: () => void) {
  voiceListeners.add(l);
  return () => voiceListeners.delete(l);
}

const QUALITY = /google|natural|neural|premium|enhanced|mónica|monica|paulina|jorge|siri/i;

function pickVoice(): SpeechSynthesisVoice | undefined {
  const { voiceURI, accent } = getProgress().settings;
  const chosen = voices.find((v) => v.voiceURI === voiceURI);
  if (chosen) return chosen;
  const byAccent = accent === 'any' ? voices : voices.filter((v) => v.lang.replace('_', '-').startsWith(accent));
  const pool = byAccent.length ? byAccent : voices;
  return pool.find((v) => QUALITY.test(v.name)) ?? pool[0];
}

/** Cleans display text so the voice doesn't read slashes or brackets aloud. */
function speakable(text: string) {
  return text.replace(/\(.*?\)/g, '').replace(/\s*\/\s*/g, ', ').replace(/\.\.\.|…/g, '');
}

/** Speaks Spanish text. Resolves when finished (or immediately if speech is unavailable). */
export function speak(text: string, opts: { rate?: number; lang?: 'es' | 'en' } = {}): Promise<void> {
  if (!synth) return Promise.resolve();
  return new Promise((resolve) => {
    try {
      speakNow(synth, text, opts, resolve);
    } catch {
      resolve();
    }
  });
}

function speakNow(synth: SpeechSynthesis, text: string, opts: { rate?: number; lang?: 'es' | 'en' }, resolve: () => void) {
  synth.cancel();
  const clean = speakable(text);
  const u = new SpeechSynthesisUtterance(clean);
  const rate = opts.lang === 'en' ? 1 : (opts.rate ?? getProgress().settings.rate);
  if (opts.lang === 'en') {
    u.lang = 'en-US';
  } else {
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? 'es-ES';
  }
  u.rate = rate;
  // Some engines never fire `end` (or have no voices at all); don't let callers hang.
  const timer = setTimeout(done, 1500 + (clean.length * 110) / rate);
  function done() {
    clearTimeout(timer);
    resolve();
  }
  u.onend = done;
  u.onerror = done;
  synth.speak(u);
}

export function stopSpeaking() {
  try {
    synth?.cancel();
  } catch {
    // ignore
  }
}
