import { useMemo } from 'react';

export interface LogEvent {
  uniqueId: string;          
  date: string;              
  type: 'INFO' | 'WARN' | 'ERROR';
  app: string;
  message: string;
}

const TYPES = ['INFO', 'WARN', 'ERROR'] as const;
const APPS  = ['billing', 'auth', 'crm', 'shop', 'blog'];
const MSGS  = [
  'User logged in',
  'Payment processed',
  'Got 404 from service',
  'Redis timeout',
  'User logged out',
  'Permission denied',
  'Healthcheck passed',
  'Started background job',
  'Cancelled subscription',
];
export function useEventGenerator(count = 2000) {

  const events = useMemo<LogEvent[]>(() => {
    const now = Date.now();
    const list: LogEvent[] = [];

    for (let i = 0; i < count; i++) {
      const date = new Date(now - i * 60_000).toISOString();
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      const app  = APPS[Math.floor(Math.random() * APPS.length)];
      const msg  = MSGS[Math.floor(Math.random() * MSGS.length)];

      list.push({
        uniqueId: `${i}-${Math.random().toString(36).slice(2, 8)}`,
        date,
        type,
        app,
        message: msg,
      });
    }
    return list;
  }, [count]);

  return { events };
}