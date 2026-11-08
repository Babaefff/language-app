import { useEffect, useRef, useState } from 'react';
import { googleClientId, signInWithGoogleIdToken } from '../lib/sync';

/* eslint-disable @typescript-eslint/no-explicit-any */
let gsiPromise: Promise<any> | null = null;
function loadGsi(): Promise<any> {
  const w = window as any;
  if (w.google?.accounts?.id) return Promise.resolve(w.google);
  gsiPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = () => resolve(w.google);
    s.onerror = () => { gsiPromise = null; reject(new Error('Could not load Google sign-in. Check your connection or ad blocker.')); };
    document.head.appendChild(s);
  });
  return gsiPromise;
}

async function makeNonce() {
  const raw = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, '0')).join('');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  const hashed = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  return { raw, hashed };
}

/** Google's official "Continue with Google" button. Google receives the hashed nonce, Supabase the raw one. */
export function GoogleButton({ onError }: { onError: (msg: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [google, nonce] = await Promise.all([loadGsi(), makeNonce()]);
        if (cancelled || !box.current) return;
        google.accounts.id.initialize({
          client_id: googleClientId,
          nonce: nonce.hashed,
          use_fedcm_for_prompt: true,
          callback: (res: { credential?: string }) => {
            if (!res.credential) return onError('Google sign-in was cancelled.');
            signInWithGoogleIdToken(res.credential, nonce.raw).catch((e) => onError((e as Error).message));
          },
        });
        const dark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        google.accounts.id.renderButton(box.current, {
          type: 'standard', theme: dark ? 'filled_black' : 'outline', size: 'large', text: 'continue_with', shape: 'pill',
          width: Math.min(400, box.current.clientWidth || 320),
        });
        setReady(true);
      } catch (e) {
        if (!cancelled) onError((e as Error).message);
      }
    })();
    return () => { cancelled = true; };
  }, [onError]);
  return <div ref={box} className="gsi-box" aria-busy={!ready} />;
}
