import { useEffect, useState, useRef } from 'react';

type SanityFetchFn<T> = () => Promise<T>;

interface UseSanityDataOptions<T> {
  /** Fallback value while loading or on error */
  fallback: T;
  /** Dependencies that should trigger a refetch (e.g., [language]) */
  deps?: ReadonlyArray<unknown>;
}

interface UseSanityDataResult<T> {
  data: T;
  loading: boolean;
  error: boolean;
}

/**
 * Generic hook for fetching Sanity CMS data with:
 * - Cleanup guard (prevents setState on unmounted component)
 * - Fallback on error/empty
 * - Loading state
 */
export function useSanityData<T>(
  fetchFn: SanityFetchFn<T | null | undefined>,
  { fallback, deps = [] }: UseSanityDataOptions<T>,
): UseSanityDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setLoading(true);
    setError(false);

    fetchFn()
      .then((result) => {
        if (!mountedRef.current) return;
        if (result != null) {
          setData(result as T);
        }
      })
      .catch(() => {
        if (mountedRef.current) setError(true);
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data: data ?? fallback,
    loading,
    error,
  };
}
