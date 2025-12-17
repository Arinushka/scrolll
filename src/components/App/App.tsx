import { useState, useRef, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { usePersistedEvents } from '../../hooks/usePersistedEvents'; // 👈
import './App.css';

import Table from '../Table/Table';
import Filters from '../Filters/Filters';

const PAGE_SIZE = 40;

function App() {
  const { events } = usePersistedEvents();
  const [msgFilter, setMsgFilter]   = useState('');
  const [dateFilter, setDateFilter] = useState<string|null>('');
  const [visibleCnt, setVisibleCnt] = useState(PAGE_SIZE);

  const resetVisible = () => setVisibleCnt(PAGE_SIZE);

  const handleMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsgFilter(e.target.value);
    resetVisible();
  };

  const handleDateChange = (date: string| null) => {
    setDateFilter(date);
    resetVisible();
  };

  const filtered = events.filter(ev => {
    const okMsg  = !msgFilter  || ev.message.toLowerCase()
                                   .includes(msgFilter.toLowerCase());
    const okDate = !dateFilter || ev.date.startsWith(dateFilter);
    return okMsg && okDate;
  });

  const visibleRows = filtered.slice(0, visibleCnt);
  const sentinelRef = useRef<HTMLTableRowElement>(null);

  const loadNextPage = useCallback(() => {
    setVisibleCnt(cnt => Math.min(cnt + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  useInfiniteScroll(sentinelRef, loadNextPage);

  return (
    <div className="container">
      <h1>События приложений</h1>

      <Filters
        msgFilter={msgFilter}
        handleMsgChange={handleMsgChange}
        dateFilter={dateFilter}
        handleDateChange={handleDateChange}
      />

      <p>
        Всего: {events.length}&nbsp;|
        &nbsp;Отфильтровано: {filtered.length}&nbsp;|
        &nbsp;Показано: {visibleRows.length}
      </p>

      <Table visibleRows={visibleRows} sentinelRef={sentinelRef} />
    </div>
  );
}

export default App;