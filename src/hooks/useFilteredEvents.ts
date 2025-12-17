import { useMemo } from 'react';
import type { EventDto } from '../components/App/App';

export function useFilteredEvents(
  events: EventDto[],
  msgFilter: string,
  dateFilter: string | null,
) {
  return useMemo(() => {
    const msg = msgFilter.trim().toLowerCase();

    return events.filter(ev => {
      const msgOk  = !msg || ev.message.toLowerCase().includes(msg);
      const dateOk = !dateFilter || ev.date.startsWith(dateFilter);
      return msgOk && dateOk;
    });
  }, [events, msgFilter, dateFilter]);
}