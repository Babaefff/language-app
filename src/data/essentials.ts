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

export interface LevelledEssentials {
  prefix: string;
  /** Distinguishes this batch's unit ids (e.g. "core" → de-core-a1-1). */
  key: string;
  langName: string;
  native: string;
  /** Candidate words per level, in priority order; any already in the course are skipped. */
  words: Partial<Record<Level, WordRow[]>>;
  /** Sentence pool per level: each set takes the next four. */
  sentences: Partial<Record<Level, SentenceRow[]>>;
  grammar: string;
}

/** Like withEssentials, but every word is tagged with its level, so sets never mix levels. */
export function withLevelledEssentials(base: Unit[], e: LevelledEssentials): Unit[] {
  const taught = new Set(base.flatMap((u) => u.words.map((w) => w.id)));
  const out = [...base];
  for (const level of Object.keys(e.words) as Level[]) {
    const fresh = (e.words[level] ?? []).filter(([w]) => !taught.has(w) && taught.add(w));
    const pool = e.sentences[level] ?? [];
    const sets: Unit[] = [];
    for (let i = 0; i * 25 < fresh.length; i++) {
      const words = fresh.slice(i * 25, i * 25 + 25);
      if (words.length < 12) break;
      sets.push(units(level, [{
        id: `${e.prefix}${e.key}-${level.toLowerCase()}-${i + 1}`, title: `${level} words ${i + 1}`, titleEs: `${e.native} ${level} · ${i + 1}`, emoji: '📚',
        description: `More everyday ${e.langName} words for ${level}.`,
        words, sentences: pool.slice(i * 4, i * 4 + 4).length >= 4 ? pool.slice(i * 4, i * 4 + 4) : pool.slice(0, 4), grammar: e.grammar,
      }])[0]);
    }
    const last = out.map((u) => u.level).lastIndexOf(level);
    out.splice(last + 1, 0, ...sets);
  }
  return out;
}
