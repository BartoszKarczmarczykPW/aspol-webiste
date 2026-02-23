import { useEffect, useState } from 'react';

/**
 * SSR-safe hook that subscribes to `prefers-reduced-motion` media query.
 * Returns `true` when the user prefers reduced motion.
 * Defaults to `false` on the server (animations enabled).
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
