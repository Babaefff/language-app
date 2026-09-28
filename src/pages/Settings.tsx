import { useEffect, useRef, useState } from 'react';
import { exportProgress, importProgress, resetProgress, updateSettings, useProgress } from '../lib/store';
import { clipAccent, clipCount, onVoicesChanged, spanishVoices, speak, speechSupported } from '../lib/speech';

export function Settings() {
  const { settings } = useProgress();
  const [voices, setVoices] = useState(spanishVoices());
  const [msg, setMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => { const off = onVoicesChanged(() => setVoices(spanishVoices())); return () => { off(); }; }, []);

  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hablo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="page narrow">
      <h1>Settings</h1>

      <section className="card">
        <h3>🔊 Audio</h3>
        {!speechSupported() && <p className="warn">Your browser doesn't support speech. Try Chrome, Edge or Safari.</p>}
        {speechSupported() && voices.length === 0 && (
          <p className="warn">No Spanish voice found on this device. On Android install one in Settings → Text-to-speech; on iPhone go to Settings → Accessibility → Spoken Content → Voices → Spanish; on Windows add Spanish under Time & Language → Speech.</p>
        )}
        <label className="field">
          Accent
          <select value={settings.accent} onChange={(e) => updateSettings({ accent: e.target.value as typeof settings.accent, voiceURI: null })}>
            <option value="es-ES">Spain (es-ES)</option>
            <option value="es-MX">Latin America (es-MX / es-US)</option>
            <option value="any">Any Spanish voice</option>
          </select>
        </label>
        <label className="field">
          Voice
          <select value={settings.voiceURI ?? ''} onChange={(e) => updateSettings({ voiceURI: e.target.value || null })}>
            <option value="">Automatic (best available)</option>
            {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
          </select>
        </label>
        <label className="field">
          Speed: {settings.rate.toFixed(2)}×
          <input type="range" min={0.5} max={1.3} step={0.05} value={settings.rate} onChange={(e) => updateSettings({ rate: Number(e.target.value) })} />
        </label>
        <button className="btn" onClick={() => speak('Hola, ¿qué tal? Me llamo Lucía y aprendo español.')}>▶ Test voice</button>
        <label className="toggle">
          <input type="checkbox" checked={settings.natural} onChange={(e) => updateSettings({ natural: e.target.checked })} />
          Use natural recorded voice ({clipCount() ? `${clipCount()} clips, ${clipAccent() === 'es-US' ? 'Latin American' : 'Spain'} accent` : 'not generated yet — see README'})
        </label>
        <label className="toggle"><input type="checkbox" checked={settings.autoplay} onChange={(e) => updateSettings({ autoplay: e.target.checked })} /> Play audio automatically</label>
      </section>

      <section className="card">
        <h3>🎯 Learning</h3>
        <label className="field">
          Daily goal
          <select value={settings.dailyGoal} onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}>
            <option value={20}>Casual — 20 XP</option>
            <option value={50}>Regular — 50 XP</option>
            <option value={100}>Serious — 100 XP</option>
            <option value={200}>Intense — 200 XP</option>
          </select>
        </label>
        <label className="toggle"><input type="checkbox" checked={settings.ticker} onChange={(e) => updateSettings({ ticker: e.target.checked })} /> Show the word ticker (keeps your words cycling at the top of every page)</label>
      </section>

      <section className="card">
        <h3>📱 Install on your phone</h3>
        <p className="small">Hablo works like an app and keeps working offline once installed.</p>
        <ul className="small">
          <li><strong>iPhone / iPad (Safari):</strong> tap Share → “Add to Home Screen”.</li>
          <li><strong>Android (Chrome):</strong> tap ⋮ → “Install app” or “Add to Home screen”.</li>
          <li><strong>Desktop (Chrome / Edge):</strong> click the install icon in the address bar.</li>
        </ul>
      </section>

      <section className="card">
        <h3>💾 Your data</h3>
        <p className="small muted">Progress is saved on this device only. Export a backup to move it to another device.</p>
        <div className="row wrap">
          <button className="btn" onClick={download}>Export backup</button>
          <button className="btn" onClick={() => file.current?.click()}>Import backup</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            try { importProgress(await f.text()); setMsg('Backup restored ✓'); } catch (err) { setMsg(String(err)); }
          }} />
          {confirmReset ? (
            <>
              <button className="btn danger" onClick={() => { resetProgress(); setConfirmReset(false); setMsg('Progress reset.'); }}>Yes, delete all progress</button>
              <button className="btn" onClick={() => setConfirmReset(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn danger" onClick={() => setConfirmReset(true)}>Reset progress</button>
          )}
        </div>
        {msg && <p className="small">{msg}</p>}
      </section>
    </div>
  );
}
