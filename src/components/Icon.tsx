const paths = {
  home: ['M3 10 12 3l9 7', 'M5 9v12h5v-7h4v7h5V9'],
  book: ['M12 5v16', 'M12 5C8 2 3 4 3 4v15s5-2 9 2c4-4 9-2 9-2V4s-5-2-9 1Z'],
  grammar: ['M4 4h16v16H4z', 'M8 8h8M8 12h8M8 16h4'],
  review: ['M3 11a9 9 0 1 1 2 7', 'M3 4v7h7', 'M12 7v5l3 2'],
  practice: ['m14 4 6 6M4 20l4-1L21 6l-3-3L5 16l-1 4Z'],
  reading: ['M4 4h16v17H4z', 'M8 8h8M8 12h8M8 16h5'],
  volume: ['m11 4-6 5H2v6h3l6 5V4Z', 'M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14'],
  slow: ['M12 3a9 9 0 1 0 9 9', 'M12 7v5l3 2', 'M16 3h5v5'],
  settings: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', 'm9 3 1-1h4l1 3 3 1 3-1 2 4-2 2v3l2 2-2 4-3-1-3 1-1 3h-4l-1-3-3-1-3 1-2-4 2-2v-3L1 9l2-4 3 1 3-1V3Z'],
  flame: ['M12 2c2 5 7 7 7 13a7 7 0 0 1-14 0c0-3 2-6 4-8v5c3-2 4-5 3-10Z'],
  mic: ['M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5Z', 'M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8'],
  exam: ['M8 4H4v18h16V4h-4M8 2h8v5H8z', 'm8 14 3 3 5-6'],
  sentences: ['M3 4h18v12H8l-5 5V4Z', 'M7 8h10M7 12h6'],
  songs: ['M9 17V5l11-2v12', 'M9 5v4l11-2', 'M9 17c0 4-6 4-6 1s6-4 6-1ZM20 15c0 4-6 4-6 1s6-4 6-1Z'],
  arrow: ['M4 12h16m-6-6 6 6-6 6'],
  close: ['m6 6 12 12M18 6 6 18'],
  chart: ['M4 3v18h17M8 16v-5M13 16V7M18 16v-8'],
  logout: ['M9 4H3v16h6M8 12h13m-5-5 5 5-5 5'],
  shield: ['m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z', 'm8 12 3 3 5-6'],
};
export type IconName = keyof typeof paths;
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name].map((d,i) => <path d={d} key={i} />)}</svg>;
}
