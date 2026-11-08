import { units, type SentenceRow, type WordRow } from './build';
import type { Level, Unit } from './types';

export interface EssentialsInput {
  /** Id prefix, e.g. "de-" (Spanish has none). */
  prefix: string;
  langName: string;
  native: string;
  /** Candidate words in priority order; any already in the course are skipped. */
  words: WordRow[];
  /** Levels of the sets, in order; each set has 25 words. */
  levels: Level[];
  /** Four sentences per set, using only that level's grammar. */
  sentences: SentenceRow[][];
  grammar: string;
}

/**
 * "Essential words": everyday words that the topic units and Top-words sets don't cover yet,
 * so every course reaches ~1,200 words. Each set is placed at the end of its level.
 */
export function withEssentials(base: Unit[], e: EssentialsInput): Unit[] {
  const taught = new Set(base.flatMap((u) => u.words.map((w) => w.id)));
  const seen = new Set<string>();
  const fresh = e.words.filter(([w]) => !taught.has(w) && !seen.has(w) && seen.add(w));
  const sets = e.levels.map((level, i) =>
    units(level, [{
      id: `${e.prefix}ess-${i + 1}`, title: `Essential words ${i + 1}`, titleEs: `${e.native} ${i + 1}`, emoji: '🔑',
      description: `Everyday ${e.langName} words, set ${i + 1} of ${e.levels.length}.`,
      words: fresh.slice(i * 25, i * 25 + 25), sentences: e.sentences[i], grammar: e.grammar,
    }])[0],
  ).filter((u) => u.words.length >= 12);
  const out = [...base];
  for (const s of sets) {
    const last = out.map((u) => u.level).lastIndexOf(s.level);
    out.splice(last + 1, 0, s);
  }
  return out;
}
