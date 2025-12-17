import { Input, DatePicker, Space } from 'antd';
import type { ChangeEvent } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface FiltersProps {
  msgFilter: string;
  dateFilter: string|null;
  handleMsgChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (dateString: string| null) => void;
}

function Filters({
  msgFilter,
  dateFilter,
  handleMsgChange,
  handleDateChange,
}: FiltersProps) {
  const dateValue: Dayjs | null = dateFilter ? dayjs(dateFilter) : null;

  return (
    <Space className="filters" direction="horizontal" size="middle">
      <Input
        allowClear
        placeholder="Поиск по message"
        value={msgFilter}
        onChange={handleMsgChange}
      />

      <DatePicker
        allowClear
        placeholder="Дата"
        format="YYYY-MM-DD"
        value={dateValue}
        onChange={(_, dateString) => handleDateChange(dateString)}
      />
    </Space>
  );
}

export default Filters;