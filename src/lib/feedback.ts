import { useEffect, useSyncExternalStore } from 'react';
import { LANG } from '../data/lang';
import { accountsEnabled, supabase } from './sync';

/** What the learner was looking at when they pressed "Report a problem". */
export interface FeedbackContext {
  /** App route, e.g. /unit/de-a1-01 or /grammar/de-g-verbs. */
  route: string;
  /** Lesson, grammar lesson or text title. */
  title?: string;
  /** Lesson step (Learn the words / Practise / Grammar, sentences & verbs). */
  step?: string;
  /** The exercise on screen. */
  exercise?: { kind: string; prompt?: string; answer?: string };
  /** What they answered, if they had. */
  typed?: string;
}

export const CATEGORIES = [
  ['wrong', 'The answer is wrong / my answer should be right'],
  ['translation', 'A translation is wrong or missing'],
  ['typo', 'A typo or spelling mistake'],
  ['audio', 'Audio problem'],
  ['unclear', 'Something isn’t explained / unclear'],
  ['other', 'Something else'],
] as const;
export type Category = (typeof CATEGORIES)[number][0];

export interface Feedback {
  id: string;
  user_id: string;
  lang: string;
  context: FeedbackContext;
  category: Category;
  message: string;
  status: 'open' | 'resolved' | 'declined';
  reply: string | null;
  created_at: string;
  resolved_at: string | null;
  seen: boolean;
}

// ---- The current context, set by pages and exercises as the learner moves around ----------
let current: FeedbackContext = { route: '/' };
const listeners = new Set<() => void>();
export function setFeedbackContext(patch: Partial<FeedbackContext>, replace = false) {
  current = replace ? { route: currentRoute(), ...patch } : { ...current, ...patch };
  listeners.forEach((l) => l());
}
export const getFeedbackContext = () => ({ ...current, route: currentRoute() });
const currentRoute = () => (typeof window === 'undefined' ? '/' : window.location.hash.replace(/^#/, '') || '/');
export function useFeedbackContext(): FeedbackContext {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => current);
}
/** Pages call this with their title (and step); it resets the exercise details. */
export function useFeedbackPage(title: string | undefined, step?: string) {
  useEffect(() => { setFeedbackContext({ title, step }, true); }, [title, step]);
}

// ---- Server -----------------------------------------------------------------------------
export const feedbackEnabled = accountsEnabled;

export async function sendFeedback(userId: string, category: Category, message: string, context: FeedbackContext) {
  const sb = await supabase();
  const { error } = await sb.from('feedback').insert({ user_id: userId, lang: LANG, category, message: message.slice(0, 2000), context });
  if (error) throw new Error(error.message);
}

export async function myFeedback(): Promise<Feedback[]> {
  const sb = await supabase();
  const { data: u } = await sb.auth.getUser();
  if (!u.user) return [];
  const { data, error } = await sb.from('feedback').select('*').eq('user_id', u.user.id).order('created_at', { ascending: false }).limit(100);
  if (error) throw new Error(error.message);
  return (data ?? []) as Feedback[];
}

export async function allFeedback(status: Feedback['status'] | 'all'): Promise<Feedback[]> {
  const sb = await supabase();
  let q = sb.from('feedback').select('*').order('created_at', { ascending: false }).limit(300);
  if (status !== 'all') q = q.eq('status', status);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as Feedback[];
}

export async function isAdmin(): Promise<boolean> {
  if (!accountsEnabled) return false;
  const sb = await supabase();
  const { data } = await sb.rpc('is_admin');
  return data === true;
}

export async function resolveFeedback(id: string, status: Feedback['status'], reply: string) {
  const sb = await supabase();
  const { error } = await sb.rpc('feedback_resolve', { fid: id, new_status: status, reply_text: reply });
  if (error) throw new Error(error.message);
}

export async function markSeen(id: string) {
  const sb = await supabase();
  await sb.rpc('feedback_mark_seen', { fid: id });
}

/** Opens the place a report is about, switching the course language if needed. */
export function openFeedbackPlace(f: Pick<Feedback, 'lang' | 'context'>) {
  try { localStorage.setItem('hablo:lang', f.lang); } catch { /* storage blocked */ }
  if (f.lang === LANG) { window.location.hash = '#' + f.context.route; return; }
  window.location.hash = '#' + f.context.route;
  window.location.reload();
}
