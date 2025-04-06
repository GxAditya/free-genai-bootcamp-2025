import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
  initialData?: T;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for handling API requests with loading, error, and data states
 * @param apiFunction The API function to call
 * @param params Parameters to pass to the API function
 * @param options Options for the hook behavior
 */
function useApi<T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>,
  params?: P,
  options: UseApiOptions<T> = {}
) {
  const { initialData, immediate = false, onSuccess, onError } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to execute the API call
  const execute = useCallback(
    async (...callParams: P): Promise<T | undefined> => {
      try {
        setLoading(true);
        setError(null);

        // Use provided params or the ones from hook initialization
        const finalParams = (callParams.length > 0 ? callParams : params) as P;
        const result = await apiFunction(...finalParams);
        
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, params, onSuccess, onError]
  );

  useEffect(() => {
    if (immediate) {
      execute(...(params as P));
    }
  }, [immediate, execute, params]);

  return { data, loading, error, execute, setData };
}

export default useApi; 