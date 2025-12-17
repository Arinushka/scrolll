import React from 'react';
import { Table as AntTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type VisibleRow = {
  app: string;
  date: string;
  message: string;
  type: string;
  uniqueId: string;
};

interface TableProps {
  visibleRows: VisibleRow[];
  sentinelRef: React.Ref<HTMLDivElement>;
}

const columns: ColumnsType<VisibleRow> = [
  {
    title: 'Дата / Время',
    dataIndex: 'date',
    key: 'date',
    render: (value: string) => new Date(value).toLocaleString(),
    width: 180,
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    render: (type: string) => <span className={type}>{type}</span>,
  },
  {
    title: 'App',
    dataIndex: 'app',
    key: 'app',
    width: 120,
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
    ellipsis: true,
  },
];

function Table({ visibleRows, sentinelRef }: TableProps) {
  return (
    <>
      <AntTable<VisibleRow>
        dataSource={visibleRows}
        columns={columns}
        rowKey="uniqueId"
        pagination={false}
        size="small"
        bordered
      />
      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}

export default Table;