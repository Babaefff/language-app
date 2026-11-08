import type { ReactNode } from 'react';
import { exampleTranslation } from '../data/grammar-translations';

const BOLD = /^\*\*([^*]+)\*\*$/;
/** Bold is tried first, so "***Son** las tres*" is read as italics containing bold. */
const TOKENS = /(\*\*[^*]+\*\*|\*(?:\*\*[^*]+\*\*|[^*])+\*)/;

function bold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((p, i) => (BOLD.test(p) ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
}

function inline(text: string): ReactNode[] {
  return text.split(TOKENS).map((part, i) => {
    if (BOLD.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      // Example sentences in the language being learned get their English right after them.
      const en = exampleTranslation(inner);
      return (
        <span key={i} className="ex-pair">
          <em>{bold(inner)}</em>
          {en && <span className="ex-en"> ({en})</span>}
        </span>
      );
    }
    return part;
  });
}

/** Renders the small grammar-note markup used in the course data. */
export function Grammar({ source }: { source: string }) {
  const blocks: ReactNode[] = [];
  const lines = source.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith('## ')) {
      blocks.push(<h3 key={i}>{inline(line.slice(3))}</h3>);
      i++;
    } else if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
        i++;
      }
      blocks.push(
        <div className="table-wrap" key={i}>
          <table>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(<ul key={i}>{items.map((it, ii) => <li key={ii}>{inline(it)}</li>)}</ul>);
    } else {
      blocks.push(<p key={i}>{inline(line)}</p>);
      i++;
    }
  }
  return <div className="grammar">{blocks}</div>;
}
