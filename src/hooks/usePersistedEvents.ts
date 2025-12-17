import { useState, useEffect } from 'react';
import { readLSAsync } from '../utils/storage';
import { useEventGenerator } from './useEventGenerator';

const LS_KEY = 'events';

export function usePersistedEvents() {
  const { events: generated } = useEventGenerator(); 
  const [events, setEvents] = useState<typeof generated>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const fromLS = await readLSAsync<typeof generated>(LS_KEY);

      if (cancelled) return;

      setEvents(fromLS?.length ? fromLS : generated);
    })();

    return () => {
      cancelled = true;
    };
  }, [generated]);

  useEffect(() => {
    if (events.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(events));
    }
  }, [events]);

  return { events, setEvents };
}