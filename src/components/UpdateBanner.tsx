import { useEffect, useState } from 'react';

/** "Hablo was updated · Reload": shown when a new version has been installed in the background. */
export function UpdateBanner() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const on = () => setReady(true);
    window.addEventListener('hablo:update', on);
    return () => window.removeEventListener('hablo:update', on);
  }, []);
  if (!ready) return null;
  return (
    <div className="update-banner card" role="status">
      <span>✨ Hablo was updated</span>
      <button className="btn primary" onClick={() => window.location.reload()}>Reload</button>
      <button className="icon-btn" aria-label="Later" onClick={() => setReady(false)}>✕</button>
    </div>
  );
}
