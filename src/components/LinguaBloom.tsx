import { useId } from 'react';
import { LANG } from '../data/lang';
import { UNITS } from '../data/course';
import { streak, useProgress } from '../lib/store';

/** Deterministic random numbers from a text seed (FNV-1a + mulberry32). */
function rng(seed: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  return () => {
    h = (h + 0x6d2b79f5) >>> 0;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Petal colours: the flag of the language being learned. */
const PALETTES: Record<string, string[]> = {
  es: ['#c60b1e', '#ffc400', '#e8590c', '#f59f00'],
  de: ['#1f1f1f', '#dd0000', '#ffce00', '#7a0000'],
  fr: ['#0055a4', '#ef4135', '#3a7bd5', '#b8212c'],
  ru: ['#0039a6', '#d52b1e', '#5b7fd1', '#a51f16'],
};
/** Streak laps of 30 days: 1–30 gold, 31–60 orange, 61–90 ruby, 91–120 violet, 121+ diamond. */
export const STREAK_COLOURS = ['#ffb300', '#fb8c00', '#e53935', '#8e24aa', '#00bcd4'];
const LEVEL_RING = { none: '#9e9e9e', A1: '#2e7d32', A2: '#1565c0', B1: '#8e24aa' } as const;

export interface BloomData { lessons: number; streak: number; level: keyof typeof LEVEL_RING }

/** What the avatar shows, from this language's progress. */
export function useBloomData(): BloomData {
  const p = useProgress();
  const done = UNITS.filter((u) => p.units[u.id]);
  const level = (['B1', 'A2', 'A1'] as const).find((lv) => done.some((u) => u.level === lv)) ?? 'none';
  return { lessons: done.length, streak: streak(p.xp, p.frozen), level };
}

/**
 * "Lingua Bloom": a generated avatar unique to each learner that grows with their learning.
 * Every finished lesson adds a petal (a second ring opens after 10), petals wear the colours of
 * the language being learned, dots around the edge are streak days, the outer ring is the level.
 */
export function LinguaBloom({ seed, glyph, data, size = 64, detail = true }: { seed: string; glyph: string; data: BloomData; size?: number; detail?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const r = rng(`${seed}:${LANG}`);
  const palette = PALETTES[LANG] ?? PALETTES.es;
  const hueShift = Math.floor(r() * 360);
  const width = 7 + r() * 6; // petal half-width
  const length = 30 + r() * 6; // petal length
  const twist = (r() - 0.5) * 40; // degrees each petal leans
  const offset = r() * 360;
  const outer = 5 + Math.min(11, data.lessons);
  const inner = data.lessons >= 10 ? 5 + Math.min(11, data.lessons - 10) : 0;
  // Streak ring: 30 dots per lap; every finished lap changes colour (gold, orange, ruby, violet, diamond).
  const dots = 30;
  const lap = data.streak > 0 ? Math.min(STREAK_COLOURS.length - 1, Math.floor((data.streak - 1) / dots)) : 0;
  const lit = data.streak > 0 ? Math.min(dots, data.streak - lap * dots) : 0;
  const petal = (i: number, n: number, len: number, w: number, layer: number) => {
    const angle = offset + (360 / n) * i + layer * (180 / n);
    const fill = palette[(i + layer) % palette.length];
    return (
      <ellipse key={`${layer}-${i}`} cx="50" cy={50 - len / 2} rx={w} ry={len / 2} fill={fill} opacity={layer ? 0.95 : 0.85}
        transform={`rotate(${angle} 50 50) rotate(${twist} 50 ${50 - len / 2})`} />
    );
  };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Your Lingua Bloom avatar" className="bloom">
      <defs>
        <radialGradient id={`bg${uid}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor={`hsl(${hueShift} 70% 96%)`} />
          <stop offset="100%" stopColor={`hsl(${hueShift} 45% 82%)`} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#bg${uid})`} stroke={LEVEL_RING[data.level]} strokeWidth="4" />
      {detail && Array.from({ length: dots }, (_, i) => {
        const a = ((360 / dots) * i - 90) * (Math.PI / 180);
        return <circle key={i} cx={50 + 42 * Math.cos(a)} cy={50 + 42 * Math.sin(a)} r={i < lit ? 1.9 : 1.6} fill={i < lit ? STREAK_COLOURS[lap] : lap > 0 ? STREAK_COLOURS[lap - 1] : 'rgb(0 0 0 / 0.12)'} />;
      })}
      <g>{Array.from({ length: outer }, (_, i) => petal(i, outer, length, width, 0))}</g>
      {inner > 0 && <g>{Array.from({ length: inner }, (_, i) => petal(i, inner, length * 0.62, width * 0.75, 1))}</g>}
      <circle cx="50" cy="50" r="15" fill="#fff" stroke="rgb(0 0 0 / 0.08)" />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize={glyph.length > 1 ? 17 : 18} fontWeight="800" fill="#222" fontFamily="system-ui, sans-serif">{glyph}</text>
    </svg>
  );
}
