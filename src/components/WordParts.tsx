import { LANG } from '../data/lang';
import { breakdown } from '../lib/breakdown';

/**
 * "Briefträger = Brief (letter) + Träger (carrier) → literally 'letter carrier'": a word explained
 * by its parts, so it is understood rather than memorised.
 */
export function WordParts({ word, compact = false }: { word: { es: string; en: string }; compact?: boolean }) {
  const b = breakdown(word);
  if (!b) return null;
  return (
    <div className={`word-parts ${compact ? 'compact' : ''}`}>
      <span className="word-parts-label" aria-hidden="true">🧩</span>
      <span>
        {b.parts.map((p, i) => (
          <span key={i} className={`wp wp-${p.kind}`}>
            {i > 0 && <span className="wp-plus"> + </span>}
            <strong lang={LANG}>{p.text}</strong>{p.en && <span className="wp-en"> ({p.en.replace(/\s*\((.*)\)\s*$/, ', $1')})</span>}
          </span>
        ))}
        {b.literal && <span className="wp-literal"> → literally “{b.literal}”</span>}
      </span>
    </div>
  );
}
