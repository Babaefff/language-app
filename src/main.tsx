import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { initSync } from './lib/sync';
import { applyTheme } from './lib/store';

// Before the first render, so a dark/light choice never flashes the other theme.
applyTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

void initSync();

// Offline support + installability. Skipped in dev so hot reload isn't cached.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
