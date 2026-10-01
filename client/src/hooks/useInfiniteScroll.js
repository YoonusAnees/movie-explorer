import {
  useEffect,
  useRef,
} from "react";

export default function useInfiniteScroll({
  enabled,
  loading,
  hasMore,
  onLoadMore,
}) {
  const sentinel = useRef(null);

  useEffect(() => {
    if (
      !enabled ||
      loading ||
      !hasMore ||
      !sentinel.current ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "250px",
      }
    );

    observer.observe(sentinel.current);

    return () => observer.disconnect();
  }, [
    enabled,
    loading,
    hasMore,
    onLoadMore,
  ]);

  return sentinel;
}