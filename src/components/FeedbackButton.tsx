import { useEffect, useRef, useState } from 'react';
import { Link } from './Nav';
import { Icon } from './Icon';
import { CATEGORIES, feedbackEnabled, getFeedbackContext, sendFeedback, type Category, type FeedbackContext } from '../lib/feedback';
import { useSync } from '../lib/sync';

/**
 * "Report a problem": a small button on lessons, exercises and texts. It sends what was on
 * screen (lesson, exercise, expected answer, what was typed) so the problem can be found and fixed.
 */
export function FeedbackButton({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  if (!feedbackEnabled) return null;
  return (
    <>
      <button className={compact ? 'icon-btn feedback-btn' : 'link small feedback-link'} onClick={() => setOpen(true)} aria-label="Report a problem" title="Report a problem">
        <Icon name="flag" size={compact ? 18 : 16} />{!compact && ' Report a problem with this lesson'}
      </button>
      {open && <FeedbackDialog context={getFeedbackContext()} onClose={() => setOpen(false)} />}
    </>
  );
}

function FeedbackDialog({ context, onClose }: { context: FeedbackContext; onClose: () => void }) {
  const { user } = useSync();
  const [category, setCategory] = useState<Category | null>(context.exercise ? 'wrong' : null);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | string>('idle');
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    box.current?.querySelector<HTMLElement>('button, textarea')?.focus();
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);

  const send = async () => {
    if (!user || !category) return;
    setState('sending');
    try {
      await sendFeedback(user.id, category, message.trim(), context);
      setState('sent');
    } catch (e) {
      setState(e instanceof Error ? e.message : 'Could not send. Please try again.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal card" role="dialog" aria-modal="true" aria-labelledby="fb-title" ref={box} onClick={(e) => e.stopPropagation()}>
        <div className="row between"><h2 id="fb-title">Report a problem</h2><button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div>
        {state === 'sent' ? (
          <>
            <p>Thank you! We’ll look at it and let you know here in the app when it’s fixed.</p>
            <div className="row"><Link className="btn" to="/feedback" onClick={onClose}>My feedback</Link><button className="btn primary" onClick={onClose}>Back</button></div>
          </>
        ) : !user ? (
          <>
            <p>Sign in to send feedback, so we can tell you when it’s fixed.</p>
            <Link className="btn primary" to="/account" onClick={onClose}>Sign in</Link>
          </>
        ) : (
          <>
            <div className="fb-context small">
              <strong>About:</strong> {context.title ?? context.route}{context.step ? ` · ${context.step}` : ''}
              {context.exercise && <div className="muted">{context.exercise.prompt}{context.exercise.answer ? ` → ${context.exercise.answer}` : ''}{context.typed ? ` · you typed “${context.typed}”` : ''}</div>}
            </div>
            <fieldset className="fb-cats">
              <legend className="small muted">What’s wrong?</legend>
              {CATEGORIES.map(([id, label]) => (
                <label key={id} className={`chip ${category === id ? 'on' : ''}`}>
                  <input type="radio" name="fb-cat" checked={category === id} onChange={() => setCategory(id)} /> {label}
                </label>
              ))}
            </fieldset>
            <label className="field">Details (optional)
              <textarea rows={3} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="For example: “Mir geht es gut” should also accept …" />
            </label>
            {state !== 'idle' && state !== 'sending' && <p className="warn small">{state}</p>}
            <div className="row end"><button className="btn" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!category || state === 'sending'} onClick={() => void send()}>{state === 'sending' ? 'Sending…' : 'Send'}</button></div>
          </>
        )}
      </div>
    </div>
  );
}
