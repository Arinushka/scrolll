import { useEffect } from 'react';

export function useInfiniteScroll(
  sentinel: React.RefObject<Element | null>,
  onIntersect: () => void,
  margin = '200px'                    
) {
  useEffect(() => {
    if (!sentinel.current) return;

    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) onIntersect();
      },
      { rootMargin: margin }
    );

    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [sentinel, onIntersect, margin]);
}