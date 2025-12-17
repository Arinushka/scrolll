import { useCallback, useState, useEffect } from 'react';

export function usePaginatedData<T>(data: T[], pageSize: number) {
    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const pageRows = data.slice(0, (page + 1) * pageSize);
    const hasMore = pageRows.length < data.length;

    const loadNextPage = useCallback(() => {
        if (!hasMore || isFetching) return;

        setIsFetching(true);
        setTimeout(() => {
            setPage(prev => prev + 1);
            setIsFetching(false);
        }, 0);
    }, [hasMore, isFetching]);

    const resetPagination = useCallback(() => {
        setPage(0);
        setIsFetching(false);
    }, []);

    useEffect(() => {
        if (pageRows.length === 0 && page > 0) {
            setPage(0);
        }
    }, [data, page, pageRows.length]);

    return { pageRows, hasMore, isFetching, loadNextPage, resetPagination };
}