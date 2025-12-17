import { useEffect, useRef } from 'react';

export function useResetOnDepsChange(cb: () => void, deps: unknown[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) cb();
    else mounted.current = true;
  }, deps);
}