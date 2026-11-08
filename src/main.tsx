import { StrictMode } from 'react';
import { Capacitor } from '@capacitor/core';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { applyTheme } from './lib/store';
import { loadContent } from './data/load';

// Before the first render, so a dark/light choice never flashes the other theme.
applyTheme();

// Only the course being studied is downloaded; the app (which reads it) loads after it.
async function start() {
  await loadContent();
  const [{ default: App }, { initSync }] = await Promise.all([import('./App'), import('./lib/sync')]);
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  void initSync();
}
start().catch(() => {
  // e.g. offline on a first visit to another language: say so instead of a blank page.
  const root = document.getElementById('root');
  if (root) root.innerHTML = '<p style="padding:2rem;font-family:system-ui">Couldn’t load the course. Check your internet connection and reload the page.</p>';
});

// Offline support + installability. Skipped in dev so hot reload isn't cached.
if ('serviceWorker' in navigator && import.meta.env.PROD && !Capacitor.isNativePlatform()) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
