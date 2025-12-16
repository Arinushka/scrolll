type visibleRow = {
    app: string;
    date: string;
    message: string;
    type: string;
    uniqueId: string;
}

interface TableProps {
    visibleRows: visibleRow[];
    sentinelRef: React.Ref<HTMLTableRowElement>;
}

function Table({ visibleRows, sentinelRef }: TableProps) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Дата / Время</th>
                    <th>Тип</th>
                    <th>App</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {visibleRows.map((ev) => (
                    <tr key={ev.uniqueId}>
                        <td>{new Date(ev.date).toLocaleString()}</td>
                        <td className={ev.type}>{ev.type}</td>
                        <td>{ev.app}</td>
                        <td>{ev.message}</td>
                    </tr>
                ))}
                <tr ref={sentinelRef}>
                    <td colSpan={4} style={{ height: 1 }} />
                </tr>
            </tbody>
        </table>
    );
}

export default Table;