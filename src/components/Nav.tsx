import type { KeyboardEvent, ReactNode } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

/**
 * Embedded previews (e.g. the claude.ai artifact viewer) open every <a> in a new tab, so the
 * preview build (VITE_PREVIEW=1) navigates with clickable non-link elements instead.
 */
export const PREVIEW = import.meta.env.VITE_PREVIEW === '1';

interface Props {
  to: string;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

function usePseudoLink(to: string) {
  const navigate = useNavigate();
  return {
    role: 'link',
    tabIndex: 0,
    onClick: () => navigate(to),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter') navigate(to);
    },
  };
}

export function Link({ to, className, children, ...rest }: Props) {
  const pseudo = usePseudoLink(to);
  if (!PREVIEW) return <RouterLink to={to} className={className} {...rest}>{children}</RouterLink>;
  return <div className={className} {...pseudo} {...rest}>{children}</div>;
}

export function NavLink({ to, end, children }: { to: string; end?: boolean; children: ReactNode }) {
  const pseudo = usePseudoLink(to);
  const match = useMatch({ path: useResolvedPath(to).pathname, end: !!end });
  if (!PREVIEW) return <RouterNavLink to={to} end={end}>{children}</RouterNavLink>;
  return <div className={match ? 'active' : ''} {...pseudo}>{children}</div>;
}
