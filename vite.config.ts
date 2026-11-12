import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

/** Puts the list of built files into sw.js, so the service worker saves the whole app for offline use. */
function offlineList(): Plugin {
  let files: string[] = [];
  let outDir = 'dist';
  return {
    name: 'hablo-offline-list',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir; },
    generateBundle(_o, bundle) { files = Object.keys(bundle).filter((f) => !f.endsWith('.map')); },
    closeBundle() {
      const sw = resolve(outDir, 'sw.js');
      if (!existsSync(sw)) return;
      const extra = ['manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'privacy.html', 'startup-errors.js'];
      const list = [...new Set([...files, ...extra])].map((f) => `./${f}`).sort();
      writeFileSync(sw, readFileSync(sw, 'utf8')
        .replace('__HABLO_BUILD__', Date.now().toString(36))
        .replace('/*__HABLO_FILES__*/ []', JSON.stringify(list)));
    },
  };
}

// `base: './'` keeps asset paths relative so the build works on any static host
// and inside a Capacitor (Android/iOS) web view.
export default defineConfig({
  base: './',
  plugins: [react(), offlineList()],
  test: {
    include: ['src/**/*.test.ts'],
    // Content audits walk every lesson; under a full parallel run they can need more than 5 s.
    testTimeout: 30000,
  },
});
