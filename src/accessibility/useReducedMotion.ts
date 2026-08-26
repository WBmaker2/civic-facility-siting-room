import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    let active = true;
    let query: MediaQueryList;
    try { query = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch { return undefined; }
    const update = () => { if (active) setReducedMotion(query.matches); };
    update();
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update);
      return () => { active = false; query.removeEventListener?.('change', update); };
    }
    if (typeof query.addListener === 'function') {
      query.addListener(update);
      return () => { active = false; query.removeListener?.(update); };
    }
    return () => { active = false; };
  }, []);

  return reducedMotion;
}
