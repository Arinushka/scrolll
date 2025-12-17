import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import Table from '../Table/Table';
import Filters from '../Filters/Filters';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import './App.css';
import { useEventsStorage } from '../../hooks/useEventsStorage';
import { useFilteredEvents } from '../../hooks/useFilteredEvents';
import { usePaginatedData } from '../../hooks/usePaginatedData';
import { useResetOnDepsChange } from '../../hooks/useResetOnDepsChange';

export interface EventDto {
  app: string;
  date: string;
  message: string;
  type: string;
  uniqueId: string;
}

const PAGE_SIZE = 40;

function App() {

  const [msgFilter, setMsgFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  const handleMsgChange = (e: ChangeEvent<HTMLInputElement>) => setMsgFilter(e.target.value);
  const handleDateChange = (v: string | null) => setDateFilter(v);

  const allEvents = useEventsStorage('events');
  const totalCount = allEvents.length;

  const filtered = useFilteredEvents(allEvents, msgFilter, dateFilter);
  const filteredCount = filtered.length;

  const {
    pageRows,
    hasMore,
    isFetching,
    loadNextPage,
    resetPagination,
  } = usePaginatedData(filtered, PAGE_SIZE);

  useResetOnDepsChange(resetPagination, [msgFilter, dateFilter]);

  const sentinelRef = useRef<HTMLTableRowElement>(null);
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
        Всего: {totalCount}&nbsp;|
        &nbsp;Отфильтровано: {filteredCount}&nbsp;|
        &nbsp;Показано: {pageRows.length}
        {isFetching && ' (загрузка...)'}
      </p>

      <Table
        visibleRows={pageRows}
        sentinelRef={sentinelRef}
        isFetching={isFetching}
        hasMore={hasMore}
      />
    </div>
  );
}

export default App;
