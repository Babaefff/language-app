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
  // App only: plan the daily reminders (after sync, so the word counts include other devices).
  setTimeout(() => { void import('./lib/reminders').then((r) => r.startReminders()); }, 4000);
}
start().catch(() => {
  // e.g. offline on a first visit to another language: say so instead of a blank page.
  const root = document.getElementById('root');
  if (root) root.innerHTML = '<p style="padding:2rem;font-family:system-ui">Couldn’t load the course. Check your internet connection and reload the page.</p>';
});

// Offline support + installability. Skipped in dev so hot reload isn't cached.
if ('serviceWorker' in navigator && import.meta.env.PROD && !Capacitor.isNativePlatform()) {
  // A page already controlled by an older version: when the new one takes over, offer a reload
  // (never forced, so a lesson in progress isn't lost).
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) window.dispatchEvent(new Event('hablo:update')); });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      // Look for a new version when the app comes back to the foreground (phones keep it open for days).
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch(() => {});
  });
}
