const KEYS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];

export function AccentKeys({ onKey, disabled }: { onKey: (ch: string) => void; disabled?: boolean }) {
  return (
    <div className="accent-keys" aria-label="Spanish characters">
      {KEYS.map((k) => (
        <button key={k} type="button" tabIndex={-1} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={() => onKey(k)}>
          {k}
        </button>
      ))}
    </div>
  );
}
