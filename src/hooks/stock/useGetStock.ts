import { useState, useCallback } from 'react';
import { getStock } from '../../services/stock/getStockService';

export const useGetStock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stock, setStock] = useState<Awaited<
    ReturnType<typeof getStock>
  > | null>(null);

  const getStockAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getStock();
      setStock(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, getStockAction, stock };
};
