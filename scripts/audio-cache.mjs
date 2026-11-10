/**
 * Keeps recorded clips between Netlify deploys, so each deploy only records what is still missing
 * (and nothing is paid for twice). Netlify keeps /opt/build/cache from one build to the next.
 *
 *   node scripts/audio-cache.mjs restore   # before generating: copy cached clips into public/audio
 *   node scripts/audio-cache.mjs save      # after generating: copy public/audio into the cache
 *
 * Outside Netlify (no cache folder) it does nothing.
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';

const CACHE = process.env.AUDIO_CACHE_DIR ?? '/opt/build/cache/hablo-audio';
const LOCAL = new URL('../public/audio', import.meta.url).pathname;
const mode = process.argv[2];

if (!existsSync('/opt/build/cache') && !process.env.AUDIO_CACHE_DIR) {
  console.log('audio-cache: not on Netlify, nothing to do.');
  process.exit(0);
}
try {
  if (mode === 'restore') {
    if (existsSync(CACHE)) {
      // Clips in git win (force: false); only clips git doesn't have come from the cache.
      // Manifests are rebuilt by generate-audio.ts, so they can be overwritten safely.
      cpSync(CACHE, LOCAL, { recursive: true, force: false });
      console.log('audio-cache: restored clips from earlier deploys.');
    } else console.log('audio-cache: no cached clips yet.');
  } else if (mode === 'save') {
    mkdirSync(CACHE, { recursive: true });
    cpSync(LOCAL, CACHE, { recursive: true, force: true });
    console.log('audio-cache: saved clips for the next deploy.');
  } else {
    console.error('Usage: node scripts/audio-cache.mjs restore|save');
    process.exit(1);
  }
} catch (e) {
  // Never fail a deploy over the cache.
  console.log(`audio-cache: skipped (${e instanceof Error ? e.message : e}).`);
}
