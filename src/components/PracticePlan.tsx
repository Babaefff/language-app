import { useState } from 'react';
import { L, LANG } from '../data/lang';
import { updateSettings, useProgress } from '../lib/store';

const CUES = ['After breakfast', 'On my commute', 'In my lunch break', 'After work', 'After dinner', 'Before bed'];

/** Calendar file with a daily event and an alarm: works in every phone and computer calendar, no server needed. */
function icsFor(time: string, cue: string, minutes: number): string {
  const [h, m] = time.split(':');
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const url = window.location.origin + window.location.pathname;
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hablo//Practice plan//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:hablo-daily-${LANG}@hablo`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${date}T${h}${m}00`,
    `DURATION:PT${minutes}M`,
    'RRULE:FREQ=DAILY',
    `SUMMARY:${L.flag} ${L.name} practice (${minutes} min)`,
    `DESCRIPTION:${cue}\\, I practise ${L.name} for ${minutes} minutes. ${url}`,
    `URL:${url}`,
    'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', `DESCRIPTION:Time for ${L.name}!`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
}

/**
 * "Implementation intention": deciding when and after what you'll practise ("After dinner, I…")
 * makes people much more likely to follow through than a vague goal.
 */
export function PracticePlan({ compact = false }: { compact?: boolean }) {
  const { settings } = useProgress();
  const [time, setTime] = useState(settings.planTime || '20:00');
  const [cue, setCue] = useState(settings.planCue || 'After dinner');
  const [minutes, setMinutes] = useState(settings.planMinutes || 10);
  const [editing, setEditing] = useState(!settings.planTime);

  const save = () => {
    updateSettings({ planTime: time, planCue: cue, planMinutes: minutes });
    const blob = new Blob([icsFor(time, cue, minutes)], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hablo-${LANG}-practice.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setEditing(false);
  };

  if (!editing && settings.planTime) {
    return (
      <div className={compact ? '' : 'card'}>
        {!compact && <h3>Your practice plan</h3>}
        <p><strong>{settings.planCue} ({settings.planTime})</strong>, I practise {L.name} for {settings.planMinutes} minutes.</p>
        <button className="link small" onClick={() => setEditing(true)}>Change plan</button>
      </div>
    );
  }
  return (
    <div className={compact ? '' : 'card'}>
      <h3>Make a practice plan</h3>
      <p className="muted small">People who decide <em>when</em> and <em>after what</em> they'll practise are far more likely to keep going. Pick a moment that already happens every day.</p>
      <div className="plan-form">
        <label>When<select value={cue} onChange={(e) => setCue(e.target.value)}>{CUES.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>At<input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
        <label>For<select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>{[5, 10, 15, 20].map((n) => <option key={n} value={n}>{n} min</option>)}</select></label>
      </div>
      <p className="small"><strong>“{cue}, I practise {L.name} for {minutes} minutes.”</strong></p>
      <button className="btn primary" onClick={save}>📅 Save and add a daily reminder to my calendar</button>
      <p className="muted small">This downloads a calendar event that repeats every day with an alert; open it to add it to your phone's calendar.</p>
    </div>
  );
}
