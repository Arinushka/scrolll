import { useEffect, useState } from 'react';
import { readLSAsync } from '../utils/storage';
import type { EventDto } from '../components/App/App';

export function useEventsStorage(lsKey: string) {
  const [events, setEvents] = useState<EventDto[]>([]);

  useEffect(() => {
    (async () => {
      const data = await readLSAsync<EventDto[]>(lsKey);
      setEvents(data ?? []);
    })();
  }, [lsKey]);

  return events;
}