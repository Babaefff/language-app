import { L } from '../data/lang';
import { normalize, stripAccents } from './text';
import { isNative } from './native';

// Browser speech recognition (Chrome, Edge, Safari). Free and on-device or browser-provided;
// it tells us what was understood, not how good the pronunciation sounded.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Rec = any;
function ctor(): (new () => Rec) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => Rec) | null;
}

export const recognitionSupported = () => isNative || !!ctor();

let active: Rec | null = null;

/** Listens for one utterance and resolves with the recognised alternatives (best first). */
export function listenOnce(): Promise<string[]> {
  if (isNative) return listenNative();
  const C = ctor();
  if (!C) return Promise.reject(new Error('unsupported'));
  active?.abort?.();
  return new Promise((resolve, reject) => {
    const r = new C();
    active = r;
    r.lang = L.tts;
    r.interimResults = false;
    r.maxAlternatives = 5;
    let got = false;
    r.onresult = (e: Rec) => {
      got = true;
      const res = e.results[0];
      const alts: string[] = [];
      for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
      resolve(alts);
    };
    r.onerror = (e: Rec) => reject(new Error(e.error ?? 'error'));
    r.onend = () => { if (!got) resolve([]); if (active === r) active = null; };
    try { r.start(); } catch (err) { reject(err); }
  });
}

export function stopListening() {
  active?.abort?.();
  active = null;
  if (isNative) void import('@capacitor-community/speech-recognition').then(({ SpeechRecognition }) => SpeechRecognition.stop()).catch(() => {});
}

const words = (s: string): string[] => stripAccents(normalize(s)).match(/\p{L}+/gu) ?? [];

/** Which target words were heard, and the share of the sentence that was understood. */
export function compareSpeech(target: string, heard: string[]) {
  const tw = words(target);
  let best: { found: boolean[]; pct: number; heard: string } = { found: tw.map(() => false), pct: 0, heard: heard[0] ?? '' };
  for (const h of heard) {
    const pool = words(h);
    const found = tw.map((w) => {
      const i = pool.indexOf(w);
      if (i < 0) return false;
      pool.splice(i, 1);
      return true;
    });
    const pct = Math.round((found.filter(Boolean).length / Math.max(1, tw.length)) * 100);
    if (pct > best.pct) best = { found, pct, heard: h };
  }
  return best;
}

export const RECOGNITION_ERRORS: Record<string, string> = {
  'not-allowed': 'Microphone access was blocked. Allow the microphone for this site in your browser settings.',
  'service-not-allowed': 'Speech recognition is not allowed in this browser.',
  'no-speech': 'No speech was heard. Try again a little closer to the microphone.',
  'audio-capture': 'No microphone was found.',
  network: 'Speech recognition needs an internet connection in this browser.',
  unsupported: 'Speech recognition is not available in this browser. Use Chrome, Edge or Safari.',
};

/** Android/iOS: the WebView has no speech recognition, so use the phone's recogniser. */
async function listenNative(): Promise<string[]> {
  const { SpeechRecognition } = await import('@capacitor-community/speech-recognition');
  const perm = await SpeechRecognition.requestPermissions();
  if (perm.speechRecognition !== 'granted') throw new Error('not-allowed');
  const { matches } = await SpeechRecognition.start({ language: L.tts, maxResults: 5, partialResults: false, popup: false });
  return matches ?? [];
}
