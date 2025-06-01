import { useState } from 'react';
import { deleteStock } from '../../services/stock/getStockService';

export const useDeleteStock = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteStockAction = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteStock(id);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteStockAction };
};
