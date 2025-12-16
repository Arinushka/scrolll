import type { ChangeEvent } from 'react';

interface FiltersProps {
    msgFilter: string;
    dateFilter: string;
    handleMsgChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Filters({ msgFilter, dateFilter, handleMsgChange, handleDateChange }: FiltersProps) {

    return (
        <div className="filters">
            <input
                placeholder="Поиск по message"
                value={msgFilter}
                onChange={handleMsgChange}
            />
            <input type="date" value={dateFilter} onChange={handleDateChange} />
        </div>
    );
}

export default Filters;