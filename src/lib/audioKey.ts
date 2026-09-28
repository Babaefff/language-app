/** Shared by the app and scripts/generate-audio.ts so both agree on which clip belongs to which text. */

/** Cleans display text so a voice doesn't read slashes or brackets aloud. */
export function speakable(text: string): string {
  return text.replace(/\(.*?\)/g, '').replace(/\s*\/\s*/g, ', ').replace(/\.\.\.|…/g, '').trim();
}

/** Stable lookup key for a spoken text: case- and spacing-insensitive. */
export function audioKey(text: string): string {
  return speakable(text).toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Splits a paragraph into sentences (reading view reads and highlights one at a time). */
export function splitSentences(p: string): string[] {
  return p.match(/[^.!?]+[.!?]+["”»]?\s*|[^.!?]+$/g) ?? [p];
}

/** Short deterministic file name for a key (FNV-1a, hex). */
export function audioFile(key: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < key.length; i++) {
    const c = key.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
    h2 = Math.imul(h2 ^ c, 2246822519) >>> 0;
  }
  return `${h1.toString(16).padStart(8, '0')}${h2.toString(16).padStart(8, '0')}.mp3`;
}
